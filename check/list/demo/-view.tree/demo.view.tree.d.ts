declare namespace $ {

	type $mol_check_list__option_checked__6C2M33L8 = $mol_type_enforce<
		ReturnType< $mol_check_list_demo['right'] >
		,
		ReturnType< $mol_check_list['option_checked'] >
	>
	type $mol_check_list__options__I9HROJS4 = $mol_type_enforce<
		({ 
			'read': string,
			'write': string,
			'rights': string,
			'backup': string,
			'restart': string,
			'ping': string,
			'api': string,
			'docs': string,
		}) 
		,
		ReturnType< $mol_check_list['options'] >
	>
	export class $mol_check_list_demo extends $mol_example_small {
		right( id: any, next?: boolean ): boolean
		Rights( ): $mol_check_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map