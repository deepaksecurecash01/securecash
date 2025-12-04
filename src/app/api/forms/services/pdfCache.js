import fs from "fs";
import path from "path";
import { PDF_FILES_TO_CACHE } from "../config/constants.js";

const PDF_CACHE = new Map();
const PDF_CACHE_INITIALIZED = { value: false };

export const initializePdfCache = () =>
{
    if (PDF_CACHE_INITIALIZED.value) return;

    const startTime = performance.now();
    let cachedCount = 0;
    let totalSize = 0;

    PDF_FILES_TO_CACHE.forEach(filename =>
    {
        try {
            const filePath = path.join(process.cwd(), "public", "upload", filename);
            if (fs.existsSync(filePath)) {
                const fileBuffer = fs.readFileSync(filePath);
                const base64Content = fileBuffer.toString("base64");
                PDF_CACHE.set(filename, base64Content);
                cachedCount++;
                totalSize += base64Content.length;
            }
        } catch (error) {
            console.error(`Error caching PDF ${filename}:`, error.message);
        }
    });

    const initTime = performance.now() - startTime;
    const sizeMB = (totalSize / (1024 * 1024)).toFixed(2);

    console.log(`PDF cache: ${cachedCount}/${PDF_FILES_TO_CACHE.length} files, ${sizeMB}MB, ${initTime.toFixed(2)}ms`);

    PDF_CACHE_INITIALIZED.value = true;
};

export const readPdfFile = (filename) =>
{
    if (PDF_CACHE.has(filename)) {
        return PDF_CACHE.get(filename);
    }

    try {
        const filePath = path.join(process.cwd(), "public", "upload", filename);
        if (!fs.existsSync(filePath)) {
            return null;
        }
        const fileBuffer = fs.readFileSync(filePath);
        const base64Content = fileBuffer.toString("base64");
        PDF_CACHE.set(filename, base64Content);
        return base64Content;
    } catch (error) {
        console.error(`Error reading PDF file ${filename}:`, error);
        return null;
    }
};

export const getPdfCacheStatus = () => ({
    initialized: PDF_CACHE_INITIALIZED.value,
    cachedFiles: PDF_CACHE.size,
    cacheSize: `${(Array.from(PDF_CACHE.values()).join('').length / (1024 * 1024)).toFixed(2)}MB`
});