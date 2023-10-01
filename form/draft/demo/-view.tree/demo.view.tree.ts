namespace $ {
	export class $mol_form_draft_demo_article extends $mol_object2 {
		
		/**
		 * ```tree
		 * title? \
		 * ```
		 */
		@ $mol_mem
		title(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * type? \
		 * ```
		 */
		@ $mol_mem
		type(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * adult? false
		 * ```
		 */
		@ $mol_mem
		adult(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * content? \
		 * ```
		 */
		@ $mol_mem
		content(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * friends? /string
		 * ```
		 */
		@ $mol_mem
		friends(next?: any) {
			if ( next !== undefined ) return next as never
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * hobbies? *
		 * ```
		 */
		@ $mol_mem
		hobbies(next?: any) {
			if ( next !== undefined ) return next as never
			return {
			} as Record< string, any >
		}
	}
	
	export class $mol_form_draft_demo extends $mol_example {
		
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
		 * sub / <= Form
		 * ```
		 */
		sub() {
			return [
				this.Form()
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
		 * aspects / \Widget/Form
		 * ```
		 */
		aspects() {
			return [
				"Widget/Form"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * model $mol_form_draft_demo_article
		 * ```
		 */
		@ $mol_mem
		model() {
			const obj = new this.$.$mol_form_draft_demo_article()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Title $mol_string
		 * 	hint \How I spent the summer..
		 * 	value? <=> value_str*title?
		 * ```
		 */
		@ $mol_mem
		Title() {
			const obj = new this.$.$mol_string()
			
			obj.hint = () => "How I spent the summer.."
			obj.value = (next?: any) => this.value_str("title", next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Title_field $mol_form_field
		 * 	name \Title
		 * 	bids /
		 * 		<= bid_swearing*title
		 * 		<= bid_short*title
		 * 	Content <= Title
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
			obj.Content = () => this.Title()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Type $mol_switch
		 * 	value? <=> value_str*type?
		 * 	options *
		 * 		article \Article
		 * 		news \News
		 * 		question \Question
		 * ```
		 */
		@ $mol_mem
		Type() {
			const obj = new this.$.$mol_switch()
			
			obj.value = (next?: any) => this.value_str("type", next)
			obj.options = () => ({
				article: "Article",
				news: "News",
				question: "Question"
			} as Record< string, any >)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Type_field $mol_form_field
		 * 	name \Type
		 * 	bids / <= bid_required*type
		 * 	Content <= Type
		 * ```
		 */
		@ $mol_mem
		Type_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Type"
			obj.bids = () => [
				this.bid_required("type")
			] as readonly any[]
			obj.Content = () => this.Type()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Adult $mol_switch
		 * 	value? <=> value_str*adult?
		 * 	options *
		 * 		false \No
		 * 		true \Yes
		 * ```
		 */
		@ $mol_mem
		Adult() {
			const obj = new this.$.$mol_switch()
			
			obj.value = (next?: any) => this.value_str("adult", next)
			obj.options = () => ({
				false: "No",
				true: "Yes"
			} as Record< string, any >)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Adult_field $mol_form_field
		 * 	name \Adult only
		 * 	Content <= Adult
		 * ```
		 */
		@ $mol_mem
		Adult_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Adult only"
			obj.Content = () => this.Adult()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Content $mol_textarea
		 * 	hint \Long long story..
		 * 	value? <=> value_str*content?
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_textarea()
			
			obj.hint = () => "Long long story.."
			obj.value = (next?: any) => this.value_str("content", next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Content_field $mol_form_field
		 * 	name \Content
		 * 	bids /
		 * 		<= bid_swearing*content
		 * 		<= bid_long*content
		 * 	Content <= Content
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
			obj.Content = () => this.Content()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Hobbies $mol_check_list
		 * 	dictionary? <=> dictionary_bool*hobbies?
		 * 	options *
		 * 		programming \Programming
		 * 		bikinkg \Biking
		 * 		fishing \Fishing
		 * ```
		 */
		@ $mol_mem
		Hobbies() {
			const obj = new this.$.$mol_check_list()
			
			obj.dictionary = (next?: any) => this.dictionary_bool("hobbies", next)
			obj.options = () => ({
				programming: "Programming",
				bikinkg: "Biking",
				fishing: "Fishing"
			} as Record< string, any >)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Hobbies_field $mol_form_field
		 * 	name \Hobbies
		 * 	Content <= Hobbies
		 * ```
		 */
		@ $mol_mem
		Hobbies_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Hobbies"
			obj.Content = () => this.Hobbies()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Friends $mol_select_list
		 * 	dictionary *
		 * 		jocker \Jocker
		 * 		harley \Harley Quinn
		 * 		penguin \Penguin
		 * 		riddler \Riddler
		 * 		bane \Bane
		 * 		freeze \Mister Freeze
		 * 		clay \Clayface
		 * 		mask \Black Mask
		 * 	value? <=> list_string*friends?
		 * ```
		 */
		@ $mol_mem
		Friends() {
			const obj = new this.$.$mol_select_list()
			
			obj.dictionary = () => ({
				jocker: "Jocker",
				harley: "Harley Quinn",
				penguin: "Penguin",
				riddler: "Riddler",
				bane: "Bane",
				freeze: "Mister Freeze",
				clay: "Clayface",
				mask: "Black Mask"
			} as Record< string, any >)
			obj.value = (next?: any) => this.list_string("friends", next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Friends_field $mol_form_field
		 * 	name \Friends
		 * 	Content <= Friends
		 * ```
		 */
		@ $mol_mem
		Friends_field() {
			const obj = new this.$.$mol_form_field()
			
			obj.name = () => "Friends"
			obj.Content = () => this.Friends()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Config $mol_form_group sub /
		 * 	<= Adult_field
		 * 	<= Type_field
		 * ```
		 */
		@ $mol_mem
		Config() {
			const obj = new this.$.$mol_form_group()
			
			obj.sub = () => [
				this.Adult_field(),
				this.Type_field()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * form_body /
		 * 	<= Title_field
		 * 	<= Config
		 * 	<= Content_field
		 * 	<= Friends_field
		 * ```
		 */
		form_body() {
			return [
				this.Title_field(),
				this.Config(),
				this.Content_field(),
				this.Friends_field()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Publish $mol_button_major
		 * 	title \Publish
		 * 	click? <=> publish?
		 * 	enabled <= publish_allowed
		 * ```
		 */
		@ $mol_mem
		Publish() {
			const obj = new this.$.$mol_button_major()
			
			obj.title = () => "Publish"
			obj.click = (next?: any) => this.publish(next)
			obj.enabled = () => this.publish_allowed()
			
			return obj
		}
		
		/**
		 * ```tree
		 * result? \
		 * ```
		 */
		@ $mol_mem
		result(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Result $mol_status message <= result?
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
		 * Reset $mol_button_minor
		 * 	title \Сбросить
		 * 	click? <=> reset?
		 * 	enabled <= changed
		 * ```
		 */
		@ $mol_mem
		Reset() {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => "Сбросить"
			obj.click = (next?: any) => this.reset(next)
			obj.enabled = () => this.changed()
			
			return obj
		}
		
		/**
		 * ```tree
		 * publish?
		 * ```
		 */
		publish(next?: any) {
			return this.Form().submit(next)
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
		 * value_str*?
		 * ```
		 */
		value_str(id: any, next?: any) {
			return this.Form().value_str(id, next)
		}
		
		/**
		 * ```tree
		 * list_string*?
		 * ```
		 */
		list_string(id: any, next?: any) {
			return this.Form().list_string(id, next)
		}
		
		/**
		 * ```tree
		 * dictionary_bool*?
		 * ```
		 */
		dictionary_bool(id: any, next?: any) {
			return this.Form().dictionary_bool(id, next)
		}
		
		/**
		 * ```tree
		 * changed
		 * ```
		 */
		changed() {
			return this.Form().changed()
		}
		
		/**
		 * ```tree
		 * reset?
		 * ```
		 */
		reset(next?: any) {
			return this.Form().reset(next)
		}
		
		/**
		 * ```tree
		 * Form $mol_form_draft
		 * 	model <= model
		 * 	submit? => publish?
		 * 	submit_allowed => publish_allowed
		 * 	value_str*? => value_str*?
		 * 	list_string*? => list_string*?
		 * 	dictionary_bool*? => dictionary_bool*?
		 * 	changed => changed
		 * 	reset? => reset?
		 * 	form_fields /
		 * 		<= Title_field
		 * 		<= Type_field
		 * 		<= Adult_field
		 * 		<= Content_field
		 * 		<= Hobbies_field
		 * 		<= Friends_field
		 * 	body <= form_body
		 * 	buttons /
		 * 		<= Publish
		 * 		<= Result
		 * 		<= Reset
		 * ```
		 */
		@ $mol_mem
		Form() {
			const obj = new this.$.$mol_form_draft()
			
			obj.model = () => this.model()
			obj.form_fields = () => [
				this.Title_field(),
				this.Type_field(),
				this.Adult_field(),
				this.Content_field(),
				this.Hobbies_field(),
				this.Friends_field()
			] as readonly any[]
			obj.body = () => this.form_body()
			obj.buttons = () => [
				this.Publish(),
				this.Result(),
				this.Reset()
			] as readonly any[]
			
			return obj
		}
	}
	
}

