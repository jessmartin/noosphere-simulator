<script>
	import { addNote } from '/src/lib/utils';
	import { sphereStore as sphere } from '/src/stores';

	// View-related stuff
	let currentNote = '';
	let createNew = false;

	// in-page variables
	let newNoteTitle = '';
	let newNoteContent = '';

	const addNewNote = async (title, content) => {
		await addNote(newNoteTitle, newNoteContent);

		newNoteTitle = '';
		newNoteContent = '';
	};
</script>

<div class="bg-slate-200">
	<h2 class="border-b-2 p-1 px-2 border-white font-mono font-normal text-sm italic">
		{$sphere.title} • Notes
	</h2>
	<ul>
		{#each Object.entries($sphere.links) as [linkCID, noteCID]}
			<li class="p-1 px-2 font-mono">
				<a href="/notebooks/bob/notes/{linkCID}">/{linkCID}</a>
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
					on:click={addNewNote}
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
</div>
