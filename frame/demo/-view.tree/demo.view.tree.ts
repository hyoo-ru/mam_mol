namespace $ {
	export class $mol_frame_demo extends $mol_demo_large {

		/**
		 * ```tree
		 * title @ \Another page inside that
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_frame_demo_title' )
		}

		/**
		 * ```tree
		 * sub / <= Frame
		 * ```
		 */
		sub() {
			return [
				this.Frame()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Frame $mol_frame uri \https://mol.js.org/
		 * ```
		 */
		@ $mol_mem
		Frame() {
			const obj = new this.$.$mol_frame()

			obj.uri = () => "https://mol.js.org/"

			return obj
		}
	}

}
