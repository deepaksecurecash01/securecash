// app/(homepage)/components/MidBanner/CounterSection.js
// Server Component - Reads fallback and passes to client

import { readFallbackStats } from '@/utils/statsFallback';
import CounterSectionClient from './CounterSectionClient.js';

export default async function CounterSection()
{
  // Read fallback stats from JSON (server-side, SSR)
  const initialStats = await readFallbackStats();

  // Pass to client component for rendering and animation
  return <CounterSectionClient initialStats={initialStats} />;
}