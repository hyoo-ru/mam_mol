namespace $ {
	export class $mol_number_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Number input control with various configuration
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_number_demo_title' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= zero
		 * 	<= one
		 * 	<= two
		 * 	<= three
		 * 	<= four
		 * 	<= five
		 * 	<= six
		 * 	<= seven
		 * 	<= eight
		 * 	<= nine
		 * ```
		 */
		sub() {
			return [
				this.zero(),
				this.one(),
				this.two(),
				this.three(),
				this.four(),
				this.five(),
				this.six(),
				this.seven(),
				this.eight(),
				this.nine()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * zero $mol_number
		 * ```
		 */
		@ $mol_mem
		zero() {
			const obj = new this.$.$mol_number()

			return obj
		}

		/**
		 * ```tree
		 * year?val NaN
		 * ```
		 */
		@ $mol_mem
		year(val?: any) {
			if ( val !== undefined ) return val
			return NaN
		}

		/**
		 * ```tree
		 * one $mol_number value?val <=> year?val
		 * ```
		 */
		@ $mol_mem
		one() {
			const obj = new this.$.$mol_number()

			obj.value = (val?: any) => this.year(val)

			return obj
		}

		/**
		 * ```tree
		 * two $mol_number
		 * 	value?val <=> year?val
		 * 	hint \2016
		 * ```
		 */
		@ $mol_mem
		two() {
			const obj = new this.$.$mol_number()

			obj.value = (val?: any) => this.year(val)
			obj.hint = () => "2016"

			return obj
		}

		/**
		 * ```tree
		 * age?val 32
		 * ```
		 */
		@ $mol_mem
		age(val?: any) {
			if ( val !== undefined ) return val
			return 32
		}

		/**
		 * ```tree
		 * three $mol_number
		 * 	value?val <=> age?val
		 * 	hint \18-99
		 * 	enabled false
		 * ```
		 */
		@ $mol_mem
		three() {
			const obj = new this.$.$mol_number()

			obj.value = (val?: any) => this.age(val)
			obj.hint = () => "18-99"
			obj.enabled = () => false

			return obj
		}

		/**
		 * ```tree
		 * four $mol_number
		 * 	value?val <=> year?val
		 * 	string_enabled false
		 * ```
		 */
		@ $mol_mem
		four() {
			const obj = new this.$.$mol_number()

			obj.value = (val?: any) => this.year(val)
			obj.string_enabled = () => false

			return obj
		}

		/**
		 * ```tree
		 * five $mol_number
		 * 	value?val <=> age?val
		 * 	dec_enabled false
		 * ```
		 */
		@ $mol_mem
		five() {
			const obj = new this.$.$mol_number()

			obj.value = (val?: any) => this.age(val)
			obj.dec_enabled = () => false

			return obj
		}

		/**
		 * ```tree
		 * six $mol_number
		 * 	value?val <=> year?val
		 * 	inc_enabled false
		 * ```
		 */
		@ $mol_mem
		six() {
			const obj = new this.$.$mol_number()

			obj.value = (val?: any) => this.year(val)
			obj.inc_enabled = () => false

			return obj
		}

		/**
		 * ```tree
		 * seven $mol_number
		 * 	value?val <=> year?val
		 * 	precision_change 10
		 * ```
		 */
		@ $mol_mem
		seven() {
			const obj = new this.$.$mol_number()

			obj.value = (val?: any) => this.year(val)
			obj.precision_change = () => 10

			return obj
		}

		/**
		 * ```tree
		 * eight $mol_number
		 * 	value?val <=> year?val
		 * 	precision_view 0.01
		 * ```
		 */
		@ $mol_mem
		eight() {
			const obj = new this.$.$mol_number()

			obj.value = (val?: any) => this.year(val)
			obj.precision_view = () => 0.01

			return obj
		}

		/**
		 * ```tree
		 * nine $mol_number
		 * 	value?val <=> year?val
		 * 	precision 1000
		 * ```
		 */
		@ $mol_mem
		nine() {
			const obj = new this.$.$mol_number()

			obj.value = (val?: any) => this.year(val)
			obj.precision = () => 1000

			return obj
		}
	}

}
