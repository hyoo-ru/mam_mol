namespace $ {
	export class $mol_labeler_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Labeled content of some types
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_labeler_demo_title' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Provider
		 * 	<= Name
		 * ```
		 */
		sub() {
			return [
				this.Provider(),
				this.Name()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Provider $mol_labeler
		 * 	title \Provider
		 * 	content / \ACME Provider Inc.
		 * ```
		 */
		@ $mol_mem
		Provider() {
			const obj = new this.$.$mol_labeler()

			obj.title = () => "Provider"
			obj.content = () => [
				"ACME Provider Inc."
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * user_name?val \
		 * ```
		 */
		@ $mol_mem
		user_name(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * Name_control $mol_string
		 * 	hint \Jack Sparrow
		 * 	value?val <=> user_name?val
		 * ```
		 */
		@ $mol_mem
		Name_control() {
			const obj = new this.$.$mol_string()

			obj.hint = () => "Jack Sparrow"
			obj.value = (val?: any) => this.user_name(val)

			return obj
		}

		/**
		 * ```tree
		 * Name $mol_labeler
		 * 	title \User name
		 * 	Content <= Name_control
		 * ```
		 */
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_labeler()

			obj.title = () => "User name"
			obj.Content = () => this.Name_control()

			return obj
		}
	}

}
