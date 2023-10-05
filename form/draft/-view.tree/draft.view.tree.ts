namespace $ {
	export class $mol_form_draft extends $mol_form {
		
		/**
		 * ```tree
		 * model $mol_object2
		 * ```
		 */
		@ $mol_mem
		model() {
			const obj = new this.$.$mol_object2()
			
			return obj
		}
		
		/**
		 * ```tree
		 * changed false
		 * ```
		 */
		changed() {
			return false
		}
		
		/**
		 * ```tree
		 * value_str*? \
		 * ```
		 */
		@ $mol_mem_key
		value_str(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * value_bool*? false
		 * ```
		 */
		@ $mol_mem_key
		value_bool(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * value_number*? 0
		 * ```
		 */
		@ $mol_mem_key
		value_number(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return 0
		}
		
		/**
		 * ```tree
		 * dictionary_bool*? *
		 * ```
		 */
		@ $mol_mem_key
		dictionary_bool(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * list_string*? /string
		 * ```
		 */
		@ $mol_mem_key
		list_string(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * value_changed* false
		 * ```
		 */
		value_changed(id: any) {
			return false
		}
		
		/**
		 * ```tree
		 * reset? null
		 * ```
		 */
		@ $mol_mem
		reset(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
	}
	
}

