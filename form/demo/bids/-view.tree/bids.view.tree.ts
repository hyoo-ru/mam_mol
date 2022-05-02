namespace $ {
	export class $mol_form_demo_bids extends $mol_example {
		
		/**
		 * ```tree
		 * title \Sign Up form demo
		 * ```
		 */
		title() {
			return "Sign Up form demo"
		}
		
		/**
		 * ```tree
		 * message *
		 * 	required \Required
		 * 	adult \18+ only
		 * 	no_spaces \No spaces!
		 * 	need_more_letters \{count} or more letters
		 * 	need_at \is required
		 * 	only_one_at \At most one @
		 * 	no_tld \At least 2 level domain
		 * 	dots_inside \Dots can't be at edge
		 * 	no_space_domain \No space in domain name
		 * 	need_username \Username required
		 * ```
		 */
		message() {
			return {
				required: "Required",
				adult: "18+ only",
				no_spaces: "No spaces!",
				need_more_letters: "{count} or more letters",
				need_at: "is required",
				only_one_at: "At most one @",
				no_tld: "At least 2 level domain",
				dots_inside: "Dots can't be at edge",
				no_space_domain: "No space in domain name",
				need_username: "Username required"
			}
		}
		
		/**
		 * ```tree
		 * sub / <= Form
		 * ```
		 */
		sub() {
			return [
				this.Form()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_form_field
		 * 	\$mol_button
		 * 	\$mol_row
		 * 	\$mol_string
		 * 	\form
		 * 	\bids
		 * 	\validation
		 * 	\field
		 * ```
		 */
		tags() {
			return [
				"$mol_form_field",
				"$mol_button",
				"$mol_row",
				"$mol_string",
				"form",
				"bids",
				"validation",
				"field"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * avatars_bid \
		 * ```
		 */
		avatars_bid() {
			return ""
		}
		
		/**
		 * ```tree
		 * avatars?val /string
		 * ```
		 */
		@ $mol_mem
		avatars(val?: any) {
			if ( val !== undefined ) return val as never
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * Avatars_control $mol_attach items?val <=> avatars?val
		 * ```
		 */
		@ $mol_mem
		Avatars_control() {
			const obj = new this.$.$mol_attach()
			
			obj.items = (val?: any) => this.avatars(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Avatars_field $mol_form_field
		 * 	name \Avatars
		 * 	bid <= avatars_bid
		 * 	Content <= Avatars_control
		 * ```
		 */
		@ $mol_mem
		Avatars_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Avatars"
			obj.bid = () => this.avatars_bid()
			obj.Content = () => this.Avatars_control()
			
			return obj
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
		 * name_first?val \
		 * ```
		 */
		@ $mol_mem
		name_first(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Name_first_control $mol_string
		 * 	hint \Jack
		 * 	value?val <=> name_first?val
		 * ```
		 */
		@ $mol_mem
		Name_first_control() {
			const obj = new this.$.$mol_string()
			
			obj.hint = () => "Jack"
			obj.value = (val?: any) => this.name_first(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Name_first_field $mol_form_field
		 * 	name \First Name
		 * 	bid <= name_first_bid
		 * 	Content <= Name_first_control
		 * ```
		 */
		@ $mol_mem
		Name_first_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "First Name"
			obj.bid = () => this.name_first_bid()
			obj.Content = () => this.Name_first_control()
			
			return obj
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
		 * name_nick?val \
		 * ```
		 */
		@ $mol_mem
		name_nick(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Name_nick_control $mol_string
		 * 	hint \Capitan
		 * 	value?val <=> name_nick?val
		 * ```
		 */
		@ $mol_mem
		Name_nick_control() {
			const obj = new this.$.$mol_string()
			
			obj.hint = () => "Capitan"
			obj.value = (val?: any) => this.name_nick(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Name_nick_field $mol_form_field
		 * 	name \Nick Name
		 * 	bid <= name_nick_bid
		 * 	Content <= Name_nick_control
		 * ```
		 */
		@ $mol_mem
		Name_nick_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Nick Name"
			obj.bid = () => this.name_nick_bid()
			obj.Content = () => this.Name_nick_control()
			
			return obj
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
		 * name_second?val \
		 * ```
		 */
		@ $mol_mem
		name_second(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Name_second_control $mol_string
		 * 	hint \Sparrow
		 * 	value?val <=> name_second?val
		 * ```
		 */
		@ $mol_mem
		Name_second_control() {
			const obj = new this.$.$mol_string()
			
			obj.hint = () => "Sparrow"
			obj.value = (val?: any) => this.name_second(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Name_second_field $mol_form_field
		 * 	name \Second Name
		 * 	bid <= name_second_bid
		 * 	Content <= Name_second_control
		 * ```
		 */
		@ $mol_mem
		Name_second_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Second Name"
			obj.bid = () => this.name_second_bid()
			obj.Content = () => this.Name_second_control()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Names $mol_form_group sub /
		 * 	<= Name_first_field
		 * 	<= Name_nick_field
		 * 	<= Name_second_field
		 * ```
		 */
		@ $mol_mem
		Names() {
			const obj = new this.$.$mol_form_group()
			
			obj.sub = () => [
				this.Name_first_field(),
				this.Name_nick_field(),
				this.Name_second_field()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * age_bid \
		 * ```
		 */
		age_bid() {
			return ""
		}
		
		/**
		 * ```tree
		 * age?val 0
		 * ```
		 */
		@ $mol_mem
		age(val?: any) {
			if ( val !== undefined ) return val as never
			return 0
		}
		
		/**
		 * ```tree
		 * Age_control $mol_number value?val <=> age?val
		 * ```
		 */
		@ $mol_mem
		Age_control() {
			const obj = new this.$.$mol_number()
			
			obj.value = (val?: any) => this.age(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Age_field $mol_form_field
		 * 	name \Age
		 * 	bid <= age_bid
		 * 	control <= Age_control
		 * ```
		 */
		@ $mol_mem
		Age_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Age"
			obj.bid = () => this.age_bid()
			obj.control = () => this.Age_control()
			
			return obj
		}
		
		/**
		 * ```tree
		 * sex_label \Sex
		 * ```
		 */
		sex_label() {
			return "Sex"
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
		 * sex?val \
		 * ```
		 */
		@ $mol_mem
		sex(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * sex_options *
		 * 	male \Male
		 * 	intersex \Intersex
		 * 	female \Female
		 * ```
		 */
		sex_options() {
			return {
				male: "Male",
				intersex: "Intersex",
				female: "Female"
			}
		}
		
		/**
		 * ```tree
		 * Sex_control $mol_switch
		 * 	value?val <=> sex?val
		 * 	options <= sex_options
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
		 * Sex_field $mol_form_field
		 * 	name <= sex_label
		 * 	bid <= sex_bid
		 * 	Content <= Sex_control
		 * ```
		 */
		@ $mol_mem
		Sex_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => this.sex_label()
			obj.bid = () => this.sex_bid()
			obj.Content = () => this.Sex_control()
			
			return obj
		}
		
		/**
		 * ```tree
		 * color_bid \
		 * ```
		 */
		color_bid() {
			return ""
		}
		
		/**
		 * ```tree
		 * color?val \
		 * ```
		 */
		@ $mol_mem
		color(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Color_control $mol_select
		 * 	value?val <=> color?val
		 * 	dictionary *
		 * 		\
		 * 			\❔
		 * 		white \⬜ White
		 * 		yellow \🟨 Yellow
		 * 		brown \🟫 Brown
		 * 		red \🟥 Red
		 * ```
		 */
		@ $mol_mem
		Color_control() {
			const obj = new this.$.$mol_select()
			
			obj.value = (val?: any) => this.color(val)
			obj.dictionary = () => ({
				"": "❔",
				white: "⬜ White",
				yellow: "🟨 Yellow",
				brown: "🟫 Brown",
				red: "🟥 Red"
			})
			
			return obj
		}
		
		/**
		 * ```tree
		 * Color_field $mol_form_field
		 * 	name \Skin color
		 * 	bid <= color_bid
		 * 	control <= Color_control
		 * ```
		 */
		@ $mol_mem
		Color_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Skin color"
			obj.bid = () => this.color_bid()
			obj.control = () => this.Color_control()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Parameters $mol_form_group sub /
		 * 	<= Age_field
		 * 	<= Sex_field
		 * 	<= Color_field
		 * ```
		 */
		@ $mol_mem
		Parameters() {
			const obj = new this.$.$mol_form_group()
			
			obj.sub = () => [
				this.Age_field(),
				this.Sex_field(),
				this.Color_field()
			] as readonly any[]
			
			return obj
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
		 * mail?val \
		 * ```
		 */
		@ $mol_mem
		mail(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Mail_control $mol_string
		 * 	hint \name@domain.com
		 * 	value?val <=> mail?val
		 * ```
		 */
		@ $mol_mem
		Mail_control() {
			const obj = new this.$.$mol_string()
			
			obj.hint = () => "name@domain.com"
			obj.value = (val?: any) => this.mail(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Mail_field $mol_form_field
		 * 	name \E-mail
		 * 	bid <= mail_bid
		 * 	Content <= Mail_control
		 * ```
		 */
		@ $mol_mem
		Mail_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "E-mail"
			obj.bid = () => this.mail_bid()
			obj.Content = () => this.Mail_control()
			
			return obj
		}
		
		/**
		 * ```tree
		 * submit?val null
		 * ```
		 */
		@ $mol_mem
		submit(val?: any) {
			if ( val !== undefined ) return val as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Submit $mol_button_major
		 * 	title \Sign Up
		 * 	click?val <=> submit?val
		 * 	enabled <= submit_allowed
		 * ```
		 */
		@ $mol_mem
		Submit() {
			const obj = new this.$.$mol_button_major()
			
			obj.title = () => "Sign Up"
			obj.click = (val?: any) => this.submit(val)
			obj.enabled = () => this.submit_allowed()
			
			return obj
		}
		
		/**
		 * ```tree
		 * result?val \
		 * ```
		 */
		@ $mol_mem
		result(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Result $mol_status message <= result?val
		 * ```
		 */
		@ $mol_mem
		Result() {
			const obj = new this.$.$mol_status()
			
			obj.message = () => this.result()
			
			return obj
		}
		
		/**
		 * ```tree
		 * submit_allowed
		 * ```
		 */
		submit_allowed() {
			return this.Form().submit_allowed()
		}
		
		/**
		 * ```tree
		 * Form $mol_form
		 * 	body /
		 * 		<= Avatars_field
		 * 		<= Names
		 * 		<= Parameters
		 * 		<= Mail_field
		 * 	submit?val <=> submit?val
		 * 	submit_allowed => submit_allowed
		 * 	buttons /
		 * 		<= Submit
		 * 		<= Result
		 * ```
		 */
		@ $mol_mem
		Form() {
			const obj = new this.$.$mol_form()
			
			obj.body = () => [
				this.Avatars_field(),
				this.Names(),
				this.Parameters(),
				this.Mail_field()
			] as readonly any[]
			obj.submit = (val?: any) => this.submit(val)
			obj.buttons = () => [
				this.Submit(),
				this.Result()
			] as readonly any[]
			
			return obj
		}
	}
	
}

