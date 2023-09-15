namespace $ {
	export class $mol_textarea extends $mol_stack {
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_textarea_clickable <= clickable?
		 * 	mol_textarea_sidebar_showed <= sidebar_showed
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_textarea_clickable: this.clickable(),
				mol_textarea_sidebar_showed: this.sidebar_showed()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * event *
		 * 	keydown?event <=> press?event
		 * 	pointermove?event <=> hover?event
		 * ```
		 */
		event() {
			return {
				keydown: (event?: any) => this.press(event),
				pointermove: (event?: any) => this.hover(event)
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Edit
		 * 	<= View
		 * ```
		 */
		sub() {
			return [
				this.Edit(),
				this.View()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * symbols_alt *
		 * 	comma \<
		 * 	period \>
		 * 	dash \−
		 * 	equals \≈
		 * 	graveAccent \́
		 * 	forwardSlash \÷
		 * 	E \€
		 * 	X \×
		 * 	C \©
		 * 	P \§
		 * 	H \₽
		 * 	key0 \°
		 * 	key8 \•
		 * 	key2 \@
		 * 	key3 \#
		 * 	key4 \$
		 * 	key6 \^
		 * 	key7 \&
		 * 	bracketOpen \[
		 * 	bracketClose \]
		 * 	slashBack \|
		 * ```
		 */
		symbols_alt() {
			return {
				comma: "<",
				period: ">",
				dash: "−",
				equals: "≈",
				graveAccent: "́",
				forwardSlash: "÷",
				E: "€",
				X: "×",
				C: "©",
				P: "§",
				H: "₽",
				key0: "°",
				key8: "•",
				key2: "@",
				key3: "#",
				key4: "$",
				key6: "^",
				key7: "&",
				bracketOpen: "[",
				bracketClose: "]",
				slashBack: "|"
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * symbols_alt_shift *
		 * 	V \✅
		 * 	X \❌
		 * 	O \⭕
		 * 	key1 \❗
		 * 	key4 \💲
		 * 	key7 \❓
		 * 	comma \«
		 * 	period \»
		 * 	semicolon \“
		 * 	quoteSingle \”
		 * 	dash \—
		 * 	equals \≠
		 * 	graveAccent \̱
		 * 	bracketOpen \{
		 * 	bracketClose \}
		 * ```
		 */
		symbols_alt_shift() {
			return {
				V: "✅",
				X: "❌",
				O: "⭕",
				key1: "❗",
				key4: "💲",
				key7: "❓",
				comma: "«",
				period: "»",
				semicolon: "“",
				quoteSingle: "”",
				dash: "—",
				equals: "≠",
				graveAccent: "̱",
				bracketOpen: "{",
				bracketClose: "}"
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * clickable? false
		 * ```
		 */
		@ $mol_mem
		clickable(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * sidebar_showed false
		 * ```
		 */
		sidebar_showed() {
			return false
		}
		
		/**
		 * ```tree
		 * press?event null
		 * ```
		 */
		@ $mol_mem
		press(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * hover?event null
		 * ```
		 */
		@ $mol_mem
		hover(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * value? \
		 * ```
		 */
		@ $mol_mem
		value(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * hint \
		 * ```
		 */
		hint() {
			return " "
		}
		
		/**
		 * ```tree
		 * enabled true
		 * ```
		 */
		enabled() {
			return true
		}
		
		/**
		 * ```tree
		 * spellcheck true
		 * ```
		 */
		spellcheck() {
			return true
		}
		
		/**
		 * ```tree
		 * length_max +Infinity
		 * ```
		 */
		length_max() {
			return +Infinity
		}
		
		/**
		 * ```tree
		 * selection? /number
		 * ```
		 */
		@ $mol_mem
		selection(next?: any) {
			if ( next !== undefined ) return next as never
			return [
			] as readonly number[]
		}
		
		/**
		 * ```tree
		 * submit? null
		 * ```
		 */
		@ $mol_mem
		submit(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * submit_with_ctrl true
		 * ```
		 */
		submit_with_ctrl() {
			return true
		}
		
		/**
		 * ```tree
		 * bring
		 * ```
		 */
		bring() {
			return this.Edit().bring()
		}
		
		/**
		 * ```tree
		 * Edit $mol_textarea_edit
		 * 	value? <=> value?
		 * 	hint <= hint
		 * 	enabled <= enabled
		 * 	spellcheck <= spellcheck
		 * 	length_max <= length_max
		 * 	selection? <=> selection?
		 * 	bring => bring
		 * 	submit? <=> submit?
		 * 	submit_with_ctrl <= submit_with_ctrl
		 * ```
		 */
		@ $mol_mem
		Edit() {
			const obj = new this.$.$mol_textarea_edit()
			
			obj.value = (next?: any) => this.value(next)
			obj.hint = () => this.hint()
			obj.enabled = () => this.enabled()
			obj.spellcheck = () => this.spellcheck()
			obj.length_max = () => this.length_max()
			obj.selection = (next?: any) => this.selection(next)
			obj.submit = (next?: any) => this.submit(next)
			obj.submit_with_ctrl = () => this.submit_with_ctrl()
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_numb* 0
		 * ```
		 */
		row_numb(id: any) {
			return 0
		}
		
		/**
		 * ```tree
		 * highlight \
		 * ```
		 */
		highlight() {
			return ""
		}
		
		/**
		 * ```tree
		 * View $mol_text_code
		 * 	text <= value
		 * 	render_visible_only false
		 * 	row_numb* <= row_numb*
		 * 	sidebar_showed <= sidebar_showed
		 * 	highlight <= highlight
		 * ```
		 */
		@ $mol_mem
		View() {
			const obj = new this.$.$mol_text_code()
			
			obj.text = () => this.value()
			obj.render_visible_only = () => false
			obj.row_numb = (id: any) => this.row_numb(id)
			obj.sidebar_showed = () => this.sidebar_showed()
			obj.highlight = () => this.highlight()
			
			return obj
		}
	}
	
	export class $mol_textarea_edit extends $mol_string {
		
		/**
		 * ```tree
		 * dom_name \textarea
		 * ```
		 */
		dom_name() {
			return "textarea"
		}
		
		/**
		 * ```tree
		 * enter \enter
		 * ```
		 */
		enter() {
			return "enter"
		}
		
		/**
		 * ```tree
		 * field *
		 * 	^
		 * 	scrollTop 0
		 * ```
		 */
		field() {
			return {
				...super.field(),
				scrollTop: 0
			} as Record< string, any >
		}
	}
	
}

