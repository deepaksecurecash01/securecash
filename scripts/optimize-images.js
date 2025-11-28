const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// CONFIGURATION: About Us Page Optimization
const images = [
    // --- BACKGROUND HEADER IMAGES (Critical - Blocking render) ---
    // Current: bg-quote-header-left.png (310KB) -> Goal: <100KB (224.6KB savings possible)
    {
        input: 'public/images/bg-quote-header-left.png',
        output: 'public/images/bg-quote-header-left.avif',
        quality: 45, // Aggressive - it's a background pattern
        effort: 9,
    },
    // Current: bg-quote-header-right.png (228KB) -> Goal: <80KB (165.4KB savings possible)
    {
        input: 'public/images/bg-quote-header-right.png',
        output: 'public/images/bg-quote-header-right.avif',
        quality: 45,
        effort: 9,
    },

    // --- HERO IMAGE (Priority load) ---
    // Current: header-img-about-us.png (100KB) -> Goal: <90KB (12.3KB savings)
    {
        input: 'public/images/header-img-about-us.png',
        output: 'public/images/header-img-about-us.avif',
        quality: 60,
        effort: 9,
    },

    // --- ABOUT US SECTION IMAGES (Target: 100-120KB) ---
    // img-sec-2: No data in report but optimize anyway
    {
        input: 'public/images/about-us-images/img-sec-2.png',
        output: 'public/images/about-us-images/img-sec-2.avif',
        quality: 55,
        effort: 9,
    },
    // img-sec-4: No data in report but optimize anyway
    {
        input: 'public/images/about-us-images/img-sec-4.png',
        output: 'public/images/about-us-images/img-sec-4.avif',
        quality: 55,
        effort: 9,
    },

    // --- TEAM PHOTO (Target: 80-100KB) ---
    // Current: team.avif already exists, but verify compression
    {
        input: 'public/images/team.jpg',
        output: 'public/images/team.avif',
        quality: 50,
        chromaSubsampling: '4:2:0', // Good for photos with people
        effort: 9,
    },

    // --- BANNER IMAGE (Mobile visible) ---
    {
        input: 'public/images/banner/banner-people.jpg',
        output: 'public/images/banner/banner-people.webp',
        quality: 60,
        effort: 9,
    },

    // --- NEXT/IMAGE OPTIMIZED VERSIONS (These are server-optimized but we can pre-optimize source) ---
    // Lighthouse shows these need better compression:
    // /_next/image?url=... (113KB) -> 51.1KB savings possible
    // This suggests the source images need optimization

    // --- TEAM MEMBER PHOTOS (Not in report but good to optimize) ---
    {
        input: 'public/images/team/darren.png',
        output: 'public/images/team/darren.avif',
        quality: 60,
        chromaSubsampling: '4:2:0',
        effort: 9,
    },
    {
        input: 'public/images/team/beth.png',
        output: 'public/images/team/beth.avif',
        quality: 60,
        chromaSubsampling: '4:2:0',
        effort: 9,
    },
    {
        input: 'public/images/team/jo.png',
        output: 'public/images/team/jo.avif',
        quality: 60,
        chromaSubsampling: '4:2:0',
        effort: 9,
    },
    {
        input: 'public/images/team/dylan.png',
        output: 'public/images/team/dylan.avif',
        quality: 60,
        chromaSubsampling: '4:2:0',
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