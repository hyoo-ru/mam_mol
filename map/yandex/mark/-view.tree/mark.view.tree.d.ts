declare namespace $ {

	type $mol_vector_range__VCP2A89Q = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__IZ9N14NU = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_2d__X0PQ48CV = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__PKUH74E2 = $mol_type_enforce<
		[ ReturnType< $mol_map_yandex_mark['box_lat'] >, ReturnType< $mol_map_yandex_mark['box_lon'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	export class $mol_map_yandex_mark extends $mol_object {
		box_lat( ): $mol_vector_range<number>
		box_lon( ): $mol_vector_range<number>
		address( ): string
		pos( ): $mol_vector_2d<number>
		box( ): $mol_vector_2d<$mol_vector_range<number>>
		hint( ): string
		title( ): ReturnType< $mol_map_yandex_mark['address'] >
		content( ): string
		object( ): any
	}
	
}

//# sourceMappingURL=mark.view.tree.d.ts.map