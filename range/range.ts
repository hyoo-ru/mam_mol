class $mol_range_common< Value > extends Array< Value > {

	get( id : number ) : Value {
		return
	}

	length = 0

	get '0'() : Value {
		throw new Error( 'Direct access to items not supported. Use get( id : number ) method instead.' )
	}

	forEach( handle : ( value : Value , id : number ) => void ) {
		var length = this.length
		for( var i = 0 ; i < length ; ++i ) {
			handle( this.get( i ) , i )
		}
	}
	
	valueOf() : Value[] {
		var list = []
		this.forEach( val => list.push( val ) )
		return list
	}

	concat( ...args ) : Value[] {
		var ranges = args.map( range => range.valueOf() )
		return this.valueOf().concat( ...ranges )
		//return new $mol_range_list( [ this ].concat( args ) )
	}

	slice( start = 0 , end? : number ) {
		var source = this
		return new $mol_range_lazy<Value>({
			get( id ){
				return source.get( id + start )
			} ,
			get length() {
				return Math.min( end , source.length ) - start
			}
		})
	}

	join( delim = ',' ) {
		var list = []
		this.forEach( val => list.push( val ) )
		return list.join( delim )
	}

	every( check : ( value : Value , id : number ) => boolean ) {
		var res = true
		this.forEach( ( val , id ) => {
			if( !res ) return
			res = check( val , id )
		} )
		return res
	}

	some( check : ( value : Value , id : number ) => boolean ) {
		var res = false
		this.forEach( ( val , id ) => {
			if( res ) return
			res = check( val , id )
		} )
		return res
	}

}

class $mol_range_lazy< Value > extends $mol_range_common< Value > {
	
	constructor( private source = {
		get( id : number ) : Value { return } ,
		length : 0
	} ) {
		super()
	}

	get( id : number ) : Value {
		return this.source.get( id )
	}
	
	get length() {
		return this.source.length
	}
	
}

// class $mol_range_list< Value > extends $mol_range_common< Value > {
//
// 	constructor( private list : Value[][] ) {
// 		super()
// 	}
//
// 	get( id : number ) {
// 		var subId = id
// 		for( var range of this.list ) {
// 			var nextId = subId - range.length
// 			if( nextId < 0 ) return range.get( subId )
// 			subId = nextId
// 		}
// 		return
// 	}
//
// 	get length () {
// 		var length = 0
// 		this.list.forEach( range => {
// 			length += range.length
// 		} )
// 		return length
// 	}
//
// }
