namespace $ {
	export class $mol_spell_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * sub / <= List
		 * ```
		 */
		sub() {
			return [
				this.List()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_spell_check
		 * 	\$mol_textarea
		 * 	\spellcheck
		 * ```
		 */
		tags() {
			return [
				"$mol_spell_check",
				"$mol_textarea",
				"spellcheck"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * article? \Я весьма сегдян недоперепила, вттак.
		 * ```
		 */
		@ $mol_mem
		article(next?: any) {
			if ( next !== undefined ) return next as never
			return "Я весьма сегдян недоперепила, вттак."
		}
		
		/**
		 * ```tree
		 * Article $mol_textarea value? <=> article?
		 * ```
		 */
		@ $mol_mem
		Article() {
			const obj = new this.$.$mol_textarea()
			
			obj.value = (next?: any) => this.article(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * report \
		 * ```
		 */
		report() {
			return ""
		}
		
		/**
		 * ```tree
		 * Report $mol_text_code text <= report
		 * ```
		 */
		@ $mol_mem
		Report() {
			const obj = new this.$.$mol_text_code()
			
			obj.text = () => this.report()
			
			return obj
		}
		
		/**
		 * ```tree
		 * List $mol_list rows /
		 * 	<= Article
		 * 	<= Report
		 * ```
		 */
		@ $mol_mem
		List() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Article(),
				this.Report()
			] as readonly any[]
			
			return obj
		}
	}
	
}

