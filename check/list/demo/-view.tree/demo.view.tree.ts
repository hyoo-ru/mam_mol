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
		 * 	\checkbox
		 * 	\option
		 * ```
		 */
		tags() {
			return [
				"checkbox",
				"option"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * right!id?val false
		 * ```
		 */
		@ $mol_mem_key
		right(id: any, val?: any) {
			if ( val !== undefined ) return val as never
			return false
		}
		
		/**
		 * ```tree
		 * Rights $mol_check_list
		 * 	option_checked!id?val <=> right!id?val
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
			
			obj.option_checked = (id: any, val?: any) => this.right(id, val)
			obj.options = () => ({
				read: "Allow Read",
				write: "Allow Write",
				rights: "Allow Change Rights",
				backup: "Allow BackUp",
				restart: "Allow Restart",
				ping: "Allow Ping",
				api: "Allow API Access",
				docs: "Allow Read Documentation"
			})
			
			return obj
		}
	}
	
}

