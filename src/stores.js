import { writable } from 'svelte/store'

export const sphereStore = writable({
  name: "",
  title: "",
  links: {},
  notes: {},
  names: []
})

export const ipfsStore = writable({})