const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// CONFIGURATION: About Us Page Optimization
const images = [
    {
        input: 'public/images/team.jpg',
        output: 'public/images/team.avif',
        quality: 40, // Down from 50
        chromaSubsampling: '4:2:0',
        effort: 9,
    },
    // Update in optimize-images.js
    {
        input: 'public/images/bg-quote-header-left.png',
        output: 'public/images/bg-quote-header-left.avif',
        quality: 35, // Down from 45 - it's just a decorative pattern
        effort: 9,
    },
    {
        input: 'public/images/bg-quote-header-right.png',
        output: 'public/images/bg-quote-header-right.avif',
        quality: 35, // Down from 45
        effort: 9,
    },
];

async function optimize()
{
    console.log('🚀 Starting About Us Page Optimization...\n');
    console.log('Target savings: ~450KB+ (per Lighthouse report)\n');

    for (const img of images) {
        if (!fs.existsSync(img.input)) {
            console.warn(`⚠️  File not found: ${img.input}`);
            continue;
        }

        try {
            const originalStats = fs.statSync(img.input);
            const originalSizeKB = (originalStats.size / 1024).toFixed(2);

            let pipeline = sharp(img.input);

            // Check output format
            const isWebP = img.output.endsWith('.webp');
            const isAVIF = img.output.endsWith('.avif');

            if (isAVIF) {
                await pipeline
                    .avif({
                        quality: img.quality,
                        effort: img.effort,
                        chromaSubsampling: img.chromaSubsampling || '4:4:4',
                    })
                    .toFile(img.output);
            } else if (isWebP) {
                await pipeline
                    .webp({
                        quality: img.quality,
                        effort: 6,
                    })
                    .toFile(img.output);
            }

            const newStats = fs.statSync(img.output);
            const newSizeKB = (newStats.size / 1024).toFixed(2);
            const reduction = (
                ((originalStats.size - newStats.size) / originalStats.size) *
                100
            ).toFixed(1);

            console.log(`✅ ${path.basename(img.output)}`);
            console.log(`   Original: ${originalSizeKB} KB`);
            console.log(`   Optimized: ${newSizeKB} KB (Saved ${reduction}%)`);
            console.log('-----------------------------------');
        } catch (error) {
            console.error(`❌ Error processing ${img.input}:`, error.message);
        }
    }
    console.log('\n✨ About Us Page Optimization Complete!');
    console.log('\n📌 Next Steps:');
    console.log('1. Update image imports to use .avif extensions');
    console.log('2. Keep .png/.jpg as fallbacks for older browsers');
    console.log('3. Re-run Lighthouse to verify improvements');
}

optimize();