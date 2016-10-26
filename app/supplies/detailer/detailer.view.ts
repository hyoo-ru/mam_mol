module $.$mol {
	export class $mol_app_supplies_detailer extends $.$mol_app_supplies_detailer {
		
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
		
		providerName() {
			return this.supply().provider().name()
		}

		consumerName() {
			return this.supply().consumer().name()
		}

		ballanceUnitName() {
			return this.supply().ballanceUnit().name()
		}

		supplyGroupName() {
			return this.supply().group().name()
		}

		managerName() {
			return this.supply().manager().name()
		}

		payMethodName() {
			return this.supply().payMethod().name()
		}

		debitorName() {
			return this.supply().debitor().name()
		}

		contractId() {
			return this.supply().contract().id()
		}

		cost() {
			return this.supply().cost()
		}
		
		status() {
			return String( this.supply().status() )
		}
		
		positions() {
			return this.supply().positions().map( ( pos , index )=> this.position( index ) )
		}
		
		@ $mol_mem_key()
		position( index : number ) {
			return new $mol_app_supplies_positioner().setup( obj => {
				obj.position = ()=> this.supply().positions()[ index ]
			} )
		}

		attachments() {
			return this.supply().attachments().map( ( pos , index )=> this.attachment( index ) )
		}

		@ $mol_mem_key()
		attachment( index : number ) {
			return new $mol_attacher_item().setup( obj => {
				obj.urlThumb = ()=> this.supply().attachments()[ index ].urlThumb()
				obj.urlLoad = ()=> this.supply().attachments()[ index ].urlLoad()
			} )
		}

		attachNew( next? : string ) {
			var supply = this.supply()
			var list = supply.attachments()
			var url = $mol_const( next )
			list = list.concat( new $mol_app_supplies_domain_attachment().setup( obj => {
				obj.urlThumb = obj.urlLoad = url
			} ) )
			supply.attachments( list )
		}
		
		bodier() {
			return new $mol_scroller().setup( obj => {
				obj.childs = ()=> this.body()
				obj.scrollTop = ( next? )=> this.scrollTop( next )
			} )
		}
		
		scrollTop( next? : number ) {
			var supplyId = this.supply() && this.supply().id()
			return $mol_state_session.value( this.objectPath() + `.scrollTop(${supplyId})` , next )
		}

	}
}
