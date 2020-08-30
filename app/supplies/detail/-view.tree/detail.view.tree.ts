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
		 * tools / <= Close $mol_link
		 * 	sub / <= Close_icon $mol_icon_cross
		 * 	arg <= close_arg * supply null
		 * ```
		 */
		tools() {
			return [
				this.Close()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Close $mol_link
		 * 	sub / <= Close_icon $mol_icon_cross
		 * 	arg <= close_arg * supply null
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
			}
		}

		/**
		 * ```tree
		 * body / <= Content $mol_list rows /
		 * 	<= Descr_card $mol_card Content <= Descr_deck $mol_deck items /
		 * 		<= Org *
		 * 			title <= org_title @ \Organization
		 * 			Content <= Org_content $mol_row sub <= org_items /
		 * 				<= Provider $mol_labeler
		 * 					title <= provider_title @ \Provider
		 * 					content / <= provider_name \
		 * 				<= Consumer $mol_labeler
		 * 					title <= customer_label @ \Consumer
		 * 					content / <= consumer_name \
		 * 				<= Supply_group $mol_labeler
		 * 					title <= supply_group_title @ \Supply Group
		 * 					content / <= supply_group_name \
		 * 				<= Ballance_unit_item $mol_labeler
		 * 					title <= ballance_unit_title @ \Ballance Unit
		 * 					content / <= ballance_unit_name \
		 * 		<= Cons *
		 * 			title <= cons_title @ \Consumer
		 * 			Content <= Cons_content $mol_row sub <= cons_items /
		 * 				<= Contract $mol_labeler
		 * 					title <= contract_title @ \Contract
		 * 					content / <= contract_id \
		 * 				<= Pay_method $mol_labeler
		 * 					title <= pay_method_title @ \Pay Method
		 * 					content / <= pay_method_name \
		 * 				<= Manager $mol_labeler
		 * 					title <= manager_title @ \Manager
		 * 					content / <= manager_name \
		 * 				<= Debitor $mol_labeler
		 * 					title <= debitod_title @ \Debitor
		 * 					content / <= debitor_name \
		 * 	<= Attach_section $mol_section
		 * 		head / <= attach_title @ \Attachments
		 * 		Content <= Attach $mol_attach
		 * 			items <= attachments /$mol_view
		 * 			attach_new?val <=> attach_new?val null
		 * 	<= Positions_section $mol_section
		 * 		head <= positions_head /
		 * 			<= positions_title @ \Positions
		 * 			<= Cost $mol_labeler
		 * 				title <= cost_title @ \Cost
		 * 				content / <= Cost_value $mol_cost value <= cost $mol_unit_money valueOf 0
		 * 		Content <= Positions $mol_list rows <= positions /$mol_view
		 * ```
		 */
		body() {
			return [
				this.Content()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Content $mol_list rows /
		 * 	<= Descr_card $mol_card Content <= Descr_deck $mol_deck items /
		 * 		<= Org *
		 * 			title <= org_title @ \Organization
		 * 			Content <= Org_content $mol_row sub <= org_items /
		 * 				<= Provider $mol_labeler
		 * 					title <= provider_title @ \Provider
		 * 					content / <= provider_name \
		 * 				<= Consumer $mol_labeler
		 * 					title <= customer_label @ \Consumer
		 * 					content / <= consumer_name \
		 * 				<= Supply_group $mol_labeler
		 * 					title <= supply_group_title @ \Supply Group
		 * 					content / <= supply_group_name \
		 * 				<= Ballance_unit_item $mol_labeler
		 * 					title <= ballance_unit_title @ \Ballance Unit
		 * 					content / <= ballance_unit_name \
		 * 		<= Cons *
		 * 			title <= cons_title @ \Consumer
		 * 			Content <= Cons_content $mol_row sub <= cons_items /
		 * 				<= Contract $mol_labeler
		 * 					title <= contract_title @ \Contract
		 * 					content / <= contract_id \
		 * 				<= Pay_method $mol_labeler
		 * 					title <= pay_method_title @ \Pay Method
		 * 					content / <= pay_method_name \
		 * 				<= Manager $mol_labeler
		 * 					title <= manager_title @ \Manager
		 * 					content / <= manager_name \
		 * 				<= Debitor $mol_labeler
		 * 					title <= debitod_title @ \Debitor
		 * 					content / <= debitor_name \
		 * 	<= Attach_section $mol_section
		 * 		head / <= attach_title @ \Attachments
		 * 		Content <= Attach $mol_attach
		 * 			items <= attachments /$mol_view
		 * 			attach_new?val <=> attach_new?val null
		 * 	<= Positions_section $mol_section
		 * 		head <= positions_head /
		 * 			<= positions_title @ \Positions
		 * 			<= Cost $mol_labeler
		 * 				title <= cost_title @ \Cost
		 * 				content / <= Cost_value $mol_cost value <= cost $mol_unit_money valueOf 0
		 * 		Content <= Positions $mol_list rows <= positions /$mol_view
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
		 * Descr_card $mol_card Content <= Descr_deck $mol_deck items /
		 * 	<= Org *
		 * 		title <= org_title @ \Organization
		 * 		Content <= Org_content $mol_row sub <= org_items /
		 * 			<= Provider $mol_labeler
		 * 				title <= provider_title @ \Provider
		 * 				content / <= provider_name \
		 * 			<= Consumer $mol_labeler
		 * 				title <= customer_label @ \Consumer
		 * 				content / <= consumer_name \
		 * 			<= Supply_group $mol_labeler
		 * 				title <= supply_group_title @ \Supply Group
		 * 				content / <= supply_group_name \
		 * 			<= Ballance_unit_item $mol_labeler
		 * 				title <= ballance_unit_title @ \Ballance Unit
		 * 				content / <= ballance_unit_name \
		 * 	<= Cons *
		 * 		title <= cons_title @ \Consumer
		 * 		Content <= Cons_content $mol_row sub <= cons_items /
		 * 			<= Contract $mol_labeler
		 * 				title <= contract_title @ \Contract
		 * 				content / <= contract_id \
		 * 			<= Pay_method $mol_labeler
		 * 				title <= pay_method_title @ \Pay Method
		 * 				content / <= pay_method_name \
		 * 			<= Manager $mol_labeler
		 * 				title <= manager_title @ \Manager
		 * 				content / <= manager_name \
		 * 			<= Debitor $mol_labeler
		 * 				title <= debitod_title @ \Debitor
		 * 				content / <= debitor_name \
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
		 * Descr_deck $mol_deck items /
		 * 	<= Org *
		 * 		title <= org_title @ \Organization
		 * 		Content <= Org_content $mol_row sub <= org_items /
		 * 			<= Provider $mol_labeler
		 * 				title <= provider_title @ \Provider
		 * 				content / <= provider_name \
		 * 			<= Consumer $mol_labeler
		 * 				title <= customer_label @ \Consumer
		 * 				content / <= consumer_name \
		 * 			<= Supply_group $mol_labeler
		 * 				title <= supply_group_title @ \Supply Group
		 * 				content / <= supply_group_name \
		 * 			<= Ballance_unit_item $mol_labeler
		 * 				title <= ballance_unit_title @ \Ballance Unit
		 * 				content / <= ballance_unit_name \
		 * 	<= Cons *
		 * 		title <= cons_title @ \Consumer
		 * 		Content <= Cons_content $mol_row sub <= cons_items /
		 * 			<= Contract $mol_labeler
		 * 				title <= contract_title @ \Contract
		 * 				content / <= contract_id \
		 * 			<= Pay_method $mol_labeler
		 * 				title <= pay_method_title @ \Pay Method
		 * 				content / <= pay_method_name \
		 * 			<= Manager $mol_labeler
		 * 				title <= manager_title @ \Manager
		 * 				content / <= manager_name \
		 * 			<= Debitor $mol_labeler
		 * 				title <= debitod_title @ \Debitor
		 * 				content / <= debitor_name \
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
		 * Org *
		 * 	title <= org_title @ \Organization
		 * 	Content <= Org_content $mol_row sub <= org_items /
		 * 		<= Provider $mol_labeler
		 * 			title <= provider_title @ \Provider
		 * 			content / <= provider_name \
		 * 		<= Consumer $mol_labeler
		 * 			title <= customer_label @ \Consumer
		 * 			content / <= consumer_name \
		 * 		<= Supply_group $mol_labeler
		 * 			title <= supply_group_title @ \Supply Group
		 * 			content / <= supply_group_name \
		 * 		<= Ballance_unit_item $mol_labeler
		 * 			title <= ballance_unit_title @ \Ballance Unit
		 * 			content / <= ballance_unit_name \
		 * ```
		 */
		Org() {
			return {
				title: this.org_title(),
				Content: this.Org_content()
			}
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
		 * Org_content $mol_row sub <= org_items /
		 * 	<= Provider $mol_labeler
		 * 		title <= provider_title @ \Provider
		 * 		content / <= provider_name \
		 * 	<= Consumer $mol_labeler
		 * 		title <= customer_label @ \Consumer
		 * 		content / <= consumer_name \
		 * 	<= Supply_group $mol_labeler
		 * 		title <= supply_group_title @ \Supply Group
		 * 		content / <= supply_group_name \
		 * 	<= Ballance_unit_item $mol_labeler
		 * 		title <= ballance_unit_title @ \Ballance Unit
		 * 		content / <= ballance_unit_name \
		 * ```
		 */
		@ $mol_mem
		Org_content() {
			const obj = new this.$.$mol_row()

			obj.sub = () => this.org_items()

			return obj
		}

		/**
		 * ```tree
		 * org_items /
		 * 	<= Provider $mol_labeler
		 * 		title <= provider_title @ \Provider
		 * 		content / <= provider_name \
		 * 	<= Consumer $mol_labeler
		 * 		title <= customer_label @ \Consumer
		 * 		content / <= consumer_name \
		 * 	<= Supply_group $mol_labeler
		 * 		title <= supply_group_title @ \Supply Group
		 * 		content / <= supply_group_name \
		 * 	<= Ballance_unit_item $mol_labeler
		 * 		title <= ballance_unit_title @ \Ballance Unit
		 * 		content / <= ballance_unit_name \
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
		 * Provider $mol_labeler
		 * 	title <= provider_title @ \Provider
		 * 	content / <= provider_name \
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
		 * Consumer $mol_labeler
		 * 	title <= customer_label @ \Consumer
		 * 	content / <= consumer_name \
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
		 * Supply_group $mol_labeler
		 * 	title <= supply_group_title @ \Supply Group
		 * 	content / <= supply_group_name \
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
		 * Ballance_unit_item $mol_labeler
		 * 	title <= ballance_unit_title @ \Ballance Unit
		 * 	content / <= ballance_unit_name \
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
		 * Cons *
		 * 	title <= cons_title @ \Consumer
		 * 	Content <= Cons_content $mol_row sub <= cons_items /
		 * 		<= Contract $mol_labeler
		 * 			title <= contract_title @ \Contract
		 * 			content / <= contract_id \
		 * 		<= Pay_method $mol_labeler
		 * 			title <= pay_method_title @ \Pay Method
		 * 			content / <= pay_method_name \
		 * 		<= Manager $mol_labeler
		 * 			title <= manager_title @ \Manager
		 * 			content / <= manager_name \
		 * 		<= Debitor $mol_labeler
		 * 			title <= debitod_title @ \Debitor
		 * 			content / <= debitor_name \
		 * ```
		 */
		Cons() {
			return {
				title: this.cons_title(),
				Content: this.Cons_content()
			}
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
		 * Cons_content $mol_row sub <= cons_items /
		 * 	<= Contract $mol_labeler
		 * 		title <= contract_title @ \Contract
		 * 		content / <= contract_id \
		 * 	<= Pay_method $mol_labeler
		 * 		title <= pay_method_title @ \Pay Method
		 * 		content / <= pay_method_name \
		 * 	<= Manager $mol_labeler
		 * 		title <= manager_title @ \Manager
		 * 		content / <= manager_name \
		 * 	<= Debitor $mol_labeler
		 * 		title <= debitod_title @ \Debitor
		 * 		content / <= debitor_name \
		 * ```
		 */
		@ $mol_mem
		Cons_content() {
			const obj = new this.$.$mol_row()

			obj.sub = () => this.cons_items()

			return obj
		}

		/**
		 * ```tree
		 * cons_items /
		 * 	<= Contract $mol_labeler
		 * 		title <= contract_title @ \Contract
		 * 		content / <= contract_id \
		 * 	<= Pay_method $mol_labeler
		 * 		title <= pay_method_title @ \Pay Method
		 * 		content / <= pay_method_name \
		 * 	<= Manager $mol_labeler
		 * 		title <= manager_title @ \Manager
		 * 		content / <= manager_name \
		 * 	<= Debitor $mol_labeler
		 * 		title <= debitod_title @ \Debitor
		 * 		content / <= debitor_name \
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
		 * Contract $mol_labeler
		 * 	title <= contract_title @ \Contract
		 * 	content / <= contract_id \
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
		 * Pay_method $mol_labeler
		 * 	title <= pay_method_title @ \Pay Method
		 * 	content / <= pay_method_name \
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
		 * Manager $mol_labeler
		 * 	title <= manager_title @ \Manager
		 * 	content / <= manager_name \
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
		 * Debitor $mol_labeler
		 * 	title <= debitod_title @ \Debitor
		 * 	content / <= debitor_name \
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
		 * Attach_section $mol_section
		 * 	head / <= attach_title @ \Attachments
		 * 	Content <= Attach $mol_attach
		 * 		items <= attachments /$mol_view
		 * 		attach_new?val <=> attach_new?val null
		 * ```
		 */
		@ $mol_mem
		Attach_section() {
			const obj = new this.$.$mol_section()

			obj.head = () => [
				this.attach_title()
			] as readonly any[]
			obj.Content = () => this.Attach()

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
		 * Attach $mol_attach
		 * 	items <= attachments /$mol_view
		 * 	attach_new?val <=> attach_new?val null
		 * ```
		 */
		@ $mol_mem
		Attach() {
			const obj = new this.$.$mol_attach()

			obj.items = () => this.attachments()
			obj.attach_new = (val?: any) => this.attach_new(val)

			return obj
		}

		/**
		 * ```tree
		 * attachments /$mol_view
		 * ```
		 */
		attachments() {
			return [

			] as readonly $mol_view[]
		}

		/**
		 * ```tree
		 * attach_new?val null
		 * ```
		 */
		@ $mol_mem
		attach_new(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * Positions_section $mol_section
		 * 	head <= positions_head /
		 * 		<= positions_title @ \Positions
		 * 		<= Cost $mol_labeler
		 * 			title <= cost_title @ \Cost
		 * 			content / <= Cost_value $mol_cost value <= cost $mol_unit_money valueOf 0
		 * 	Content <= Positions $mol_list rows <= positions /$mol_view
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
		 * positions_head /
		 * 	<= positions_title @ \Positions
		 * 	<= Cost $mol_labeler
		 * 		title <= cost_title @ \Cost
		 * 		content / <= Cost_value $mol_cost value <= cost $mol_unit_money valueOf 0
		 * ```
		 */
		positions_head() {
			return [
				this.positions_title(),
				this.Cost()
			] as readonly any[]
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
		 * Cost $mol_labeler
		 * 	title <= cost_title @ \Cost
		 * 	content / <= Cost_value $mol_cost value <= cost $mol_unit_money valueOf 0
		 * ```
		 */
		@ $mol_mem
		Cost() {
			const obj = new this.$.$mol_labeler()

			obj.title = () => this.cost_title()
			obj.content = () => [
				this.Cost_value()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * cost_title @ \Cost
		 * ```
		 */
		cost_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_detail_cost_title' )
		}

		/**
		 * ```tree
		 * Cost_value $mol_cost value <= cost $mol_unit_money valueOf 0
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
		 * Positions $mol_list rows <= positions /$mol_view
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
		 * positions /$mol_view
		 * ```
		 */
		positions() {
			return [

			] as readonly $mol_view[]
		}

		/**
		 * ```tree
		 * foot / <= Actions $mol_row sub <= actions / <= Approve $mol_check_box
		 * 	checked?val <=> approved?val false
		 * 	title <= approved_title @ \Approved
		 * ```
		 */
		foot() {
			return [
				this.Actions()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Actions $mol_row sub <= actions / <= Approve $mol_check_box
		 * 	checked?val <=> approved?val false
		 * 	title <= approved_title @ \Approved
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
		 * actions / <= Approve $mol_check_box
		 * 	checked?val <=> approved?val false
		 * 	title <= approved_title @ \Approved
		 * ```
		 */
		actions() {
			return [
				this.Approve()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Approve $mol_check_box
		 * 	checked?val <=> approved?val false
		 * 	title <= approved_title @ \Approved
		 * ```
		 */
		@ $mol_mem
		Approve() {
			const obj = new this.$.$mol_check_box()

			obj.checked = (val?: any) => this.approved(val)
			obj.title = () => this.approved_title()

			return obj
		}

		/**
		 * ```tree
		 * approved?val false
		 * ```
		 */
		@ $mol_mem
		approved(val?: any) {
			if ( val !== undefined ) return val
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
		 * Position!index $mol_app_supplies_position position <= position!index null
		 * ```
		 */
		@ $mol_mem_key
		Position(index: any) {
			const obj = new this.$.$mol_app_supplies_position()

			obj.position = () => this.position(index)

			return obj
		}

		/**
		 * ```tree
		 * position!index null
		 * ```
		 */
		position(index: any) {
			return null as any
		}


		/**
		 * ```tree
		 * Attachment!index $mol_attach_item
		 * 	url_thumb <= attachment_thumb!index \
		 * 	url_load <= attachment_load!index \
		 * ```
		 */
		@ $mol_mem_key
		Attachment(index: any) {
			const obj = new this.$.$mol_attach_item()

			obj.url_thumb = () => this.attachment_thumb(index)
			obj.url_load = () => this.attachment_load(index)

			return obj
		}

		/**
		 * ```tree
		 * attachment_thumb!index \
		 * ```
		 */
		attachment_thumb(index: any) {
			return ""
		}

		/**
		 * ```tree
		 * attachment_load!index \
		 * ```
		 */
		attachment_load(index: any) {
			return ""
		}
	}

}
