namespace $ {
	export class $mol_scroll_demo extends $mol_demo_large {

		/**
		 * ```tree
		 * title @ \Simple scroll pane
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_scroll_demo_title' )
		}

		/**
		 * ```tree
		 * sub / <= Scroll
		 * ```
		 */
		sub() {
			return [
				this.Scroll()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Filler0 $mol_filler
		 * ```
		 */
		@ $mol_mem
		Filler0() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Filler1 $mol_filler
		 * ```
		 */
		@ $mol_mem
		Filler1() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Filler2 $mol_filler
		 * ```
		 */
		@ $mol_mem
		Filler2() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Filler3 $mol_filler
		 * ```
		 */
		@ $mol_mem
		Filler3() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Filler4 $mol_filler
		 * ```
		 */
		@ $mol_mem
		Filler4() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Filler5 $mol_filler
		 * ```
		 */
		@ $mol_mem
		Filler5() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Filler6 $mol_filler
		 * ```
		 */
		@ $mol_mem
		Filler6() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Filler7 $mol_filler
		 * ```
		 */
		@ $mol_mem
		Filler7() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Filler8 $mol_filler
		 * ```
		 */
		@ $mol_mem
		Filler8() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Filler9 $mol_filler
		 * ```
		 */
		@ $mol_mem
		Filler9() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Content $mol_list rows /
		 * 	<= Filler0
		 * 	<= Filler1
		 * 	<= Filler2
		 * 	<= Filler3
		 * 	<= Filler4
		 * 	<= Filler5
		 * 	<= Filler6
		 * 	<= Filler7
		 * 	<= Filler8
		 * 	<= Filler9
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_list()

			obj.rows = () => [
				this.Filler0(),
				this.Filler1(),
				this.Filler2(),
				this.Filler3(),
				this.Filler4(),
				this.Filler5(),
				this.Filler6(),
				this.Filler7(),
				this.Filler8(),
				this.Filler9()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Scroll $mol_scroll sub / <= Content
		 * ```
		 */
		@ $mol_mem
		Scroll() {
			const obj = new this.$.$mol_scroll()

			obj.sub = () => [
				this.Content()
			] as readonly any[]

			return obj
		}
	}

}
