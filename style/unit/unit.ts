namespace $ {
	
	export type $mol_style_unit_length =
	| '%'
	| 'px' | 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt'
	| 'cap' | 'ch' | 'em' | 'rem' | 'ex' | 'ic' | 'lh' | 'rlh'
	| 'vh' | 'vw' | 'vi' | 'vb' | 'vmin' | 'vmax'
	
	export type $mol_style_unit_angle = 'deg' | 'rad' | 'grad' | 'turn'
	
	export type $mol_style_unit_time = 's' | 'ms'

	export type $mol_style_unit_any = $mol_style_unit_length | $mol_style_unit_angle | $mol_style_unit_time
	export type $mol_style_unit_str< Quanity extends $mol_style_unit_any > = `${number}${Quanity}`
	
	/**
	 * CSS Units
	 * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
	 */
	export class $mol_style_unit<
		Literal extends $mol_style_unit_any
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

		static per( value : number ) { return `${value}%` as const }
		static px( value : number ) { return `${ value }px` as const }
		static mm( value : number ) { return `${value}mm` as const }
		static cm( value : number ) { return `${value}cm` as const }
		static Q( value : number ) { return `${value}Q` as const }
		static in( value : number ) { return `${value}in` as const }
		static pc( value : number ) { return `${value}pc` as const }
		static pt( value : number ) { return `${value}pt` as const }
		static cap( value : number ) { return `${value}cap` as const }
		static ch( value : number ) { return `${value}ch` as const }
		static em( value : number ) { return `${value}em` as const }
		static rem( value : number ) { return `${value}rem` as const }
		static ex( value : number ) { return `${value}ex` as const }
		static ic( value : number ) { return `${value}ic` as const }
		static lh( value : number ) { return `${value}lh` as const }
		static rlh( value : number ) { return `${value}rlh` as const }
		static vh( value : number ) { return `${value}vh` as const }
		static vw( value : number ) { return `${value}vw` as const }
		static vi( value : number ) { return `${value}vi` as const }
		static vb( value : number ) { return `${value}vb` as const }
		static vmin( value : number ) { return `${value}vmin` as const }
		static vmax( value : number ) { return `${value}vmax` as const }
		
		static deg( value : number ) { return `${value}deg` as const }
		static rad( value : number ) { return `${value}rad` as const }
		static grad( value : number ) { return `${value}grad` as const }
		static turn( value : number ) { return `${value}turn` as const }

		static s( value : number ) { return `${value}s` as const }
		static ms( value : number ) { return `${value}ms` as const }
	
	}

}
