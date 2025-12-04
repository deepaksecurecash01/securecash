export const submitForm = async (formData, endpoint = "/api/forms") =>
{
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to submit the form");
        }

        return await response.json();
    } catch (error) {
        console.error("API submission error:", error);
        throw error;
    }
};