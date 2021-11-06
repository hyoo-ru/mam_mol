namespace $ {
	export class $mol_button_share_demo extends $mol_demo {
		
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
		 * 	<= Share_self
		 * 	<= Share_hyoo
		 * ```
		 */
		sub() {
			return [
				this.Share_self(),
				this.Share_hyoo()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_button_share
		 * 	\share
		 * 	\button
		 * 	\icon
		 * ```
		 */
		tags() {
			return [
				"$mol_button_share",
				"share",
				"button",
				"icon"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Share_self $mol_button_share title \Share this page
		 * ```
		 */
		@ $mol_mem
		Share_self() {
			const obj = new this.$.$mol_button_share()
			
			obj.title = () => "Share this page"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Share_hyoo $mol_button_share
		 * 	title \Share hyoo.ru
		 * 	uri \https://hyoo.ru
		 * ```
		 */
		@ $mol_mem
		Share_hyoo() {
			const obj = new this.$.$mol_button_share()
			
			obj.title = () => "Share hyoo.ru"
			obj.uri = () => "https://hyoo.ru"
			
			return obj
		}
	}
	
}

