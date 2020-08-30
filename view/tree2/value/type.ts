namespace $ {
	const err = $mol_view_tree2_error_str
	
	export function $mol_view_tree2_value_type( this: $mol_ambient_context, val : $mol_tree2 ) {
		switch( val.type ) {
			case 'true' : return 'bool'
			case 'false' : return 'bool'
			case 'null' : return 'null'
			case '*' : return 'dict'
			case '@' : return 'locale'
			case '' : return 'string'
			case '<=' : return 'get'
			case '<=>' : return 'bind'
			case '=>' : return 'put'
		}

		const first_char = val.type && val.type[0]

		if (first_char === '/') return 'list'
		if (first_char === '$') return 'object'
 
		if( Number( val.type ).toString() == val.type ) return 'number'
	
		return this.$mol_fail(
			err`Unknown value type ${val.type} at ${val.span}`
		)
	}	
}
