namespace $ {
	export class $mol_password extends $mol_view {
		
		/**
		 * ```tree
		 * type? \password
		 * ```
		 */
		@ $mol_mem
		type(next?: any) {
			if ( next !== undefined ) return next as never
			return "password"
		}
		
		/**
		 * ```tree
		 * sub <= content
		 * ```
		 */
		sub() {
			return this.content()
		}
		
		/**
		 * ```tree
		 * hint \
		 * ```
		 */
		hint() {
			return ""
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
		 * submit?event null
		 * ```
		 */
		@ $mol_mem
		submit(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * enabled true
		 * ```
		 */
		enabled() {
			return true
		}
		
		/**
		 * ```tree
		 * Pass $mol_string
		 * 	type <= type
		 * 	hint <= hint
		 * 	value? <=> value?
		 * 	submit?event <=> submit?event
		 * 	enabled <= enabled
		 * ```
		 */
		@ $mol_mem
		Pass() {
			const obj = new this.$.$mol_string()
			
			obj.type = () => this.type()
			obj.hint = () => this.hint()
			obj.value = (next?: any) => this.value(next)
			obj.submit = (event?: any) => this.submit(event)
			obj.enabled = () => this.enabled()
			
			return obj
		}
		
		/**
		 * ```tree
		 * checked? true
		 * ```
		 */
		@ $mol_mem
		checked(next?: any) {
			if ( next !== undefined ) return next as never
			return true
		}
		
		/**
		 * ```tree
		 * Show_icon $mol_icon_eye
		 * ```
		 */
		@ $mol_mem
		Show_icon() {
			const obj = new this.$.$mol_icon_eye()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Show $mol_check_icon
		 * 	checked? <=> checked?
		 * 	Icon <= Show_icon
		 * ```
		 */
		@ $mol_mem
		Show() {
			const obj = new this.$.$mol_check_icon()
			
			obj.checked = (next?: any) => this.checked(next)
			obj.Icon = () => this.Show_icon()
			
			return obj
		}
		
		/**
		 * ```tree
		 * content /
		 * 	<= Pass
		 * 	<= Show
		 * ```
		 */
		content() {
			return [
				this.Pass(),
				this.Show()
			] as readonly any[]
		}
	}
	
}

