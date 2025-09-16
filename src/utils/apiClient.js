// /utils/apiClient.js
// Standard API client for form submissions

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

// File processing utilities (for ICA form)
export const fileToBase64 = (file, onProgress = null) =>
    {
        return new Promise((resolve, reject) =>
        {
            const reader = new FileReader();

            // SOLUTION 2: Track reading progress
            reader.onprogress = (event) =>
            {
                if (onProgress && event.lengthComputable) {
                    const progress = (event.loaded / event.total) * 100;
                    onProgress(progress);
                }
            };

            reader.onload = () =>
            {
                if (onProgress) onProgress(100);
                resolve(reader.result.split(',')[1]);
            };

            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

// Process multiple attachments with compression (for ICA form)
export const processAttachments = async (fileFields, data, compressImageFile) =>
{
    const attachments = [];
    const errors = [];

    // Process files concurrently but with limit
    const concurrencyLimit = 2;

    for (let i = 0; i < fileFields.length; i += concurrencyLimit) {
        const batch = fileFields.slice(i, i + concurrencyLimit);

        const batchPromises = batch.map(async ({ field, prefix }) =>
        {
            if (data[field]) {
                try {
                    const compressedFile = await compressImageFile(data[field]);
                    const base64File = await fileToBase64(compressedFile);
                    if (base64File) {
                        return {
                            filename: `${prefix}.${data[field].name.split('.').pop()}`,
                            data: base64File
                        };
                    }
                } catch (error) {
                    errors.push(`${field}: ${error.message}`);
                    return null;
                }
            }
            return null;
        });

        const batchResults = await Promise.all(batchPromises);
        attachments.push(...batchResults.filter(Boolean));
    }

    if (errors.length > 0) {
        throw new Error(`File processing errors: ${errors.join(', ')}`);
    }

    return attachments;
};