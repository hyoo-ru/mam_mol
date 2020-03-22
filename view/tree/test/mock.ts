namespace $ {
	export const $mol_view_tree_test_mock = {
		tree: `$mol_string $mol_view
	dom_name \\input
	enabled true
	debounce 0
	autocomplete false
	field *
		^
		disabled <= disabled false
		value <= value_changed?val <=> value?val \\
		placeholder <= hint \\
		type <= type?val \\text
		keydown?event <=> event_key_press?event null
`,
	ts: `namespace $ { export class $mol_string extends $mol_view {

		/**
		 *  \`\`\`
		 *  dom_name \input
		 *  \`\`\`
		 **/
		dom_name() {
			return "input"
		}
	
		/**
		 *  \`\`\`
		 *  enabled true
		 *  \`\`\`
		 **/
		enabled() {
			return true
		}
	
		/**
		 *  \`\`\`
		 *  debounce 0
		 *  \`\`\`
		 **/
		debounce() {
			return 0
		}
	
		/**
		 *  \`\`\`
		 *  autocomplete false
		 *  \`\`\`
		 **/
		autocomplete() {
			return false
		}
	
		/**
		 *  \`\`\`
		 *  field * ^
		 *  	disabled <= disabled
		 *  	value <= value_changed?val
		 *  	placeholder <= hint
		 *  	type <= type?val
		 *  	keydown?event <=> event_key_press?event
		 *  \`\`\`
		 **/
		field() {
			return ({
				...super.field() ,
			})
		}
	
		/**
		 *  \`\`\`
		 *  disabled false
		 *  \`\`\`
		 **/
		disabled() {
			return false
		}
	
		/**
		 *  \`\`\`
		 *  value_changed?val <=> value?val
		 *  \`\`\`
		 **/
		@ $mol_mem
		value_changed( val? : any , force? : $mol_mem_force ) {
			return this.value( val )
		}
	
		/**
		 *  \`\`\`
		 *  value?val \
		 *  \`\`\`
		 **/
		@ $mol_mem
		value( val? : any , force? : $mol_mem_force ) {
			return ( val !== void 0 ) ? val : ""
		}
	
		/**
		 *  \`\`\`
		 *  hint \
		 *  \`\`\`
		 **/
		hint() {
			return ""
		}
	
		/**
		 *  \`\`\`
		 *  type?val \text
		 *  \`\`\`
		 **/
		@ $mol_mem
		type( val? : any , force? : $mol_mem_force ) {
			return ( val !== void 0 ) ? val : "text"
		}
	
		/**
		 *  \`\`\`
		 *  event_key_press?event null
		 *  \`\`\`
		 **/
		@ $mol_mem
		event_key_press( event? : any , force? : $mol_mem_force ) {
			return ( event !== void 0 ) ? event : null as any
		}
	
	} }`,
	}
}
