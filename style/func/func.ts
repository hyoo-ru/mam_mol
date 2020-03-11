namespace $ {

	export type $mol_style_func_name =
	| 'calc'
	| 'fit-content'
	
	export class $mol_style_func<
		Name extends $mol_style_func_name ,
		Value = unknown,
	> extends $mol_decor< Value > {

		constructor(
			value : Value,
			readonly name : Name,
		) {
			super( value )
		}

		prefix() { return this.name + '(' }
		postfix() { return ')' }

		static calc< Value >( value : Value ) {
			return new $mol_style_func( value , 'calc' )
		}

		static fit_content(
			value :
			| number
			| $mol_style_unit< $mol_style_unit_length >
			| $mol_style_func<'calc'>
		) {
			return new $mol_style_func( value , 'fit-content' )
		}
	
	}

}
