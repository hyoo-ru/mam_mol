namespace $ {
	export class $mol_app_supplies_detail extends $mol_page {
		
		/**
		 * ```tree
		 * supply null
		 * ```
		 */
		supply() {
			return null as any
		}
		
		/**
		 * ```tree
		 * title @ \Supply
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_title' )
		}
		
		/**
		 * ```tree
		 * tools / <= Close
		 * ```
		 */
		tools() {
			return [
				this.Close()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * body / <= Content
		 * ```
		 */
		body() {
			return [
				this.Content()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * foot / <= Actions
		 * ```
		 */
		foot() {
			return [
				this.Actions()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Position* $mol_app_supplies_position position <= position*
		 * ```
		 */
		@ $mol_mem_key
		Position(id: any) {
			const obj = new this.$.$mol_app_supplies_position()
			
			obj.position = () => this.position(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Close_icon $mol_icon_cross
		 * ```
		 */
		@ $mol_mem
		Close_icon() {
			const obj = new this.$.$mol_icon_cross()
			
			return obj
		}
		
		/**
		 * ```tree
		 * close_arg * supply null
		 * ```
		 */
		close_arg() {
			return {
				supply: null as any
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * Close $mol_link
		 * 	sub / <= Close_icon
		 * 	arg <= close_arg
		 * ```
		 */
		@ $mol_mem
		Close() {
			const obj = new this.$.$mol_link()
			
			obj.sub = () => [
				this.Close_icon()
			] as readonly any[]
			obj.arg = () => this.close_arg()
			
			return obj
		}
		
		/**
		 * ```tree
		 * org_title @ \Organization
		 * ```
		 */
		org_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_org_title' )
		}
		
		/**
		 * ```tree
		 * provider_title @ \Provider
		 * ```
		 */
		provider_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_provider_title' )
		}
		
		/**
		 * ```tree
		 * provider_name \
		 * ```
		 */
		provider_name() {
			return ""
		}
		
		/**
		 * ```tree
		 * Provider $mol_labeler
		 * 	title <= provider_title
		 * 	content / <= provider_name
		 * ```
		 */
		@ $mol_mem
		Provider() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.provider_title()
			obj.content = () => [
				this.provider_name()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * customer_label @ \Consumer
		 * ```
		 */
		customer_label() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_customer_label' )
		}
		
		/**
		 * ```tree
		 * consumer_name \
		 * ```
		 */
		consumer_name() {
			return ""
		}
		
		/**
		 * ```tree
		 * Consumer $mol_labeler
		 * 	title <= customer_label
		 * 	content / <= consumer_name
		 * ```
		 */
		@ $mol_mem
		Consumer() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.customer_label()
			obj.content = () => [
				this.consumer_name()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * supply_group_title @ \Supply Group
		 * ```
		 */
		supply_group_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_supply_group_title' )
		}
		
		/**
		 * ```tree
		 * supply_group_name \
		 * ```
		 */
		supply_group_name() {
			return ""
		}
		
		/**
		 * ```tree
		 * Supply_group $mol_labeler
		 * 	title <= supply_group_title
		 * 	content / <= supply_group_name
		 * ```
		 */
		@ $mol_mem
		Supply_group() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.supply_group_title()
			obj.content = () => [
				this.supply_group_name()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * ballance_unit_title @ \Ballance Unit
		 * ```
		 */
		ballance_unit_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_ballance_unit_title' )
		}
		
		/**
		 * ```tree
		 * ballance_unit_name \
		 * ```
		 */
		ballance_unit_name() {
			return ""
		}
		
		/**
		 * ```tree
		 * Ballance_unit_item $mol_labeler
		 * 	title <= ballance_unit_title
		 * 	content / <= ballance_unit_name
		 * ```
		 */
		@ $mol_mem
		Ballance_unit_item() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.ballance_unit_title()
			obj.content = () => [
				this.ballance_unit_name()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * org_items /
		 * 	<= Provider
		 * 	<= Consumer
		 * 	<= Supply_group
		 * 	<= Ballance_unit_item
		 * ```
		 */
		org_items() {
			return [
				this.Provider(),
				this.Consumer(),
				this.Supply_group(),
				this.Ballance_unit_item()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Org $mol_row
		 * 	title <= org_title
		 * 	sub <= org_items
		 * ```
		 */
		@ $mol_mem
		Org() {
			const obj = new this.$.$mol_row()
			
			obj.title = () => this.org_title()
			obj.sub = () => this.org_items()
			
			return obj
		}
		
		/**
		 * ```tree
		 * cons_title @ \Consumer
		 * ```
		 */
		cons_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_cons_title' )
		}
		
		/**
		 * ```tree
		 * contract_title @ \Contract
		 * ```
		 */
		contract_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_contract_title' )
		}
		
		/**
		 * ```tree
		 * contract_id \
		 * ```
		 */
		contract_id() {
			return ""
		}
		
		/**
		 * ```tree
		 * Contract $mol_labeler
		 * 	title <= contract_title
		 * 	content / <= contract_id
		 * ```
		 */
		@ $mol_mem
		Contract() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.contract_title()
			obj.content = () => [
				this.contract_id()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * pay_method_title @ \Pay Method
		 * ```
		 */
		pay_method_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_pay_method_title' )
		}
		
		/**
		 * ```tree
		 * pay_method_name \
		 * ```
		 */
		pay_method_name() {
			return ""
		}
		
		/**
		 * ```tree
		 * Pay_method $mol_labeler
		 * 	title <= pay_method_title
		 * 	content / <= pay_method_name
		 * ```
		 */
		@ $mol_mem
		Pay_method() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.pay_method_title()
			obj.content = () => [
				this.pay_method_name()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * manager_title @ \Manager
		 * ```
		 */
		manager_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_manager_title' )
		}
		
		/**
		 * ```tree
		 * manager_name \
		 * ```
		 */
		manager_name() {
			return ""
		}
		
		/**
		 * ```tree
		 * Manager $mol_labeler
		 * 	title <= manager_title
		 * 	content / <= manager_name
		 * ```
		 */
		@ $mol_mem
		Manager() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.manager_title()
			obj.content = () => [
				this.manager_name()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * debitod_title @ \Debitor
		 * ```
		 */
		debitod_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_debitod_title' )
		}
		
		/**
		 * ```tree
		 * debitor_name \
		 * ```
		 */
		debitor_name() {
			return ""
		}
		
		/**
		 * ```tree
		 * Debitor $mol_labeler
		 * 	title <= debitod_title
		 * 	content / <= debitor_name
		 * ```
		 */
		@ $mol_mem
		Debitor() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.debitod_title()
			obj.content = () => [
				this.debitor_name()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * cons_items /
		 * 	<= Contract
		 * 	<= Pay_method
		 * 	<= Manager
		 * 	<= Debitor
		 * ```
		 */
		cons_items() {
			return [
				this.Contract(),
				this.Pay_method(),
				this.Manager(),
				this.Debitor()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Cons $mol_row
		 * 	title <= cons_title
		 * 	sub <= cons_items
		 * ```
		 */
		@ $mol_mem
		Cons() {
			const obj = new this.$.$mol_row()
			
			obj.title = () => this.cons_title()
			obj.sub = () => this.cons_items()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Descr_deck $mol_deck items /
		 * 	<= Org
		 * 	<= Cons
		 * ```
		 */
		@ $mol_mem
		Descr_deck() {
			const obj = new this.$.$mol_deck()
			
			obj.items = () => [
				this.Org(),
				this.Cons()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Descr_card $mol_card Content <= Descr_deck
		 * ```
		 */
		@ $mol_mem
		Descr_card() {
			const obj = new this.$.$mol_card()
			
			obj.Content = () => this.Descr_deck()
			
			return obj
		}
		
		/**
		 * ```tree
		 * attach_title @ \Attachments
		 * ```
		 */
		attach_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_attach_title' )
		}
		
		/**
		 * ```tree
		 * attachments /string
		 * ```
		 */
		attachments() {
			return [
			] as readonly string[]
		}
		
		/**
		 * ```tree
		 * attach_new? null
		 * ```
		 */
		@ $mol_mem
		attach_new(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Attach $mol_attach
		 * 	items <= attachments
		 * 	attach_new? <=> attach_new?
		 * ```
		 */
		@ $mol_mem
		Attach() {
			const obj = new this.$.$mol_attach()
			
			obj.items = () => this.attachments()
			obj.attach_new = (next?: any) => this.attach_new(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Attach_section $mol_section
		 * 	head / <= attach_title
		 * 	content / <= Attach
		 * ```
		 */
		@ $mol_mem
		Attach_section() {
			const obj = new this.$.$mol_section()
			
			obj.head = () => [
				this.attach_title()
			] as readonly any[]
			obj.content = () => [
				this.Attach()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * positions_title @ \Positions
		 * ```
		 */
		positions_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_positions_title' )
		}
		
		/**
		 * ```tree
		 * cost $mol_unit_money valueOf 0
		 * ```
		 */
		@ $mol_mem
		cost() {
			const obj = new this.$.$mol_unit_money()
			
			obj.valueOf = () => 0
			
			return obj
		}
		
		/**
		 * ```tree
		 * Cost_value $mol_cost value <= cost
		 * ```
		 */
		@ $mol_mem
		Cost_value() {
			const obj = new this.$.$mol_cost()
			
			obj.value = () => this.cost()
			
			return obj
		}
		
		/**
		 * ```tree
		 * positions_head /
		 * 	<= positions_title
		 * 	<= Cost_value
		 * ```
		 */
		positions_head() {
			return [
				this.positions_title(),
				this.Cost_value()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * positions /$mol_view
		 * ```
		 */
		positions() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * Positions $mol_list rows <= positions
		 * ```
		 */
		@ $mol_mem
		Positions() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => this.positions()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Positions_section $mol_section
		 * 	head <= positions_head
		 * 	Content <= Positions
		 * ```
		 */
		@ $mol_mem
		Positions_section() {
			const obj = new this.$.$mol_section()
			
			obj.head = () => this.positions_head()
			obj.Content = () => this.Positions()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Content $mol_list rows /
		 * 	<= Descr_card
		 * 	<= Attach_section
		 * 	<= Positions_section
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Descr_card(),
				this.Attach_section(),
				this.Positions_section()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * approved? false
		 * ```
		 */
		@ $mol_mem
		approved(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * approved_title @ \Approved
		 * ```
		 */
		approved_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_approved_title' )
		}
		
		/**
		 * ```tree
		 * Approve $mol_check_box
		 * 	checked? <=> approved?
		 * 	title <= approved_title
		 * ```
		 */
		@ $mol_mem
		Approve() {
			const obj = new this.$.$mol_check_box()
			
			obj.checked = (next?: any) => this.approved(next)
			obj.title = () => this.approved_title()
			
			return obj
		}
		
		/**
		 * ```tree
		 * actions / <= Approve
		 * ```
		 */
		actions() {
			return [
				this.Approve()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Actions $mol_row sub <= actions
		 * ```
		 */
		@ $mol_mem
		Actions() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => this.actions()
			
			return obj
		}
		
		/**
		 * ```tree
		 * position* null
		 * ```
		 */
		position(id: any) {
			return null as any
		}
	}
	
}

