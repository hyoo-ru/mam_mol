namespace $ {

	export type $mol_style_func_name =
	| 'calc'
	| 'hsla'
	| 'rgba'
	| 'var'
	| 'url'

	const { per } = $mol_style_unit
	
	export class $mol_style_func<
		Name extends $mol_style_func_name ,
		Value = unknown,
	> extends $mol_decor< Value > {

		constructor(
			readonly name : Name,
			value : Value,
		) {
			super( value )
		}

		prefix() { return this.name + '(' }
		postfix() { return ')' }

		static calc< Value >( value : Value ) {
			return new $mol_style_func( 'calc' , value )
		}

		static vary< Name extends string >( name : Name ) {
			return new $mol_style_func( 'var' , name )
		}

		static url< Href extends string >( href : Href ) {
			return new $mol_style_func( 'url' , JSON.stringify( href ) )
		}

		static hsla(
			hue: number,
			saturation: number,
			lightness: number,
			alpha: number,
		) {
			return new $mol_style_func(
				'hsla',
				[ hue , per( saturation ) , per( lightness ) , alpha ],
			)
		}
	
		static rgba(
			red: number,
			green: number,
			blue: number,
			alpha: number,
		) {
			return new $mol_style_func(
				'rgba',
				[ red , green , blue , alpha ],
			)
		}
	
	}

}
