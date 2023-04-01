namespace $ {
	export class $mol_infinite_demo extends $mol_example_large {
		
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
		 * sub / <= Scroll
		 * ```
		 */
		sub() {
			return [
				this.Scroll()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_filler
		 * 	\$mol_list
		 * 	\$mol_avatar
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
				"$mol_avatar",
				"infinite",
				"scroll",
				"virtual",
				"container"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget
		 * ```
		 */
		aspects() {
			return [
				"Widget"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * before* /
		 * ```
		 */
		before(id: any) {
			return [
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
		 * id* \
		 * ```
		 */
		id(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Photo* $mol_avatar id <= id*
		 * ```
		 */
		@ $mol_mem_key
		Photo(id: any) {
			const obj = new this.$.$mol_avatar()
			
			obj.id = () => this.id(id)
			
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
		 * 	before* <= before*
		 * 	after* <= after*
		 * 	Row* <= Item*
		 * ```
		 */
		@ $mol_mem
		List() {
			const obj = new this.$.$mol_infinite()
			
			obj.before = (id: any) => this.before(id)
			obj.after = (id: any) => this.after(id)
			obj.Row = (id: any) => this.Item(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Scroll $mol_scroll sub / <= List
		 * ```
		 */
		@ $mol_mem
		Scroll() {
			const obj = new this.$.$mol_scroll()
			
			obj.sub = () => [
				this.List()
			] as readonly any[]
			
			return obj
		}
	}
	
}

