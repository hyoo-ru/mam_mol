namespace $ {
	export class $mol_bar_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Group of controls as one control
		 * ```
		 */
		title() {
			return "Group of controls as one control"
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Two
		 * 	<= Three
		 * ```
		 */
		sub() {
			return [
				this.Two(),
				this.Three()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\group
		 * 	\container
		 * ```
		 */
		tags() {
			return [
				"group",
				"container"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Widget/Layout
		 * 	\Widget/Island
		 * ```
		 */
		aspects() {
			return [
				"Widget/Layout",
				"Widget/Island"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * mail_hint \E-mail
		 * ```
		 */
		mail_hint() {
			return "E-mail"
		}
		
		/**
		 * ```tree
		 * mail? \
		 * ```
		 */
		@ $mol_mem
		mail(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Two_mail $mol_string
		 * 	hint <= mail_hint
		 * 	value? <=> mail?
		 * ```
		 */
		@ $mol_mem
		Two_mail() {
			const obj = new this.$.$mol_string()
			
			obj.hint = () => this.mail_hint()
			obj.value = (next?: any) => this.mail(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * submit_title \Submit
		 * ```
		 */
		submit_title() {
			return "Submit"
		}
		
		/**
		 * ```tree
		 * Two_submit $mol_button_minor title <= submit_title
		 * ```
		 */
		@ $mol_mem
		Two_submit() {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => this.submit_title()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Two $mol_bar sub /
		 * 	<= Two_mail
		 * 	<= Two_submit
		 * ```
		 */
		@ $mol_mem
		Two() {
			const obj = new this.$.$mol_bar()
			
			obj.sub = () => [
				this.Two_mail(),
				this.Two_submit()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Three_mail $mol_string
		 * 	hint <= mail_hint
		 * 	value? <=> mail?
		 * ```
		 */
		@ $mol_mem
		Three_mail() {
			const obj = new this.$.$mol_string()
			
			obj.hint = () => this.mail_hint()
			obj.value = (next?: any) => this.mail(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * confirm_title \Confirm
		 * ```
		 */
		confirm_title() {
			return "Confirm"
		}
		
		/**
		 * ```tree
		 * confirmed? false
		 * ```
		 */
		@ $mol_mem
		confirmed(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * Three_confirm $mol_check_box
		 * 	title <= confirm_title
		 * 	checked? <=> confirmed?
		 * ```
		 */
		@ $mol_mem
		Three_confirm() {
			const obj = new this.$.$mol_check_box()
			
			obj.title = () => this.confirm_title()
			obj.checked = (next?: any) => this.confirmed(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Three $mol_bar sub /
		 * 	<= Three_mail
		 * 	<= Three_confirm
		 * ```
		 */
		@ $mol_mem
		Three() {
			const obj = new this.$.$mol_bar()
			
			obj.sub = () => [
				this.Three_mail(),
				this.Three_confirm()
			] as readonly any[]
			
			return obj
		}
	}
	
}

