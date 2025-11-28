const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// CONFIGURATION: Contact Page Optimization (Per Lighthouse Report)
const images = [
    // ⚠️ CRITICAL: Main background image - 197.5KB savings identified by Lighthouse
    {
        input: 'public/images/mainbg-contact.jpg',
        output: 'public/images/mainbg-contact.avif',
        quality: 50, // Balance between quality and size for hero image
        chromaSubsampling: '4:2:0',
        effort: 9,
    },
    // Contact page header image (if different from mainbg-contact.jpg)
    {
        input: 'public/images/contact-page/Header-Image.png',
        output: 'public/images/contact-page/Header-Image.avif',
        quality: 50,
        chromaSubsampling: '4:2:0',
        effort: 9,
    },
];

async function optimize()
{
    console.log('🚀 Starting Contact Page Optimization...\n');
    console.log('Target savings: ~197KB (per Lighthouse report)\n');

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    for (const img of images) {
        if (!fs.existsSync(img.input)) {
            console.warn(`⚠️  File not found: ${img.input}`);
            continue;
        }

        try {
            const originalStats = fs.statSync(img.input);
            const originalSizeKB = (originalStats.size / 1024).toFixed(2);
            totalOriginalSize += originalStats.size;

            let pipeline = sharp(img.input);

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
            totalOptimizedSize += newStats.size;
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

    const totalSavedKB = ((totalOriginalSize - totalOptimizedSize) / 1024).toFixed(2);
    const totalReduction = (
        ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100
    ).toFixed(1);

    console.log('\n✨ Contact Page Optimization Complete!');
    console.log(`\n📊 Total Savings: ${totalSavedKB} KB (${totalReduction}%)`);
    console.log('📌 Lighthouse Target: 197KB - Check if achieved ✓');
    console.log('\n📌 Next Steps:');
    console.log('1. Update HeroImage.js to use .avif instead of .png');
    console.log('2. Add fallback for older browsers if needed');
    console.log('3. Re-run Lighthouse to verify improvements');
    console.log('4. Expected Performance Score: 100 (from 77 on mobile)');
}

optimize();