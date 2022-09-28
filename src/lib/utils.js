import { CID } from 'multiformats/cid';
import * as json from 'multiformats/codecs/json';
import { sha256 } from 'multiformats/hashes/sha2';
import { base64url as base64 } from 'multiformats/bases/base64';

import { sphereStore, ipfsStore } from '../stores';

export const generateCidFromObject = async (data) => {
  const bytes = json.encode(data);
  const hash = await sha256.digest(bytes);
  const cid = CID.create(1, json.code, hash);
  return cid.toString(base64.encoder);
};

export const addNote = async (title, content) => {
  console.log('a note is being added');
  const contentCid = await generateCidFromObject(content);

  // Create the memo
  const memo = {
    parentCID: null, // This is a new note - no previous version
    headers: {
      Title: title,
      Created: new Date().getTime()
    },
    contentCID: contentCid
  };
  const memoCID = await generateCidFromObject(memo);

  // Add the memo and content to the sphere
  sphereStore.update(sphere => {
    sphere.links[title.toLowerCase().replaceAll(" ", "-")] = memoCID;
    return sphere;
  });
  sphereStore.update(sphere => {
    sphere.notes[memoCID] = memo;
    return sphere;
  });

  // Add the file content to "IPFS"
  ipfsStore.update(ipfs => {
    ipfs[contentCid] = content;
    return ipfs;
  });
};

export const editNote = async (noteName, updatedContent) => {
  const updatedContentCid = await generateCidFromObject(updatedContent);

  let sphere = {};
  const unsubscribeSphere = sphereStore.subscribe((val) => { sphere = val });

  const memoCid = sphere.links[noteName];
  const oldMemo = sphere.notes[memoCid];

  const updatedMemo = {
    parentCID: memoCid,
    headers: oldMemo.headers,
    contentCID: updatedContentCid
  }
  const updatedMemoCid = await generateCidFromObject(updatedMemo);

  sphereStore.update((sphere) => {
    sphere.links[noteName] = updatedMemoCid;
    sphere.notes[updatedMemoCid] = updatedMemo;
    return sphere;
  });

  // Store the updated content in IPFS
  ipfsStore.update(ipfs => {
    ipfs[updatedContentCid] = updatedContent;
    return ipfs;
  });

  unsubscribeSphere();
};

// Generate Seed Data for the sphere so the page doesn't start blank
export const populateSphere = async () => {
  // Set up the first sphere
  sphereStore.update(sphere => ({ ...sphere, title: "Bob's Notebook" }));
  sphereStore.update(sphere => ({ ...sphere, name: "bob" }));

  // Let's add some notes
  let catThoughts = 'I love cats. I love every kind of cat.';
  let animalNotes = 'I have strongly felt /cat-thoughts\n\n Dogs are just okay';
  await addNote('cat-thoughts', catThoughts);
  await addNote('animal-thoughts', animalNotes);
}