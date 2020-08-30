namespace $ {
	export class $mol_book2_demo extends $mol_demo_large {

		/**
		 * ```tree
		 * title @ \Adaprive layout for various sizes of screen
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_book2_demo_title' )
		}

		/**
		 * ```tree
		 * sub / <= View $mol_book2 pages /
		 * 	<= First $mol_view sub / \ First
		 * 	<= Second $mol_view sub / \ Second
		 * 	<= Third $mol_view sub / \ Third
		 * ```
		 */
		sub() {
			return [
				this.View()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * View $mol_book2 pages /
		 * 	<= First $mol_view sub / \ First
		 * 	<= Second $mol_view sub / \ Second
		 * 	<= Third $mol_view sub / \ Third
		 * ```
		 */
		@ $mol_mem
		View() {
			const obj = new this.$.$mol_book2()

			obj.pages = () => [
				this.First(),
				this.Second(),
				this.Third()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * First $mol_view sub / \ First
		 * ```
		 */
		@ $mol_mem
		First() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				" First"
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Second $mol_view sub / \ Second
		 * ```
		 */
		@ $mol_mem
		Second() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				" Second"
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Third $mol_view sub / \ Third
		 * ```
		 */
		@ $mol_mem
		Third() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				" Third"
			] as readonly any[]

			return obj
		}
	}

}
