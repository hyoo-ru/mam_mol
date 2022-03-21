namespace $ {
	export class $mol_password extends $mol_view {
		
		/**
		 * ```tree
		 * type?val \password
		 * ```
		 */
		@ $mol_mem
		type(val?: any) {
			if ( val !== undefined ) return val as never
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
		 * value?val \
		 * ```
		 */
		@ $mol_mem
		value(val?: any) {
			if ( val !== undefined ) return val as never
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
		 * 	value?val <=> value?val
		 * 	submit?event <=> submit?event
		 * 	enabled <= enabled
		 * ```
		 */
		@ $mol_mem
		Pass() {
			const obj = new this.$.$mol_string()
			
			obj.type = () => this.type()
			obj.hint = () => this.hint()
			obj.value = (val?: any) => this.value(val)
			obj.submit = (event?: any) => this.submit(event)
			obj.enabled = () => this.enabled()
			
			return obj
		}
		
		/**
		 * ```tree
		 * checked?val true
		 * ```
		 */
		@ $mol_mem
		checked(val?: any) {
			if ( val !== undefined ) return val as never
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
		 * 	checked?val <=> checked?val
		 * 	Icon <= Show_icon
		 * ```
		 */
		@ $mol_mem
		Show() {
			const obj = new this.$.$mol_check_icon()
			
			obj.checked = (val?: any) => this.checked(val)
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

