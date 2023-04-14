namespace $ {
	export class $mol_button_open extends $mol_button_minor {
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Icon
		 * 	<= Native
		 * ```
		 */
		sub() {
			return [
				this.Icon(),
				this.Native()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Icon $mol_icon_upload
		 * ```
		 */
		@ $mol_mem
		Icon() {
			const obj = new this.$.$mol_icon_upload()
			
			return obj
		}
		
		/**
		 * ```tree
		 * files?next /
		 * ```
		 */
		@ $mol_mem
		files(next?: any) {
			if ( next !== undefined ) return next as never
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * accept \
		 * ```
		 */
		accept() {
			return ""
		}
		
		/**
		 * ```tree
		 * multiple true
		 * ```
		 */
		multiple() {
			return true
		}
		
		/**
		 * ```tree
		 * Native $mol_button_open_native
		 * 	files?next <=> files?next
		 * 	accept <= accept
		 * 	multiple <= multiple
		 * ```
		 */
		@ $mol_mem
		Native() {
			const obj = new this.$.$mol_button_open_native()
			
			obj.files = (next?: any) => this.files(next)
			obj.accept = () => this.accept()
			obj.multiple = () => this.multiple()
			
			return obj
		}
	}
	
	export class $mol_button_open_native extends $mol_view {
		
		/**
		 * ```tree
		 * dom_name \input
		 * ```
		 */
		dom_name() {
			return "input"
		}
		
		/**
		 * ```tree
		 * files?next /
		 * ```
		 */
		@ $mol_mem
		files(next?: any) {
			if ( next !== undefined ) return next as never
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	type \file
		 * 	accept <= accept
		 * 	multiple <= multiple
		 * ```
		 */
		attr() {
			return {
				type: "file",
				accept: this.accept(),
				multiple: this.multiple()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * event * change?next <=> picked?next
		 * ```
		 */
		event() {
			return {
				change: (next?: any) => this.picked(next)
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * accept \
		 * ```
		 */
		accept() {
			return ""
		}
		
		/**
		 * ```tree
		 * multiple true
		 * ```
		 */
		multiple() {
			return true
		}
		
		/**
		 * ```tree
		 * picked?next null
		 * ```
		 */
		@ $mol_mem
		picked(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
	}
	
}

