namespace $ {
	export class $mol_speck_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Link
		 * 	<= String
		 * 	<= Button
		 * 	<= Message
		 * ```
		 */
		sub() {
			return [
				this.Link(),
				this.String(),
				this.Button(),
				this.Message()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_link
		 * 	\$mol_icon
		 * 	\$mol_paragraph
		 * 	\$mol_button
		 * 	\speck
		 * 	\highlight
		 * ```
		 */
		tags() {
			return [
				"$mol_link",
				"$mol_icon",
				"$mol_paragraph",
				"$mol_button",
				"speck",
				"highlight"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Link_speck $mol_speck value \β
		 * ```
		 */
		@ $mol_mem
		Link_speck() {
			const obj = new this.$.$mol_speck()
			
			obj.value = () => "β"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Link_icon $mol_icon_settings
		 * ```
		 */
		@ $mol_mem
		Link_icon() {
			const obj = new this.$.$mol_icon_settings()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Link $mol_link sub /
		 * 	<= Link_speck
		 * 	<= Link_icon
		 * ```
		 */
		@ $mol_mem
		Link() {
			const obj = new this.$.$mol_link()
			
			obj.sub = () => [
				this.Link_speck(),
				this.Link_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * string_speck @ \New
		 * ```
		 */
		string_speck() {
			return this.$.$mol_locale.text( '$mol_speck_demo_string_speck' )
		}
		
		/**
		 * ```tree
		 * String_speck $mol_speck value <= string_speck
		 * ```
		 */
		@ $mol_mem
		String_speck() {
			const obj = new this.$.$mol_speck()
			
			obj.value = () => this.string_speck()
			
			return obj
		}
		
		/**
		 * ```tree
		 * String_field $mol_string
		 * ```
		 */
		@ $mol_mem
		String_field() {
			const obj = new this.$.$mol_string()
			
			return obj
		}
		
		/**
		 * ```tree
		 * String $mol_view sub /
		 * 	<= String_speck
		 * 	<= String_field
		 * ```
		 */
		@ $mol_mem
		String() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.String_speck(),
				this.String_field()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * notification_count 8
		 * ```
		 */
		notification_count() {
			return 8
		}
		
		/**
		 * ```tree
		 * Button_speck $mol_speck value <= notification_count
		 * ```
		 */
		@ $mol_mem
		Button_speck() {
			const obj = new this.$.$mol_speck()
			
			obj.value = () => this.notification_count()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Button_icon $mol_icon_menu
		 * ```
		 */
		@ $mol_mem
		Button_icon() {
			const obj = new this.$.$mol_icon_menu()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Button $mol_button_minor sub /
		 * 	<= Button_speck
		 * 	<= Button_icon
		 * ```
		 */
		@ $mol_mem
		Button() {
			const obj = new this.$.$mol_button_minor()
			
			obj.sub = () => [
				this.Button_speck(),
				this.Button_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Message_speck $mol_speck
		 * ```
		 */
		@ $mol_mem
		Message_speck() {
			const obj = new this.$.$mol_speck()
			
			return obj
		}
		
		/**
		 * ```tree
		 * message_text @ \Created
		 * ```
		 */
		message_text() {
			return this.$.$mol_locale.text( '$mol_speck_demo_message_text' )
		}
		
		/**
		 * ```tree
		 * Message $mol_paragraph sub /
		 * 	<= Message_speck
		 * 	<= message_text
		 * ```
		 */
		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_paragraph()
			
			obj.sub = () => [
				this.Message_speck(),
				this.message_text()
			] as readonly any[]
			
			return obj
		}
	}
	
}

