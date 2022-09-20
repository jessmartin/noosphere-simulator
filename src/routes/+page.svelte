<script>
	let sphere = {
		title: "Bob's notebook",
		links: {
			'cat-thoughts': '1',
			'animal-notes': '3'
		},
		notes: {
			'1': {
				parentCID: null,
				headers: {
					title: 'Cat Thoughts'
				},
				contentCID: '2'
			},
			'3': {
				parentCID: null,
				headers: {
					title: 'Animal Notes'
				},
				contentCID: '4'
			}
		},
		names: []
	};

	// This is essentially a fake IPFS
	let content = {
		'2': 'I love cats. I love every kind of cat.',
		'4': 'I have strongly felt /cat-thoughts\n\n Dogs are just okay'
	};

	let currentNote = '';
	let currentView = 'note';

	const addNote = async () => {
		const newNote = {
			parentCID: null,
			headers: {
				title: 'New Note'
			},
			contentCID: '5'
		};
		const newCID = crypto.randomUUID();
		sphere.links[newCID] = newNote;
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
				<li class="p-1 px-2 font-mono">
					<input id="noteTitle" placeholder="New note title..." type="text" class="px-2 w-3/4" />
					<input on:click={addNote} type="submit" class="hover:cursor-pointer" value="Add Note" />
				</li>
			</ul>
		{:else if sphere.links[currentNote]}
			<h2 class="border-b-2 p-1 px-2 border-white font-mono font-normal text-sm italic">
				{sphere.title} • /{currentNote}
			</h2>
			<p class="p-1 px-2 font-mono">
				{fetchNoteContent(currentNote)}
			</p>
		{:else}
			{console.log(currentNote)}
		{/if}
	{:else if currentView == ''}
		nothing
	{/if}
</div>
