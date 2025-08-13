// scripts/check-rendering.js
// Run: node scripts/check-rendering.js AFTER `next build`

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const buildManifestPath = path.join('.next', 'build-manifest.json');
const prerenderManifestPath = path.join('.next', 'prerender-manifest.json');

function loadJSON(filePath)
{
    if (!fs.existsSync(filePath)) {
        console.error(chalk.red(`Missing file: ${filePath}`));
        process.exit(1);
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function main()
{
    const buildManifest = loadJSON(buildManifestPath);
    const prerenderManifest = loadJSON(prerenderManifestPath);

    const ssgPages = new Map();
    const isrPages = new Map();
    const ssrPages = new Map();

    const prerenderRoutes = prerenderManifest.routes || {};
    const dynamicRoutes = prerenderManifest.dynamicRoutes || {};

    // Identify SSG / ISR
    Object.entries(prerenderRoutes).forEach(([route, data]) =>
    {
        if (data.initialRevalidateSeconds) {
            isrPages.set(route, data.initialRevalidateSeconds);
        } else {
            ssgPages.set(route, true);
        }
    });

    // Dynamic ISR pages
    Object.entries(dynamicRoutes).forEach(([route, data]) =>
    {
        if (data.fallback) {
            isrPages.set(route, data.routeRegex || 'dynamic', data.initialRevalidateSeconds);
        }
    });

    // SSR = Pages in build-manifest but NOT in prerender-manifest
    Object.keys(buildManifest.pages).forEach((route) =>
    {
        if (route.startsWith('/_')) return; // ignore _app, _error, etc.
        if (!ssgPages.has(route) && !isrPages.has(route)) {
            ssrPages.set(route, true);
        }
    });

    // Output
    const printGroup = (title, pages, colorFn, extraFn) =>
    {
        if (pages.size === 0) return;
        console.log(colorFn(`\n=== ${title} (${pages.size}) ===`));
        pages.forEach((val, route) =>
        {
            const extra = extraFn ? extraFn(val) : '';
            console.log(`${colorFn(route)} ${extra}`);
        });
    };

    console.log(chalk.bold(`\nNext.js Rendering Analysis`));
    console.log(chalk.gray(`(SSG = Static, ISR = Incremental Static Regeneration, SSR = Server-Side Rendering)\n`));

    printGroup('SSR Pages (Server Heavy)', ssrPages, chalk.red);
    printGroup('ISR Pages', isrPages, chalk.yellow, (val) => chalk.gray(`(revalidate: ${val}s)`));
    printGroup('SSG Pages', ssgPages, chalk.green);

    console.log(chalk.bold(`\nSummary:`));
    console.log(`SSR: ${chalk.red(ssrPages.size)} | ISR: ${chalk.yellow(isrPages.size)} | SSG: ${chalk.green(ssgPages.size)}\n`);
}

main();
