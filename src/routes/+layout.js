export const csr = true
export const ssr = false
export const prerender = true

import { populateSphere } from '../lib/utils';

/** @type {import('./$types').LayoutLoad} */
export async function load() {
  await populateSphere();
}