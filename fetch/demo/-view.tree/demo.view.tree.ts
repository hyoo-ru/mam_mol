namespace $ {
	export class $mol_fetch_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Simple spoiler
		 * ```
		 */
		title() {
			return "Simple spoiler"
		}
		
		/**
		 * ```tree
		 * sub / <= Content
		 * ```
		 */
		sub() {
			return [
				this.Content()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\fetch
		 * 	\load
		 * 	\api
		 * 	\response
		 * 	\request
		 * ```
		 */
		tags() {
			return [
				"fetch",
				"load",
				"api",
				"response",
				"request"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Network/HTTP
		 * ```
		 */
		aspects() {
			return [
				"Network/HTTP"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * url? \https://jsonplaceholder.typicode.com/users
		 * ```
		 */
		@ $mol_mem
		url(next?: any) {
			if ( next !== undefined ) return next as never
			return "https://jsonplaceholder.typicode.com/users"
		}
		
		/**
		 * ```tree
		 * Url $mol_string value? <=> url?
		 * ```
		 */
		@ $mol_mem
		Url() {
			const obj = new this.$.$mol_string()
			
			obj.value = (next?: any) => this.url(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * fetch_data? null
		 * ```
		 */
		@ $mol_mem
		fetch_data(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Fetch $mol_button_major click? <= fetch_data?
		 * ```
		 */
		@ $mol_mem
		Fetch() {
			const obj = new this.$.$mol_button_major()
			
			obj.click = (next?: any) => this.fetch_data()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Request $mol_view sub /
		 * 	<= Url
		 * 	<= Fetch
		 * ```
		 */
		@ $mol_mem
		Request() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.Url(),
				this.Fetch()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * data? null
		 * ```
		 */
		@ $mol_mem
		data(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Data $mol_dump_value value <= data?
		 * ```
		 */
		@ $mol_mem
		Data() {
			const obj = new this.$.$mol_dump_value()
			
			obj.value = () => this.data()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Content $mol_list rows /
		 * 	<= Request
		 * 	<= Data
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Request(),
				this.Data()
			] as readonly any[]
			
			return obj
		}
	}
	
}

