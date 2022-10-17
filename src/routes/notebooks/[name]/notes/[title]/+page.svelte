<script>
	/** @type {import('./$types').PageData} */
	import { onMount, onDestroy } from 'svelte';
	import { sphereStore as sphere, ipfsStore } from '/src/stores';
	import { editNote, formatCID } from '/src/lib/utils';
	import Memo from '/src/components/Memo.svelte';

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

	onMount(() => {
		console.log('testing: ' + url.searchParams);
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

<div class="bg-slate-100">
	<h2 class="border-b-2 p-1 px-2 border-white font-mono font-normal text-sm italic">
		<a class="hover:text-purple-700" href="/notebooks/bob">{sphereStore.title}</a> • /{noteTitle} =>
		{formatCID(noteCID)}
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
			<p class="mb-2">Edit Note Content</p>
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
	<div class="p-1 px-2 font-mono flex items-center relative">
		{#if note.parentCID}
			<Memo />
		{/if}
		<div
			class="relative bg-purple-200 border border-purple-600 rounded-full w-14 h-32 box-content mt-4 mr-5"
		>
			<div
				class="
				bg-purple-400 
				border-2 
				border-purple-800 
				rounded-full 
				w-6 h-6 
				mx-4 my-2
				after:h-3
				after:absolute
				after:top-8
				after:left-[27px]
				after:border-r-2
				after:border-purple-800
				"
			/>
			<div
				class="
				bg-cyan-300 
				border-2 
				border-cyan-800 
				rounded-full 
				w-10 h-10 
				mx-2 my-3
				"
			/>
			<div
				class="
				bg-purple-400 
				border-2 
				border-purple-800 
				rounded-full 
				w-6 h-6 
				mx-4 my-2
				after:h-3
				after:absolute
				after:top-[84px]
				after:left-[27px]
				after:border-r-2
				after:border-purple-800
			"
			/>
		</div>
		<div class="h-32 ">
			<div class="mx-5 my-2">
				Parent:
				{#if note.parentCID}
					<a
						class="text-purple-700 hover:underline"
						href=""
						on:click={() => changeNoteVersion(note.parentCID)}>{formatCID(note.parentCID)}</a
					>
				{:else}
					No previous version
				{/if}
			</div>
			<div class="mx-5 h-10 m-3 flex items-center font-sans">
				Inline Headers:
				<span class="pl-2 font-mono">&#123;{Object.entries(note.headers)}&#125;</span>
			</div>
			<div class="mx-5 my-2">Content: {formatCID(contentCID)}</div>
		</div>
	</div>
</div>
