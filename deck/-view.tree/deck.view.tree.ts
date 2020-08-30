namespace $ {
	export class $mol_deck extends $mol_list {

		/**
		 * ```tree
		 * items / *
		 * 	title \
		 * 	Content <= Content $mol_view
		 * ```
		 */
		items() {
			return [
				{
					title: "",
					Content: this.Content()
				}
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Content $mol_view
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_view()

			return obj
		}

		/**
		 * ```tree
		 * rows /$mol_view
		 * 	<= Switch $mol_switch
		 * 		value?val <=> current?val \0
		 * 		options <= switch_options *
		 * 	<= Content
		 * ```
		 */
		rows() {
			return [
				this.Switch(),
				this.Content()
			] as readonly $mol_view[]
		}

		/**
		 * ```tree
		 * Switch $mol_switch
		 * 	value?val <=> current?val \0
		 * 	options <= switch_options *
		 * ```
		 */
		@ $mol_mem
		Switch() {
			const obj = new this.$.$mol_switch()

			obj.value = (val?: any) => this.current(val)
			obj.options = () => this.switch_options()

			return obj
		}

		/**
		 * ```tree
		 * current?val \0
		 * ```
		 */
		@ $mol_mem
		current(val?: any) {
			if ( val !== undefined ) return val
			return "0"
		}

		/**
		 * ```tree
		 * switch_options *
		 * ```
		 */
		switch_options() {
			return {

			}
		}
	}

}
