// scripts/convert-statistics.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertStatisticsImages()
{
    const images = [
        {
            input: 'public/images/banner/home-statistics.jpg',
            outputAvif: 'public/images/banner/home-statistics.avif',
            outputWebp: 'public/images/banner/home-statistics.webp',
            quality: 80
        },
        {
            input: 'public/images/banner/home-statistics-mobile.jpg',
            outputAvif: 'public/images/banner/home-statistics-mobile.avif',
            outputWebp: 'public/images/banner/home-statistics-mobile.webp',
            quality: 75
        }
    ];

    for (const img of images) {
        try {
            // Check if input file exists
            if (!fs.existsSync(img.input)) {
                console.log(`⚠️  ${img.input} not found, skipping...`);
                continue;
            }

            // Get original file size
            const originalStats = fs.statSync(img.input);
            const originalSize = (originalStats.size / 1024).toFixed(2);

            // Convert to AVIF (best compression)
            await sharp(img.input)
                .avif({ quality: img.quality })
                .toFile(img.outputAvif);

            const avifStats = fs.statSync(img.outputAvif);
            const avifSize = (avifStats.size / 1024).toFixed(2);
            const avifSaved = (originalSize - avifSize).toFixed(2);

            // Also convert to WebP (fallback for older browsers)
            await sharp(img.input)
                .webp({ quality: img.quality })
                .toFile(img.outputWebp);

            const webpStats = fs.statSync(img.outputWebp);
            const webpSize = (webpStats.size / 1024).toFixed(2);

            console.log(`✅ ${path.basename(img.input)}:`);
            console.log(`   Original: ${originalSize}KB`);
            console.log(`   AVIF:     ${avifSize}KB (saved ${avifSaved}KB) 🎉`);
            console.log(`   WebP:     ${webpSize}KB (fallback)`);
            console.log('');
        } catch (error) {
            console.error(`❌ Error converting ${img.input}:`, error.message);
        }
    }

    console.log('📝 Next steps:');
    console.log('1. Update tailwind.config.js to use .avif files');
    console.log('2. Keep .webp files as fallback for older browsers');
}

convertStatisticsImages().catch(console.error);