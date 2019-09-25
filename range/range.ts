namespace $ {
	
	export function $mol_range_in< Item > (
		source : {
			item : ( id : number ) => Item
			length : number
		}
	) {
		return new $mol_range_lazy< Item >( source ) as any as Item[]
	}
	
	export class $mol_range_common< Value > /*implements ReadonlyArray< Value >*/ {
		
		item( id : number ) : Value {
			return
		}
		
		get length() {
			return 0
		}
		
		get '0'() : Value {
			throw new Error( 'Direct access to items not supported. Use item( id : number ) method instead.' )
		}
		
		forEach( handle : ( value? : Value , id? : number ) => void ) {
			const length = this.length
			for( let i = 0 ; i < length ; ++i ) {
				handle( this.item( i ) , i )
			}
		}
		
		valueOf() : Value[] {
			const list : Value[] = []
			this.forEach( val => list.push( val ) )
			return list
		}
		
		concat( ...args : any[] ) : Value[] {
			const ranges = args.map( range => range.valueOf() )
			return this.valueOf().concat( ...ranges )
			//return new $mol_range_list( [ this ].concat( args ) )
		}
		
		slice( start = 0 , end? : number ) {
			const source = this
			return new $mol_range_lazy<Value>( {
				item( id ){
					return source.item( id + start )
				} ,
				get length() {
					return Math.min( end , source.length ) - start
				}
			} )
		}
		
		map< ResValue > ( proceed : ( val : Value , id? : number )=> ResValue ) {
			const source = this
			return new $mol_range_lazy<ResValue>( {
				item( id ){
					return proceed( source.item( id ) , id )
				} ,
				get length() {
					return source.length
				}
			} )
		}
		
		join( delim = ',' ) {
			const list : Value[] = []
			this.forEach( val => list.push( val ) )
			return list.join( delim )
		}
		
		every( check : ( value : Value , id : number ) => boolean ) {
			let res = true
			this.forEach(
				( val , id ) => {
					if( !res ) return
					res = check( val , id )
				}
			)
			return res
		}
		
		some( check : ( value : Value , id : number ) => boolean ) {
			let res = false
			this.forEach(
				( val , id ) => {
					if( res ) return
					res = check( val , id )
				}
			)
			return res
		}
		
	}
	
	export class $mol_range_lazy< Value > extends $mol_range_common< Value > {
		
		constructor(
			private source = {
				item( id : number ) { return undefined as Value } ,
				length : 0
			}
		) {
			super()
		}
		
		item( id : number ) : Value {
			return this.source.item( id )
		}
		
		get length() {
			return this.source.length
		}
				
	}
	
	// export class $mol_range_list< Value > extends $mol_range_common< Value > {
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
	
}
