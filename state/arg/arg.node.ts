declare var process : any

class $mol_state_arg< Value > extends $mol_object {

	@ $mol_prop()
	static href( ...diff : string[] ) : string {
		return process.argv.slice(2).join(' ')
	}

	@ $mol_prop()
	static dict( ...diff : any[] ) {
		if( diff[0] !== void 0 ) this.href( this.make( diff[0] ) )

		var href = this.href()
		var chunks = href.split( /[\/\?#!&; ]/g )

		var params : { [ key : string ] : any } = {}
		chunks.forEach( chunk => {
			if( !chunk ) return
			var vals = chunk.split( /[:=]/ ).map( decodeURIComponent )
			params[ vals.shift() ] = vals
		})

		return params
	}

	@ $mol_prop()
	static value< Value >( key : string , ...diff : Value[] ) {
		if( diff[0] === void 0 ) return this.dict()[ key ] || null
		this.href( this.link({ [ key ] : diff[0] }) )
		return diff[0]
	}

	static link( next : any ) {
		var params : { [ key : string ] : any } = {}

		var prev = this.dict()
		for( var key in prev ) {
			params[ key ] = prev[ key ]
		}

		for( var key in next ) {
			params[ key ] = next[ key ]
		}

		return this.make( params )
	}

	static make( next : { [ key : string ] : any } ) {
		var chunks : string[] = []
		for( var key in next ) {
			if( null == next[key] ) continue
			chunks.push( [ key ].concat( next[key] ).map( encodeURIComponent ).join( '=' ) )
		}

		return '#' + chunks.join( '#' )
	}

	constructor( public prefix = '' ) {
		super()
	}

	value< Value >( key : string , ...diff : Value[] ) {
		return $mol_state_arg.value< Value >( this.prefix + key , ...diff )
	}

	sub< Value >( postfix : string ) {
		return new $mol_state_arg< Value >( this.prefix + postfix + '.' )
	}

	link( next : any ) {
		var prefix = this.prefix
		var dict : { [ key : string ] : any } = {}
		for (var key in next) {
			dict[ prefix + key ] = next[ key ]
		}
		return $mol_state_arg.link( dict )
	}

}
