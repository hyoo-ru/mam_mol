namespace $ {
	export class $mol_format_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Formatted string input/output
		 * ```
		 */
		title() {
			return "Formatted string input/output"
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Ip_card
		 * 	<= Phone_card
		 * 	<= Card_card
		 * 	<= Moment_card
		 * ```
		 */
		sub() {
			return [
				this.Ip_card(),
				this.Phone_card(),
				this.Card_card(),
				this.Moment_card()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_format
		 * 	\$mol_string
		 * 	\$mol_phone
		 * 	\input
		 * ```
		 */
		tags() {
			return [
				"$mol_format",
				"$mol_string",
				"$mol_phone",
				"input"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Control
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * ip? \
		 * ```
		 */
		@ $mol_mem
		ip(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Ip $mol_format
		 * 	mask \___.___.___.___
		 * 	value? <=> ip?
		 * ```
		 */
		@ $mol_mem
		Ip() {
			const obj = new this.$.$mol_format()
			
			obj.mask = () => "___.___.___.___"
			obj.value = (next?: any) => this.ip(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Ip_card $mol_card
		 * 	status <= ip
		 * 	Content <= Ip
		 * ```
		 */
		@ $mol_mem
		Ip_card() {
			const obj = new this.$.$mol_card()
			
			obj.status = () => this.ip()
			obj.Content = () => this.Ip()
			
			return obj
		}
		
		/**
		 * ```tree
		 * phone? \
		 * ```
		 */
		@ $mol_mem
		phone(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Phone $mol_phone value? <=> phone?
		 * ```
		 */
		@ $mol_mem
		Phone() {
			const obj = new this.$.$mol_phone()
			
			obj.value = (next?: any) => this.phone(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Phone_card $mol_card
		 * 	status <= phone
		 * 	Content <= Phone
		 * ```
		 */
		@ $mol_mem
		Phone_card() {
			const obj = new this.$.$mol_card()
			
			obj.status = () => this.phone()
			obj.Content = () => this.Phone()
			
			return obj
		}
		
		/**
		 * ```tree
		 * card? \
		 * ```
		 */
		@ $mol_mem
		card(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Card $mol_format
		 * 	mask \____ ____ ____ ____
		 * 	value? <=> card?
		 * ```
		 */
		@ $mol_mem
		Card() {
			const obj = new this.$.$mol_format()
			
			obj.mask = () => "____ ____ ____ ____"
			obj.value = (next?: any) => this.card(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Card_card $mol_card
		 * 	status <= card
		 * 	Content <= Card
		 * ```
		 */
		@ $mol_mem
		Card_card() {
			const obj = new this.$.$mol_card()
			
			obj.status = () => this.card()
			obj.Content = () => this.Card()
			
			return obj
		}
		
		/**
		 * ```tree
		 * moment? \
		 * ```
		 */
		@ $mol_mem
		moment(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Moment $mol_format
		 * 	mask \__.__.____ __:__
		 * 	value? <=> moment?
		 * ```
		 */
		@ $mol_mem
		Moment() {
			const obj = new this.$.$mol_format()
			
			obj.mask = () => "__.__.____ __:__"
			obj.value = (next?: any) => this.moment(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Moment_card $mol_card
		 * 	status <= moment
		 * 	Content <= Moment
		 * ```
		 */
		@ $mol_mem
		Moment_card() {
			const obj = new this.$.$mol_card()
			
			obj.status = () => this.moment()
			obj.Content = () => this.Moment()
			
			return obj
		}
	}
	
}

