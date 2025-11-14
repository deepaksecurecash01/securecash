const fs = require('fs');
const path = require('path');

const fixes = [
    {
        file: 'src/components/common/forms-new/forms/ContactForm.js',
        find: /<h5 className=" font-montserrat text-center capitalize pb-2 text-\[16px\]">/g,
        replace: '<h4 className="font-montserrat text-center capitalize pb-2 text-[16px]">',
        closingFind: /<\/h5>/g,
        closingReplace: '</h4>'
    },
    {
        file: 'src/components/common/forms-new/forms/QuoteForm.js',
        find: /<h5 className="text-white font-montserrat text-center capitalize pb-2 text-\[16px\]">/g,
        replace: '<h4 className="text-white font-montserrat text-center capitalize pb-2 text-[16px]">',
        closingFind: /<\/h5>/g,
        closingReplace: '</h4>'
    },
    {
        file: 'src/components/common/Footer.js',
        find: /<h4 className="font-prata text-3xl text-white/g,
        replace: '<h2 className="font-prata text-3xl text-white',
        closingFind: /<\/h4>/g,
        closingReplace: '</h2>'
    }
];

function applyFix(fix)
{
    const filePath = path.join(process.cwd(), fix.file);

    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${fix.file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Apply opening tag fix
    content = content.replace(fix.find, fix.replace);

    // Apply closing tag fix
    content = content.replace(fix.closingFind, fix.closingReplace);

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed: ${fix.file}`);
    } else {
        console.log(`ℹ️  No changes needed: ${fix.file}`);
    }
}

console.log('🔧 Applying heading hierarchy fixes...\n');

fixes.forEach(fix =>
{
    try {
        applyFix(fix);
    } catch (error) {
        console.error(`❌ Error fixing ${fix.file}:`, error.message);
    }
});

console.log('\n✅ Automated fixes complete!');
console.log('\n⚠️  MANUAL REVIEW REQUIRED:');
console.log('1. src/components/common/forms-new/forms/SpecialEventForm.js');
console.log('2. src/components/common/forms-new/forms/SiteInfoForm.js');
console.log('\nOpen these files and check the h3/h4 order manually.');