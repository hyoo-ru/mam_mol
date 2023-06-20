namespace $ {
	export class $mol_app_supplies extends $mol_book2 {
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_theme \$mol_theme_auto
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_theme: "$mol_theme_auto"
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * enter $mol_app_supplies_enter entered? <=> entered?
		 * ```
		 */
		@ $mol_mem
		enter() {
			const obj = new this.$.$mol_app_supplies_enter()
			
			obj.entered = (next?: any) => this.entered(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * List $mol_app_supplies_list
		 * 	supplies <= supplies
		 * 	tools <= tools_root
		 * 	title <= list_title
		 * 	search_query? <=> supply_id?
		 * ```
		 */
		@ $mol_mem
		List() {
			const obj = new this.$.$mol_app_supplies_list()
			
			obj.supplies = () => this.supplies()
			obj.tools = () => this.tools_root()
			obj.title = () => this.list_title()
			obj.search_query = (next?: any) => this.supply_id(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Detail* $mol_app_supplies_detail supply <= supply
		 * ```
		 */
		@ $mol_mem_key
		Detail(id: any) {
			const obj = new this.$.$mol_app_supplies_detail()
			
			obj.supply = () => this.supply()
			
			return obj
		}
		
		/**
		 * ```tree
		 * entered? false
		 * ```
		 */
		@ $mol_mem
		entered(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * supplies /$mol_app_supplies_domain_supply
		 * ```
		 */
		supplies() {
			return [
			] as readonly $mol_app_supplies_domain_supply[]
		}
		
		/**
		 * ```tree
		 * tools_root /
		 * ```
		 */
		tools_root() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * list_title @ \Supplies
		 * ```
		 */
		list_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_list_title' )
		}
		
		/**
		 * ```tree
		 * supply_id? \
		 * ```
		 */
		@ $mol_mem
		supply_id(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * supply null
		 * ```
		 */
		supply() {
			return null as any
		}
	}
	
}

