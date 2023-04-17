namespace $ {
	export class $mol_dimmer_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Text with highlighted found substring
		 * ```
		 */
		title() {
			return "Text with highlighted found substring"
		}
		
		/**
		 * ```tree
		 * sub / <= Cases
		 * ```
		 */
		sub() {
			return [
				this.Cases()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\search
		 * 	\highlight
		 * ```
		 */
		tags() {
			return [
				"search",
				"highlight"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Widget/Text
		 * 	\Type/String
		 * ```
		 */
		aspects() {
			return [
				"Widget/Text",
				"Type/String"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * One $mol_dimmer
		 * 	haystack \Don't put all your eggs in one basket
		 * 	needle \eggs
		 * ```
		 */
		@ $mol_mem
		One() {
			const obj = new this.$.$mol_dimmer()
			
			obj.haystack = () => "Don't put all your eggs in one basket"
			obj.needle = () => "eggs"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Two $mol_dimmer
		 * 	haystack \Don't look a gift horse in the mouth.
		 * 	needle \oo
		 * ```
		 */
		@ $mol_mem
		Two() {
			const obj = new this.$.$mol_dimmer()
			
			obj.haystack = () => "Don't look a gift horse in the mouth."
			obj.needle = () => "oo"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Three $mol_dimmer
		 * 	haystack \There is no word you are looking for
		 * 	needle \luck
		 * ```
		 */
		@ $mol_mem
		Three() {
			const obj = new this.$.$mol_dimmer()
			
			obj.haystack = () => "There is no word you are looking for"
			obj.needle = () => "luck"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Four $mol_dimmer
		 * 	haystack \ooAAooAAoo
		 * 	needle \oo
		 * ```
		 */
		@ $mol_mem
		Four() {
			const obj = new this.$.$mol_dimmer()
			
			obj.haystack = () => "ooAAooAAoo"
			obj.needle = () => "oo"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Five $mol_dimmer
		 * 	haystack \Let's search this string
		 * 	needle \Let's search this string
		 * ```
		 */
		@ $mol_mem
		Five() {
			const obj = new this.$.$mol_dimmer()
			
			obj.haystack = () => "Let's search this string"
			obj.needle = () => "Let's search this string"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Six $mol_dimmer
		 * 	haystack \Let's search nothing
		 * 	needle \
		 * ```
		 */
		@ $mol_mem
		Six() {
			const obj = new this.$.$mol_dimmer()
			
			obj.haystack = () => "Let's search nothing"
			obj.needle = () => ""
			
			return obj
		}
		
		/**
		 * ```tree
		 * Cases $mol_list rows /
		 * 	<= One
		 * 	<= Two
		 * 	<= Three
		 * 	<= Four
		 * 	<= Five
		 * 	<= Six
		 * ```
		 */
		@ $mol_mem
		Cases() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.One(),
				this.Two(),
				this.Three(),
				this.Four(),
				this.Five(),
				this.Six()
			] as readonly any[]
			
			return obj
		}
	}
	
}

