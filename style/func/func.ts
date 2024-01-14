namespace $ {

	export type $mol_style_func_name =
	| 'calc'
	| 'hsla'
	| 'rgba'
	| 'var'
	| 'clamp'
	| 'scale'
	| 'cubic-bezier'
	| 'linear'
	| 'steps'
	| $mol_style_func_image
	| $mol_style_func_filter
	
	export type $mol_style_func_image =
	| 'url'
	| 'linear-gradient'
	| 'radial-gradient'
	| 'conic-gradient'
	
	export type $mol_style_func_filter =
	| 'blur'
	| 'brightness'
	| 'contrast'
	| 'drop-shadow'
	| 'grayscale'
	| 'hue-rotate'
	| 'invert'
	| 'opacity'
	| 'sepia'
	| 'saturate'

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

		static linear_gradient< Value >( value : Value ) {
			return new $mol_style_func( 'linear-gradient' , value )
		}

		static calc< Value >( value : Value ) {
			return new $mol_style_func( 'calc' , value )
		}

		static vary< Name extends string, Value extends string >( name : Name, defaultValue? : Value ) {
			return new $mol_style_func( 'var' , defaultValue ? [name, defaultValue] : name )
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
			min: $mol_style_unit_str< any >,
			mid: $mol_style_unit_str< any >,
			max: $mol_style_unit_str< any >,
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
			...breakpoints : Array<number | [number, number | $mol_style_unit_str<'%'>]>
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
		
		static steps(value: number, step_position:  'jump-start' | 'jump-end' | 'jump-none' | 'jump-both' | 'start' | 'end'){
			return new $mol_style_func( 'steps', [ value, step_position ] )
		}
		
		static blur(value?: $mol_style_unit_str<$mol_style_unit_length>){
			return new $mol_style_func( 'blur', value ?? "" );
		}
		
		static brightness(value?: number | $mol_style_unit_str<'%'>){
			return new $mol_style_func( 'brightness', value ?? "" );
		}
		
		static contrast(value?: number | $mol_style_unit_str<'%'>){
			return new $mol_style_func( 'contrast', value ?? "" );
		}
		
		static drop_shadow(
			color: $mol_style_properties_color,
			x_offset: $mol_style_unit_str<$mol_style_unit_length>,
			y_offset: $mol_style_unit_str<$mol_style_unit_length>,
			blur_radius?: $mol_style_unit_str<$mol_style_unit_length>
		) {
			return new $mol_style_func(
				"drop-shadow",
				blur_radius
					? [color, x_offset, y_offset, blur_radius]
					: [color, x_offset, y_offset]
			);
		}
		
		static grayscale(value?: number | $mol_style_unit_str<'%'>){
			return new $mol_style_func( 'grayscale', value ?? "" );
		}
		
		static hue_rotate(value?: 0 | $mol_style_unit_str<$mol_style_unit_angle>){
			return new $mol_style_func( 'hue-rotate', value ?? "")
		}
		
		static invert(value?: number | $mol_style_unit_str<'%'>){
			return new $mol_style_func( 'invert', value ?? "" );
		}
		
		static opacity(value?: number | $mol_style_unit_str<'%'>){
			return new $mol_style_func( 'opacity', value ?? "" );
		}
		
		static sepia(value?: number | $mol_style_unit_str<'%'>){
			return new $mol_style_func( 'sepia', value ?? "" );
		}
		
		static saturate(value?: number | $mol_style_unit_str<'%'>){
			return new $mol_style_func( 'saturate', value ?? "" );
		}
	
	}

}
