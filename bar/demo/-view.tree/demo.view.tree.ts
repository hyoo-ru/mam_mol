namespace $ {
	export class $mol_bar_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Group of controls as one control
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_bar_demo_title' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Two $mol_bar sub /
		 * 		<= Two_mail $mol_string
		 * 			hint <= mail_hint \E-mail
		 * 			value?val <=> mail?val \
		 * 		<= Two_submit $mol_button_minor title <= submit_title \Submit
		 * 	<= Three $mol_bar sub /
		 * 		<= Three_mail $mol_string
		 * 			hint <= mail_hint \E-mail
		 * 			value?val <=> mail?val \
		 * 		<= Three_confirm $mol_check_box
		 * 			title <= confirm_title \Confirm
		 * 			checked?val <=> confirmed?val false
		 * 		<= Three_submit $mol_button_minor title <= submit_title \Submit
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
		 * Two $mol_bar sub /
		 * 	<= Two_mail $mol_string
		 * 		hint <= mail_hint \E-mail
		 * 		value?val <=> mail?val \
		 * 	<= Two_submit $mol_button_minor title <= submit_title \Submit
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
		 * Two_mail $mol_string
		 * 	hint <= mail_hint \E-mail
		 * 	value?val <=> mail?val \
		 * ```
		 */
		@ $mol_mem
		Two_mail() {
			const obj = new this.$.$mol_string()

			obj.hint = () => this.mail_hint()
			obj.value = (val?: any) => this.mail(val)

			return obj
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
		 * mail?val \
		 * ```
		 */
		@ $mol_mem
		mail(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * Two_submit $mol_button_minor title <= submit_title \Submit
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
		 * submit_title \Submit
		 * ```
		 */
		submit_title() {
			return "Submit"
		}

		/**
		 * ```tree
		 * Three $mol_bar sub /
		 * 	<= Three_mail $mol_string
		 * 		hint <= mail_hint \E-mail
		 * 		value?val <=> mail?val \
		 * 	<= Three_confirm $mol_check_box
		 * 		title <= confirm_title \Confirm
		 * 		checked?val <=> confirmed?val false
		 * 	<= Three_submit $mol_button_minor title <= submit_title \Submit
		 * ```
		 */
		@ $mol_mem
		Three() {
			const obj = new this.$.$mol_bar()

			obj.sub = () => [
				this.Three_mail(),
				this.Three_confirm(),
				this.Three_submit()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Three_mail $mol_string
		 * 	hint <= mail_hint \E-mail
		 * 	value?val <=> mail?val \
		 * ```
		 */
		@ $mol_mem
		Three_mail() {
			const obj = new this.$.$mol_string()

			obj.hint = () => this.mail_hint()
			obj.value = (val?: any) => this.mail(val)

			return obj
		}

		/**
		 * ```tree
		 * Three_confirm $mol_check_box
		 * 	title <= confirm_title \Confirm
		 * 	checked?val <=> confirmed?val false
		 * ```
		 */
		@ $mol_mem
		Three_confirm() {
			const obj = new this.$.$mol_check_box()

			obj.title = () => this.confirm_title()
			obj.checked = (val?: any) => this.confirmed(val)

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
		 * confirmed?val false
		 * ```
		 */
		@ $mol_mem
		confirmed(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * Three_submit $mol_button_minor title <= submit_title \Submit
		 * ```
		 */
		@ $mol_mem
		Three_submit() {
			const obj = new this.$.$mol_button_minor()

			obj.title = () => this.submit_title()

			return obj
		}
	}

}
