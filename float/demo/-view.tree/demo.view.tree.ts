namespace $ {
	export class $mol_float_demo extends $mol_demo_large {

		/**
		 * ```tree
		 * title @ \Floating header example
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_float_demo_title' )
		}

		/**
		 * ```tree
		 * sub / <= Scroll $mol_scroll sub /
		 * 	<= Head $mol_float sub / <= Head_row $mol_row sub / <= Head_content $mol_view sub / \Float header
		 * 	<= Content $mol_row sub /
		 * 		<= Filler1 $mol_filler
		 * 		<= Filler2 $mol_filler
		 * ```
		 */
		sub() {
			return [
				this.Scroll()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Scroll $mol_scroll sub /
		 * 	<= Head $mol_float sub / <= Head_row $mol_row sub / <= Head_content $mol_view sub / \Float header
		 * 	<= Content $mol_row sub /
		 * 		<= Filler1 $mol_filler
		 * 		<= Filler2 $mol_filler
		 * ```
		 */
		@ $mol_mem
		Scroll() {
			const obj = new this.$.$mol_scroll()

			obj.sub = () => [
				this.Head(),
				this.Content()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Head $mol_float sub / <= Head_row $mol_row sub / <= Head_content $mol_view sub / \Float header
		 * ```
		 */
		@ $mol_mem
		Head() {
			const obj = new this.$.$mol_float()

			obj.sub = () => [
				this.Head_row()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Head_row $mol_row sub / <= Head_content $mol_view sub / \Float header
		 * ```
		 */
		@ $mol_mem
		Head_row() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.Head_content()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Head_content $mol_view sub / \Float header
		 * ```
		 */
		@ $mol_mem
		Head_content() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				"Float header"
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Content $mol_row sub /
		 * 	<= Filler1 $mol_filler
		 * 	<= Filler2 $mol_filler
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.Filler1(),
				this.Filler2()
			] as readonly any[]

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
	}

}
