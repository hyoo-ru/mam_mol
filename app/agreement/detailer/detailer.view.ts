module $.$mol {
	export class $mol_app_agreement_detailer extends $.$mol_app_agreement_detailer {
		
		supply() {
			return null as $mol_app_agreement_supply
		}
		
		title() {
			return `${super.title()} ${this.supply().id()}` 
		}
		
		approved( ...diff : boolean[] ) {
			if( diff[0] === void 0 ) return this.supply().status() === $mol_app_agreement_supply_status.approved
			this.supply().status( diff[0]
				? $mol_app_agreement_supply_status.approved
				: $mol_app_agreement_supply_status.pending
			)
			return diff[0]
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
		
		@ $mol_prop()
		position( index : number ) {
			return new $mol_app_agreement_positioner().setup( obj => {
				obj.position = ()=> this.supply().positions()[ index ]
			} )
		}

		attachments() {
			return this.supply().attachments().map( ( pos , index )=> this.attachment( index ) )
		}

		@ $mol_prop()
		attachment( index : number ) {
			return new $mol_attacher_item().setup( obj => {
				obj.urlThumb = ()=> this.supply().attachments()[ index ].urlThumb()
				obj.urlLoad = ()=> this.supply().attachments()[ index ].urlLoad()
			} )
		}

		attachNew( ...diff : string[] ) {
			var supply = this.supply()
			var list = supply.attachments()
			var url = $mol_const( diff[0] )
			list = list.concat( new $mol_app_agreement_attachment().setup( obj => {
				obj.urlThumb = obj.urlLoad = url
			} ) )
			supply.attachments( list )
		}

	}
}
