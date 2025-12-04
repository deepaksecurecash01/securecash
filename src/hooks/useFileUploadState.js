import { useState, useCallback } from 'react';

export const useFileUploadState = () =>
{
    const [fileUploadResults, setFileUploadResults] = useState(new Map());

    const setUploadResult = useCallback((fileId, result) =>
    {
        setFileUploadResults(prev => new Map(prev.set(fileId, result)));
    }, []);

    const clearUploadResult = useCallback((fileId) =>
    {
        setFileUploadResults(prev =>
        {
            const updated = new Map(prev);
            updated.delete(fileId);
            return updated;
        });
    }, []);

    const getCompletedUploads = useCallback(() =>
    {
        return Array.from(fileUploadResults.values()).filter(
            result => result?.isProcessed && result.data
        );
    }, [fileUploadResults]);

    const clearAllUploads = useCallback(() =>
    {
        setFileUploadResults(new Map());
    }, []);

    return {
        fileUploadResults,
        setUploadResult,
        clearUploadResult,
        getCompletedUploads,
        clearAllUploads
    };
};