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
		 * 	<= Ip
		 * 	<= Phone
		 * 	<= Card
		 * 	<= Moment
		 * ```
		 */
		sub() {
			return [
				this.Ip(),
				this.Phone(),
				this.Card(),
				this.Moment()
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
		 * Ip_in $mol_format
		 * 	mask \___.___.___.___
		 * 	value? <=> ip?
		 * ```
		 */
		@ $mol_mem
		Ip_in() {
			const obj = new this.$.$mol_format()
			
			obj.mask = () => "___.___.___.___"
			obj.value = (next?: any) => this.ip(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Ip_out $mol_card title <= ip
		 * ```
		 */
		@ $mol_mem
		Ip_out() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => this.ip()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Ip $mol_list rows /
		 * 	<= Ip_in
		 * 	<= Ip_out
		 * ```
		 */
		@ $mol_mem
		Ip() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Ip_in(),
				this.Ip_out()
			] as readonly any[]
			
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
		 * Phone_in $mol_phone value? <=> phone?
		 * ```
		 */
		@ $mol_mem
		Phone_in() {
			const obj = new this.$.$mol_phone()
			
			obj.value = (next?: any) => this.phone(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Phone_out $mol_card title <= phone
		 * ```
		 */
		@ $mol_mem
		Phone_out() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => this.phone()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Phone $mol_list rows /
		 * 	<= Phone_in
		 * 	<= Phone_out
		 * ```
		 */
		@ $mol_mem
		Phone() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Phone_in(),
				this.Phone_out()
			] as readonly any[]
			
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
		 * Card_in $mol_format
		 * 	mask \____ ____ ____ ____
		 * 	value? <=> card?
		 * ```
		 */
		@ $mol_mem
		Card_in() {
			const obj = new this.$.$mol_format()
			
			obj.mask = () => "____ ____ ____ ____"
			obj.value = (next?: any) => this.card(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Card_out $mol_card title <= card
		 * ```
		 */
		@ $mol_mem
		Card_out() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => this.card()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Card $mol_list rows /
		 * 	<= Card_in
		 * 	<= Card_out
		 * ```
		 */
		@ $mol_mem
		Card() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Card_in(),
				this.Card_out()
			] as readonly any[]
			
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
		 * Moment_in $mol_format
		 * 	mask \__.__.____ __:__
		 * 	value? <=> moment?
		 * ```
		 */
		@ $mol_mem
		Moment_in() {
			const obj = new this.$.$mol_format()
			
			obj.mask = () => "__.__.____ __:__"
			obj.value = (next?: any) => this.moment(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Moment_out $mol_card title <= moment
		 * ```
		 */
		@ $mol_mem
		Moment_out() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => this.moment()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Moment $mol_list rows /
		 * 	<= Moment_in
		 * 	<= Moment_out
		 * ```
		 */
		@ $mol_mem
		Moment() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Moment_in(),
				this.Moment_out()
			] as readonly any[]
			
			return obj
		}
	}
	
}

