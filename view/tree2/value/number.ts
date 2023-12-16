namespace $ {
	export function $mol_view_tree2_value_number(type: string) {
		return type.match(/[\+\-]*NaN/) || !Number.isNaN( Number( type ) )
	}
}
