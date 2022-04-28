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
		 * friends?val /
		 * ```
		 */
		@ $mol_mem
		friends(val?: any) {
			if ( val !== undefined ) return val as never
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
			}
		}
		
		/**
		 * ```tree
		 * Friends $mol_select_list
		 * 	value?val <=> friends?val
		 * 	dictionary <= suggestions
		 * ```
		 */
		@ $mol_mem
		Friends() {
			const obj = new this.$.$mol_select_list()
			
			obj.value = (val?: any) => this.friends(val)
			obj.dictionary = () => this.suggestions()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Friends_disabled $mol_select_list
		 * 	value?val <=> friends?val
		 * 	dictionary <= suggestions
		 * 	enabled false
		 * ```
		 */
		@ $mol_mem
		Friends_disabled() {
			const obj = new this.$.$mol_select_list()
			
			obj.value = (val?: any) => this.friends(val)
			obj.dictionary = () => this.suggestions()
			obj.enabled = () => false
			
			return obj
		}
		
		/**
		 * ```tree
		 * Demo_items $mol_list rows /
		 * 	<= Friends
		 * 	<= Friends_disabled
		 * ```
		 */
		@ $mol_mem
		Demo_items() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Friends(),
				this.Friends_disabled()
			] as readonly any[]
			
			return obj
		}
	}
	
}

