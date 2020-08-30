namespace $ {
	export class $mol_dimmer_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Text with highlighted found substring
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_dimmer_demo_title' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= one $mol_dimmer
		 * 		haystack \Don't put all your eggs in one basket
		 * 		needle \eggs
		 * 	<= two $mol_dimmer
		 * 		haystack \Don't look a gift horse in the mouth.
		 * 		needle \oo
		 * 	<= three $mol_dimmer
		 * 		haystack \There is no word you are looking for
		 * 		needle \luck
		 * 	<= four $mol_dimmer
		 * 		haystack \ooAAooAAoo
		 * 		needle \oo
		 * 	<= five $mol_dimmer
		 * 		haystack \Let's search this string
		 * 		needle \Let's search this string
		 * 	<= six $mol_dimmer
		 * 		haystack \Let's search nothing
		 * 		needle \
		 * ```
		 */
		sub() {
			return [
				this.one(),
				this.two(),
				this.three(),
				this.four(),
				this.five(),
				this.six()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * one $mol_dimmer
		 * 	haystack \Don't put all your eggs in one basket
		 * 	needle \eggs
		 * ```
		 */
		@ $mol_mem
		one() {
			const obj = new this.$.$mol_dimmer()

			obj.haystack = () => "Don't put all your eggs in one basket"
			obj.needle = () => "eggs"

			return obj
		}

		/**
		 * ```tree
		 * two $mol_dimmer
		 * 	haystack \Don't look a gift horse in the mouth.
		 * 	needle \oo
		 * ```
		 */
		@ $mol_mem
		two() {
			const obj = new this.$.$mol_dimmer()

			obj.haystack = () => "Don't look a gift horse in the mouth."
			obj.needle = () => "oo"

			return obj
		}

		/**
		 * ```tree
		 * three $mol_dimmer
		 * 	haystack \There is no word you are looking for
		 * 	needle \luck
		 * ```
		 */
		@ $mol_mem
		three() {
			const obj = new this.$.$mol_dimmer()

			obj.haystack = () => "There is no word you are looking for"
			obj.needle = () => "luck"

			return obj
		}

		/**
		 * ```tree
		 * four $mol_dimmer
		 * 	haystack \ooAAooAAoo
		 * 	needle \oo
		 * ```
		 */
		@ $mol_mem
		four() {
			const obj = new this.$.$mol_dimmer()

			obj.haystack = () => "ooAAooAAoo"
			obj.needle = () => "oo"

			return obj
		}

		/**
		 * ```tree
		 * five $mol_dimmer
		 * 	haystack \Let's search this string
		 * 	needle \Let's search this string
		 * ```
		 */
		@ $mol_mem
		five() {
			const obj = new this.$.$mol_dimmer()

			obj.haystack = () => "Let's search this string"
			obj.needle = () => "Let's search this string"

			return obj
		}

		/**
		 * ```tree
		 * six $mol_dimmer
		 * 	haystack \Let's search nothing
		 * 	needle \
		 * ```
		 */
		@ $mol_mem
		six() {
			const obj = new this.$.$mol_dimmer()

			obj.haystack = () => "Let's search nothing"
			obj.needle = () => ""

			return obj
		}
	}

}
