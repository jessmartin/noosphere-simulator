<script>
	/** @type {import('./$types').PageData} */
	import { onDestroy } from 'svelte';
	import { sphereStore as sphere, ipfsStore } from '/src/stores';
	import { editNote } from '/src/lib/utils';
	import { onMount } from 'svelte';

	export let data;
	let noteTitle = data.title;
	let editingNote = false;

	let sphereStore = {};
	let noteCID = '';
	let note = { parentCID: '', headers: {}, contentCID: '' };
	let contentCID = '';

	const unsubscribeSphere = sphere.subscribe((value) => {
		sphereStore = value;
		noteCID = sphereStore.links[noteTitle];
		note = sphereStore.notes[noteCID];
		contentCID = sphereStore.notes[noteCID].contentCID;
	});

	let ipfs;
	let noteContent = '';
	const unsubscribeIpfs = ipfsStore.subscribe((value) => {
		ipfs = value;
		noteContent = ipfs[contentCID];
	});

	// let editedNoteTitle = data.title;
	let editedNoteContent = noteContent;

	const editNoteContent = async () => {
		await editNote(noteTitle, editedNoteContent);
		editingNote = false;
	};

	let previousVersion = false;
	const changeNoteVersion = (versionCID) => {
		noteCID = versionCID;
		note = sphereStore.notes[noteCID];
		contentCID = sphereStore.notes[noteCID].contentCID;
		noteContent = ipfs[contentCID];
		previousVersion = true;
	};

	onDestroy(() => {
		unsubscribeSphere();
		unsubscribeIpfs();
	});
</script>

<div class="bg-slate-200">
	<h2 class="border-b-2 p-1 px-2 border-white font-mono font-normal text-sm italic">
		<a class="hover:text-purple-700" href="/notebooks/bob">{sphereStore.title}</a> • /{noteTitle} ({noteCID})
	</h2>
	<div class="p-1 px-2  border-b-2 border-white">
		<h3 class="font-mono font-semibold underline">Content</h3>
		<p class="font-mono">
			{noteContent}
		</p>
		{#if !editingNote && !previousVersion}
			<button
				class="hover:cursor-pointer border-2 px-2 mt-2 border-slate-800 hover:bg-slate-300"
				on:click={() => (editingNote = true)}>Edit Note</button
			>
		{/if}
	</div>
	{#if editingNote}
		<div class="p-2 border-b-2 border-white font-mono">
			<p class="mb-2">Edit Note</p>
			<!-- <input
				placeholder="Edited note title..."
				type="text"
				class="px-2 w-3/4 mb-2"
				bind:value={editedNoteTitle}
			/> -->
			<div class="w-3/4 flex items-stretch">
				<div class="px-2 w-full break-words invisible" />
				<textarea
					placeholder="Edited note content"
					class="px-2 w-full resize-none overflow-hidden h-auto ml-[-100%]"
					onInput="this.previousElementSibling.innerText = this.value + String.fromCharCode(10)"
					bind:value={editedNoteContent}
				/>
			</div>
			<input
				on:click={editNoteContent}
				type="submit"
				class="mt-2 font-mono hover:cursor-pointer border-2 px-2 border-slate-800 hover:bg-slate-300"
				value="Edit Note"
			/>
			<!-- cancel button -->
			<button
				class="hover:cursor-pointer px-2 border-slate-800 hover:bg-slate-300"
				on:click={() => (editingNote = false)}>Cancel</button
			>
		</div>
	{/if}
	<h3 class="px-2 p-1 font-mono font-semibold underline">Memo</h3>
	<div class="p-1 px-2 font-mono flex items-center">
		<div class="bg-purple-200 border border-purple-600 rounded-full w-16 h-32 box-content ">
			<div class="bg-purple-400 border-2 border-purple-900 rounded-full w-6 h-6 mx-5 my-2" />
			<div class="bg-cyan-300 border-2 border-cyan-800 rounded-full w-10 h-10 m-3" />
			<div class="bg-purple-400 border-2 border-purple-900 rounded-full w-6 h-6 mx-5 my-2" />
		</div>
		<div class="h-32 ">
			<div class="mx-5 my-2">
				Parent CID:
				{#if note.parentCID}
					<a
						class="hover:text-purple-700"
						href=""
						on:click={() => changeNoteVersion(note.parentCID)}>{note.parentCID}</a
					>
				{:else}
					No Parent CID
				{/if}
			</div>
			<div class="mx-5 h-10 m-3 flex items-center">
				Inline Headers: &#123;{Object.entries(note.headers)}&#125;
			</div>
			<div class="mx-5 my-2">Content CID: {contentCID}</div>
		</div>
	</div>
</div>
