namespace $ {
	export class $mol_select_list_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Friends picker
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_select_list_demo_title' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Friends $mol_select_list
		 * 		value?val <=> friends?val /
		 * 		dictionary <= suggestions *
		 * 			jocker \Jocker
		 * 			harley \Harley Quinn
		 * 			penguin \Penguin
		 * 			riddler \Riddler
		 * 			bane \Bane
		 * 			freeze \Mister Freeze
		 * 			clay \Clayface
		 * 			mask \Black Mask
		 * 	<= Friends_disabled $mol_select_list
		 * 		value?val <=> friends?val /
		 * 		dictionary <= suggestions
		 * 		enabled false
		 * ```
		 */
		sub() {
			return [
				this.Friends(),
				this.Friends_disabled()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Friends $mol_select_list
		 * 	value?val <=> friends?val /
		 * 	dictionary <= suggestions *
		 * 		jocker \Jocker
		 * 		harley \Harley Quinn
		 * 		penguin \Penguin
		 * 		riddler \Riddler
		 * 		bane \Bane
		 * 		freeze \Mister Freeze
		 * 		clay \Clayface
		 * 		mask \Black Mask
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
		 * friends?val /
		 * ```
		 */
		@ $mol_mem
		friends(val?: any) {
			if ( val !== undefined ) return val
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
		 * Friends_disabled $mol_select_list
		 * 	value?val <=> friends?val /
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
	}

}
