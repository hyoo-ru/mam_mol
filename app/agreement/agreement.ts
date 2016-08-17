/// Поставщик
class $mol_app_agreement_provider extends $mol_model {
	id() : string { return void 0 }
	name() : string { return void 0 }
}

/// Группа закупок
class $mol_app_agreement_supply_group extends $mol_model {
	id() : string { return void 0 }
	name() : string { return void 0 }
	manager() : $mol_app_agreement_person { return void 0 }
}

/// Закупочный дивизион
class $mol_app_agreement_supply_division extends $mol_model {
	id() : string { return void 0 }
	name() : string { return void 0 }
}

/// Способ оплаты
class $mol_app_agreement_payMethod extends $mol_model {
	id() : string { return void 0 }
	name() : string { return void 0 }
}

/// Дебитор
class $mol_app_agreement_debitor extends $mol_model {
	id() : string { return void 0 }
	name() : string { return void 0 }
}

/// Продукт
interface $mol_app_agreement_supply_position {
	name : string
	dateSupply : $jin.time.moment_class
	stock : $mol_app_agreement_stock
	price : $mol_unit_money
	quantity : number
	cost : $mol_unit_money
}

/// Работник
class $mol_app_agreement_person extends $mol_model {
	id() : string { return void 0 }
	name() : string { return void 0 }
}

/// Договор
class $mol_app_agreement_contract extends $mol_model {
	id() : string { return void 0 }
}

/// Балансовая единица
class $mol_app_agreement_ballanceUnit extends $mol_model {
	id() : string { return void 0 }
	name() : string { return void 0 }
}

/// Закупочная организация
class $mol_app_agreement_consumer extends $mol_model {
	id() : string { return void 0 }
	name() : string { return void 0 }
}

/// Склад для доставки
class $mol_app_agreement_stock extends $mol_model {
	id() : string { return void 0 }
	name() : string { return void 0 }
}

/// Заявка на закупку
class $mol_app_agreement_supply extends $mol_model {
	id() : string { return void 0 }
	provider() : $mol_app_agreement_provider { return void 0 }
	consumer() : $mol_app_agreement_consumer { return void 0 }
	group() : $mol_app_agreement_supply_group { return void 0 }
	status() : $mol_app_agreement_supply_status { return void 0 }
	ballanceUnit() : $mol_app_agreement_ballanceUnit { return void 0 }
	manager() : $mol_app_agreement_person { return void 0 }
	contract() : $mol_app_agreement_contract { return void 0 }
	payMethod() : $mol_app_agreement_payMethod { return void 0 }
	debitor() : $mol_app_agreement_debitor { return void 0 }
	positions() : $mol_app_agreement_supply_position[] { return void 0 }
	cost() : $mol_unit_money { return void 0 }
}

/// Статус заявки на закупку
enum $mol_app_agreement_supply_status {
	pending = 'pending' as any ,
	approved = 'approved' as any ,
	rejected = 'rejected' as any ,
}

/// Демонстрационный бизнес домен
class $mol_app_agreement_domain_mock extends $mol_model {
	
	@ $mol_prop()
	supplies() {
		return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split( '' ).map( id => this.supply( id ) )
	}
	
	@ $mol_prop()
	supply( id : string ) {
		return new $mol_app_agreement_supply().setup( obj => {
			obj.id = ()=> id
			obj.cost = ()=> new $mol_unit_money_rur( Math.round( Math.random() * 1000000 ) )
			obj.status = ()=> $mol_app_agreement_supply_status[ [ 'pending' , 'approved' , 'rejected' ][ Math.floor( Math.random() * 3 ) ] ]
			obj.provider = ()=> this.provider( Math.random().toString( 16 ).substring( 2 ) )
			obj.consumer = ()=> this.consumer( Math.random().toString( 16 ).substring( 2 ) )
			obj.group = ()=> this.supplyGroup( Math.random().toString( 16 ).substring( 2 ) )
			obj.contract = ()=> this.contract( Math.random().toString( 16 ).substring( 2 ) )
			obj.manager = ()=> this.person( Math.random().toString( 16 ).substring( 2 ) )
			obj.ballanceUnit = ()=> this.ballanceUnit( Math.random().toString( 16 ).substring( 2 ) )
			obj.payMethod = ()=> this.payMethod( Math.random().toString( 16 ).substring( 2 ) )
			obj.debitor = ()=> this.debitor( Math.random().toString( 16 ).substring( 2 ) )
		} )
	}
	
	@ $mol_prop()
	provider( id : string ) {
		return new $mol_app_agreement_provider().setup( obj => {
			obj.id = ()=> id
			obj.name = ()=> [ 'ACME Human Resources' , 'ACME' , 'ACME Mobility' ][ Math.floor( Math.random() * 3 ) ]
		} )
	}

	@ $mol_prop()
	consumer( id : string ) {
		return new $mol_app_agreement_consumer().setup( obj => {
			obj.id = ()=> id
			obj.name = ()=> [ 'ACME Product Placement' , 'ACME Direct' , 'ACME Learning' ][ Math.floor( Math.random() * 3 ) ]
		} )
	}

	@ $mol_prop()
	ballanceUnit( id : string ) {
		return new $mol_app_agreement_ballanceUnit().setup( obj => {
			obj.id = ()=> id
			obj.name = ()=> [ 'ACME Enterprise' , 'ACME Customer' , 'ACME Inside' ][ Math.floor( Math.random() * 3 ) ]
		} )
	}

	@ $mol_prop()
	division( id : string ) {
		return new $mol_app_agreement_supply_division().setup( obj => {
			obj.id = ()=> id
			obj.name = ()=> [ 'Food' , 'Tech' , 'Humans' ][ Math.floor( Math.random() * 3 ) ]
		} )
	}

	@ $mol_prop()
	supplyGroup( id : string ) {
		return new $mol_app_agreement_supply_group().setup( obj => {
			obj.id = ()=> id
			obj.name = ()=> [ 'Ivanov Group' , 'Petrov Group' , 'Sidorov Group' ][ Math.floor( Math.random() * 3 ) ]
		} )
	}

	@ $mol_prop()
	stock( id : string ) {
		return new $mol_app_agreement_stock().setup( obj => {
			obj.id = ()=> id
			obj.name = ()=> [ 'Riga#10' , 'Moscow#123' , 'Saint-Petersburg#42' ][ Math.floor( Math.random() * 3 ) ]
		} )
	}

	@ $mol_prop()
	person( id : string ) {
		return new $mol_app_agreement_person().setup( obj => {
			obj.id = ()=> id
			obj.name = ()=> [ 'Ivanov AB' , 'Petrov BC' , 'Sidorov CD' ][ Math.floor( Math.random() * 3 ) ]
		} )
	}
	
	@ $mol_prop()
	contract( id : string ) {
		return new $mol_app_agreement_person().setup( obj => {
			obj.id = ()=> id
		} )
	}

	@ $mol_prop()
	payMethod( id : string ) {
		return new $mol_app_agreement_payMethod().setup( obj => {
			obj.id = ()=> id
			obj.name = ()=> [ 'Accounting' , 'Cash' ][ Math.floor( Math.random() * 2 ) ]
		} )
	}

	@ $mol_prop()
	debitor( id : string ) {
		return new $mol_app_agreement_payMethod().setup( obj => {
			obj.id = ()=> id
			obj.name = ()=> [ 'ACME Finance' , 'ACME Credit Systems' , 'ACME $' ][ Math.floor( Math.random() * 3 ) ]
		} )
	}

}
