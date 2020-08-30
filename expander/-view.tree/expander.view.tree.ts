namespace $ {
	export class $mol_expander extends $mol_list {

		/**
		 * ```tree
		 * rows /
		 * 	<= Label $mol_view sub /
		 * 		<= Trigger $mol_check_expand
		 * 			checked?val <=> expanded?val false
		 * 			label <= label / <= title
		 * 		<= Tools null
		 * 	<= Content $mol_view sub <= content /
		 * ```
		 */
		rows() {
			return [
				this.Label(),
				this.Content()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Label $mol_view sub /
		 * 	<= Trigger $mol_check_expand
		 * 		checked?val <=> expanded?val false
		 * 		label <= label / <= title
		 * 	<= Tools null
		 * ```
		 */
		@ $mol_mem
		Label() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.Trigger(),
				this.Tools()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Trigger $mol_check_expand
		 * 	checked?val <=> expanded?val false
		 * 	label <= label / <= title
		 * ```
		 */
		@ $mol_mem
		Trigger() {
			const obj = new this.$.$mol_check_expand()

			obj.checked = (val?: any) => this.expanded(val)
			obj.label = () => this.label()

			return obj
		}

		/**
		 * ```tree
		 * expanded?val false
		 * ```
		 */
		@ $mol_mem
		expanded(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * label / <= title
		 * ```
		 */
		label() {
			return [
				this.title()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Tools null
		 * ```
		 */
		Tools() {
			return null as any
		}

		/**
		 * ```tree
		 * Content $mol_view sub <= content /
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_view()

			obj.sub = () => this.content()

			return obj
		}

		/**
		 * ```tree
		 * content /
		 * ```
		 */
		content() {
			return [

			] as readonly any[]
		}
	}

}
