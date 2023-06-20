namespace $ {
	export class $mol_check_list_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Set of toggles
		 * ```
		 */
		title() {
			return "Set of toggles"
		}
		
		/**
		 * ```tree
		 * sub / <= Rights
		 * ```
		 */
		sub() {
			return [
				this.Rights()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\option
		 * 	\switch
		 * 	\toggle
		 * ```
		 */
		tags() {
			return [
				"option",
				"switch",
				"toggle"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Control/Button
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control/Button"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * right*? false
		 * ```
		 */
		@ $mol_mem_key
		right(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * Rights $mol_check_list
		 * 	option_checked*? <=> right*?
		 * 	options *
		 * 		read \Allow Read
		 * 		write \Allow Write
		 * 		rights \Allow Change Rights
		 * 		backup \Allow BackUp
		 * 		restart \Allow Restart
		 * 		ping \Allow Ping
		 * 		api \Allow API Access
		 * 		docs \Allow Read Documentation
		 * ```
		 */
		@ $mol_mem
		Rights() {
			const obj = new this.$.$mol_check_list()
			
			obj.option_checked = (id: any, next?: any) => this.right(id, next)
			obj.options = () => ({
				read: "Allow Read",
				write: "Allow Write",
				rights: "Allow Change Rights",
				backup: "Allow BackUp",
				restart: "Allow Restart",
				ping: "Allow Ping",
				api: "Allow API Access",
				docs: "Allow Read Documentation"
			} as Record< string, any >)
			
			return obj
		}
	}
	
}

