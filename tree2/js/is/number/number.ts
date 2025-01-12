namespace $ {
	export function $mol_tree2_js_is_number(type: string) {
		return type.match(/[\+\-]*NaN/) || !Number.isNaN( Number( type ) )
	}
}
