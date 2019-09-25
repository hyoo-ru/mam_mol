namespace $ {
	
	export function $mol_stub_select_random< Value >( list : Value[] ) {
		return list[ Math.floor( Math.random() * list.length ) ]
	}
	
	export function $mol_stub_strings( prefix = '' , count = 10 , length = 10 ) {
		if( prefix.length >= length ) return []
		
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split( '' )
		let strings : any[] = []
		
		for( let i = 0 ; i < count ; i++ ) {
			let text = prefix
			for( let j = prefix.length ; j < length ; j++ ) {
				text += $mol_stub_select_random( possible )
			}
			strings.push( text )
		}
		
		return strings
	}
	
	export function $mol_stub_code( length = 8 ) {
		var max = Math.pow( 16 , length )
		var min = Math.pow( 16 , length - 1 )
		var value = min + Math.floor( Math.random() * ( max - min ) )
		return value.toString( 16 ).toUpperCase()
	}
	
	export function $mol_stub_price( max = 1000 ) {
		var min = Math.floor( max / 16 / 16 )
		var value = min + Math.floor( Math.random() * ( max - min ) )
		return new $mol_unit_money_usd( value )
	}
	
	export function $mol_stub_product_name() {
		var name = $mol_stub_select_random(
			[
				'Monitor 15"' ,
				'Monitor 17"' ,
				'Monitor 19"' ,
				'Graphics card' ,
				'Frame grabber card'
			]
		)
		var port = $mol_stub_select_random( [ 'D-SUB' , 'DVI' , 'HDMI' ] )
		var resolution = $mol_stub_select_random( [ 'VGA' , 'Full HD' , '4K' ] )
		
		return [ name , port , resolution ].join( ', ' )
	}
	
	export function $mol_stub_company_name_big() {
		var product = $mol_stub_select_random( [ 'Everything' , 'Something' , 'Anything' , 'Nothing' ] )
		var type = $mol_stub_select_random( [ 'Company' , 'Corporation' , 'Holding' ] )
		
		return `A ${type} that makes ${product}`
	}
	
	export function $mol_stub_company_name_small() {
		return $mol_stub_select_random( [ 'ACME inc.' , 'Dream Company' , 'Just Company' ] )
	}
	
	export function $mol_stub_company_name() {
		return $mol_stub_select_random( [ $mol_stub_company_name_small , $mol_stub_company_name_big ] )()
	}
	
	export function $mol_stub_person_name() {
		var first = $mol_stub_select_random( [ 'Ivan' , 'Petr' , 'Sidor' ] )
		var last = $mol_stub_select_random( [ 'Ivanov' , 'Petrov' , 'Sidorov' ] )
		return `${first} ${last}`
	}
	
	export function $mol_stub_city() {
		return $mol_stub_select_random( [ 'Moscow' , 'London' , 'Washington' , 'Buenos Aires' ] )
	}
	
	export function $mol_stub_time( maxShift = 60 * 24 * 365 ) {
		return new $mol_time_moment().shift( { minute : Math.round( Math.random() * maxShift ) } )
	}
	
}
