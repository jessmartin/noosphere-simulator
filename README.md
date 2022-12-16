# Noosphere Simulator

An in-browser simulator for [Noosphere](https://github.com/subconsciousnetwork/noosphere), a massively-multiplayer knowledge graph protocol by [@gordonbrander](https://twitter.com/gordonbrander) and [@0xcda7a](https://twitter.com/0xcda7a).

This is a "build in order to learn" project. Maybe one day it grows up to be an interactive explainer for how Noosphere works, but right now it's merely to aid my own understanding. Caveat emptor!

## Play with it!

![image](https://user-images.githubusercontent.com/27258/208138030-602c736d-eb57-45aa-ba58-ca51b6981034.png)

Give it a try yourself at [noosphere-sim.netlify.app](https://noosphere-sim.netlify.app/).

## Livestreams

![image](https://user-images.githubusercontent.com/27258/208137786-e64147ef-b19c-49e3-bbc2-e16c7a6a61cc.png)

You can watch livestreams of me building this:

- [Building Noosphere Simulator, Part One](https://www.youtube.com/watch?v=63tLxVWN4Ao)
- [Building Noosphere Simulator, Part Two](https://www.youtube.com/watch?v=YkD5mN0Qh2s)


## Goals

My goal is to learn about the major technologies underpinning Noosphere by building a facsimile of each in a working simulation in the browser.

- [x] Content Addressing - CIDs
- [ ] IPFS
- [ ] IPLD
- [ ] UCANs
- [ ] Pet names and public keys

## Running it

```bash
npm run dev
```

## Building

To create a production build of the app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
