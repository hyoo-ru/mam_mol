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
		 * bid_required* \Required
		 * ```
		 */
		bid_required(id: any) {
			return "Required"
		}
		
		/**
		 * ```tree
		 * bid_swearing* \No swearing
		 * ```
		 */
		bid_swearing(id: any) {
			return "No swearing"
		}
		
		/**
		 * ```tree
		 * bid_short* \> 5 letters
		 * ```
		 */
		bid_short(id: any) {
			return "> 5 letters"
		}
		
		/**
		 * ```tree
		 * bid_long* \> 100 letters
		 * ```
		 */
		bid_long(id: any) {
			return "> 100 letters"
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
		 * value_str*title?val \
		 * ```
		 */
		@ $mol_mem_key
		value_str(id: any, val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * Title $mol_string
		 * 	hint \How I spent the summer..
		 * 	value?val <=> value_str*title?val
		 * ```
		 */
		@ $mol_mem
		Title() {
			const obj = new this.$.$mol_string()
			
			obj.hint = () => "How I spent the summer.."
			obj.value = (val?: any) => this.value_str("title", val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Title_field $mol_form_field
		 * 	name \Title
		 * 	bids /
		 * 		<= bid_swearing*title
		 * 		<= bid_short*title
		 * 	control <= Title
		 * ```
		 */
		@ $mol_mem
		Title_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Title"
			obj.bids = () => [
				this.bid_swearing("title"),
				this.bid_short("title")
			] as readonly any[]
			obj.control = () => this.Title()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Type $mol_switch
		 * 	value?val <=> value_str*type?val
		 * 	options *
		 * 		article \Article
		 * 		news \News
		 * 		question \Question
		 * ```
		 */
		@ $mol_mem
		Type() {
			const obj = new this.$.$mol_switch()
			
			obj.value = (val?: any) => this.value_str("type", val)
			obj.options = () => ({
				article: "Article",
				news: "News",
				question: "Question"
			})
			
			return obj
		}
		
		/**
		 * ```tree
		 * Type_field $mol_form_field
		 * 	name \Type
		 * 	bids / <= bid_required*type
		 * 	control <= Type
		 * ```
		 */
		@ $mol_mem
		Type_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Type"
			obj.bids = () => [
				this.bid_required("type")
			] as readonly any[]
			obj.control = () => this.Type()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Main $mol_form_group sub /
		 * 	<= Title_field
		 * 	<= Type_field
		 * ```
		 */
		@ $mol_mem
		Main() {
			const obj = new this.$.$mol_form_group()
			
			obj.sub = () => [
				this.Title_field(),
				this.Type_field()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Content $mol_textarea
		 * 	hint \Long long story..
		 * 	value?val <=> value_str*content?val
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_textarea()
			
			obj.hint = () => "Long long story.."
			obj.value = (val?: any) => this.value_str("content", val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Content_field $mol_form_field
		 * 	name \Content
		 * 	bids /
		 * 		<= bid_swearing*content
		 * 		<= bid_long*content
		 * 	control <= Content
		 * ```
		 */
		@ $mol_mem
		Content_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Content"
			obj.bids = () => [
				this.bid_swearing("content"),
				this.bid_long("content")
			] as readonly any[]
			obj.control = () => this.Content()
			
			return obj
		}
		
		/**
		 * ```tree
		 * form_body /
		 * 	<= Main
		 * 	<= Content_field
		 * ```
		 */
		form_body() {
			return [
				this.Main(),
				this.Content_field()
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

