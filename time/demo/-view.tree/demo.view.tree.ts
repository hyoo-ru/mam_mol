namespace $ {
	export class $mol_time_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \Time processing library sandbox
		 * ```
		 */
		title() {
			return "Time processing library sandbox"
		}
		
		/**
		 * ```tree
		 * sub / <= Sandbox
		 * ```
		 */
		sub() {
			return [
				this.Sandbox()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_time
		 * 	\moment
		 * 	\duraion
		 * 	\interval
		 * ```
		 */
		tags() {
			return [
				"$mol_time",
				"moment",
				"duraion",
				"interval"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * code?val \
		 * 	\const now = new $mol_time_moment;
		 * 	\const today = now.toString( 'YYYY-MM-DD' );
		 * 	\const tomorrow = now.shift( 'P1D' ).toString( 'DD Mon' );
		 * 	\
		 * 	\const week = new $mol_time_duration( 'P7D' );
		 * 	\const days = week.count( 'P1D' );
		 * 	\
		 * 	\const nextYear = new $mol_time_interval( '/P1Y' );
		 * 	\const anniversary = nextYear.end.toString( 'YYYY-MM-DD hh:mm' );
		 * 	\
		 * 	\({ now, today, tomorrow, week, days, nextYear, anniversary });
		 * ```
		 */
		@ $mol_mem
		code(val?: any) {
			if ( val !== undefined ) return val as never
			return "const now = new $mol_time_moment;\nconst today = now.toString( 'YYYY-MM-DD' );\nconst tomorrow = now.shift( 'P1D' ).toString( 'DD Mon' );\n\nconst week = new $mol_time_duration( 'P7D' );\nconst days = week.count( 'P1D' );\n\nconst nextYear = new $mol_time_interval( '/P1Y' );\nconst anniversary = nextYear.end.toString( 'YYYY-MM-DD hh:mm' );\n\n({ now, today, tomorrow, week, days, nextYear, anniversary });"
		}
		
		/**
		 * ```tree
		 * Sandbox $hyoo_js_eval code?val <=> code?val
		 * ```
		 */
		@ $mol_mem
		Sandbox() {
			const obj = new this.$.$hyoo_js_eval()
			
			obj.code = (val?: any) => this.code(val)
			
			return obj
		}
	}
	
}

