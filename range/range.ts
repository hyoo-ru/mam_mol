class $mol_range_base< Value > {
	
	value( id : number ) : Value { return void 0 }
	count() { return Number.POSITIVE_INFINITY }
	
	slice( start = 0 , end? : number ) {
		return new $mol_range_lazy({
			value: id => this.value( id + start ),
			count: () => Math.min( end , this.count() ) - start
		})
	}
	
	forEach( handle : ( value : Value , id : number ) => void ) {
		var count = this.count() 
		for( var i = 0 ; i < count ; ++i ) {
			handle( this.value( i ) , i )
		}
	}
	
	join( delim = ',' ) {
		var list = []
		this.forEach( val => list.push( val ) )
		return list.join( delim )
	}
	
}

class $mol_range_array< Value > extends $mol_range_base< Value > {

	constructor( private list : Value[] ) {
		super()
	}
	
	value( id : number ) {
		return this.list[ id ]
	}
	
	count() {
		return this.list.length
	}

}

class $mol_range_lazy< Value > extends $mol_range_base< Value > {

	constructor( private source : {
		value? : ( id : number )=> Value
		count? : ()=> number
	} ) {
		super()
	}

	value( id : number ) : Value {
		return this.source.value( id )
	}
	
	count() {
		return this.source.count()
	}
	
}

interface $mol_range_initializer< Value > {
	value? : ( id : number )=> Value
	count? : ()=> number
}

function $mol_range< Value >( arg : Value[] | $mol_range_initializer< Value > ) : $mol_range_base< Value > {
	if( typeof arg['value'] === 'function' ) return new $mol_range_lazy( arg )
	if( 'length' in arg ) return new $mol_range_array( arg as Value[] )
	throw new Error( 'Unsupported range initializer' )
}
