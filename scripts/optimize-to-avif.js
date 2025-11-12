// scripts/reoptimize-large-files.js
const sharp = require('sharp');
const path = require('path');

// Re-optimize with aggressive settings
const FILES_TO_REOPTIMIZE = [
    {
        input: './public/images/banner/Slide-1-web.jpg',
        output: './public/images/banner/Slide-1-web.avif',
        width: 1920,
        quality: 50  // Very aggressive compression
    },
    {
        input: './public/images/banner/Slide-3-web.jpg',
        output: './public/images/banner/Slide-3-web.avif',
        width: 1920,
        quality: 55  // Very aggressive compression
    }
];

async function reoptimize()
{
    console.log('🔄 Re-optimizing with aggressive compression...\n');

    for (const file of FILES_TO_REOPTIMIZE) {
        console.log(`Processing: ${path.basename(file.output)}`);

        await sharp(file.input)
            .resize(file.width, null, { fit: 'cover' })
            .avif({
                quality: file.quality,
                effort: 9,  // Maximum compression effort
                chromaSubsampling: '4:2:0'
            })
            .toFile(file.output);

        const fs = require('fs');
        const newSize = (fs.statSync(file.output).size / 1024).toFixed(2);
        const originalSize = (fs.statSync(file.input).size / 1024).toFixed(2);
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

        console.log(`  Original: ${originalSize} KB`);
        console.log(`  New size: ${newSize} KB (quality: ${file.quality})`);
        console.log(`  Savings: ${savings}%\n`);
    }

    console.log('✅ Re-optimization complete!');
    console.log('⚠️  IMPORTANT: Check visual quality at localhost:3000');
    console.log('💡 If quality is too low, you have 2 options:');
    console.log('   1. Accept current size (~100KB) - still good for PageSpeed 90+');
    console.log('   2. Manually edit source JPGs in Photoshop to reduce complexity');
}

reoptimize().catch(console.error);