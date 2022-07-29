namespace $ {
	export class $mol_dump_list extends $mol_view {
		
		/**
		 * ```tree
		 * values /
		 * ```
		 */
		values() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * sub / <= Dump*0
		 * ```
		 */
		sub() {
			return [
				this.Dump("0")
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * dump_value* null
		 * ```
		 */
		dump_value(id: any) {
			return null as any
		}
		
		/**
		 * ```tree
		 * dump_expanded*? false
		 * ```
		 */
		@ $mol_mem_key
		dump_expanded(id: any, next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * prototypes false
		 * ```
		 */
		prototypes() {
			return false
		}
		
		/**
		 * ```tree
		 * Dump*0 $mol_dump_value
		 * 	value <= dump_value*
		 * 	expanded? <=> dump_expanded*?
		 * 	prototypes <= prototypes
		 * ```
		 */
		@ $mol_mem_key
		Dump(id: any) {
			const obj = new this.$.$mol_dump_value()
			
			obj.value = () => this.dump_value(id)
			obj.expanded = (next?: any) => this.dump_expanded(id, next)
			obj.prototypes = () => this.prototypes()
			
			return obj
		}
	}
	
}

