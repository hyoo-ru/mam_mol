module $ {
	
	export declare class $mol_dict< Key , Value > {
		size : number
		
		get( key : Key ) : Value
		
		set( key : Key , value : Value ) : this
		
		delete( key : Key ) : void
		
		has( key : Key ) : boolean
		
		clear() : void
		
		keys() : Key[]
		
		values() : Value[]
		
		entries() : [ Key , Value ][]
		
		forEach( handler : ( value : Value , key : Key ) => void ) : void
	}
	
	export class $mol_dict_shim< Key , Value > implements $mol_dict< Key , Value > {
		
		_keys : { [ index : string ] : Key[] } = {}
		_values : { [ index : string ] : Value[] } = {}
		size = 0
		
		set( key : Key , value : Value ) {
			var keyStr = String( key )
			
			var keys = this._keys[ keyStr ]
			if( keys ) {
				var index = keys.indexOf( key )
				if( index === -1 ) {
					index = keys.length
					keys.push( key )
					++this.size
				}
				this._values[ keyStr ][ index ] = value
			} else {
				this._keys[ keyStr ] = [ key ]
				this._values[ keyStr ] = [ value ]
				++this.size
			}
			
			return this
		}
		
		get( key : Key ) {
			var keyStr = String( key )
			
			var list = this._keys[ keyStr ]
			if( !list ) return void 0
			
			var index = list.indexOf( key )
			if( index === -1 ) return void 0
			
			return this._values[ keyStr ][ index ]
		}
		
		has( key : Key ) {
			var keyStr = String( key )
			
			var list = this._keys[ keyStr ]
			if( !list ) return false
			
			return list.indexOf( key ) !== -1
		}
		
		delete( key : Key ) {
			var keyStr = String( key )
			
			var keys = this._keys[ keyStr ]
			if( !keys ) return
			
			var index = keys.indexOf( key )
			if( index === -1 ) return
			
			keys.splice( index , 1 )
			this._values[ keyStr ].splice( index , 1 )
			
			--this.size
		}
		
		forEach( handle : ( val : Value , key : Key )=> void ) {
			for( var keyStr in this._keys ) {
				if( !this._keys.hasOwnProperty( keyStr ) ) continue
				var values = this._values[ keyStr ]
				this._keys[ keyStr ].forEach(
					( key , index ) => {
						handle( values[ index ] , key )
					}
				)
			}
		}
		
		keys() {
			var keys : Key[] = []
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
			var entries : [ Key , Value ][] = []
			this.forEach(
				( val , key ) => {
					entries.push( [ key , val ] )
				}
			)
			return entries
		}
		
		clear() {
			this._keys = {}
			this._values = {}
			this.size = 0
		}
		
	}
	
}
