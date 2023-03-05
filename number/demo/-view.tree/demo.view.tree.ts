namespace $ {
	export class $mol_number_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Number input control with various configuration
		 * ```
		 */
		title() {
			return "Number input control with various configuration"
		}
		
		/**
		 * ```tree
		 * value? +NaN
		 * ```
		 */
		@ $mol_mem
		value(next?: any) {
			if ( next !== undefined ) return next as never
			return +NaN
		}
		
		/**
		 * ```tree
		 * sub / <= Rows
		 * ```
		 */
		sub() {
			return [
				this.Rows()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_labeler
		 * 	\$mol_number
		 * 	\$mol_section
		 * 	\number
		 * 	\field
		 * 	\label
		 * 	\section
		 * ```
		 */
		tags() {
			return [
				"$mol_labeler",
				"$mol_number",
				"$mol_section",
				"number",
				"field",
				"label",
				"section"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * value_string \
		 * ```
		 */
		value_string() {
			return ""
		}
		
		/**
		 * ```tree
		 * Value_string $mol_string
		 * 	value <= value_string
		 * 	disabled true
		 * ```
		 */
		@ $mol_mem
		Value_string() {
			const obj = new this.$.$mol_string()
			
			obj.value = () => this.value_string()
			obj.disabled = () => true
			
			return obj
		}
		
		/**
		 * ```tree
		 * reset_enabled true
		 * ```
		 */
		reset_enabled() {
			return true
		}
		
		/**
		 * ```tree
		 * reset_value? null
		 * ```
		 */
		@ $mol_mem
		reset_value(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Reset $mol_button_major
		 * 	title \Reset
		 * 	enabled? <= reset_enabled
		 * 	click? <=> reset_value?
		 * ```
		 */
		@ $mol_mem
		Reset() {
			const obj = new this.$.$mol_button_major()
			
			obj.title = () => "Reset"
			obj.enabled = (next?: any) => this.reset_enabled()
			obj.click = (next?: any) => this.reset_value(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_value_bar $mol_bar sub /
		 * 	<= Value_string
		 * 	<= Reset
		 * ```
		 */
		@ $mol_mem
		Section_value_bar() {
			const obj = new this.$.$mol_bar()
			
			obj.sub = () => [
				this.Value_string(),
				this.Reset()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_value_row $mol_row sub / <= Section_value_bar
		 * ```
		 */
		@ $mol_mem
		Section_value_row() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Section_value_bar()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_value $mol_section
		 * 	title \Stringified number value
		 * 	content / <= Section_value_row
		 * ```
		 */
		@ $mol_mem
		Section_value() {
			const obj = new this.$.$mol_section()
			
			obj.title = () => "Stringified number value"
			obj.content = () => [
				this.Section_value_row()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Initial_number $mol_number value? <=> value?
		 * ```
		 */
		@ $mol_mem
		Initial_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Initial_number_label $mol_labeler
		 * 	title \Initial
		 * 	content / <= Initial_number
		 * ```
		 */
		@ $mol_mem
		Initial_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Initial"
			obj.content = () => [
				this.Initial_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Hint_number $mol_number
		 * 	hint \Any number
		 * 	value? <=> value?
		 * ```
		 */
		@ $mol_mem
		Hint_number() {
			const obj = new this.$.$mol_number()
			
			obj.hint = () => "Any number"
			obj.value = (next?: any) => this.value(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Hint_number_label $mol_labeler
		 * 	title \Hint showed (if empty value)
		 * 	content / <= Hint_number
		 * ```
		 */
		@ $mol_mem
		Hint_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Hint showed (if empty value)"
			obj.content = () => [
				this.Hint_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_initial_row $mol_row sub /
		 * 	<= Initial_number_label
		 * 	<= Hint_number_label
		 * ```
		 */
		@ $mol_mem
		Section_initial_row() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Initial_number_label(),
				this.Hint_number_label()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_initial $mol_section
		 * 	title \Simple
		 * 	content / <= Section_initial_row
		 * ```
		 */
		@ $mol_mem
		Section_initial() {
			const obj = new this.$.$mol_section()
			
			obj.title = () => "Simple"
			obj.content = () => [
				this.Section_initial_row()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Value_field_disabled_number $mol_number
		 * 	hint \This hint not showed while string_enabled is false
		 * 	value? <=> value?
		 * 	string_enabled false
		 * ```
		 */
		@ $mol_mem
		Value_field_disabled_number() {
			const obj = new this.$.$mol_number()
			
			obj.hint = () => "This hint not showed while string_enabled is false"
			obj.value = (next?: any) => this.value(next)
			obj.string_enabled = () => false
			
			return obj
		}
		
		/**
		 * ```tree
		 * Value_field_disabled_number_label $mol_labeler
		 * 	title \Value field disabled
		 * 	content / <= Value_field_disabled_number
		 * ```
		 */
		@ $mol_mem
		Value_field_disabled_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Value field disabled"
			obj.content = () => [
				this.Value_field_disabled_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Disabled_number $mol_number
		 * 	hint \This hint not showed while enabled is false
		 * 	value? <= value?
		 * 	enabled false
		 * ```
		 */
		@ $mol_mem
		Disabled_number() {
			const obj = new this.$.$mol_number()
			
			obj.hint = () => "This hint not showed while enabled is false"
			obj.value = (next?: any) => this.value()
			obj.enabled = () => false
			
			return obj
		}
		
		/**
		 * ```tree
		 * Disabled_number_label $mol_labeler
		 * 	title \Disabled
		 * 	content / <= Disabled_number
		 * ```
		 */
		@ $mol_mem
		Disabled_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Disabled"
			obj.content = () => [
				this.Disabled_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Dec_disabled_number $mol_number
		 * 	value? <=> value?
		 * 	dec_enabled false
		 * ```
		 */
		@ $mol_mem
		Dec_disabled_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value(next)
			obj.dec_enabled = () => false
			
			return obj
		}
		
		/**
		 * ```tree
		 * Dec_disabled_number_label $mol_labeler
		 * 	title \Decrement disabled
		 * 	content / <= Dec_disabled_number
		 * ```
		 */
		@ $mol_mem
		Dec_disabled_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Decrement disabled"
			obj.content = () => [
				this.Dec_disabled_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Inc_disabled_number $mol_number
		 * 	value? <=> value?
		 * 	inc_enabled false
		 * ```
		 */
		@ $mol_mem
		Inc_disabled_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value(next)
			obj.inc_enabled = () => false
			
			return obj
		}
		
		/**
		 * ```tree
		 * Inc_disabled_number_label $mol_labeler
		 * 	title \Increment disabled
		 * 	content / <= Inc_disabled_number
		 * ```
		 */
		@ $mol_mem
		Inc_disabled_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Increment disabled"
			obj.content = () => [
				this.Inc_disabled_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_disabled_row $mol_row sub /
		 * 	<= Value_field_disabled_number_label
		 * 	<= Disabled_number_label
		 * 	<= Dec_disabled_number_label
		 * 	<= Inc_disabled_number_label
		 * ```
		 */
		@ $mol_mem
		Section_disabled_row() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Value_field_disabled_number_label(),
				this.Disabled_number_label(),
				this.Dec_disabled_number_label(),
				this.Inc_disabled_number_label()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_disabled $mol_section
		 * 	title \Disabled
		 * 	content / <= Section_disabled_row
		 * ```
		 */
		@ $mol_mem
		Section_disabled() {
			const obj = new this.$.$mol_section()
			
			obj.title = () => "Disabled"
			obj.content = () => [
				this.Section_disabled_row()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_change_10_number $mol_number
		 * 	value? <=> value?
		 * 	precision_change 10
		 * ```
		 */
		@ $mol_mem
		Precision_change_10_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value(next)
			obj.precision_change = () => 10
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_change_10_number_label $mol_labeler
		 * 	title \Precision change 10
		 * 	content / <= Precision_change_10_number
		 * ```
		 */
		@ $mol_mem
		Precision_change_10_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Precision change 10"
			obj.content = () => [
				this.Precision_change_10_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_change_01_number $mol_number
		 * 	value? <=> value?
		 * 	precision_change 0.1
		 * ```
		 */
		@ $mol_mem
		Precision_change_01_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value(next)
			obj.precision_change = () => 0.1
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_change_01_number_label $mol_labeler
		 * 	title \⚠️ Precision change 0.1
		 * 	content / <= Precision_change_01_number
		 * ```
		 */
		@ $mol_mem
		Precision_change_01_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "⚠️ Precision change 0.1"
			obj.content = () => [
				this.Precision_change_01_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_100_number_number $mol_number
		 * 	value? <=> value?
		 * 	precision 100
		 * ```
		 */
		@ $mol_mem
		Precision_100_number_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value(next)
			obj.precision = () => 100
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_100_number_label $mol_labeler
		 * 	title \Precision 100
		 * 	content / <= Precision_100_number_number
		 * ```
		 */
		@ $mol_mem
		Precision_100_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Precision 100"
			obj.content = () => [
				this.Precision_100_number_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_5_number_number $mol_number
		 * 	value? <=> value?
		 * 	precision 5
		 * ```
		 */
		@ $mol_mem
		Precision_5_number_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value(next)
			obj.precision = () => 5
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_5_number_label $mol_labeler
		 * 	title \Precision 5
		 * 	content / <= Precision_5_number_number
		 * ```
		 */
		@ $mol_mem
		Precision_5_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Precision 5"
			obj.content = () => [
				this.Precision_5_number_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_01_number_number $mol_number
		 * 	value? <=> value?
		 * 	precision 0.1
		 * ```
		 */
		@ $mol_mem
		Precision_01_number_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value(next)
			obj.precision = () => 0.1
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_01_number_label $mol_labeler
		 * 	title \Precision 0.1
		 * 	content / <= Precision_01_number_number
		 * ```
		 */
		@ $mol_mem
		Precision_01_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Precision 0.1"
			obj.content = () => [
				this.Precision_01_number_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_005_number_number $mol_number
		 * 	value? <=> value?
		 * 	precision 0.05
		 * ```
		 */
		@ $mol_mem
		Precision_005_number_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value(next)
			obj.precision = () => 0.05
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_005_number_label $mol_labeler
		 * 	title \Precision 0.05
		 * 	content / <= Precision_005_number_number
		 * ```
		 */
		@ $mol_mem
		Precision_005_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Precision 0.05"
			obj.content = () => [
				this.Precision_005_number_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_view_001_number $mol_number
		 * 	value? <=> value?
		 * 	precision_view 0.001
		 * ```
		 */
		@ $mol_mem
		Precision_view_001_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value(next)
			obj.precision_view = () => 0.001
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_view_001_number_label $mol_labeler
		 * 	title \Precision view 0.001
		 * 	content / <= Precision_view_001_number
		 * ```
		 */
		@ $mol_mem
		Precision_view_001_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Precision view 0.001"
			obj.content = () => [
				this.Precision_view_001_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_view_10_number $mol_number
		 * 	value? <=> value?
		 * 	precision_view 10
		 * ```
		 */
		@ $mol_mem
		Precision_view_10_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value(next)
			obj.precision_view = () => 10
			
			return obj
		}
		
		/**
		 * ```tree
		 * Precision_view_10_number_label $mol_labeler
		 * 	title \⚠️ Precision view 10
		 * 	content / <= Precision_view_10_number
		 * ```
		 */
		@ $mol_mem
		Precision_view_10_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "⚠️ Precision view 10"
			obj.content = () => [
				this.Precision_view_10_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_precision_row $mol_row sub /
		 * 	<= Precision_change_10_number_label
		 * 	<= Precision_change_01_number_label
		 * 	<= Precision_100_number_label
		 * 	<= Precision_5_number_label
		 * 	<= Precision_01_number_label
		 * 	<= Precision_005_number_label
		 * 	<= Precision_view_001_number_label
		 * 	<= Precision_view_10_number_label
		 * ```
		 */
		@ $mol_mem
		Section_precision_row() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Precision_change_10_number_label(),
				this.Precision_change_01_number_label(),
				this.Precision_100_number_label(),
				this.Precision_5_number_label(),
				this.Precision_01_number_label(),
				this.Precision_005_number_label(),
				this.Precision_view_001_number_label(),
				this.Precision_view_10_number_label()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_precision $mol_section
		 * 	title \Precision
		 * 	content / <= Section_precision_row
		 * ```
		 */
		@ $mol_mem
		Section_precision() {
			const obj = new this.$.$mol_section()
			
			obj.title = () => "Precision"
			obj.content = () => [
				this.Section_precision_row()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * value_min_m5? +NaN
		 * ```
		 */
		@ $mol_mem
		value_min_m5(next?: any) {
			if ( next !== undefined ) return next as never
			return +NaN
		}
		
		/**
		 * ```tree
		 * Min_m5_number $mol_number
		 * 	value? <=> value_min_m5?
		 * 	value_min -5
		 * ```
		 */
		@ $mol_mem
		Min_m5_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value_min_m5(next)
			obj.value_min = () => -5
			
			return obj
		}
		
		/**
		 * ```tree
		 * Min_m5_number_label $mol_labeler
		 * 	title \Min value -5
		 * 	content / <= Min_m5_number
		 * ```
		 */
		@ $mol_mem
		Min_m5_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Min value -5"
			obj.content = () => [
				this.Min_m5_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * value_min_0? +NaN
		 * ```
		 */
		@ $mol_mem
		value_min_0(next?: any) {
			if ( next !== undefined ) return next as never
			return +NaN
		}
		
		/**
		 * ```tree
		 * Min_0_number $mol_number
		 * 	value? <=> value_min_0?
		 * 	value_min 0
		 * ```
		 */
		@ $mol_mem
		Min_0_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value_min_0(next)
			obj.value_min = () => 0
			
			return obj
		}
		
		/**
		 * ```tree
		 * Min_0_number_label $mol_labeler
		 * 	title \Min value 0
		 * 	content / <= Min_0_number
		 * ```
		 */
		@ $mol_mem
		Min_0_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Min value 0"
			obj.content = () => [
				this.Min_0_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * value_min_5? +NaN
		 * ```
		 */
		@ $mol_mem
		value_min_5(next?: any) {
			if ( next !== undefined ) return next as never
			return +NaN
		}
		
		/**
		 * ```tree
		 * Min_5_number $mol_number
		 * 	value? <=> value_min_5?
		 * 	value_min 5
		 * ```
		 */
		@ $mol_mem
		Min_5_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value_min_5(next)
			obj.value_min = () => 5
			
			return obj
		}
		
		/**
		 * ```tree
		 * Min_5_number_label $mol_labeler
		 * 	title \Min value 5
		 * 	content / <= Min_5_number
		 * ```
		 */
		@ $mol_mem
		Min_5_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Min value 5"
			obj.content = () => [
				this.Min_5_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * value_max_m5? +NaN
		 * ```
		 */
		@ $mol_mem
		value_max_m5(next?: any) {
			if ( next !== undefined ) return next as never
			return +NaN
		}
		
		/**
		 * ```tree
		 * Max_m5_number $mol_number
		 * 	value? <=> value_max_m5?
		 * 	value_max -5
		 * ```
		 */
		@ $mol_mem
		Max_m5_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value_max_m5(next)
			obj.value_max = () => -5
			
			return obj
		}
		
		/**
		 * ```tree
		 * Max_m5_number_label $mol_labeler
		 * 	title \Max value -5
		 * 	content / <= Max_m5_number
		 * ```
		 */
		@ $mol_mem
		Max_m5_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Max value -5"
			obj.content = () => [
				this.Max_m5_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * value_max_0? +NaN
		 * ```
		 */
		@ $mol_mem
		value_max_0(next?: any) {
			if ( next !== undefined ) return next as never
			return +NaN
		}
		
		/**
		 * ```tree
		 * Max_0_number $mol_number
		 * 	value? <=> value_max_0?
		 * 	value_max 0
		 * ```
		 */
		@ $mol_mem
		Max_0_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value_max_0(next)
			obj.value_max = () => 0
			
			return obj
		}
		
		/**
		 * ```tree
		 * Max_0_number_label $mol_labeler
		 * 	title \Max value 0
		 * 	content / <= Max_0_number
		 * ```
		 */
		@ $mol_mem
		Max_0_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Max value 0"
			obj.content = () => [
				this.Max_0_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * value_max_5? +NaN
		 * ```
		 */
		@ $mol_mem
		value_max_5(next?: any) {
			if ( next !== undefined ) return next as never
			return +NaN
		}
		
		/**
		 * ```tree
		 * Max_5_number $mol_number
		 * 	value? <=> value_max_5?
		 * 	value_max 5
		 * ```
		 */
		@ $mol_mem
		Max_5_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value_max_5(next)
			obj.value_max = () => 5
			
			return obj
		}
		
		/**
		 * ```tree
		 * Max_5_number_label $mol_labeler
		 * 	title \Max value 5
		 * 	content / <= Max_5_number
		 * ```
		 */
		@ $mol_mem
		Max_5_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Max value 5"
			obj.content = () => [
				this.Max_5_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * value_max_100? 100
		 * ```
		 */
		@ $mol_mem
		value_max_100(next?: any) {
			if ( next !== undefined ) return next as never
			return 100
		}
		
		/**
		 * ```tree
		 * Max_100_number $mol_number
		 * 	value? <=> value_max_100?
		 * 	value_max 100
		 * 	precision_change 10
		 * ```
		 */
		@ $mol_mem
		Max_100_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value_max_100(next)
			obj.value_max = () => 100
			obj.precision_change = () => 10
			
			return obj
		}
		
		/**
		 * ```tree
		 * Max_100_number_label $mol_labeler
		 * 	title \Max value 100
		 * 	content / <= Max_100_number
		 * ```
		 */
		@ $mol_mem
		Max_100_number_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Max value 100"
			obj.content = () => [
				this.Max_100_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * value_case1_range? 0
		 * ```
		 */
		@ $mol_mem
		value_case1_range(next?: any) {
			if ( next !== undefined ) return next as never
			return 0
		}
		
		/**
		 * ```tree
		 * Range_case1_number $mol_number
		 * 	value? <=> value_case1_range?
		 * 	value_min -5
		 * 	value_max 5
		 * ```
		 */
		@ $mol_mem
		Range_case1_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value_case1_range(next)
			obj.value_min = () => -5
			obj.value_max = () => 5
			
			return obj
		}
		
		/**
		 * ```tree
		 * Range_number_case1_label $mol_labeler
		 * 	title \Value from -5 to 5
		 * 	content / <= Range_case1_number
		 * ```
		 */
		@ $mol_mem
		Range_number_case1_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Value from -5 to 5"
			obj.content = () => [
				this.Range_case1_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * value_case2_range? null
		 * ```
		 */
		@ $mol_mem
		value_case2_range(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Range_case2_number $mol_number
		 * 	value? <=> value_case2_range?
		 * 	value_min 5
		 * 	value_max 10
		 * ```
		 */
		@ $mol_mem
		Range_case2_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value_case2_range(next)
			obj.value_min = () => 5
			obj.value_max = () => 10
			
			return obj
		}
		
		/**
		 * ```tree
		 * Range_number_case2_label $mol_labeler
		 * 	title \Value from 5 to 10
		 * 	content / <= Range_case2_number
		 * ```
		 */
		@ $mol_mem
		Range_number_case2_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Value from 5 to 10"
			obj.content = () => [
				this.Range_case2_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * value_case3_range? null
		 * ```
		 */
		@ $mol_mem
		value_case3_range(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Range_case3_number $mol_number
		 * 	value? <=> value_case3_range?
		 * 	value_min -10
		 * 	value_max -5
		 * ```
		 */
		@ $mol_mem
		Range_case3_number() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.value_case3_range(next)
			obj.value_min = () => -10
			obj.value_max = () => -5
			
			return obj
		}
		
		/**
		 * ```tree
		 * Range_number_case3_label $mol_labeler
		 * 	title \Value from -10 to -5
		 * 	content / <= Range_case3_number
		 * ```
		 */
		@ $mol_mem
		Range_number_case3_label() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Value from -10 to -5"
			obj.content = () => [
				this.Range_case3_number()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_range_row $mol_row sub /
		 * 	<= Min_m5_number_label
		 * 	<= Min_0_number_label
		 * 	<= Min_5_number_label
		 * 	<= Max_m5_number_label
		 * 	<= Max_0_number_label
		 * 	<= Max_5_number_label
		 * 	<= Max_100_number_label
		 * 	<= Range_number_case1_label
		 * 	<= Range_number_case2_label
		 * 	<= Range_number_case3_label
		 * ```
		 */
		@ $mol_mem
		Section_range_row() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Min_m5_number_label(),
				this.Min_0_number_label(),
				this.Min_5_number_label(),
				this.Max_m5_number_label(),
				this.Max_0_number_label(),
				this.Max_5_number_label(),
				this.Max_100_number_label(),
				this.Range_number_case1_label(),
				this.Range_number_case2_label(),
				this.Range_number_case3_label()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Section_range $mol_section
		 * 	title \Range
		 * 	content / <= Section_range_row
		 * ```
		 */
		@ $mol_mem
		Section_range() {
			const obj = new this.$.$mol_section()
			
			obj.title = () => "Range"
			obj.content = () => [
				this.Section_range_row()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Rows $mol_list rows /
		 * 	<= Section_value
		 * 	<= Section_initial
		 * 	<= Section_disabled
		 * 	<= Section_precision
		 * 	<= Section_range
		 * ```
		 */
		@ $mol_mem
		Rows() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Section_value(),
				this.Section_initial(),
				this.Section_disabled(),
				this.Section_precision(),
				this.Section_range()
			] as readonly any[]
			
			return obj
		}
	}
	
}

