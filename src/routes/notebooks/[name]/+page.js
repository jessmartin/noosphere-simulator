// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  // Look up the name in the spheres to see if it exists
  return {
    name: params.name,
  };

  // If it doesn't exist, throw an error
  // throw error(404, 'Not found');
}
