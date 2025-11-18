// lib/criticalCss.js
export const criticalCss = `
  /* 1. Essential Reset/Base */
  *,:after,:before{box-sizing:border-box;--tw-translate-x:0;--tw-translate-y:0;--tw-scale-x:1;--tw-scale-y:1;}

  /* 2. Layout for Above-the-Fold (Header, Hero) */
  .container { width: 100%; max-width: 1536px; }
  .flex { display: flex; }
  .grid { display: grid; }
  .block { display: block; }
  .hidden { display: none; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
  
  /* 3. Typography for Hero Section */
  .text-\\[40px\\] { font-size: 40px; }
  .font-bold { font-weight: 700; }
  .text-center { text-align: center; }
  .text-white { color: rgb(255 255 255); }
  
  /* 4. Critical LCP Image Styles */
  .absolute { position: absolute; }
  .inset-0 { inset: 0; }
  .w-full { width: 100%; }
  .h-full { height: 100%; }
  .object-cover { object-fit: cover; }
  
  /* 5. Primary Colors (must be loaded instantly) */
  .bg-primary { background-color: #c7a652; }
  .text-primary { color: #c7a652; }
`;