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
			}
		}


		/**
		 * ```tree
		 * enter $mol_app_supplies_enter entered?val <=> entered?val
		 * ```
		 */
		@ $mol_mem
		enter() {
			const obj = new this.$.$mol_app_supplies_enter()

			obj.entered = (val?: any) => this.entered(val)

			return obj
		}


		/**
		 * ```tree
		 * List $mol_app_supplies_list
		 * 	minimal_width 600
		 * 	supplies <= supplies
		 * 	tools <= tools_root
		 * 	title <= list_title
		 * 	search_query?val <=> supply_id?val
		 * ```
		 */
		@ $mol_mem
		List() {
			const obj = new this.$.$mol_app_supplies_list()

			obj.minimal_width = () => 600
			obj.supplies = () => this.supplies()
			obj.tools = () => this.tools_root()
			obj.title = () => this.list_title()
			obj.search_query = (val?: any) => this.supply_id(val)

			return obj
		}


		/**
		 * ```tree
		 * Detail!id $mol_app_supplies_detail
		 * 	minimal_width 800
		 * 	supply <= supply
		 * ```
		 */
		@ $mol_mem_key
		Detail(id: any) {
			const obj = new this.$.$mol_app_supplies_detail()

			obj.minimal_width = () => 800
			obj.supply = () => this.supply()

			return obj
		}

		/**
		 * ```tree
		 * entered?val false
		 * ```
		 */
		@ $mol_mem
		entered(val?: any) {
			if ( val !== undefined ) return val
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
		 * supply_id?val \
		 * ```
		 */
		@ $mol_mem
		supply_id(val?: any) {
			if ( val !== undefined ) return val
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
