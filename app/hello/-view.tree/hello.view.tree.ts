namespace $ {
	export class $mol_app_hello extends $mol_view {

		/**
		 * ```tree
		 * sub /
		 * 	<= Name $mol_string
		 * 		hint <= name_hint \Name
		 * 		value?val <=> name?val \
		 * 	<= Greeting $mol_view sub / <= greeting \
		 * ```
		 */
		sub() {
			return [
				this.Name(),
				this.Greeting()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Name $mol_string
		 * 	hint <= name_hint \Name
		 * 	value?val <=> name?val \
		 * ```
		 */
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string()

			obj.hint = () => this.name_hint()
			obj.value = (val?: any) => this.name(val)

			return obj
		}

		/**
		 * ```tree
		 * name_hint \Name
		 * ```
		 */
		name_hint() {
			return "Name"
		}

		/**
		 * ```tree
		 * name?val \
		 * ```
		 */
		@ $mol_mem
		name(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * Greeting $mol_view sub / <= greeting \
		 * ```
		 */
		@ $mol_mem
		Greeting() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.greeting()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * greeting \
		 * ```
		 */
		greeting() {
			return ""
		}
	}

}
