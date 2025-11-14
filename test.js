# Lighthouse Optimization Action Plan

## 🔴 Critical Issues(Immediate Impact)

### 1. Reduce Unused JavaScript(74KB savings)

    ** Problem:** `npm.next-433e8dccdfd1db4f.js` has 74KB of unused code

        ** Solutions:**

#### A.Code Splitting
    ```javascript
// pages/index.js
import dynamic from 'next/dynamic';

// Lazy load heavy components
const Swiper = dynamic(() => import('../components/Swiper'), {
  loading: () => <div>Loading...</div>,
  ssr: false // Don't load on server if not needed
});

const VideoSection = dynamic(() => import('../components/VideoSection'), {
  loading: () => <div>Loading...</div>
});

export default function Home() {
  return (
    <>
      {/* Critical content first */}
      <Hero />
      {/* Lazy loaded */}
      <Swiper />
      <VideoSection />
    </>
  );
}
```

#### B.Update next.config.js
    ```javascript
// next.config.js
module.exports = {
  // Enable modern JavaScript for modern browsers
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize JavaScript
  swcMinify: true,
  
  // Modern target (removes polyfills)
  experimental: {
    modern: true,
  },
}
```

#### C.Remove Legacy Polyfills
    ** Issue:** These polyfills aren't needed for modern browsers:
        - Array.prototype.at
        - Array.prototype.flat
        - Object.fromEntries
        - String.prototype.trimStart

        ** Fix in package.json:**
            ```json
{
  "browserslist": [
    "defaults",
    "not IE 11",
    "not IE_Mob 11"
  ]
}
```;

---

### 2. Reduce Unused CSS(18KB savings)

    ** Problem:** `fc38f2d8ba23ba2c.css` has 18KB of unused styles

        ** Solutions:**

#### A.Use PurgeCSS with Tailwind
    ```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  // Remove unused classes in production
  purge: {
    enabled: process.env.NODE_ENV === 'production',
  },
}
```

#### B.Critical CSS Extraction
    ```bash
npm install critters
```

    ```javascript
// next.config.js
const withCritters = require('critters');

module.exports = withCritters({
  critters: {
    preload: 'swap',
  },
});
```;

---

### 3. Optimize Images(84KB savings)

    ** Problem:** Multiple team images loading offscreen

#### A.Implement Lazy Loading
    ```jsx
// components/TeamSection.js
import Image from 'next/image';

export default function TeamSection() {
  const team = [
    { name: 'Beth', image: '/images/team/beth.png' },
    { name: 'Darren', image: '/images/team/darren.png' },
    { name: 'Jo', image: '/images/team/jo.png' },
    { name: 'Dylan', image: '/images/team/dylan.png' },
  ];

  return (
    <div className="team-grid">
      {team.map((member, index) => (
        <div key={member.name}>
          <Image
            src={member.image}
            alt={member.name}
            width={1080}
            height={1080}
            loading={index < 2 ? 'eager' : 'lazy'} // First 2 eager, rest lazy
            quality={80}
          />
        </div>
      ))}
    </div>
  );
}
```

#### B.Convert home - statistics.jpg to WebP
    ```bash
# Install sharp
npm install sharp

# Create conversion script
node scripts/convert-images.js
```

    ```javascript
// scripts/convert-images.js
const sharp = require('sharp');
const fs = require('fs');

async function convertImage() {
  await sharp('public/images/banner/home-statistics.jpg')
    .webp({ quality: 80 })
    .toFile('public/images/banner/home-statistics.webp');
  
  console.log('✅ Converted home-statistics.jpg to WebP (68KB saved)');
}

convertImage();
```

#### C.Use Responsive Images
    ```jsx
// Use srcSet for different screen sizes
<Image
  src="/images/banner/home-statistics.webp"
  alt="Statistics"
  width={1920}
  height={1080}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={80}
  priority={false} // Not above fold
/>
```;

---

### 4. Optimize DOM Size(1,030 elements)

    ** Problem:** Large DOM = slower style calculations & layout

        ** Current:** 1,030 elements, 17 depth, 36 max children

#### A.Reduce Logo Scroll Track
    ```jsx
// Before: Many individual elements
<div className="logo-scroll-track">
  {logos.map(logo => <div><img /></div>)}
</div>

// After: Use CSS for infinite scroll
<div className="logo-scroll-track">
  <div className="logo-scroll-content">
    {logos.slice(0, 10).map(logo => <img key={logo} />)}
  </div>
</div>
```

    ```css
/* styles/logo-scroll.css */
.logo-scroll-content {
  display: flex;
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

#### B.Virtualize Long Lists
    ```bash
npm install react-window
```

    ```jsx
import { FixedSizeList } from 'react-window';

// For long lists of items
<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={100}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      {items[index]}
    </div>
  )}
</FixedSizeList>
```;

---

## 🟡 High Priority Issues

### 5. Fix Forced Reflows(59ms total)

    ** Problem:** JavaScript is querying layout properties after DOM changes

#### Find Forced Reflows
    ```javascript
// Bad: Causes forced reflow
element.style.width = '100px';
const height = element.offsetHeight; // ⚠️ Forced reflow!

// Good: Batch reads and writes
const height = element.offsetHeight; // Read first
element.style.width = '100px'; // Write after
```

#### Fix Swiper Reflows
    ```javascript
// components/Swiper.js
useEffect(() => {
  // Read all layout properties first
  const measurements = elements.map(el => ({
    width: el.offsetWidth,
    height: el.offsetHeight
  }));
  
  // Then apply all style changes
  requestAnimationFrame(() => {
    elements.forEach((el, i) => {
      el.style.width = measurements[i].width + 'px';
    });
  });
}, []);
```;

---

### 6. Reduce Main Thread Work(2.7s)

    ** Breakdown:**
        - Other: 1, 139ms
            - Script Evaluation: 874ms
                - Style & Layout: 464ms

#### A.Debounce Scroll Events
    ```javascript
// utils/debounce.js
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Use in scroll handler
const handleScroll = debounce(() => {
  // Your scroll logic
}, 100);

window.addEventListener('scroll', handleScroll);
```

#### B.Use Web Workers for Heavy Tasks
    ```javascript
// workers/process-data.js
self.addEventListener('message', (e) => {
  const result = heavyCalculation(e.data);
  self.postMessage(result);
});

// In your component
const worker = new Worker('/workers/process-data.js');
worker.postMessage(data);
worker.onmessage = (e) => {
  setResult(e.data);
};
```

---

### 7. Optimize Third - Party Scripts(Vimeo)

    ** Problem:** Vimeo loading 17KB on page load

#### A.Lazy Load Vimeo
    ```jsx
// components/VideoPlayer.js
import { useState } from 'react';

export default function VideoPlayer({ videoId }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="video-container">
      {!loaded ? (
        <div 
          className="video-placeholder"
          onClick={() => setLoaded(true)}
          style={{
            backgroundImage: `url(https://vumbnail.com/${videoId}.jpg)`,
        cursor: 'pointer'
          }}
        >
        <button className="play-button">▶ Play Video</button>
        </div >
      ) : (
    <iframe
        src={`https://player.vimeo.com/video/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
    />
)}
    </div >
  );
}
```

---

## 🟢 Accessibility Fixes (91/100)

### 8. Fix Color Contrast Issues

**Problem:** Multiple elements with insufficient contrast

#### Fix 1: Button Contrast
```css
    /* Before: Insufficient contrast */
    .bg - primary { background: #c6a54b; }

/* After: Better contrast */
.bg - primary {
    background: #b08d2f; /* Darker gold */
    color: #ffffff;
}

.bg - primary:hover {
    background: #957433; /* Even darker on hover */
}
```

#### Fix 2: Link Colors
```css
    /* Fix gray links */
    .text -\[\#929292\] {
    color: #666666; /* Darker gray for better contrast */
}

.text -\[\#808080\] {
    color: #5a5a5a; /* Darker gray */
}
```

#### Fix 3: Check All Contrasts
```bash
# Install contrast checker
npm install--save - dev @axe-core / cli

# Run accessibility audit
npx axe http://localhost:3000 --tags wcag2aa
```

---

### 9. Fix Link Distinguishability

**Problem:** Links rely only on color to be distinguished

```css;
/* Add underlines to links */
a {
    text - decoration: underline;
    text - underline - offset: 2px;
}

/* Or add other visual indicators */
a::after {
    content: '→';
    margin - left: 4px;
    transition: transform 0.2s;
}

a: hover::after {
    transform: translateX(3px);
}
```

---

### 10. Fix Heading Order

**Problem:** Headings skip levels (h1 → h3 → h5)

```jsx
    // Before: Wrong hierarchy
    < h1 > Main Title</ >
        <h3>Section</h3> {/* ❌ Skips h2 */ }
<h5>Subsection</h5> {/* ❌ Skips h4 */ }

// After: Correct hierarchy
<h1>Main Title</h1>
<h2>Section</h2> {/* ✅ Logical order */ }
<h3>Subsection</h3> {/* ✅ Logical order */ }
```

---

### 11. Fix List Structure

**Problem:** `< ul > ` contains non-` < li > ` elements

```jsx
    // Before: Invalid structure
    < ul className = "list-none" >
        <div className="item-box"> {/* ❌ div inside ul */}
            <div className="item-container">...</div>
        </div>
</ >

// After: Valid structure
<div className="item-container">
  <ul className="list-none">
    <li className="item-box">...</li>
    <li className="item-box">...</li>
  </ul>
</div>

// Or if not a list:
<div className="item-container">
  <div className="item-box">...</div>
  <div className="item-box">...</div>
</div>;
```

---

## 🔧 Performance Configuration

### 12. Comprehensive next.config.js

```javascript;
// next.config.js
module.exports = {
    // Strict mode for better performance
    reactStrictMode: true,

    // SWC minification (faster)
    swcMinify: true,

    // Image optimization
    images: {
        domains: ['localhost'],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 768, 1024, 1280, 1536],
        imageSizes: [16, 32, 48, 64, 96],
    },

    // Compression
    compress: true,

    // Remove legacy polyfills
    experimental: {
        modern: true,
    },

    // Headers for security & performance
    async headers()
    {
        return [
            {
                source: '/:all*(svg|jpg|png|webp|avif)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};
```

---

## 📊 Testing Checklist

After implementing fixes, verify with:

```bash
# 1. Run Lighthouse 5 times;
for i in { 1..5 }; do
  lighthouse http://localhost:3000 \
--only - categories=performance, accessibility \
--output=json \
--output - path=./lighthouse-$i.json;
done

# 2. Check bundle size
npm run build
npm run analyze # If you have @next/bundle-analyzer

# 3. Test accessibility
npx axe http://localhost:3000

# 4. Monitor real performance
# Add to _app.js:
export function reportWebVitals(metric)
{
    console.log(metric);
}
```

---

## 🎯 Expected Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Performance | 76-92 | 95-100 | +8-15 points |
| LCP | 3.1-5.7s | <2.5s | ✅ Good |
| TBT | 160-180ms | <100ms | ✅ Good |
| Accessibility | 91 | 100 | +9 points |
| Bundle Size | 140KB | ~100KB | -40KB |

---

## 🚀 Implementation Order

1. **Week 1:** Images & CSS (Quick wins)
   - Convert images to WebP
   - Enable lazy loading
   - Purge unused CSS

2. **Week 2:** JavaScript Optimization
   - Code splitting
   - Remove polyfills
   - Lazy load Vimeo

3. **Week 3:** Accessibility
   - Fix contrast
   - Fix heading order
   - Fix list structure

4. **Week 4:** Fine-tuning
   - Fix forced reflows
   - Optimize DOM
   - Performance monitoring

---

## 📝 Need Help?

If you get stuck on any step, let me know which section and I'll provide more detailed code examples!

🎉 AMAZING RESULTS!
📊 Performance Improvements Summary:
MetricBeforeAfterImprovementMobile Performance8498⬆️ +14 pointsDesktop Performance8499⬆️ +15 pointsMobile LCP4.3s1.7s⬆️ 60 % fasterDesktop LCP4.3s1.0s⬆️ 77 % fasterDesktop TBT160ms20ms⬆️ 87 % faster
🎯 Image Optimization Success:

home - statistics - mobile.avif: 35.3KB(was ~143KB) - 75 % smaller!;
home - statistics.avif: 101KB(desktop) - Still shows potential for more compression


📋 Remaining Optimizations(To reach 100 / 100):
1. Reduce Unused CSS(16 - 18KB) - Easy win!;
2. Fix Accessibility Issues(88→100) - Quick fixes!;
3. DOM Optimization(1,030 elements) - Medium effort

🎨 Step 5: CSS Optimization(Next Priority)
Your Tailwind is still loading 16 - 18KB of unused CSS.Let's fix that:
Do you want to:

Continue with CSS optimization(will get you closer to 100)
Fix accessibility issues first(easier, will boost A11y score to 95 +)
Stop here(98 - 99 is already excellent!)

Your current scores are fantastic - you're in the top tier! But if you want to push for that perfect 100, I can help with the remaining optimizations.
What would you like to do next ? 🚀

