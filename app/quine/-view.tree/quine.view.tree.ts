namespace $ {
	export class $mol_app_quine extends $mol_page {
		
		/**
		 * ```tree
		 * title @ \Quine - Application that prints self sources
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_app_quine_title' )
		}
		
		/**
		 * ```tree
		 * body / <= Text
		 * ```
		 */
		body() {
			return [
				this.Text()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * paths /
		 * 	\mol/app/quine/quine.view.tree
		 * 	\mol/app/quine/quine.view.ts
		 * 	\mol/app/quine/index.html
		 * 	\mol/app/quine/quine.locale=ru.json
		 * ```
		 */
		paths() {
			return [
				"mol/app/quine/quine.view.tree",
				"mol/app/quine/quine.view.ts",
				"mol/app/quine/index.html",
				"mol/app/quine/quine.locale=ru.json"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * content \
		 * ```
		 */
		content() {
			return ""
		}
		
		/**
		 * ```tree
		 * Text $mol_text text <= content
		 * ```
		 */
		@ $mol_mem
		Text() {
			const obj = new this.$.$mol_text()
			
			obj.text = () => this.content()
			
			return obj
		}
	}
	
}

