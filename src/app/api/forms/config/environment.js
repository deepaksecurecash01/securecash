 const IS_VERCEL = !!(process.env.VERCEL_ENV || process.env.VERCEL || process.env.VERCEL_URL);
export const USE_SYNC_EMAILS = IS_VERCEL;