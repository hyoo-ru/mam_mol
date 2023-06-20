namespace $ {
	export class $mol_paginator extends $mol_bar {
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Backward
		 * 	<= Value
		 * 	<= Forward
		 * ```
		 */
		sub() {
			return [
				this.Backward(),
				this.Value(),
				this.Forward()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * backward_hint @ \Backward
		 * ```
		 */
		backward_hint() {
			return this.$.$mol_locale.text( '$mol_paginator_backward_hint' )
		}
		
		/**
		 * ```tree
		 * backward?event null
		 * ```
		 */
		@ $mol_mem
		backward(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Backward_icon $mol_icon_chevron_left
		 * ```
		 */
		@ $mol_mem
		Backward_icon() {
			const obj = new this.$.$mol_icon_chevron_left()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Backward $mol_button_minor
		 * 	hint <= backward_hint
		 * 	click?event <=> backward?event
		 * 	sub / <= Backward_icon
		 * ```
		 */
		@ $mol_mem
		Backward() {
			const obj = new this.$.$mol_button_minor()
			
			obj.hint = () => this.backward_hint()
			obj.click = (event?: any) => this.backward(event)
			obj.sub = () => [
				this.Backward_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * value? 0
		 * ```
		 */
		@ $mol_mem
		value(next?: any) {
			if ( next !== undefined ) return next as never
			return 0
		}
		
		/**
		 * ```tree
		 * Value $mol_view sub / <= value?
		 * ```
		 */
		@ $mol_mem
		Value() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.value()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * forward_hint @ \Forward
		 * ```
		 */
		forward_hint() {
			return this.$.$mol_locale.text( '$mol_paginator_forward_hint' )
		}
		
		/**
		 * ```tree
		 * forward?event null
		 * ```
		 */
		@ $mol_mem
		forward(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Forward_icon $mol_icon_chevron_right
		 * ```
		 */
		@ $mol_mem
		Forward_icon() {
			const obj = new this.$.$mol_icon_chevron_right()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Forward $mol_button_minor
		 * 	hint <= forward_hint
		 * 	click?event <=> forward?event
		 * 	sub / <= Forward_icon
		 * ```
		 */
		@ $mol_mem
		Forward() {
			const obj = new this.$.$mol_button_minor()
			
			obj.hint = () => this.forward_hint()
			obj.click = (event?: any) => this.forward(event)
			obj.sub = () => [
				this.Forward_icon()
			] as readonly any[]
			
			return obj
		}
	}
	
}

