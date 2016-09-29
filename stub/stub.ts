module $ {
	
	export function $mol_stub_selectRandom< Value >( list : Value[] ) {
		return list[ Math.floor( Math.random() * list.length ) ]
	}
	
	export function $mol_stub_strings( prefix = '' , count = 10 , length = 10 ) {
		if( prefix.length >= length ) return []
		
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split( '' )
		let strings : any[] = []
		
		for( let i = 0 ; i < count ; i++ ) {
			let text = prefix
			for( let j = prefix.length ; j < length ; j++ ) {
				text += $mol_stub_selectRandom( possible )
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
	
	export function $mol_stub_productName() {
		var name = $mol_stub_selectRandom(
			[
				'Monitor 15"' ,
				'Monitor 17"' ,
				'Monitor 19"' ,
				'Graphics card' ,
				'Frame grabber card'
			]
		)
		var port = $mol_stub_selectRandom( [ 'D-SUB' , 'DVI' , 'HDMI' ] )
		var resolution = $mol_stub_selectRandom( [ 'VGA' , 'Full HD' , '4K' ] )
		
		return [ name , port , resolution ].join( ', ' )
	}
	
	export function $mol_stub_companyNameBig() {
		var product = $mol_stub_selectRandom( [ 'Everything' , 'Something' , 'Anything' , 'Nothing' ] )
		var type = $mol_stub_selectRandom( [ 'Company' , 'Corporation' , 'Holding' ] )
		
		return `A ${type} that makes ${product}`
	}
	
	export function $mol_stub_companyNameSmall() {
		return $mol_stub_selectRandom( [ 'ACME inc.' , 'Dream Company' , 'Just Company' ] )
	}
	
	export function $mol_stub_companyName() {
		return $mol_stub_selectRandom( [ $mol_stub_companyNameSmall , $mol_stub_companyNameBig ] )()
	}
	
	export function $mol_stub_personName() {
		var first = $mol_stub_selectRandom( [ 'Ivan' , 'Petr' , 'Sidor' ] )
		var last = $mol_stub_selectRandom( [ 'Ivanov' , 'Petrov' , 'Sidorov' ] )
		return `${first} ${last}`
	}
	
	export function $mol_stub_city() {
		return $mol_stub_selectRandom( [ 'Moscow' , 'London' , 'Washington' , 'Buenos Aires' ] )
	}
	
	export function $mol_stub_time( maxShift = 60 * 24 * 365 ) {
		return $jin.time.moment().shift( { minute : Math.round( Math.random() * maxShift ) } )
	}
	
}
