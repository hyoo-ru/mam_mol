/// Поставщик
class $mol_app_agreement_provider extends $mol_model {
	id() : string { return void 0 }
	name() : string { return void 0 }
}

/// Группа закупок
class $mol_app_agreement_supplyGroup extends $mol_model {
	id() : string { return void 0 }
	name() : string { return void 0 }
	manager() : $mol_app_agreement_person { return void 0 }
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
	cost() : $mol_unit_money { return void 0 }
	provider() : $mol_app_agreement_provider { return void 0 }
	consumer() : $mol_app_agreement_consumer { return void 0 }
	stock() : $mol_app_agreement_stock { return void 0 }
	status() : $mol_app_agreement_supply_status { return void 0 }
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
		return 'ABCDEFG'.split( '' ).map( id => this.supply( id ) )
	}
	
	@ $mol_prop()
	supply( id : string ) {
		var cost = new $mol_unit_money_rur( Math.round( Math.random() * 1000000 ) )
		var status = [ 'pending' , 'approved' , 'rejected' ][ Math.floor( Math.random() * 3 ) ]
		var provider = [ 'Ros Neft' , 'Gaz Prom' , 'Ural Ugol' ][ Math.floor( Math.random() * 3 ) ]
		var stock = [ 'Pulkovo 10' , 'Domodedovo 1' , 'Sheremetievo 5' ][ Math.floor( Math.random() * 3 ) ]
		var consumer = [ 'ACME' , 'ACME Mobility' , 'ACME Communications' ][ Math.floor( Math.random() * 3 ) ]
		return new $mol_app_agreement_supply().setup( obj => {
			obj.id = ()=> id
			obj.cost = ()=> cost
			obj.status = ()=> $mol_app_agreement_supply_status[ status ]
			obj.provider = ()=> this.provider( provider )
			obj.consumer = ()=> this.consumer( consumer )
			obj.stock = ()=> this.stock( stock )
		} )
	}
	
	@ $mol_prop()
	provider( id : string ) {
		return new $mol_app_agreement_provider().setup( obj => {
			obj.id = ()=> id
			obj.name = ()=> 'Provider ' + id
		} )
	}
	
	@ $mol_prop()
	consumer( id : string ) {
		return new $mol_app_agreement_consumer().setup( obj => {
			obj.id = ()=> id
			obj.name = ()=> 'Consumer ' + id
		} )
	}
	
	@ $mol_prop()
	stock( id : string ) {
		return new $mol_app_agreement_stock().setup( obj => {
			obj.id = ()=> id
			obj.name = ()=> 'Stock ' + id
		} )
	}
	
}
