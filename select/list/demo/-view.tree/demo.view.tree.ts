namespace $ {
	export class $mol_select_list_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Friends picker
		 * ```
		 */
		title() {
			return "Friends picker"
		}
		
		/**
		 * ```tree
		 * sub / <= Demo_items
		 * ```
		 */
		sub() {
			return [
				this.Demo_items()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\select
		 * 	\tags
		 * 	\multiselect
		 * ```
		 */
		tags() {
			return [
				"select",
				"tags",
				"multiselect"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Widget/Control
		 * 	\Type/List
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control",
				"Type/List"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * friends? /
		 * ```
		 */
		@ $mol_mem
		friends(next?: any) {
			if ( next !== undefined ) return next as never
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * suggestions *
		 * 	jocker \Jocker
		 * 	harley \Harley Quinn
		 * 	penguin \Penguin
		 * 	riddler \Riddler
		 * 	bane \Bane
		 * 	freeze \Mister Freeze
		 * 	clay \Clayface
		 * 	mask \Black Mask
		 * ```
		 */
		suggestions() {
			return {
				jocker: "Jocker",
				harley: "Harley Quinn",
				penguin: "Penguin",
				riddler: "Riddler",
				bane: "Bane",
				freeze: "Mister Freeze",
				clay: "Clayface",
				mask: "Black Mask"
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * Friends $mol_select_list
		 * 	value? <=> friends?
		 * 	dictionary <= suggestions
		 * ```
		 */
		@ $mol_mem
		Friends() {
			const obj = new this.$.$mol_select_list()
			
			obj.value = (next?: any) => this.friends(next)
			obj.dictionary = () => this.suggestions()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Friends_disabled $mol_select_list
		 * 	value? <=> friends?
		 * 	dictionary <= suggestions
		 * 	enabled false
		 * ```
		 */
		@ $mol_mem
		Friends_disabled() {
			const obj = new this.$.$mol_select_list()
			
			obj.value = (next?: any) => this.friends(next)
			obj.dictionary = () => this.suggestions()
			obj.enabled = () => false
			
			return obj
		}
		
		/**
		 * ```tree
		 * friends_lazy? /
		 * ```
		 */
		@ $mol_mem
		friends_lazy(next?: any) {
			if ( next !== undefined ) return next as never
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * option_title* \
		 * ```
		 */
		option_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * suggestions_lazy <= suggestions
		 * ```
		 */
		suggestions_lazy() {
			return this.suggestions()
		}
		
		/**
		 * ```tree
		 * filter_pattern?
		 * ```
		 */
		filter_pattern(next?: any) {
			return this.Friends_lazy().filter_pattern(next)
		}
		
		/**
		 * ```tree
		 * Friends_lazy $mol_select_list
		 * 	value? <=> friends_lazy?
		 * 	option_title* <= option_title*
		 * 	filter_pattern? => filter_pattern?
		 * 	pick_enabled true
		 * 	dictionary <= suggestions_lazy
		 * ```
		 */
		@ $mol_mem
		Friends_lazy() {
			const obj = new this.$.$mol_select_list()
			
			obj.value = (next?: any) => this.friends_lazy(next)
			obj.option_title = (id: any) => this.option_title(id)
			obj.pick_enabled = () => true
			obj.dictionary = () => this.suggestions_lazy()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Demo_items $mol_list rows /
		 * 	<= Friends
		 * 	<= Friends_disabled
		 * 	<= Friends_lazy
		 * ```
		 */
		@ $mol_mem
		Demo_items() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Friends(),
				this.Friends_disabled(),
				this.Friends_lazy()
			] as readonly any[]
			
			return obj
		}
	}
	
}

