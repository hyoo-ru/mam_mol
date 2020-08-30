namespace $ {
	export class $mol_app_demo_main extends $mol_page {

		/**
		 * ```tree
		 * minimal_width 400
		 * ```
		 */
		minimal_width() {
			return 400
		}

		/**
		 * ```tree
		 * title \$mol libs for web ui
		 * ```
		 */
		title() {
			return "$mol libs for web ui"
		}

		/**
		 * ```tree
		 * tools /
		 * 	<= Lights $mol_lights_toggle
		 * 	<= Project $mol_link_source uri <= project_uri \https://github.com/eigenmethod/mol/tree/master/
		 * ```
		 */
		tools() {
			return [
				this.Lights(),
				this.Project()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Lights $mol_lights_toggle
		 * ```
		 */
		@ $mol_mem
		Lights() {
			const obj = new this.$.$mol_lights_toggle()

			return obj
		}

		/**
		 * ```tree
		 * Project $mol_link_source uri <= project_uri \https://github.com/eigenmethod/mol/tree/master/
		 * ```
		 */
		@ $mol_mem
		Project() {
			const obj = new this.$.$mol_link_source()

			obj.uri = () => this.project_uri()

			return obj
		}

		/**
		 * ```tree
		 * project_uri \https://github.com/eigenmethod/mol/tree/master/
		 * ```
		 */
		project_uri() {
			return "https://github.com/eigenmethod/mol/tree/master/"
		}

		/**
		 * ```tree
		 * body / <= Description $mol_text
		 * 	text <= description \
		 * 	uri_base <= project_uri
		 * ```
		 */
		body() {
			return [
				this.Description()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Description $mol_text
		 * 	text <= description \
		 * 	uri_base <= project_uri
		 * ```
		 */
		@ $mol_mem
		Description() {
			const obj = new this.$.$mol_text()

			obj.text = () => this.description()
			obj.uri_base = () => this.project_uri()

			return obj
		}

		/**
		 * ```tree
		 * description \
		 * ```
		 */
		description() {
			return ""
		}
	}

}
