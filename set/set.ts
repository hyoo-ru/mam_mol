declare class $mol_set< Key > {
	size : number
	add( key : Key ) : this
	delete( key : Key )
	has( key : Key )
	clear()
	keys() : Key[]
	values() : Key[]
	entries() : [ Key , Key ][]
	forEach( handler : ( key : Key , value : Key ) => void )
}

class $mol_set_shim< Value > implements $mol_set< Value > {
	
	_index : { [ index : string ] : Value[] } = {}
	size = 0
	
	add( value : Value ) {
		var key = String( value )
		
		var list = this._index[ key ]
		if( list ) {
			if( list.indexOf( value ) !== -1 ) return this
			list.push( value )
		} else {
			list = this._index[ key ] = [ value ]
		}
		
		++ this.size
		
		return this
	}
	
	has( value : Value ) {
		var key = String( value )
		
		var list = this._index[ key ]
		if( !list ) return false
		
		return list.indexOf( value ) !== -1
	}
	
	delete( value : Value ) {
		var key = String( value )
		
		var list = this._index[ key ]
		if( !list ) return
		
		var index = list.indexOf( value )
		if( index === -1 ) return
		
		list.splice( index , 1 )
		-- this.size
	}
	
	forEach( handle : ( val , key )=> void ) {
		for( var key in this._index ) {
			if( !this._index.hasOwnProperty( key ) ) continue
			this._index[ key ].forEach( ( val , index ) => handle( val , val ) )
		}
	}
	
	keys() {
		var keys = []
		this.forEach( ( val , key ) => {
			keys.push( key )
		} )
		return keys
	}
	
	values() {
		var values = []
		this.forEach( ( val , key ) => {
			values.push( val )
		} )
		return values
	}
	
	entries() {
		var entries = []
		this.forEach( ( val , key ) => {
			entries.push( [ val , key ] )
		} )
		return entries
	}
	
	clear() {
		this._index = {}
		this.size = 0
	}
	
}
