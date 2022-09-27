<script>
	import { addNote } from '../lib/utils';
	import { sphereStore as sphere } from '../stores';

	// View-related stuff
	let createNew = false;

	// in-page variables
	let newSphereTitle = '';
	let newSphereName = '';

	const addNewSphere = async (title, content) => {
		await addSphere(newSphereTitle, newSphereContent);

		newSphereTitle = '';
		newSphereName = '';
	};
</script>

<div class="bg-slate-200">
	<h2 class="border-b-2 p-1 px-2 border-white font-mono font-normal text-sm italic">Spheres</h2>
	<ul>
		<li class="p-1 px-2 font-mono">
			<a href="/notebooks/bob">Bob's Notebook</a>
		</li>
		<!-- {#each Object.entries($sphere.links) as [linkCID, noteCID]}
			<li class="p-1 px-2 font-mono">
				<a href="/notebooks/bob/notes/{linkCID}">/{linkCID}</a>
			</li>
		{/each} -->
		{#if createNew}
			<li class="p-1 px-2 border-t-2 border-white font-mono">
				<p class="mb-2">New Sphere</p>
				<input
					placeholder="New sphere title..."
					type="text"
					class="px-2 w-3/4 mb-2"
					bind:value={newSphereTitle}
				/>
				<div>
					<input
						placeholder="New sphere name..."
						type="text"
						class="px-2 w-3/4 mb-2"
						bind:value={newSphereName}
					/>
				</div>
				<input
					on:click={addNewSphere}
					type="submit"
					class="mt-2 font-mono hover:cursor-pointer border-2 px-2 border-slate-800 hover:bg-slate-300"
					value="Add Sphere"
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
					on:click={() => (createNew = true)}>Create new sphere</button
				>
			</li>
		{/if}
	</ul>
</div>
