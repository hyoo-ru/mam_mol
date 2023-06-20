namespace $ {
	export class $mol_code extends $mol_view {
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Manual
		 * 	<= Scan
		 * ```
		 */
		sub() {
			return [
				this.Manual(),
				this.Scan()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * value? \
		 * ```
		 */
		@ $mol_mem
		value(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * format \
		 * ```
		 */
		format() {
			return ""
		}
		
		/**
		 * ```tree
		 * hint <= format
		 * ```
		 */
		hint() {
			return this.format()
		}
		
		/**
		 * ```tree
		 * Manual $mol_search
		 * 	query? <=> value?
		 * 	hint <= hint
		 * ```
		 */
		@ $mol_mem
		Manual() {
			const obj = new this.$.$mol_search()
			
			obj.query = (next?: any) => this.value(next)
			obj.hint = () => this.hint()
			
			return obj
		}
		
		/**
		 * ```tree
		 * event_scan? null
		 * ```
		 */
		@ $mol_mem
		event_scan(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * scan_label @ \Scan
		 * ```
		 */
		scan_label() {
			return this.$.$mol_locale.text( '$mol_code_scan_label' )
		}
		
		/**
		 * ```tree
		 * Scan $mol_button
		 * 	event_click? <=> event_scan?
		 * 	sub / <= scan_label
		 * ```
		 */
		@ $mol_mem
		Scan() {
			const obj = new this.$.$mol_button()
			
			obj.event_click = (next?: any) => this.event_scan(next)
			obj.sub = () => [
				this.scan_label()
			] as readonly any[]
			
			return obj
		}
	}
	
}

