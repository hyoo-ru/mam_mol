namespace $ {
	export class $mol_button_share_demo extends $mol_example {
		
		/**
		 * ```tree
		 * title @ \Share button
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_button_share_demo_title' )
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Share_page
		 * 	<= Share_screenshot
		 * 	<= Share_hyoo
		 * ```
		 */
		sub() {
			return [
				this.Share_page(),
				this.Share_screenshot(),
				this.Share_hyoo()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\share
		 * 	\button
		 * 	\icon
		 * ```
		 */
		tags() {
			return [
				"share",
				"button",
				"icon"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Share_page $mol_button_share hint \Share this page with screenshot
		 * ```
		 */
		@ $mol_mem
		Share_page() {
			const obj = new this.$.$mol_button_share()
			
			obj.hint = () => "Share this page with screenshot"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Share_screenshot $mol_button_share
		 * 	hint \Share screenshot of component
		 * 	uri null
		 * 	capture <= Share_hyoo
		 * ```
		 */
		@ $mol_mem
		Share_screenshot() {
			const obj = new this.$.$mol_button_share()
			
			obj.hint = () => "Share screenshot of component"
			obj.uri = () => null as any
			obj.capture = () => this.Share_hyoo()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Share_hyoo $mol_button_share
		 * 	hint \Share hyoo.ru
		 * 	uri \https://hyoo.ru
		 * 	capture null
		 * ```
		 */
		@ $mol_mem
		Share_hyoo() {
			const obj = new this.$.$mol_button_share()
			
			obj.hint = () => "Share hyoo.ru"
			obj.uri = () => "https://hyoo.ru"
			obj.capture = () => null as any
			
			return obj
		}
	}
	
}

