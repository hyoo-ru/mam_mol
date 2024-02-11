declare namespace $ {

	type $mol_bench__col_sort__GXN28WM5 = $mol_type_enforce<
		ReturnType< $mol_bench_demo['col_sort'] >
		,
		ReturnType< $mol_bench['col_sort'] >
	>
	type $mol_bench__result__FMO45L27 = $mol_type_enforce<
		ReturnType< $mol_bench_demo['result'] >
		,
		ReturnType< $mol_bench['result'] >
	>
	export class $mol_bench_demo extends $mol_example_small {
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		col_sort( next?: string ): string
		result( ): Record<string, any>
		View( ): $mol_bench
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map