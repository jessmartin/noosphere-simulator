export const csr = true
export const ssr = false
export const prerender = true

import { populateSphere } from '../lib/utils';

/** @type {import('./$types').LayoutLoad} */
export function load() {
  console.log('load');
  populateSphere();
}