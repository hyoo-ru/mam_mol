namespace $ {
	export class $mol_app_supplies_enter extends $mol_view {
		
		/**
		 * ```tree
		 * entered? false
		 * ```
		 */
		@ $mol_mem
		entered(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * minimal_width 400
		 * ```
		 */
		minimal_width() {
			return 400
		}
		
		/**
		 * ```tree
		 * sub / <= form
		 * ```
		 */
		sub() {
			return [
				this.form()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * loginLabel @ \User name
		 * ```
		 */
		loginLabel() {
			return this.$.$mol_locale.text( '$mol_app_supplies_enter_loginLabel' )
		}
		
		/**
		 * ```tree
		 * login? \
		 * ```
		 */
		@ $mol_mem
		login(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * loginControl $mol_string value? <=> login?
		 * ```
		 */
		@ $mol_mem
		loginControl() {
			const obj = new this.$.$mol_string()
			
			obj.value = (next?: any) => this.login(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * loginField $mol_form_field
		 * 	name <= loginLabel
		 * 	control <= loginControl
		 * ```
		 */
		@ $mol_mem
		loginField() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => this.loginLabel()
			obj.control = () => this.loginControl()
			
			return obj
		}
		
		/**
		 * ```tree
		 * passwordLabel @ \Pass word
		 * ```
		 */
		passwordLabel() {
			return this.$.$mol_locale.text( '$mol_app_supplies_enter_passwordLabel' )
		}
		
		/**
		 * ```tree
		 * password? \
		 * ```
		 */
		@ $mol_mem
		password(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * passControl $mol_string
		 * 	value? <=> password?
		 * 	type \password
		 * ```
		 */
		@ $mol_mem
		passControl() {
			const obj = new this.$.$mol_string()
			
			obj.value = (next?: any) => this.password(next)
			obj.type = () => "password"
			
			return obj
		}
		
		/**
		 * ```tree
		 * passwordField $mol_form_field
		 * 	name <= passwordLabel
		 * 	control <= passControl
		 * ```
		 */
		@ $mol_mem
		passwordField() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => this.passwordLabel()
			obj.control = () => this.passControl()
			
			return obj
		}
		
		/**
		 * ```tree
		 * submitLabel @ \Log In
		 * ```
		 */
		submitLabel() {
			return this.$.$mol_locale.text( '$mol_app_supplies_enter_submitLabel' )
		}
		
		/**
		 * ```tree
		 * event_submit? null
		 * ```
		 */
		@ $mol_mem
		event_submit(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * submit_blocked false
		 * ```
		 */
		submit_blocked() {
			return false
		}
		
		/**
		 * ```tree
		 * submit $mol_button_major
		 * 	sub / <= submitLabel
		 * 	click? <=> event_submit?
		 * 	disabled <= submit_blocked
		 * ```
		 */
		@ $mol_mem
		submit() {
			const obj = new this.$.$mol_button_major()
			
			obj.sub = () => [
				this.submitLabel()
			] as readonly any[]
			obj.click = (next?: any) => this.event_submit(next)
			obj.disabled = () => this.submit_blocked()
			
			return obj
		}
		
		/**
		 * ```tree
		 * form $mol_form
		 * 	form_fields /
		 * 		<= loginField
		 * 		<= passwordField
		 * 	buttons / <= submit
		 * ```
		 */
		@ $mol_mem
		form() {
			const obj = new this.$.$mol_form()
			
			obj.form_fields = () => [
				this.loginField(),
				this.passwordField()
			] as readonly any[]
			obj.buttons = () => [
				this.submit()
			] as readonly any[]
			
			return obj
		}
	}
	
}

