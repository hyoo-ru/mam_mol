namespace $ {
	export class $mol_form_demo_bids extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Sign Up form demo
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_title' )
		}

		/**
		 * ```tree
		 * message_required @ \Required
		 * ```
		 */
		message_required() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_message_required' )
		}

		/**
		 * ```tree
		 * message_no_spaces @ \No spaces!
		 * ```
		 */
		message_no_spaces() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_message_no_spaces' )
		}

		/**
		 * ```tree
		 * message_need_more_letters @ \{count} or more letters
		 * ```
		 */
		message_need_more_letters() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_message_need_more_letters' )
		}

		/**
		 * ```tree
		 * message_need_at @ \@ is required
		 * ```
		 */
		message_need_at() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_message_need_at' )
		}

		/**
		 * ```tree
		 * message_only_one_at @ \At most one @
		 * ```
		 */
		message_only_one_at() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_message_only_one_at' )
		}

		/**
		 * ```tree
		 * message_no_tld @ \At least 2 level domain
		 * ```
		 */
		message_no_tld() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_message_no_tld' )
		}

		/**
		 * ```tree
		 * message_dots_inside @ \Dots can't be at edge
		 * ```
		 */
		message_dots_inside() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_message_dots_inside' )
		}

		/**
		 * ```tree
		 * message_no_space_domain @ \No space in domain name
		 * ```
		 */
		message_no_space_domain() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_message_no_space_domain' )
		}

		/**
		 * ```tree
		 * message_need_username @ \Username required
		 * ```
		 */
		message_need_username() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_message_need_username' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Form $mol_form
		 * 		submit?val <=> submit?val null
		 * 		form_fields /
		 * 			-
		 * 			<= Name_first_field $mol_form_field
		 * 				name <= name_first_label @ \First Name
		 * 				bid <= name_first_bid \
		 * 				control <= Name_first_control $mol_string
		 * 					hint <= name_first_hint @ \Jack
		 * 					value?val <=> name_first?val \
		 * 			-
		 * 			<= Name_nick_field $mol_form_field
		 * 				name <= name_nick_label @ \Nick Name
		 * 				bid <= name_nick_bid \
		 * 				control <= Name_nick_control $mol_string
		 * 					hint <= name_nick_hint @ \Capitan
		 * 					value?val <=> name_nick?val \
		 * 			-
		 * 			<= Name_second_field $mol_form_field
		 * 				name <= name_second_label @ \Second Name
		 * 				bid <= name_second_bid \
		 * 				control <= Name_second_control $mol_string
		 * 					hint <= name_second_hint @ \Sparrow
		 * 					value?val <=> name_second?val \
		 * 			-
		 * 			<= Sex_field $mol_form_field
		 * 				name <= sex_label @ \Sex
		 * 				bid <= sex_bid \
		 * 				control <= Sex_control $mol_switch
		 * 					value?val <=> sex?val \
		 * 					options <= sex_options *
		 * 						male <= sex_option_male @ \Male
		 * 						intersex <= sex_option_intersex @ \Intersex
		 * 						female <= sex_option_female @ \Female
		 * 			-
		 * 			<= Mail_field $mol_form_field
		 * 				name <= mail_label @ \E-mail
		 * 				bid <= mail_bid \
		 * 				control <= Mail_control $mol_string
		 * 					hint <= mail_hint @ \name@domain.com
		 * 					value?val <=> mail?val \
		 * 		buttons / <= Submit $mol_button_major
		 * 			sub / <= submit_text @ \Sign Up
		 * 			click?val <=> submit?val null
		 * 			enabled <= submit_allowed true
		 * 	<= Message $mol_view sub / <= message?val \
		 * ```
		 */
		sub() {
			return [
				this.Form(),
				this.Message()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Form $mol_form
		 * 	submit?val <=> submit?val null
		 * 	form_fields /
		 * 		-
		 * 		<= Name_first_field $mol_form_field
		 * 			name <= name_first_label @ \First Name
		 * 			bid <= name_first_bid \
		 * 			control <= Name_first_control $mol_string
		 * 				hint <= name_first_hint @ \Jack
		 * 				value?val <=> name_first?val \
		 * 		-
		 * 		<= Name_nick_field $mol_form_field
		 * 			name <= name_nick_label @ \Nick Name
		 * 			bid <= name_nick_bid \
		 * 			control <= Name_nick_control $mol_string
		 * 				hint <= name_nick_hint @ \Capitan
		 * 				value?val <=> name_nick?val \
		 * 		-
		 * 		<= Name_second_field $mol_form_field
		 * 			name <= name_second_label @ \Second Name
		 * 			bid <= name_second_bid \
		 * 			control <= Name_second_control $mol_string
		 * 				hint <= name_second_hint @ \Sparrow
		 * 				value?val <=> name_second?val \
		 * 		-
		 * 		<= Sex_field $mol_form_field
		 * 			name <= sex_label @ \Sex
		 * 			bid <= sex_bid \
		 * 			control <= Sex_control $mol_switch
		 * 				value?val <=> sex?val \
		 * 				options <= sex_options *
		 * 					male <= sex_option_male @ \Male
		 * 					intersex <= sex_option_intersex @ \Intersex
		 * 					female <= sex_option_female @ \Female
		 * 		-
		 * 		<= Mail_field $mol_form_field
		 * 			name <= mail_label @ \E-mail
		 * 			bid <= mail_bid \
		 * 			control <= Mail_control $mol_string
		 * 				hint <= mail_hint @ \name@domain.com
		 * 				value?val <=> mail?val \
		 * 	buttons / <= Submit $mol_button_major
		 * 		sub / <= submit_text @ \Sign Up
		 * 		click?val <=> submit?val null
		 * 		enabled <= submit_allowed true
		 * ```
		 */
		@ $mol_mem
		Form() {
			const obj = new this.$.$mol_form()

			obj.submit = (val?: any) => this.submit(val)
			obj.form_fields = () => [

				this.Name_first_field(),

				this.Name_nick_field(),

				this.Name_second_field(),

				this.Sex_field(),

				this.Mail_field()
			] as readonly any[]
			obj.buttons = () => [
				this.Submit()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * submit?val null
		 * ```
		 */
		@ $mol_mem
		submit(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * Name_first_field $mol_form_field
		 * 	name <= name_first_label @ \First Name
		 * 	bid <= name_first_bid \
		 * 	control <= Name_first_control $mol_string
		 * 		hint <= name_first_hint @ \Jack
		 * 		value?val <=> name_first?val \
		 * ```
		 */
		@ $mol_mem
		Name_first_field() {
			const obj = new this.$.$mol_form_field()

			obj.name = () => this.name_first_label()
			obj.bid = () => this.name_first_bid()
			obj.control = () => this.Name_first_control()

			return obj
		}

		/**
		 * ```tree
		 * name_first_label @ \First Name
		 * ```
		 */
		name_first_label() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_name_first_label' )
		}

		/**
		 * ```tree
		 * name_first_bid \
		 * ```
		 */
		name_first_bid() {
			return ""
		}

		/**
		 * ```tree
		 * Name_first_control $mol_string
		 * 	hint <= name_first_hint @ \Jack
		 * 	value?val <=> name_first?val \
		 * ```
		 */
		@ $mol_mem
		Name_first_control() {
			const obj = new this.$.$mol_string()

			obj.hint = () => this.name_first_hint()
			obj.value = (val?: any) => this.name_first(val)

			return obj
		}

		/**
		 * ```tree
		 * name_first_hint @ \Jack
		 * ```
		 */
		name_first_hint() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_name_first_hint' )
		}

		/**
		 * ```tree
		 * name_first?val \
		 * ```
		 */
		@ $mol_mem
		name_first(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * Name_nick_field $mol_form_field
		 * 	name <= name_nick_label @ \Nick Name
		 * 	bid <= name_nick_bid \
		 * 	control <= Name_nick_control $mol_string
		 * 		hint <= name_nick_hint @ \Capitan
		 * 		value?val <=> name_nick?val \
		 * ```
		 */
		@ $mol_mem
		Name_nick_field() {
			const obj = new this.$.$mol_form_field()

			obj.name = () => this.name_nick_label()
			obj.bid = () => this.name_nick_bid()
			obj.control = () => this.Name_nick_control()

			return obj
		}

		/**
		 * ```tree
		 * name_nick_label @ \Nick Name
		 * ```
		 */
		name_nick_label() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_name_nick_label' )
		}

		/**
		 * ```tree
		 * name_nick_bid \
		 * ```
		 */
		name_nick_bid() {
			return ""
		}

		/**
		 * ```tree
		 * Name_nick_control $mol_string
		 * 	hint <= name_nick_hint @ \Capitan
		 * 	value?val <=> name_nick?val \
		 * ```
		 */
		@ $mol_mem
		Name_nick_control() {
			const obj = new this.$.$mol_string()

			obj.hint = () => this.name_nick_hint()
			obj.value = (val?: any) => this.name_nick(val)

			return obj
		}

		/**
		 * ```tree
		 * name_nick_hint @ \Capitan
		 * ```
		 */
		name_nick_hint() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_name_nick_hint' )
		}

		/**
		 * ```tree
		 * name_nick?val \
		 * ```
		 */
		@ $mol_mem
		name_nick(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * Name_second_field $mol_form_field
		 * 	name <= name_second_label @ \Second Name
		 * 	bid <= name_second_bid \
		 * 	control <= Name_second_control $mol_string
		 * 		hint <= name_second_hint @ \Sparrow
		 * 		value?val <=> name_second?val \
		 * ```
		 */
		@ $mol_mem
		Name_second_field() {
			const obj = new this.$.$mol_form_field()

			obj.name = () => this.name_second_label()
			obj.bid = () => this.name_second_bid()
			obj.control = () => this.Name_second_control()

			return obj
		}

		/**
		 * ```tree
		 * name_second_label @ \Second Name
		 * ```
		 */
		name_second_label() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_name_second_label' )
		}

		/**
		 * ```tree
		 * name_second_bid \
		 * ```
		 */
		name_second_bid() {
			return ""
		}

		/**
		 * ```tree
		 * Name_second_control $mol_string
		 * 	hint <= name_second_hint @ \Sparrow
		 * 	value?val <=> name_second?val \
		 * ```
		 */
		@ $mol_mem
		Name_second_control() {
			const obj = new this.$.$mol_string()

			obj.hint = () => this.name_second_hint()
			obj.value = (val?: any) => this.name_second(val)

			return obj
		}

		/**
		 * ```tree
		 * name_second_hint @ \Sparrow
		 * ```
		 */
		name_second_hint() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_name_second_hint' )
		}

		/**
		 * ```tree
		 * name_second?val \
		 * ```
		 */
		@ $mol_mem
		name_second(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * Sex_field $mol_form_field
		 * 	name <= sex_label @ \Sex
		 * 	bid <= sex_bid \
		 * 	control <= Sex_control $mol_switch
		 * 		value?val <=> sex?val \
		 * 		options <= sex_options *
		 * 			male <= sex_option_male @ \Male
		 * 			intersex <= sex_option_intersex @ \Intersex
		 * 			female <= sex_option_female @ \Female
		 * ```
		 */
		@ $mol_mem
		Sex_field() {
			const obj = new this.$.$mol_form_field()

			obj.name = () => this.sex_label()
			obj.bid = () => this.sex_bid()
			obj.control = () => this.Sex_control()

			return obj
		}

		/**
		 * ```tree
		 * sex_label @ \Sex
		 * ```
		 */
		sex_label() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_sex_label' )
		}

		/**
		 * ```tree
		 * sex_bid \
		 * ```
		 */
		sex_bid() {
			return ""
		}

		/**
		 * ```tree
		 * Sex_control $mol_switch
		 * 	value?val <=> sex?val \
		 * 	options <= sex_options *
		 * 		male <= sex_option_male @ \Male
		 * 		intersex <= sex_option_intersex @ \Intersex
		 * 		female <= sex_option_female @ \Female
		 * ```
		 */
		@ $mol_mem
		Sex_control() {
			const obj = new this.$.$mol_switch()

			obj.value = (val?: any) => this.sex(val)
			obj.options = () => this.sex_options()

			return obj
		}

		/**
		 * ```tree
		 * sex?val \
		 * ```
		 */
		@ $mol_mem
		sex(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * sex_options *
		 * 	male <= sex_option_male @ \Male
		 * 	intersex <= sex_option_intersex @ \Intersex
		 * 	female <= sex_option_female @ \Female
		 * ```
		 */
		sex_options() {
			return {
				male: this.sex_option_male(),
				intersex: this.sex_option_intersex(),
				female: this.sex_option_female()
			}
		}

		/**
		 * ```tree
		 * sex_option_male @ \Male
		 * ```
		 */
		sex_option_male() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_sex_option_male' )
		}

		/**
		 * ```tree
		 * sex_option_intersex @ \Intersex
		 * ```
		 */
		sex_option_intersex() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_sex_option_intersex' )
		}

		/**
		 * ```tree
		 * sex_option_female @ \Female
		 * ```
		 */
		sex_option_female() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_sex_option_female' )
		}

		/**
		 * ```tree
		 * Mail_field $mol_form_field
		 * 	name <= mail_label @ \E-mail
		 * 	bid <= mail_bid \
		 * 	control <= Mail_control $mol_string
		 * 		hint <= mail_hint @ \name@domain.com
		 * 		value?val <=> mail?val \
		 * ```
		 */
		@ $mol_mem
		Mail_field() {
			const obj = new this.$.$mol_form_field()

			obj.name = () => this.mail_label()
			obj.bid = () => this.mail_bid()
			obj.control = () => this.Mail_control()

			return obj
		}

		/**
		 * ```tree
		 * mail_label @ \E-mail
		 * ```
		 */
		mail_label() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_mail_label' )
		}

		/**
		 * ```tree
		 * mail_bid \
		 * ```
		 */
		mail_bid() {
			return ""
		}

		/**
		 * ```tree
		 * Mail_control $mol_string
		 * 	hint <= mail_hint @ \name@domain.com
		 * 	value?val <=> mail?val \
		 * ```
		 */
		@ $mol_mem
		Mail_control() {
			const obj = new this.$.$mol_string()

			obj.hint = () => this.mail_hint()
			obj.value = (val?: any) => this.mail(val)

			return obj
		}

		/**
		 * ```tree
		 * mail_hint @ \name@domain.com
		 * ```
		 */
		mail_hint() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_mail_hint' )
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
		 * Submit $mol_button_major
		 * 	sub / <= submit_text @ \Sign Up
		 * 	click?val <=> submit?val null
		 * 	enabled <= submit_allowed true
		 * ```
		 */
		@ $mol_mem
		Submit() {
			const obj = new this.$.$mol_button_major()

			obj.sub = () => [
				this.submit_text()
			] as readonly any[]
			obj.click = (val?: any) => this.submit(val)
			obj.enabled = () => this.submit_allowed()

			return obj
		}

		/**
		 * ```tree
		 * submit_text @ \Sign Up
		 * ```
		 */
		submit_text() {
			return this.$.$mol_locale.text( '$mol_form_demo_bids_submit_text' )
		}

		/**
		 * ```tree
		 * submit_allowed true
		 * ```
		 */
		submit_allowed() {
			return true
		}

		/**
		 * ```tree
		 * Message $mol_view sub / <= message?val \
		 * ```
		 */
		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.message()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * message?val \
		 * ```
		 */
		@ $mol_mem
		message(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}
	}

}
