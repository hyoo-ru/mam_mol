namespace $ {
	export class $mol_form_demo_draft_model extends $mol_object2 {
		
		/**
		 * ```tree
		 * title?val \
		 * ```
		 */
		@ $mol_mem
		title(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * type?val \
		 * ```
		 */
		@ $mol_mem
		type(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * content?val \
		 * ```
		 */
		@ $mol_mem
		content(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
	}
	
	export class $mol_form_demo_draft extends $mol_example {
		
		/**
		 * ```tree
		 * title \Article draft form demo
		 * ```
		 */
		title() {
			return "Article draft form demo"
		}
		
		/**
		 * ```tree
		 * model $mol_form_demo_draft_model
		 * ```
		 */
		@ $mol_mem
		model() {
			const obj = new this.$.$mol_form_demo_draft_model()
			
			return obj
		}
		
		/**
		 * ```tree
		 * message_done \Done
		 * ```
		 */
		message_done() {
			return "Done"
		}
		
		/**
		 * ```tree
		 * bid_required!prop \Required
		 * ```
		 */
		bid_required(prop: any) {
			return "Required"
		}
		
		/**
		 * ```tree
		 * bid_swearing!prop \No swearing
		 * ```
		 */
		bid_swearing(prop: any) {
			return "No swearing"
		}
		
		/**
		 * ```tree
		 * bid_short!prop \> 5 letters
		 * ```
		 */
		bid_short(prop: any) {
			return "> 5 letters"
		}
		
		/**
		 * ```tree
		 * bid_long!prop \> 100 letters
		 * ```
		 */
		bid_long(prop: any) {
			return "> 100 letters"
		}
		
		/**
		 * ```tree
		 * Group!name $mol_form_group sub <= group!name
		 * ```
		 */
		@ $mol_mem_key
		Group(name: any) {
			const obj = new this.$.$mol_form_group()
			
			obj.sub = () => this.group(name)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Title_field!prop $mol_form_field
		 * 	name \Title
		 * 	bids /
		 * 		<= bid_swearing!prop
		 * 		<= bid_short!prop
		 * 	control <= Title!prop
		 * ```
		 */
		@ $mol_mem_key
		Title_field(prop: any) {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Title"
			obj.bids = () => [
				this.bid_swearing(prop),
				this.bid_short(prop)
			] as readonly any[]
			obj.control = () => this.Title(prop)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Type_field!prop $mol_form_field
		 * 	name \Type
		 * 	bids / <= bid_required!prop
		 * 	control <= Type!prop
		 * ```
		 */
		@ $mol_mem_key
		Type_field(prop: any) {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Type"
			obj.bids = () => [
				this.bid_required(prop)
			] as readonly any[]
			obj.control = () => this.Type(prop)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Content_field!prop $mol_form_field
		 * 	name \Content
		 * 	bids /
		 * 		<= bid_swearing!prop
		 * 		<= bid_long!prop
		 * 	control <= Content!prop
		 * ```
		 */
		@ $mol_mem_key
		Content_field(prop: any) {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Content"
			obj.bids = () => [
				this.bid_swearing(prop),
				this.bid_long(prop)
			] as readonly any[]
			obj.control = () => this.Content(prop)
			
			return obj
		}
		
		/**
		 * ```tree
		 * sub / <= Flow
		 * ```
		 */
		sub() {
			return [
				this.Flow()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_form_field
		 * 	\$mol_button
		 * 	\$mol_string
		 * 	\$mol_switch
		 * 	\form
		 * 	\bids
		 * 	\validation
		 * 	\field
		 * ```
		 */
		tags() {
			return [
				"$mol_form_field",
				"$mol_button",
				"$mol_string",
				"$mol_switch",
				"form",
				"bids",
				"validation",
				"field"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * group!name /
		 * ```
		 */
		group(name: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * value_str!prop?val \
		 * ```
		 */
		@ $mol_mem_key
		value_str(prop: any, val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Title!prop $mol_string
		 * 	hint \How I spent the summer..
		 * 	value?val <=> value_str!prop?val
		 * ```
		 */
		@ $mol_mem_key
		Title(prop: any) {
			const obj = new this.$.$mol_string()
			
			obj.hint = () => "How I spent the summer.."
			obj.value = (val?: any) => this.value_str(prop, val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Type!prop $mol_switch
		 * 	value?val <=> value_str!prop?val
		 * 	options *
		 * 		article \Article
		 * 		news \News
		 * 		question \Question
		 * ```
		 */
		@ $mol_mem_key
		Type(prop: any) {
			const obj = new this.$.$mol_switch()
			
			obj.value = (val?: any) => this.value_str(prop, val)
			obj.options = () => ({
				article: "Article",
				news: "News",
				question: "Question"
			})
			
			return obj
		}
		
		/**
		 * ```tree
		 * Content!prop $mol_textarea
		 * 	hint \Long long story..
		 * 	value?val <=> value_str!prop?val
		 * ```
		 */
		@ $mol_mem_key
		Content(prop: any) {
			const obj = new this.$.$mol_textarea()
			
			obj.hint = () => "Long long story.."
			obj.value = (val?: any) => this.value_str(prop, val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * form_body /
		 * ```
		 */
		form_body() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * publish?event null
		 * ```
		 */
		@ $mol_mem
		publish(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Publish $mol_button_major
		 * 	title \Publish
		 * 	click?event <=> publish?event
		 * 	enabled <= publish_allowed
		 * ```
		 */
		@ $mol_mem
		Publish() {
			const obj = new this.$.$mol_button_major()
			
			obj.title = () => "Publish"
			obj.click = (event?: any) => this.publish(event)
			obj.enabled = () => this.publish_allowed()
			
			return obj
		}
		
		/**
		 * ```tree
		 * result?val \
		 * ```
		 */
		@ $mol_mem
		result(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Result $mol_status message <= result?val
		 * ```
		 */
		@ $mol_mem
		Result() {
			const obj = new this.$.$mol_status()
			
			obj.message = () => this.result()
			
			return obj
		}
		
		/**
		 * ```tree
		 * publish_allowed
		 * ```
		 */
		publish_allowed() {
			return this.Form().submit_allowed()
		}
		
		/**
		 * ```tree
		 * Form $mol_form
		 * 	body <= form_body
		 * 	submit?event <=> publish?event
		 * 	submit_allowed => publish_allowed
		 * 	buttons /
		 * 		<= Publish
		 * 		<= Result
		 * ```
		 */
		@ $mol_mem
		Form() {
			const obj = new this.$.$mol_form()
			
			obj.body = () => this.form_body()
			obj.submit = (event?: any) => this.publish(event)
			obj.buttons = () => [
				this.Publish(),
				this.Result()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Flow $mol_list rows / <= Form
		 * ```
		 */
		@ $mol_mem
		Flow() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Form()
			] as readonly any[]
			
			return obj
		}
	}
	
}

