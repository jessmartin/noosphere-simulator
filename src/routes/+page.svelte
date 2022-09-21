<script>
	import { CID } from 'multiformats/cid';
	import * as json from 'multiformats/codecs/json';
	import { sha256 } from 'multiformats/hashes/sha2';
	import { base64 } from 'multiformats/bases/base64';

	import { onMount } from 'svelte';

	let sphere = {
		title: "Bob's notebook",
		links: {},
		notes: {},
		names: []
	};

	// This is essentially a fake IPFS
	let content = {};

	const generateCidFromObject = async (data) => {
		const bytes = json.encode(data);
		const hash = await sha256.digest(bytes);
		const cid = CID.create(1, json.code, hash);
		return cid.toString(base64.encoder);
	};

	onMount(async () => {
		let catThoughts = 'I love cats. I love every kind of cat.';
		let catThoughtsCID = await generateCidFromObject(catThoughts);
		let animalNotes = 'I have strongly felt /cat-thoughts\n\n Dogs are just okay';
		let animalNotesCID = await generateCidFromObject(animalNotes);
		content[catThoughtsCID] = catThoughts;
		content[animalNotesCID] = animalNotes;

		// Generate Seed Data
		let catThoughtsMemo = {
			parentCID: null,
			headers: {
				title: 'Cat Thoughts'
			},
			contentCID: catThoughtsCID // This is text - need a new CID from Text
		};
		const catThoughtMemoCID = await generateCidFromObject(catThoughtsMemo);
		sphere.links['cat-thoughts'] = catThoughtMemoCID;
		sphere.notes[catThoughtMemoCID] = catThoughtsMemo;

		let animalNotesMemo = {
			parentCID: null,
			headers: {
				title: 'Animal Notes'
			},
			contentCID: animalNotesCID // This is text - need a new CID from Text
		};
		const animalNotesMemoCID = await generateCidFromObject(animalNotesMemo);
		sphere.links['animal-notes'] = animalNotesMemoCID;
		sphere.notes[animalNotesMemoCID] = animalNotesMemo;
	});

	// View-related stuff
	let currentNote = '';
	let currentView = 'note';
	let createNew = false;

	// in-page variables
	let newNoteTitle = '';
	let newNoteContent = '';

	const addNote = async () => {
		const newNoteContentCid = await generateCidFromObject(newNoteContent);

		// Create the memo
		const memo = {
			parentCID: null, // This is a new note - no previous version
			headers: {
				Title: newNoteTitle,
				Created: new Date().getTime()
			},
			contentCID: newNoteContentCid
		};
		const memoCID = await generateCidFromObject(memo);

		// Add the memo and content to the sphere
		sphere.links[newNoteTitle] = memoCID;
		sphere.notes[memoCID] = memo;

		// Add the file content to "IPFS"
		content[newNoteContentCid] = newNoteContent;

		newNoteTitle = '';
		newNoteContent = '';
	};

	const fetchNote = (currentNote) => {
		const noteCID = sphere.links[currentNote];
		return sphere.notes[noteCID];
	};

	const fetchNoteContent = (currentNote) => {
		const noteCID = sphere.links[currentNote];
		const contentCID = sphere.notes[noteCID].contentCID;
		return content[contentCID];
	};
</script>

<h1 class="text-4xl my-5"><a href on:click={() => (currentNote = '')}>Noosphere Simulator</a></h1>

<div class="bg-slate-200">
	{#if currentView === 'note'}
		{#if currentNote === null || currentNote === ''}
			<h2 class="border-b-2 p-1 px-2 border-white font-mono font-normal text-sm italic">
				{sphere.title} • Notes
			</h2>
			<ul>
				{#each Object.entries(sphere.links) as [linkCID, noteCID]}
					<li class="p-1 px-2 font-mono">
						<a href on:click={() => (currentNote = linkCID)}>/{linkCID}</a>
					</li>
				{/each}
				{#if createNew}
					<li class="p-1 px-2 border-t-2 border-white font-mono">
						<p class="mb-2">New Note</p>
						<input
							placeholder="New note title..."
							type="text"
							class="px-2 w-3/4 mb-2"
							bind:value={newNoteTitle}
						/>
						<div class="w-3/4 flex items-stretch">
							<div class="px-2 w-full break-words invisible" />
							<textarea
								placeholder="New note content"
								class="px-2 w-full resize-none overflow-hidden h-auto ml-[-100%]"
								onInput="this.previousElementSibling.innerText = this.value + String.fromCharCode(10)"
								bind:value={newNoteContent}
							/>
						</div>
						<input
							on:click={addNote}
							type="submit"
							class="mt-2 font-mono hover:cursor-pointer border-2 px-2 border-slate-800 hover:bg-slate-300"
							value="Add Note"
						/>
						<!-- cancel button -->
						<button
							class="hover:cursor-pointer px-2 border-slate-800 hover:bg-slate-300"
							on:click={() => (createNew = false)}>Cancel</button
						>
					</li>
				{:else}
					<li class="p-1 px-2 font-mon">
						<button
							class="hover:cursor-pointer border-2 px-2 border-slate-800 hover:bg-slate-300"
							on:click={() => (createNew = true)}>Create new note</button
						>
					</li>
				{/if}
			</ul>
		{:else if sphere.links[currentNote]}
			<h2 class="border-b-2 p-1 px-2 border-white font-mono font-normal text-sm italic">
				{sphere.title} • /{currentNote} ({sphere.links[currentNote]})
			</h2>
			<p class="p-1 px-2 font-mono border-white border-b-2">
				{fetchNoteContent(currentNote)}
			</p>
			<h3 class="px-2 p-1 font-mono font-semibold underline">Memo</h3>
			<div class="p-1 px-2 font-mono flex items-center">
				<div class="bg-purple-200 border border-purple-600 rounded-full w-16 h-32 box-content ">
					<div class="bg-purple-400 border-2 border-purple-900 rounded-full w-6 h-6 mx-5 my-2" />
					<div class="bg-cyan-300 border-2 border-cyan-800 rounded-full w-10 h-10 m-3" />
					<div class="bg-purple-400 border-2 border-purple-900 rounded-full w-6 h-6 mx-5 my-2" />
				</div>
				<div class="h-32 ">
					<div class="mx-5 my-2">Parent CID: {fetchNote(currentNote).parentCID}</div>
					<div class="mx-5 h-10 m-3 flex items-center">
						Inline Headers: &#123;{Object.entries(fetchNote(currentNote).headers)}&#125;
					</div>
					<div class="mx-5 my-2">Content CID: {fetchNote(currentNote).contentCID}</div>
				</div>
			</div>
		{:else}
			{console.log(currentNote)}
		{/if}
	{:else if currentView == ''}
		nothing
	{/if}
</div>
