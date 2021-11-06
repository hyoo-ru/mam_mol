namespace $ {
	export class $mol_infinite_demo extends $mol_demo {
		
		/**
		 * ```tree
		 * title @ \Infinite list demo
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_infinite_demo_title' )
		}
		
		/**
		 * ```tree
		 * chunk_size 20
		 * ```
		 */
		chunk_size() {
			return 20
		}
		
		/**
		 * ```tree
		 * sub / <= List
		 * ```
		 */
		sub() {
			return [
				this.List()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_infinite
		 * 	\$mol_filler
		 * 	\infinite
		 * 	\scroll
		 * 	\virtual
		 * 	\container
		 * ```
		 */
		tags() {
			return [
				"$mol_infinite",
				"$mol_filler",
				"infinite",
				"scroll",
				"virtual",
				"container"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * after!anchor_id /
		 * ```
		 */
		after(anchor_id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Item!id $mol_filler
		 * ```
		 */
		@ $mol_mem_key
		Item(id: any) {
			const obj = new this.$.$mol_filler()
			
			return obj
		}
		
		/**
		 * ```tree
		 * List $mol_infinite
		 * 	after!anchor_id <= after!anchor_id
		 * 	Row!id <= Item!id
		 * ```
		 */
		@ $mol_mem
		List() {
			const obj = new this.$.$mol_infinite()
			
			obj.after = (anchor_id: any) => this.after(anchor_id)
			obj.Row = (id: any) => this.Item(id)
			
			return obj
		}
	}
	
}

