namespace $ {

	export type $mol_style_func_name =
	| 'calc'
	| 'hsla'
	| 'rgba'
	| 'var'
	| 'clamp'
	| 'url'
	| 'scale'
	| 'cubic-bezier'
	| 'linear'

	const { per } = $mol_style_unit
	
	/**
	 * CSS Functions
	 * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
	 */
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
	
		static clamp(
			min: $mol_style_unit< any >,
			mid: $mol_style_unit< any >,
			max: $mol_style_unit< any >,
		) {
			return new $mol_style_func(
				'clamp',
				[ min, mid, max ],
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
	
		static scale(
			zoom: number,
		) {
			return new $mol_style_func( 'scale', [ zoom ] )
		}
		
		static linear(
			...breakpoints : Array<number | [number, number | $mol_style_unit<'%'>]>
		){
			return new $mol_style_func(
				"linear",
				breakpoints.map((e) =>
					Array.isArray(e)
						? String(e[0]) +
						  " " +
						  (typeof e[1] === "number" ? e[1] + "%" : e[1].toString())
						: String(e)
				)
			);
		}
		
		static cubic_bezier(
			x1: number,
			y1: number,
			x2: number,
			y2: number
		){
			return new $mol_style_func( 'cubic-bezier', [ x1, y1, x2, y2 ]);
		}
	
	}

}
