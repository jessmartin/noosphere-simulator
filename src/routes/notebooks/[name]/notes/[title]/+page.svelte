<script>
	/** @type {import('./$types').PageData} */
	import { onDestroy } from 'svelte';
	import { sphereStore as sphere, ipfsStore } from '/src/stores';

	export let data;
	let currentNote = data.title;

	let sphereStore = {};
	const unsubscribeSphere = sphere.subscribe((value) => {
		sphereStore = value;
	});

	let ipfs;
	const unsubscribeIpfs = ipfsStore.subscribe((value) => {
		ipfs = value;
	});

	const fetchNote = (currentNote) => {
		const noteCID = sphereStore.links[currentNote];
		return sphereStore.notes[noteCID];
	};

	const fetchNoteContent = (currentNote) => {
		const noteCID = sphereStore.links[currentNote];
		const contentCID = sphereStore.notes[noteCID].contentCID;
		console.log('fetching note content');
		return ipfs[contentCID];
	};

	onDestroy(() => {
		unsubscribeSphere();
		unsubscribeIpfs();
	});
</script>

<div class="bg-slate-200">
	<h2 class="border-b-2 p-1 px-2 border-white font-mono font-normal text-sm italic">
		{$sphere.title} • /{currentNote} ({$sphere.links[currentNote]})
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
</div>
