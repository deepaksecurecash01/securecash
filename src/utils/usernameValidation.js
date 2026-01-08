// Debounced username check to avoid excessive API calls
let checkTimeout = null;
let abortController = null;

export const checkUsernameAvailability = async (username) =>
{
    // Abort previous request if still pending
    if (abortController) {
        abortController.abort();
    }

    // Clear previous timeout
    if (checkTimeout) {
        clearTimeout(checkTimeout);
    }

    // Return promise that resolves after debounce
    return new Promise((resolve) =>
    {
        checkTimeout = setTimeout(async () =>
        {
            try {
                // Skip check if username too short
                if (!username || username.length < 4) {
                    resolve({ available: true, tooShort: true });
                    return;
                }

                // Create new abort controller for this request
                abortController = new AbortController();

                // ✅ PATCH: Add 5-second timeout for better UX
                const timeoutId = setTimeout(() => abortController.abort(), 5000);

                const response = await fetch('/api/check-username', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username }),
                    signal: abortController.signal
                });

                // Clear timeout if request completes
                clearTimeout(timeoutId);

                if (!response.ok) {
                    console.warn('Username API returned non-OK status:', response.status);
                    // On error, allow (fail-open)
                    resolve({ available: true, error: true });
                    return;
                }

                const data = await response.json();
                resolve(data);

            } catch (error) {
                // Ignore abort errors and treat as API failure
                if (error.name === 'AbortError') {
                    console.warn('Username check timed out or was aborted');
                    resolve({ available: true, error: true });
                    return;
                }

                console.error('Username check error:', error);
                // On error, allow (fail-open)
                resolve({ available: true, error: true });
            }
        }, 800); // 800ms debounce for real-time typing
    });
};

// Synchronous username format validation
export const validateUsernameFormat = (username) =>
{
    // Must be 3-50 characters
    if (username.length < 3 || username.length > 50) {
        return { valid: false, message: "Username must be 3-50 characters" };
    }

    // Only letters, numbers, underscore, hyphen
    const validPattern = /^[a-zA-Z0-9_-]+$/;
    if (!validPattern.test(username)) {
        return { valid: false, message: `Only letters, numbers, "_" and "-" allowed` };
    }

    return { valid: true, message: "" };
};

// Cancel any pending checks (useful for cleanup)
export const cancelUsernameCheck = () =>
{
    if (checkTimeout) {
        clearTimeout(checkTimeout);
        checkTimeout = null;
    }
    if (abortController) {
        abortController.abort();
        abortController = null;
    }
};