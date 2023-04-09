namespace $ {
	export class $mol_infinite extends $mol_list {
		
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
		 * row_ids? /
		 * ```
		 */
		@ $mol_mem
		row_ids(next?: any) {
			if ( next !== undefined ) return next as never
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * render_over 1
		 * ```
		 */
		render_over() {
			return 1
		}
		
		/**
		 * ```tree
		 * Row* $mol_view
		 * ```
		 */
		@ $mol_mem_key
		Row(id: any) {
			const obj = new this.$.$mol_view()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Before* $mol_view
		 * 	minimal_width 0
		 * 	minimal_height 0
		 * 	sub / <= before_load*
		 * ```
		 */
		@ $mol_mem_key
		Before(id: any) {
			const obj = new this.$.$mol_view()
			
			obj.minimal_width = () => 0
			obj.minimal_height = () => 0
			obj.sub = () => [
				this.before_load(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * After* $mol_view
		 * 	minimal_width 0
		 * 	minimal_height 0
		 * 	sub / <= after_load*
		 * ```
		 */
		@ $mol_mem_key
		After(id: any) {
			const obj = new this.$.$mol_view()
			
			obj.minimal_width = () => 0
			obj.minimal_height = () => 0
			obj.sub = () => [
				this.after_load(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * before_load* null
		 * ```
		 */
		before_load(id: any) {
			return null as any
		}
		
		/**
		 * ```tree
		 * after_load* null
		 * ```
		 */
		after_load(id: any) {
			return null as any
		}
	}
	
}

