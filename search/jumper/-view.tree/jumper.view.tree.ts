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
		 * 	value?val <=> index?val
		 * 	forward?event => forward?event
		 * 	backward?event => backward?event
		 * ```
		 */
		@ $mol_mem
		Index() {
			const obj = new this.$.$mol_paginator()
			
			obj.value = (val?: any) => this.index(val)
			
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
		 * index?val 0
		 * ```
		 */
		@ $mol_mem
		index(val?: any) {
			if ( val !== undefined ) return val as never
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
			})
			
			return obj
		}
		
		/**
		 * ```tree
		 * escape?val null
		 * ```
		 */
		@ $mol_mem
		escape(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Forward $mol_hotkey key *
		 * 	enter?event <=> forward?event
		 * 	escape?val <=> escape?val
		 * ```
		 */
		@ $mol_mem
		Forward() {
			const obj = new this.$.$mol_hotkey()
			
			obj.key = () => ({
				enter: (event?: any) => this.forward(event),
				escape: (val?: any) => this.escape(val)
			})
			
			return obj
		}
	}
	
}

