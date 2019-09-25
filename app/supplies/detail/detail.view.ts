namespace $.$$ {
	export class $mol_app_supplies_detail extends $.$mol_app_supplies_detail {
		
		supply() {
			return null as $mol_app_supplies_domain_supply
		}
		
		title() {
			return `${super.title()} ${this.supply().id()}` 
		}
		
		approved( next? : boolean ) {
			if( next === void 0 ) {
				return this.supply().status() === $mol_app_supplies_domain_supply_status.approved
			}
			
			this.supply().status( next
				? $mol_app_supplies_domain_supply_status.approved
				: $mol_app_supplies_domain_supply_status.pending
			)
			
			return next
		}
		
		provider_name() {
			return this.supply().provider().name()
		}

		consumer_name() {
			return this.supply().consumer().name()
		}

		ballance_unit_name() {
			return this.supply().ballance_unit().name()
		}

		supply_group_name() {
			return this.supply().group().name()
		}

		manager_name() {
			return this.supply().manager().name()
		}

		pay_method_name() {
			return this.supply().pay_method().name()
		}

		debitor_name() {
			return this.supply().debitor().name()
		}

		contract_id() {
			return this.supply().contract().id()
		}

		cost() {
			return this.supply().cost()
		}
		
		status() {
			return String( this.supply().status() )
		}
		
		positions() {
			return this.supply().positions().map( ( pos , index )=> this.Position( index ) )
		}
		
		position( index : number ) {
			return this.supply().positions()[ index ]
		}

		attachments() {
			return this.supply().attachments().map( ( pos , index )=> this.Attachment( index ) )
		}

		attachment_thumb( index : number ) {
			return this.supply().attachments()[ index ].url_thumb()
		}
		
		attachment_load( index : number ) {
			return this.supply().attachments()[ index ].url_load()
		}

		attach_new( next? : string ) {
			var supply = this.supply()
			var list = supply.attachments()
			var url = $mol_const( next )
			list = list.concat( $mol_app_supplies_domain_attachment.make({
				url_thumb : url ,
				url_load : url ,
			}) )
			supply.attachments( list )
		}
		
		body_scroll_top( next? : number ) {
			var supplyId = this.supply() && this.supply().id()
			return $mol_state_session.value( `${ this }.scroll_top(${supplyId})` , next )
		}

	}
}
