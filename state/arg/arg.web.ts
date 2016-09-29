module $ {
	
	export class $mol_state_arg< Value > extends $mol_object {
		
		@ $mol_prop()
		static href( ...diff : string[] ) {
			if( diff[ 0 ] !== void 0 ) history.replaceState( history.state , document.title , diff[ 0 ] )
			return window.location.search + window.location.hash
		}
		
		@ $mol_prop()
		static dict( ...diff : { [ key : string ] : string }[] ) {
			if( diff[ 0 ] !== void 0 ) this.href( this.make( diff[ 0 ] ) )
			
			var href = this.href()
			var chunks = href.split( /[\/\?#!&;]/g )
			
			var params : { [ key : string ] : string } = {}
			chunks.forEach(
				chunk => {
					if( !chunk ) return
					var vals = chunk.split( '=' ).map( decodeURIComponent )
					params[ vals.shift() ] = vals.join( '=' )
				}
			)
			
			return params
		}
		
		@ $mol_prop()
		static value( key : string , ...diff : string[] ) {
			if( diff[ 0 ] === void 0 ) return this.dict()[ key ] || null
			this.href( this.link( { [ key ] : diff[ 0 ] } ) )
			return diff[ 0 ]
		}
		
		static link( next : { [ key : string ] : string } ) {
			return this.make( $mol_merge_dict( this.dict() , next ) )
		}
		
		static make( next : { [ key : string ] : string } ) {
			var chunks : string[] = []
			for( var key in next ) {
				if( null == next[ key ] ) continue
				chunks.push( [ key ].concat( next[ key ] ).map( encodeURIComponent ).join( '=' ) )
			}
			
			return '#' + chunks.join( '#' )
		}
		
		constructor( public prefix = '' ) {
			super()
		}
		
		value( key : string , ...diff : string[] ) {
			return $mol_state_arg.value( this.prefix + key , ...diff )
		}
		
		sub( postfix : string ) {
			return new $mol_state_arg( this.prefix + postfix + '.' )
		}
		
		link( next : { [ key : string ] : string } ) {
			var prefix = this.prefix
			var dict : { [ key : string ] : string } = {}
			for( var key in next ) {
				dict[ prefix + key ] = next[ key ]
			}
			return $mol_state_arg.link( dict )
		}
		
	}
	
	window.addEventListener( 'hashchange' , event => $mol_state_arg.href( void 0 ) )
	
}
