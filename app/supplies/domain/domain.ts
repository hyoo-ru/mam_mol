namespace $ {

	/// Поставщик
	export class $mol_app_supplies_domain_provider extends $mol_object {
		id() : string { return void 0 }
		
		name() : string { return void 0 }
	}

	/// Группа закупок
	export class $mol_app_supplies_domain_supply_group extends $mol_object {
		id() : string { return void 0 }
		
		name() : string { return void 0 }
		
		manager() : $mol_app_supplies_domain_person { return void 0 }
	}

	/// Закупочный дивизион
	export class $mol_app_supplies_domain_supply_division extends $mol_object {
		id() : string { return void 0 }
		
		name() : string { return void 0 }
	}

	/// Способ оплаты
	export class $mol_app_supplies_domain_payMethod extends $mol_object {
		id() : string { return void 0 }
		
		name() : string { return void 0 }
	}

	/// Дебитор
	export class $mol_app_supplies_domain_debitor extends $mol_object {
		id() : string { return void 0 }
		
		name() : string { return void 0 }
	}

	/// Продукт
	export class $mol_app_supplies_domain_supply_position extends $mol_object {
		name() : string { return void 0 }
		
		supplyMoment() : $jin.time.moment_class { return void 0 }
		
		division() : $mol_app_supplies_domain_supply_division { return void 0 }
		
		store() : $mol_app_supplies_domain_store { return void 0 }
		
		price() : $mol_unit_money { return void 0 }
		
		quantity() : number { return void 0 }
		
		cost() : $mol_unit_money { return void 0 }
	}

	/// Вложение
	export class $mol_app_supplies_domain_attachment extends $mol_object {
		urlThumb() : string { return void 0 }
		
		urlLoad() : string { return void 0 }
	}

	/// Работник
	export class $mol_app_supplies_domain_person extends $mol_object {
		id() : string { return void 0 }
		
		name() : string { return void 0 }
	}

	/// Договор
	export class $mol_app_supplies_domain_contract extends $mol_object {
		id() : string { return void 0 }
	}

	/// Балансовая единица
	export class $mol_app_supplies_domain_ballanceUnit extends $mol_object {
		id() : string { return void 0 }
		
		name() : string { return void 0 }
	}

	/// Закупочная организация
	export class $mol_app_supplies_domain_consumer extends $mol_object {
		id() : string { return void 0 }
		
		name() : string { return void 0 }
	}

	/// Склад для доставки
	export class $mol_app_supplies_domain_store extends $mol_object {
		id() : string { return void 0 }
		
		name() : string { return void 0 }
	}

	/// Заявка на закупку
	export class $mol_app_supplies_domain_supply extends $mol_object {
		
		id() : string { return void 0 }
		
		provider() : $mol_app_supplies_domain_provider { return void 0 }
		
		consumer() : $mol_app_supplies_domain_consumer { return void 0 }
		
		group() : $mol_app_supplies_domain_supply_group { return void 0 }
		
		@ $mol_mem()
		status( next? : $mol_app_supplies_domain_supply_status ) { return next }
		
		ballanceUnit() : $mol_app_supplies_domain_ballanceUnit { return void 0 }
		
		manager() : $mol_app_supplies_domain_person { return void 0 }
		
		contract() : $mol_app_supplies_domain_contract { return void 0 }
		
		payMethod() : $mol_app_supplies_domain_payMethod { return void 0 }
		
		debitor() : $mol_app_supplies_domain_debitor { return void 0 }
		
		positions() : $mol_app_supplies_domain_supply_position[] { return void 0 }
		
		@ $mol_mem()
		attachments( next? : $mol_app_supplies_domain_attachment[] ) { return next || [] }
		
		cost() : $mol_unit_money { return void 0 }
		
	}

	/// Статус заявки на закупку
	export enum $mol_app_supplies_domain_supply_status {
		pending = 'pending' as any ,
		approved = 'approved' as any ,
	}

	/// Демонстрационный бизнес домен
	export class $mol_app_supplies_domain_mock extends $mol_object {
		
		@ $mol_mem()
		supplies() {
			var next : $mol_app_supplies_domain_supply[] = []
			for( var i = 1 ; i <= 100 ; ++i ) {
				next.push( this.supply( ( i * 123456789 % 987654321 ).toString( 16 ).toUpperCase() ) )
			}
			return next
		}
		
		@ $mol_mem_key()
		positions( supply : string ) {
			var next : $mol_app_supplies_domain_supply_position[] = []
			var count = 10 + Math.floor( Math.random() * 30 )
			for( var i = 1 ; i <= count ; ++i ) {
				next.push( this.position( {
					supply ,
					position : ( i * 123456789 % 987654321 ).toString( 16 ).toUpperCase()
				} ) )
			}
			return next
		}
		
		@ $mol_mem_key()
		supplyStatus( id : string , next? : $mol_app_supplies_domain_supply_status ) {
			return next || $mol_stub_selectRandom( [
				$mol_app_supplies_domain_supply_status.pending ,
				$mol_app_supplies_domain_supply_status.approved
			] )
		}
		
		@ $mol_mem_key()
		supply( id : string ) {
			return new $mol_app_supplies_domain_supply().setup( obj => {
				obj.id = $mol_const( id )
				obj.cost = ()=> new $mol_unit_money_usd( this.positions( id )
				.reduce( ( sum , pos )=> sum + pos.cost().valueOf() , 0 ) )
				obj.status = ( next? )=> this.supplyStatus( id , next )
				obj.provider = $mol_const( this.provider( $mol_stub_code( 2 ) ) )
				obj.consumer = $mol_const( this.consumer( $mol_stub_code( 2 ) ) )
				obj.group = $mol_const( this.supplyGroup( $mol_stub_code( 2 ) ) )
				obj.contract = $mol_const( this.contract( $mol_stub_code( 8 ) ) )
				obj.manager = $mol_const( this.person( $mol_stub_code( 2 ) ) )
				obj.ballanceUnit = $mol_const( this.ballanceUnit( $mol_stub_code( 2 ) ) )
				obj.payMethod = $mol_const( this.payMethod( $mol_stub_code( 1 ) ) )
				obj.debitor = $mol_const( this.debitor( $mol_stub_code( 2 ) ) )
				obj.positions = ()=> this.positions( id )
				obj.attachments = ( next? : $mol_app_supplies_domain_attachment[] )=> this.attachments( id , next )
			} )
		}
		
		@ $mol_mem_key()
		provider( id : string ) {
			return new $mol_app_supplies_domain_provider().setup( obj => {
				obj.id = $mol_const( id )
				obj.name = $mol_const( $mol_stub_companyName() )
			} )
		}
		
		@ $mol_mem_key()
		consumer( id : string ) {
			return new $mol_app_supplies_domain_consumer().setup( obj => {
				obj.id = $mol_const( id )
				obj.name = $mol_const( $mol_stub_companyName() )
			} )
		}
		
		@ $mol_mem_key()
		ballanceUnit( id : string ) {
			return new $mol_app_supplies_domain_ballanceUnit().setup( obj => {
				obj.id = $mol_const( id )
				obj.name = $mol_const( $mol_stub_selectRandom( [
					'ACME Enterprise' ,
					'ACME Customer' ,
					'ACME Inside'
				] ) )
			} )
		}
		
		@ $mol_mem_key()
		division( id : string ) {
			return new $mol_app_supplies_domain_supply_division().setup( obj => {
				obj.id = $mol_const( id )
				obj.name = $mol_const( $mol_stub_code( 4 ) )
			} )
		}
		
		@ $mol_mem_key()
		supplyGroup( id : string ) {
			return new $mol_app_supplies_domain_supply_group().setup( obj => {
				obj.id = $mol_const( id )
				obj.name = $mol_const( $mol_stub_personName() + ' Group' )
			} )
		}
		
		@ $mol_mem_key()
		store( id : string ) {
			return new $mol_app_supplies_domain_store().setup( obj => {
				obj.id = $mol_const( id )
				obj.name = $mol_const( $mol_stub_city() + ' #' + $mol_stub_code( 2 ) )
			} )
		}
		
		@ $mol_mem_key()
		person( id : string ) {
			return new $mol_app_supplies_domain_person().setup( obj => {
				obj.id = $mol_const( id )
				obj.name = $mol_const( $mol_stub_personName() )
			} )
		}
		
		@ $mol_mem_key()
		contract( id : string ) {
			return new $mol_app_supplies_domain_person().setup( obj => {
				obj.id = $mol_const( id )
			} )
		}
		
		@ $mol_mem_key()
		payMethod( id : string ) {
			return new $mol_app_supplies_domain_payMethod().setup( obj => {
				obj.id = $mol_const( id )
				obj.name = $mol_const( $mol_stub_selectRandom( [ 'Accounting' , 'Cash' ] ) )
			} )
		}
		
		@ $mol_mem_key()
		debitor( id : string ) {
			return new $mol_app_supplies_domain_payMethod().setup( obj => {
				obj.id = $mol_const( id )
				obj.name = $mol_const( $mol_stub_companyName() )
			} )
		}
		
		@ $mol_mem_key()
		position( id : { supply : string , position : string } ) {
			return new $mol_app_supplies_domain_supply_position().setup( obj => {
				obj.name = $mol_const( $mol_stub_productName() )
				obj.supplyMoment = $mol_const( $mol_stub_time( 60 * 24 * 365 ) )
				obj.store = $mol_const( this.store( $mol_stub_code( 2 ) ) )
				obj.division = $mol_const( this.division( $mol_stub_code( 2 ) ) )
				obj.price = $mol_const( $mol_stub_price( 1000 ) )
				obj.quantity = $mol_const( Math.round( Math.random() * 30 ) )
				obj.cost = $mol_const( obj.price().mult( obj.quantity() ) )
			} )
		}
		
		@ $mol_mem_key()
		attachments( id : string , next? : $mol_app_supplies_domain_attachment[] ) {
			return next || []
		}
		
		@ $mol_mem_key()
		attachment( id : { supply : string , attachment : string } ) {
			return new $mol_app_supplies_domain_attachment().setup( obj => {
				obj.urlThumb = obj.urlLoad = $mol_const( 'data:image/svg+xml;base64,PHN2ZyBpZD0i0KHQu9C+0LlfMSIgZGF0YS1uYW1lPSLQodC70L7QuSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjUuNyA2NDUuNDQiPgoJPGRlZnM+CgkJPHN0eWxlPi5jbHMtMXtmaWxsOiM0YzdjNGQ7fS5jbHMtMntmaWxsOiM2ZmMwNTg7fTwvc3R5bGU+Cgk8L2RlZnM+Cgk8dGl0bGU+JG1vbF9zeW1ib2w8L3RpdGxlPgoJPHBvbHlnb24gY2xhc3M9ImNscy0xIgoJCQkgcG9pbnRzPSI4MC43OCAyMTcuNTYgMjE0LjAzIDExNC42MSAzNTEuMTIgMjIwLjUzIDQyNS43IDE2Mi45MSAyMTQuODQgMCAzLjk4IDE2Mi45MSA0LjM1IDE2My4xOSAzLjM1IDE2My45NiAzNDQuOTMgNDI3Ljg3IDIxMS42NyA1MzAuODMgNzQuNTggNDI0LjkxIDAgNDgyLjUzIDIxMC44NiA2NDUuNDQgNDIxLjcyIDQ4Mi41MyA0MjEuMDIgNDgxLjk5IDQyMi4wMyA0ODEuMjEgODAuNzggMjE3LjU2Ii8+Cgk8cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMjA5LjU0IDQ0MC44MyA1OC4zNiAzMjIuNzIgMjA5LjU0IDIwNC42MSAzNjcuMzQgMzIyLjcyIDIwOS41NCA0NDAuODMiLz4KPC9zdmc+Cg==' )
			} )
		}
		
	}
	
}
