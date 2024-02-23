declare namespace $ {

	type $mol_map_yandex_mark__title__37HQDDC1 = $mol_type_enforce<
		ReturnType< $mol_map_yandex_demo['place_title'] >
		,
		ReturnType< $mol_map_yandex_mark['title'] >
	>
	type $mol_map_yandex_mark__address__14QYNDKL = $mol_type_enforce<
		ReturnType< $mol_map_yandex_demo['place_addres'] >
		,
		ReturnType< $mol_map_yandex_mark['address'] >
	>
	type $mol_map_yandex_mark__content__YZNJUO9G = $mol_type_enforce<
		ReturnType< $mol_map_yandex_demo['place_content'] >
		,
		ReturnType< $mol_map_yandex_mark['content'] >
	>
	type $mol_map_yandex__objects__HD9BV8UP = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_map_yandex['objects'] >
	>
	export class $mol_map_yandex_demo extends $mol_example_large {
		place_title( ): string
		place_addres( ): string
		place_content( ): string
		Place( ): $mol_map_yandex_mark
		Map( ): $mol_map_yandex
		title( ): string
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map