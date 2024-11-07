declare namespace $ {

	type $mol_map_yandex_mark__title__PJP6XDEC = $mol_type_enforce<
		ReturnType< $mol_map_yandex_demo['place_title'] >
		,
		ReturnType< $mol_map_yandex_mark['title'] >
	>
	type $mol_map_yandex_mark__address__B3O3Q1T3 = $mol_type_enforce<
		ReturnType< $mol_map_yandex_demo['place_addres'] >
		,
		ReturnType< $mol_map_yandex_mark['address'] >
	>
	type $mol_map_yandex_mark__content__1V2FMKRL = $mol_type_enforce<
		ReturnType< $mol_map_yandex_demo['place_content'] >
		,
		ReturnType< $mol_map_yandex_mark['content'] >
	>
	type $mol_map_yandex__objects__N49SJBH6 = $mol_type_enforce<
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