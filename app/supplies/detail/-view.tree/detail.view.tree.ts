namespace $ { export class $mol_app_supplies_detail extends $mol_page {

	/**
	 *  ```
	 *  supply null
	 *  ```
	 **/
	supply() {
		return null as any
	}

	/**
	 *  ```
	 *  title @ \Supply
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_title" )
	}

	/**
	 *  ```
	 *  tools / <= Close
	 *  ```
	 **/
	tools() {
		return [this.Close()] as readonly any[]
	}

	/**
	 *  ```
	 *  Close $mol_link
	 *  	sub / <= Close_icon
	 *  	arg <= close_arg
	 *  ```
	 **/
	@ $mol_mem
	Close() {
		return (( obj )=>{
			obj.sub = () => [this.Close_icon()] as readonly any[]
			obj.arg = () => this.close_arg()
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Close_icon $mol_icon_cross
	 *  ```
	 **/
	@ $mol_mem
	Close_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_cross(  ) )
	}

	/**
	 *  ```
	 *  close_arg * supply null
	 *  ```
	 **/
	close_arg() {
		return ({
			"supply" :  null as any ,
		})
	}

	/**
	 *  ```
	 *  body / <= Content
	 *  ```
	 **/
	body() {
		return [this.Content()] as readonly any[]
	}

	/**
	 *  ```
	 *  Content $mol_list rows /
	 *  	<= Descr_card
	 *  	<= Attach_section
	 *  	<= Positions_section
	 *  ```
	 **/
	@ $mol_mem
	Content() {
		return (( obj )=>{
			obj.rows = () => [this.Descr_card() , this.Attach_section() , this.Positions_section()] as readonly any[]
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  Descr_card $mol_card Content <= Descr_deck
	 *  ```
	 **/
	@ $mol_mem
	Descr_card() {
		return (( obj )=>{
			obj.Content = () => this.Descr_deck()
			return obj
		})( new this.$.$mol_card(  ) )
	}

	/**
	 *  ```
	 *  Descr_deck $mol_deck items /
	 *  	<= Org
	 *  	<= Cons
	 *  ```
	 **/
	@ $mol_mem
	Descr_deck() {
		return (( obj )=>{
			obj.items = () => [this.Org() , this.Cons()] as readonly any[]
			return obj
		})( new this.$.$mol_deck(  ) )
	}

	/**
	 *  ```
	 *  Org *
	 *  	title <= org_title
	 *  	Content <= Org_content
	 *  ```
	 **/
	Org() {
		return ({
			"title" :  this.org_title() ,
			"Content" :  this.Org_content() ,
		})
	}

	/**
	 *  ```
	 *  org_title @ \Organization
	 *  ```
	 **/
	org_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_org_title" )
	}

	/**
	 *  ```
	 *  Org_content $mol_row sub <= org_items
	 *  ```
	 **/
	@ $mol_mem
	Org_content() {
		return (( obj )=>{
			obj.sub = () => this.org_items()
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  org_items /
	 *  	<= Provider
	 *  	<= Consumer
	 *  	<= Supply_group
	 *  	<= Ballance_unit_item
	 *  ```
	 **/
	org_items() {
		return [this.Provider() , this.Consumer() , this.Supply_group() , this.Ballance_unit_item()] as readonly any[]
	}

	/**
	 *  ```
	 *  Provider $mol_labeler
	 *  	title <= provider_title
	 *  	content / <= provider_name
	 *  ```
	 **/
	@ $mol_mem
	Provider() {
		return (( obj )=>{
			obj.title = () => this.provider_title()
			obj.content = () => [this.provider_name()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  provider_title @ \Provider
	 *  ```
	 **/
	provider_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_provider_title" )
	}

	/**
	 *  ```
	 *  provider_name \
	 *  ```
	 **/
	provider_name() {
		return ""
	}

	/**
	 *  ```
	 *  Consumer $mol_labeler
	 *  	title <= customer_label
	 *  	content / <= consumer_name
	 *  ```
	 **/
	@ $mol_mem
	Consumer() {
		return (( obj )=>{
			obj.title = () => this.customer_label()
			obj.content = () => [this.consumer_name()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  customer_label @ \Consumer
	 *  ```
	 **/
	customer_label() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_customer_label" )
	}

	/**
	 *  ```
	 *  consumer_name \
	 *  ```
	 **/
	consumer_name() {
		return ""
	}

	/**
	 *  ```
	 *  Supply_group $mol_labeler
	 *  	title <= supply_group_title
	 *  	content / <= supply_group_name
	 *  ```
	 **/
	@ $mol_mem
	Supply_group() {
		return (( obj )=>{
			obj.title = () => this.supply_group_title()
			obj.content = () => [this.supply_group_name()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  supply_group_title @ \Supply Group
	 *  ```
	 **/
	supply_group_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_supply_group_title" )
	}

	/**
	 *  ```
	 *  supply_group_name \
	 *  ```
	 **/
	supply_group_name() {
		return ""
	}

	/**
	 *  ```
	 *  Ballance_unit_item $mol_labeler
	 *  	title <= ballance_unit_title
	 *  	content / <= ballance_unit_name
	 *  ```
	 **/
	@ $mol_mem
	Ballance_unit_item() {
		return (( obj )=>{
			obj.title = () => this.ballance_unit_title()
			obj.content = () => [this.ballance_unit_name()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  ballance_unit_title @ \Ballance Unit
	 *  ```
	 **/
	ballance_unit_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_ballance_unit_title" )
	}

	/**
	 *  ```
	 *  ballance_unit_name \
	 *  ```
	 **/
	ballance_unit_name() {
		return ""
	}

	/**
	 *  ```
	 *  Cons *
	 *  	title <= cons_title
	 *  	Content <= Cons_content
	 *  ```
	 **/
	Cons() {
		return ({
			"title" :  this.cons_title() ,
			"Content" :  this.Cons_content() ,
		})
	}

	/**
	 *  ```
	 *  cons_title @ \Consumer
	 *  ```
	 **/
	cons_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_cons_title" )
	}

	/**
	 *  ```
	 *  Cons_content $mol_row sub <= cons_items
	 *  ```
	 **/
	@ $mol_mem
	Cons_content() {
		return (( obj )=>{
			obj.sub = () => this.cons_items()
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  cons_items /
	 *  	<= Contract
	 *  	<= Pay_method
	 *  	<= Manager
	 *  	<= Debitor
	 *  ```
	 **/
	cons_items() {
		return [this.Contract() , this.Pay_method() , this.Manager() , this.Debitor()] as readonly any[]
	}

	/**
	 *  ```
	 *  Contract $mol_labeler
	 *  	title <= contract_title
	 *  	content / <= contract_id
	 *  ```
	 **/
	@ $mol_mem
	Contract() {
		return (( obj )=>{
			obj.title = () => this.contract_title()
			obj.content = () => [this.contract_id()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  contract_title @ \Contract
	 *  ```
	 **/
	contract_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_contract_title" )
	}

	/**
	 *  ```
	 *  contract_id \
	 *  ```
	 **/
	contract_id() {
		return ""
	}

	/**
	 *  ```
	 *  Pay_method $mol_labeler
	 *  	title <= pay_method_title
	 *  	content / <= pay_method_name
	 *  ```
	 **/
	@ $mol_mem
	Pay_method() {
		return (( obj )=>{
			obj.title = () => this.pay_method_title()
			obj.content = () => [this.pay_method_name()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  pay_method_title @ \Pay Method
	 *  ```
	 **/
	pay_method_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_pay_method_title" )
	}

	/**
	 *  ```
	 *  pay_method_name \
	 *  ```
	 **/
	pay_method_name() {
		return ""
	}

	/**
	 *  ```
	 *  Manager $mol_labeler
	 *  	title <= manager_title
	 *  	content / <= manager_name
	 *  ```
	 **/
	@ $mol_mem
	Manager() {
		return (( obj )=>{
			obj.title = () => this.manager_title()
			obj.content = () => [this.manager_name()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  manager_title @ \Manager
	 *  ```
	 **/
	manager_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_manager_title" )
	}

	/**
	 *  ```
	 *  manager_name \
	 *  ```
	 **/
	manager_name() {
		return ""
	}

	/**
	 *  ```
	 *  Debitor $mol_labeler
	 *  	title <= debitod_title
	 *  	content / <= debitor_name
	 *  ```
	 **/
	@ $mol_mem
	Debitor() {
		return (( obj )=>{
			obj.title = () => this.debitod_title()
			obj.content = () => [this.debitor_name()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  debitod_title @ \Debitor
	 *  ```
	 **/
	debitod_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_debitod_title" )
	}

	/**
	 *  ```
	 *  debitor_name \
	 *  ```
	 **/
	debitor_name() {
		return ""
	}

	/**
	 *  ```
	 *  Attach_section $mol_section
	 *  	head / <= attach_title
	 *  	Content <= Attach
	 *  ```
	 **/
	@ $mol_mem
	Attach_section() {
		return (( obj )=>{
			obj.head = () => [this.attach_title()] as readonly any[]
			obj.Content = () => this.Attach()
			return obj
		})( new this.$.$mol_section(  ) )
	}

	/**
	 *  ```
	 *  attach_title @ \Attachments
	 *  ```
	 **/
	attach_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_attach_title" )
	}

	/**
	 *  ```
	 *  Attach $mol_attach
	 *  	items <= attachments
	 *  	attach_new?val <=> attach_new?val
	 *  ```
	 **/
	@ $mol_mem
	Attach() {
		return (( obj )=>{
			obj.items = () => this.attachments()
			obj.attach_new = ( val? : any ) => this.attach_new( val )
			return obj
		})( new this.$.$mol_attach(  ) )
	}

	/**
	 *  ```
	 *  attachments /$mol_view
	 *  ```
	 **/
	attachments() {
		return [] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  attach_new?val null
	 *  ```
	 **/
	@ $mol_mem
	attach_new( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/**
	 *  ```
	 *  Positions_section $mol_section
	 *  	head <= positions_head
	 *  	Content <= Positions
	 *  ```
	 **/
	@ $mol_mem
	Positions_section() {
		return (( obj )=>{
			obj.head = () => this.positions_head()
			obj.Content = () => this.Positions()
			return obj
		})( new this.$.$mol_section(  ) )
	}

	/**
	 *  ```
	 *  positions_head /
	 *  	<= positions_title
	 *  	<= Cost
	 *  ```
	 **/
	positions_head() {
		return [this.positions_title() , this.Cost()] as readonly any[]
	}

	/**
	 *  ```
	 *  positions_title @ \Positions
	 *  ```
	 **/
	positions_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_positions_title" )
	}

	/**
	 *  ```
	 *  Cost $mol_labeler
	 *  	title <= cost_title
	 *  	content / <= Cost_value
	 *  ```
	 **/
	@ $mol_mem
	Cost() {
		return (( obj )=>{
			obj.title = () => this.cost_title()
			obj.content = () => [this.Cost_value()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  cost_title @ \Cost
	 *  ```
	 **/
	cost_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_cost_title" )
	}

	/**
	 *  ```
	 *  Cost_value $mol_cost value <= cost
	 *  ```
	 **/
	@ $mol_mem
	Cost_value() {
		return (( obj )=>{
			obj.value = () => this.cost()
			return obj
		})( new this.$.$mol_cost(  ) )
	}

	/**
	 *  ```
	 *  cost $mol_unit_money valueOf 0
	 *  ```
	 **/
	@ $mol_mem
	cost() {
		return (( obj )=>{
			obj.valueOf = () => 0
			return obj
		})( new this.$.$mol_unit_money(  ) )
	}

	/**
	 *  ```
	 *  Positions $mol_list rows <= positions
	 *  ```
	 **/
	@ $mol_mem
	Positions() {
		return (( obj )=>{
			obj.rows = () => this.positions()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  positions /$mol_view
	 *  ```
	 **/
	positions() {
		return [] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  foot / <= Actions
	 *  ```
	 **/
	foot() {
		return [this.Actions()] as readonly any[]
	}

	/**
	 *  ```
	 *  Actions $mol_row sub <= actions
	 *  ```
	 **/
	@ $mol_mem
	Actions() {
		return (( obj )=>{
			obj.sub = () => this.actions()
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  actions / <= Approve
	 *  ```
	 **/
	actions() {
		return [this.Approve()] as readonly any[]
	}

	/**
	 *  ```
	 *  Approve $mol_check_box
	 *  	checked?val <=> approved?val
	 *  	title <= approved_title
	 *  ```
	 **/
	@ $mol_mem
	Approve() {
		return (( obj )=>{
			obj.checked = ( val? : any ) => this.approved( val )
			obj.title = () => this.approved_title()
			return obj
		})( new this.$.$mol_check_box(  ) )
	}

	/**
	 *  ```
	 *  approved?val false
	 *  ```
	 **/
	@ $mol_mem
	approved( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  approved_title @ \Approved
	 *  ```
	 **/
	approved_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_detail_approved_title" )
	}

	/**
	 *  ```
	 *  Position!index $mol_app_supplies_position position <= position!index
	 *  ```
	 **/
	@ $mol_mem_key
	Position( index : any ) {
		return (( obj )=>{
			obj.position = () => this.position(index)
			return obj
		})( new this.$.$mol_app_supplies_position(  ) )
	}

	/**
	 *  ```
	 *  position!index null
	 *  ```
	 **/
	position( index : any ) {
		return null as any
	}

	/**
	 *  ```
	 *  Attachment!index $mol_attach_item
	 *  	url_thumb <= attachment_thumb!index
	 *  	url_load <= attachment_load!index
	 *  ```
	 **/
	@ $mol_mem_key
	Attachment( index : any ) {
		return (( obj )=>{
			obj.url_thumb = () => this.attachment_thumb(index)
			obj.url_load = () => this.attachment_load(index)
			return obj
		})( new this.$.$mol_attach_item(  ) )
	}

	/**
	 *  ```
	 *  attachment_thumb!index \
	 *  ```
	 **/
	attachment_thumb( index : any ) {
		return ""
	}

	/**
	 *  ```
	 *  attachment_load!index \
	 *  ```
	 **/
	attachment_load( index : any ) {
		return ""
	}

} }
