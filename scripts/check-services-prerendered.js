// scripts/check-services-prerendered.js
// Run after `npm run build`

const fs = require("fs");
const path = require("path");

const prerenderManifestPath = path.join(".next", "prerender-manifest.json");

if (!fs.existsSync(prerenderManifestPath)) {
    console.error("❌ prerender-manifest.json not found. Run `npm run build` first.");
    process.exit(1);
}

const prerenderManifest = JSON.parse(fs.readFileSync(prerenderManifestPath, "utf8"));

// All static pages
const routes = Object.keys(prerenderManifest.routes || {});
const dynamicRoutes = prerenderManifest.dynamicRoutes || {};

console.log("\n🔍 Checking pre-rendered service pages...\n");

// Filter for /services/... routes
const serviceRoutes = routes.filter((r) => r.startsWith("/services/"));

if (serviceRoutes.length > 0) {
    console.log(`✅ Found ${serviceRoutes.length} pre-rendered service pages:`);
    serviceRoutes.forEach((route) => console.log(" - " + route));
} else {
    console.log("⚠ No pre-rendered static service pages found in `routes`.");
}

// Check if there’s any dynamic ISR fallback for services
Object.keys(dynamicRoutes).forEach((pattern) =>
{
    if (pattern.includes("/services/")) {
        console.log("\n⚠ Found dynamic service route in ISR mode:", pattern);
        console.log("This means it’s not fully pre-rendered — it’s generated on first request.");
    }
});

console.log();
