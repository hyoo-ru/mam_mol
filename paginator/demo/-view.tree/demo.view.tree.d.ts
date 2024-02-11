declare namespace $ {

	type $mol_paginator__value__BI2VN763 = $mol_type_enforce<
		ReturnType< $mol_paginator_demo['page'] >
		,
		ReturnType< $mol_paginator['value'] >
	>
	export class $mol_paginator_demo extends $mol_example_small {
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		page( next?: number ): number
		Pages( ): $mol_paginator
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map