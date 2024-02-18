declare namespace $ {

	type $mol_bench__col_sort__I3P0ZSUM = $mol_type_enforce<
		ReturnType< $mol_bench_demo['col_sort'] >
		,
		ReturnType< $mol_bench['col_sort'] >
	>
	type $mol_bench__result__SMHGV1AG = $mol_type_enforce<
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