namespace $ {
	export class $mol_app_hello extends $mol_view {
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Name
		 * 	<= Greeting
		 * ```
		 */
		sub() {
			return [
				this.Name(),
				this.Greeting()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * name_hint \Name
		 * ```
		 */
		name_hint() {
			return "Name"
		}
		
		/**
		 * ```tree
		 * name? \
		 * ```
		 */
		@ $mol_mem
		name(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Name $mol_string
		 * 	hint <= name_hint
		 * 	value? <=> name?
		 * ```
		 */
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string()
			
			obj.hint = () => this.name_hint()
			obj.value = (next?: any) => this.name(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * greeting \
		 * ```
		 */
		greeting() {
			return ""
		}
		
		/**
		 * ```tree
		 * Greeting $mol_view sub / <= greeting
		 * ```
		 */
		@ $mol_mem
		Greeting() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.greeting()
			] as readonly any[]
			
			return obj
		}
	}
	
}

