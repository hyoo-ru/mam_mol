namespace $ {
	export class $mol_text_code_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Markdow visualization example
		 * ```
		 */
		title() {
			return "Markdow visualization example"
		}
		
		/**
		 * ```tree
		 * sub / <= Text
		 * ```
		 */
		sub() {
			return [
				this.Text()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\text
		 * 	\code
		 * 	\syntax highlighting
		 * ```
		 */
		tags() {
			return [
				"text",
				"code",
				"syntax highlighting"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * source \
		 * ```
		 */
		source() {
			return ""
		}
		
		/**
		 * ```tree
		 * Text $mol_text_code
		 * 	sidebar_showed true
		 * 	text <= source
		 * ```
		 */
		@ $mol_mem
		Text() {
			const obj = new this.$.$mol_text_code()
			
			obj.sidebar_showed = () => true
			obj.text = () => this.source()
			
			return obj
		}
	}
	
}

