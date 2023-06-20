namespace $ {
	export class $mol_search_jumper extends $mol_search {
		
		/**
		 * ```tree
		 * Root $mol_view
		 * ```
		 */
		@ $mol_mem
		Root() {
			const obj = new this.$.$mol_view()
			
			return obj
		}
		
		/**
		 * ```tree
		 * forward?event
		 * ```
		 */
		forward(event?: any) {
			return this.Index().forward(event)
		}
		
		/**
		 * ```tree
		 * backward?event
		 * ```
		 */
		backward(event?: any) {
			return this.Index().backward(event)
		}
		
		/**
		 * ```tree
		 * Index $mol_paginator
		 * 	value? <=> index?
		 * 	forward?event => forward?event
		 * 	backward?event => backward?event
		 * ```
		 */
		@ $mol_mem
		Index() {
			const obj = new this.$.$mol_paginator()
			
			obj.value = (next?: any) => this.index(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * plugins /
		 * 	^
		 * 	<= Backward
		 * 	<= Forward
		 * ```
		 */
		plugins() {
			return [
				...super.plugins(),
				this.Backward(),
				this.Forward()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * index? 0
		 * ```
		 */
		@ $mol_mem
		index(next?: any) {
			if ( next !== undefined ) return next as never
			return 0
		}
		
		/**
		 * ```tree
		 * Backward $mol_hotkey
		 * 	mod_shift true
		 * 	key * enter?event <=> backward?event
		 * ```
		 */
		@ $mol_mem
		Backward() {
			const obj = new this.$.$mol_hotkey()
			
			obj.mod_shift = () => true
			obj.key = () => ({
				enter: (event?: any) => this.backward(event)
			} as Record< string, any >)
			
			return obj
		}
		
		/**
		 * ```tree
		 * escape? null
		 * ```
		 */
		@ $mol_mem
		escape(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Forward $mol_hotkey key *
		 * 	enter?event <=> forward?event
		 * 	escape? <=> escape?
		 * ```
		 */
		@ $mol_mem
		Forward() {
			const obj = new this.$.$mol_hotkey()
			
			obj.key = () => ({
				enter: (event?: any) => this.forward(event),
				escape: (next?: any) => this.escape(next)
			} as Record< string, any >)
			
			return obj
		}
	}
	
}

