declare namespace $ {

	type $mol_chat__seed_mol_chat_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_chat['seed'] >
	>
	export class $mol_chat_demo extends $mol_example_small {
		chat_pages( ): ReturnType< ReturnType< $mol_chat_demo['Chat'] >['pages'] >
		Chat( ): $mol_chat
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map