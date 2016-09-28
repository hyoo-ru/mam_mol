module $ {
	
	export declare class $mol_set< Value > {
		size : number
		
		add( key : Value ) : this
		
		delete( key : Value ) : void
		
		has( key : Value ) : boolean
		
		clear() : void
		
		keys() : Value[]
		
		values() : Value[]
		
		entries() : [ Value , Value ][]
		
		forEach( handler : ( key : Value , value : Value ) => void ) : void
	}
	
	export class $mol_set_shim< Value > implements $mol_set< Value > {
		
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
			
			++this.size
			
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
			--this.size
		}
		
		forEach( handle : ( val : Value , key : Value )=> void ) {
			for( var key in this._index ) {
				if( !this._index.hasOwnProperty( key ) ) continue
				this._index[ key ].forEach( ( val , index ) => handle( val , val ) )
			}
		}
		
		keys() {
			var keys : Value[] = []
			this.forEach(
				( val , key ) => {
					keys.push( key )
				}
			)
			return keys
		}
		
		values() {
			var values : Value[] = []
			this.forEach(
				( val , key ) => {
					values.push( val )
				}
			)
			return values
		}
		
		entries() {
			var entries : [ Value , Value ][] = []
			this.forEach(
				( val , key ) => {
					entries.push( [ val , key ] )
				}
			)
			return entries
		}
		
		clear() {
			this._index = {}
			this.size = 0
		}
		
	}
	
}
