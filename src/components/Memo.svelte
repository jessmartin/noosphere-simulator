<div class="group relative hover:cursor-pointer" on:click={() => changeNoteVersion(note.parentCID)}>
	<!-- The Memo -->
	<div
		class="
      relative 
      bg-slate-200 
      border 
      border-slate-400 
      rounded-full 
      w-14 h-32 
      mt-4 mr-14
      box-content 
      group-hover:border-purple-800
      group-hover:bg-purple-200
    "
	>
		<div
			class="
        bg-slate-300 
        border-2 
        border-slate-500
        rounded-full 
        w-6 h-6 
        mx-4 my-2
        group-hover:bg-purple-400
        group-hover:border-purple-800
        after:h-3
        after:absolute
        after:top-8
        after:left-[27px]
        after:border-r-2
        after:border-slate-500
        group-hover:after:border-purple-800
      "
		/>
		<div
			class="
        bg-slate-300 
        border-2 
        border-slate-500 
        rounded-full 
        w-10 h-10 
        mx-2 my-3
				group-hover:bg-cyan-300 
				group-hover:border-cyan-800 
      "
		/>
		<div
			class="
        bg-slate-300 
        border-2 
        border-slate-500 
        rounded-full 
        w-6 h-6 
        mx-4 my-2
        group-hover:bg-purple-400
        group-hover:border-purple-800
        after:h-3
        after:absolute
        after:top-[84px]
        after:left-[27px]
        after:border-r-2
        after:border-slate-500
        group-hover:after:border-purple-800
      "
		/>
	</div>
	<!-- The Arrow -->
	<div class="absolute top-1 left-8">
		<div class="absolute text-sm font-sans -top-5 left-10 italic text-purple-800">History</div>
		<div
			class="
        curve 
        w-32 h-24 
        border-dashed 
        border-2 
        border-b-transparent 
        border-r-transparent 
        border-l-transparent 
        border-t-purple-800
        rounded-bl-none 
        rounded-br-none 
        rounded-tl-[120px] 
        rounded-tr-[120px] 
        rotate-6
      "
		/>
		<div
			class="
        arrow
        absolute 
        top-3 right-5 
        w-2 h-2 
        before:border-r-2
        before:h-[14px] 
        before:absolute 
        before:border-purple-800 
        before:-top-2
        before:-left-20
        before:rotate-12
        after:w-3 
        after:absolute 
        after:top-1
        after:-left-20
        after:border-purple-800
        after:border-t-2
      "
		/>
	</div>
</div>
