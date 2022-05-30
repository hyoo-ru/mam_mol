namespace $ {
	export class $mol_infinite_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Infinite list demo
		 * ```
		 */
		title() {
			return "Infinite list demo"
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
		 * 	\$mol_filler
		 * 	\$mol_list
		 * 	\infinite
		 * 	\scroll
		 * 	\virtual
		 * 	\container
		 * ```
		 */
		tags() {
			return [
				"$mol_filler",
				"$mol_list",
				"infinite",
				"scroll",
				"virtual",
				"container"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * after* /
		 * ```
		 */
		after(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * photo* \
		 * ```
		 */
		photo(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Photo* $mol_image uri <= photo*
		 * ```
		 */
		@ $mol_mem_key
		Photo(id: any) {
			const obj = new this.$.$mol_image()
			
			obj.uri = () => this.photo(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * name* \
		 * ```
		 */
		name(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Name* $mol_paragraph title <= name*
		 * ```
		 */
		@ $mol_mem_key
		Name(id: any) {
			const obj = new this.$.$mol_paragraph()
			
			obj.title = () => this.name(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * city* \
		 * ```
		 */
		city(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * City* $mol_paragraph title <= city*
		 * ```
		 */
		@ $mol_mem_key
		City(id: any) {
			const obj = new this.$.$mol_paragraph()
			
			obj.title = () => this.city(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Info* $mol_list rows /
		 * 	<= Name*
		 * 	<= City*
		 * ```
		 */
		@ $mol_mem_key
		Info(id: any) {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Name(id),
				this.City(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Item* $mol_row sub /
		 * 	<= Photo*
		 * 	<= Info*
		 * ```
		 */
		@ $mol_mem_key
		Item(id: any) {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Photo(id),
				this.Info(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * List $mol_infinite
		 * 	after* <= after*
		 * 	Row* <= Item*
		 * ```
		 */
		@ $mol_mem
		List() {
			const obj = new this.$.$mol_infinite()
			
			obj.after = (id: any) => this.after(id)
			obj.Row = (id: any) => this.Item(id)
			
			return obj
		}
	}
	
}

