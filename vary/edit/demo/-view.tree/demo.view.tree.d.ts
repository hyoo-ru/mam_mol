declare namespace $ {

	type Set__mol_vary_edit_demo_1 = $mol_type_enforce<
		[ readonly(any)[] ]
		,
		ConstructorParameters< typeof Set<any> >
	>
	type Map__mol_vary_edit_demo_2 = $mol_type_enforce<
		[ readonly(any)[] ]
		,
		ConstructorParameters< typeof Map<any,any> >
	>
	type $mol_vary_edit__value_mol_vary_edit_demo_3 = $mol_type_enforce<
		ReturnType< $mol_vary_edit_demo['value'] >
		,
		ReturnType< $mol_vary_edit['value'] >
	>
	type $mol_dump_value__value_mol_vary_edit_demo_4 = $mol_type_enforce<
		ReturnType< $mol_vary_edit_demo['value'] >
		,
		ReturnType< $mol_dump_value['value'] >
	>
	export class $mol_vary_edit_demo extends $mol_example_small {
		date( ): Date
		dom( ): Element
		set( ): Set<any>
		map( ): Map<any,any>
		value( next?: ({ 
			'Simple': ({ 
				'Null': any,
				'True': boolean,
				'False': boolean,
			}) ,
			'Numbers': readonly(any)[],
			'Text': string,
			'Objects': ({ 
				'Date': ReturnType< $mol_vary_edit_demo['date'] >,
				'DOM': ReturnType< $mol_vary_edit_demo['dom'] >,
			}) ,
			'Collections': ({ 
				'Set': ReturnType< $mol_vary_edit_demo['set'] >,
				'Map': ReturnType< $mol_vary_edit_demo['map'] >,
			}) ,
		})  ): ({ 
			'Simple': ({ 
				'Null': any,
				'True': boolean,
				'False': boolean,
			}) ,
			'Numbers': readonly(any)[],
			'Text': string,
			'Objects': ({ 
				'Date': ReturnType< $mol_vary_edit_demo['date'] >,
				'DOM': ReturnType< $mol_vary_edit_demo['dom'] >,
			}) ,
			'Collections': ({ 
				'Set': ReturnType< $mol_vary_edit_demo['set'] >,
				'Map': ReturnType< $mol_vary_edit_demo['map'] >,
			}) ,
		}) 
		Edit( ): $mol_vary_edit
		Dump( ): $mol_dump_value
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map