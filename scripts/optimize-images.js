const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// CONFIGURATION: Specific targets based on your audit requirements
const images = [
    // --- HERO / BANNER IMAGES (Target: 150-200KB) ---
    {
        input: 'public/images/banner/home-statistics.jpg',
        output: 'public/images/banner/home-statistics.avif',
        quality: 65, // Slightly higher quality for Hero elements
        effort: 9,
    },
    {
        input: 'public/images/banner/home-statistics-mobile.jpg',
        output: 'public/images/banner/home-statistics-mobile.avif',
        quality: 65,
        effort: 9,
    },

    // --- ABOUT US IMAGES (Target: 100-150KB) ---
    // Current: img-sec-2.png (726KB) -> Goal: <150KB
    {
        input: 'public/images/about-us-images/img-sec-2.png',
        output: 'public/images/about-us-images/img-sec-2.avif',
        quality: 50, // Aggressive compression
        effort: 9,   // Max CPU usage for smallest file size
    },
    // Current: img-sec-4.png (570KB) -> Goal: <150KB
    {
        input: 'public/images/about-us-images/img-sec-4.png',
        output: 'public/images/about-us-images/img-sec-4.avif',
        quality: 50,
        effort: 9,
    },

    // --- TEAM PHOTO (Target: 80-100KB) ---
    // Current: team.jpg (482KB) -> Goal: <100KB
    {
        input: 'public/images/team.jpg',
        output: 'public/images/team.avif',
        quality: 50,
        // 4:2:0 chroma subsampling reduces color resolution slightly
        // Perfect for "real life" photos like people/teams; saves ~20% size
        chromaSubsampling: '4:2:0',
        effort: 9,
    },
];

async function optimize()
{
    console.log('🚀 Starting Manual Optimization...\n');

    for (const img of images) {
        if (!fs.existsSync(img.input)) {
            console.warn(`⚠️  File not found: ${img.input}`);
            continue;
        }

        try {
            const originalStats = fs.statSync(img.input);
            const originalSizeKB = (originalStats.size / 1024).toFixed(2);

            // Configure Sharp
            let pipeline = sharp(img.input);

            await pipeline
                .avif({
                    quality: img.quality,
                    effort: img.effort,
                    chromaSubsampling: img.chromaSubsampling || '4:4:4', // Default to high color accuracy unless specified
                })
                .toFile(img.output);

            const newStats = fs.statSync(img.output);
            const newSizeKB = (newStats.size / 1024).toFixed(2);
            const reduction = (
                ((originalStats.size - newStats.size) / originalStats.size) *
                100
            ).toFixed(1);

            console.log(`✅ ${path.basename(img.output)}`);
            console.log(`   Original: ${originalSizeKB} KB`);
            console.log(`   AVIF:     ${newSizeKB} KB (Saved ${reduction}%)`);
            console.log('-----------------------------------');
        } catch (error) {
            console.error(`❌ Error processing ${img.input}:`, error.message);
        }
    }
    console.log('✨ Optimization Complete!');
}

optimize();