namespace $ {
	
	export type $mol_style_unit_length =
	| '%'
	| 'px' | 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt'
	| 'cap' | 'ch' | 'em' | 'rem' | 'ex' | 'ic' | 'lh' | 'rlh'
	| 'vh' | 'vw' | 'vi' | 'vb' | 'vmin' | 'vmax'
	
	export class $mol_style_unit<
		Literal extends $mol_style_unit_length
	> extends $mol_decor< number > {

		constructor(
			value : number,
			readonly literal : Literal,
		) {
			super( value )
		}

		postfix() {
			return this.literal
		}

		static per( value : number ) { return new $mol_style_unit( value , '%' ) }
		static px( value : number ) { return new $mol_style_unit( value , 'px' ) }
		static mm( value : number ) { return new $mol_style_unit( value , 'mm' ) }
		static cm( value : number ) { return new $mol_style_unit( value , 'cm' ) }
		static Q( value : number ) { return new $mol_style_unit( value , 'Q' ) }
		static in( value : number ) { return new $mol_style_unit( value , 'in' ) }
		static pc( value : number ) { return new $mol_style_unit( value , 'pc' ) }
		static pt( value : number ) { return new $mol_style_unit( value , 'pt' ) }
		static cap( value : number ) { return new $mol_style_unit( value , 'cap' ) }
		static ch( value : number ) { return new $mol_style_unit( value , 'ch' ) }
		static em( value : number ) { return new $mol_style_unit( value , 'em' ) }
		static rem( value : number ) { return new $mol_style_unit( value , 'rem' ) }
		static ex( value : number ) { return new $mol_style_unit( value , 'ex' ) }
		static ic( value : number ) { return new $mol_style_unit( value , 'ic' ) }
		static lh( value : number ) { return new $mol_style_unit( value , 'lh' ) }
		static rlh( value : number ) { return new $mol_style_unit( value , 'rlh' ) }
		static vh( value : number ) { return new $mol_style_unit( value , 'vh' ) }
		static vw( value : number ) { return new $mol_style_unit( value , 'vw' ) }
		static vi( value : number ) { return new $mol_style_unit( value , 'vi' ) }
		static vb( value : number ) { return new $mol_style_unit( value , 'vb' ) }
		static vmin( value : number ) { return new $mol_style_unit( value , 'vmin' ) }
		static vmax( value : number ) { return new $mol_style_unit( value , 'vmax' ) }
	
	}

}
