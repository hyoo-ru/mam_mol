namespace $ {
	
	export class $mol_state_arg extends $mol_object {
		
		@ $mol_mem
		static href( next? : string , force? : $mol_mem_force ) {
			if( next === undefined ) return $mol_dom_context.location.href
			history.replaceState( history.state , $mol_dom_context.document.title , next )
			return next
		}
		
		@ $mol_mem
		static dict( next? : { [ key : string ] : string | null } ) {
			var href = this.href( next && this.make_link( next ) ).split( /#/ )[1] || ''
			var chunks = href.split( /[\/\?#&;]/g )
			
			var params : { [ key : string ] : string } = {}
			chunks.forEach(
				chunk => {
					if( !chunk ) return
					var vals = chunk.split( '=' ).map( decodeURIComponent )
					params[ vals.shift()! ] = vals.join( '=' )
				}
			)
			
			return params
		}

		@ $mol_mem_key
		static dict_cut( except : string[] ) {
			
			const dict = this.dict()
			const cut : { [ key : string ] : string } = {}
			
			for( const key in dict ) {
				if( except.indexOf( key ) >= 0 ) continue
				cut[ key ] = dict[ key ]
			}
			
			return cut
		}
		
		@ $mol_mem_key
		static value( key : string , next? : string | null ) {
			const nextDict = ( next === void 0 ) ? void 0 : { ... this.dict() , [ key ] : next }
			const next2 = this.dict( nextDict )[ key ]
			return ( next2 == null ) ? null : next2
		}
		
		static link( next : { [ key : string ] : string } ) {
			return this.make_link({
				... this.dict_cut( Object.keys( next ) ),
				... next,
			})
		}
		
		static make_link( next : { [ key : string ] : string | null } ) {
			const chunks : string[] = []
			for( let key in next ) {
				if( null == next[ key ] ) continue
				const val = next[ key ]
				chunks.push( [ key ].concat( val ? [ val ] : [] ).map( this.encode ).join( '=' ) )
			}
			
			return new URL( '#' + chunks.join( '/' ) , $mol_dom_context.location.href ).toString()
		}

		static encode( str : string ) {
			return encodeURIComponent( str ).replace( /\(/g , '%28' ).replace( /\)/g , '%29' )
		}
		
		constructor( public prefix = '' ) {
			super()
		}
		
		value( key : string , next? : string ) {
			return ( this.constructor as typeof $mol_state_arg ).value( this.prefix + key , next )
		}
		
		sub( postfix : string ) {
			return new ( this.constructor as typeof $mol_state_arg )( this.prefix + postfix + '.' )
		}
		
		link( next : { [ key : string ] : string } ) {
			var prefix = this.prefix
			var dict : { [ key : string ] : string } = {}
			for( var key in next ) {
				dict[ prefix + key ] = next[ key ]
			}
			return ( this.constructor as typeof $mol_state_arg ).link( dict )
		}
		
	}

	const $mol_state_arg_change = ( event : HashChangeEvent )=> {
		$mol_state_arg.href( $mol_dom_context.location.href ) 
	}

	self.addEventListener( 'hashchange' , $mol_fiber_root( $mol_state_arg_change ) )
	
}
