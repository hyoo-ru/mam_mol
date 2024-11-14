namespace $ {

	/** State of arguments like `#foo=bar/xxx` or `?foo=bar&xxx` */
	export class $mol_state_arg extends $mol_object {
		
		@ $mol_mem
		static href( next?: string ) {
			
			if( next === undefined ) {
				
				next = $mol_dom_context.location.href
				
			} else if( !/^about:srcdoc/.test( next ) ) {
				
				new $mol_after_frame( ()=> {
					
					const next = this.href()
					const prev = $mol_dom_context.location.href
					if( next === prev ) return
					
					const history = $mol_dom_context.history
					history.replaceState( history.state, $mol_dom_context.document.title, next )
					
				} )
				
			}
			
			if( $mol_dom_context.parent !== $mol_dom_context.self ) {
				$mol_dom_context.parent.postMessage( [ 'hashchange', next ], '*' )
			}
			
			return next
		}
		
		@ $mol_mem
		static href_normal(): string {
			return this.link({})
		}
		
		@ $mol_mem
		static href_absolute(): string {
			return new URL( this.href(), $mol_dom_context.location.href ).toString()
		}
		
		@ $mol_mem
		static dict( next? : { [ key : string ] : string | null } ) {
			
			var href = this.href( next && this.make_link( next ) ).split( /#!?/ )[1] || ''
			var chunks = href.split( this.separator )
			
			var params : { [ key : string ] : string } = {}
			chunks.forEach(
				chunk => {
					if( !chunk ) return
					var vals = chunk.split( '=' ).map( decodeURIComponent )
					params[ vals.shift()! ] = vals.join( '=' )
				}
			)
			
			return params as Readonly< typeof params >
		}

		@ $mol_mem_key
		static dict_cut( except : string[] ) {
			
			const dict = this.dict()
			const cut : { [ key : string ] : string } = {}
			
			for( const key in dict ) {
				if( except.indexOf( key ) >= 0 ) break
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
		
		static link( next : Record<string, string | null> ) {
			return this.make_link({
				... this.dict_cut( Object.keys( next ) ),
				... next,
			})
		}
		
		static prolog = '!'
		static separator = '/'
		
		@ $mol_mem_key
		static make_link( next : { [ key : string ] : string | null } ) {
			const chunks : string[] = []
			for( let key in next ) {
				if( null == next[ key ] ) continue
				const val = next[ key ]
				chunks.push( [ key ].concat( val ? [ val ] : [] ).map( this.encode ).join( '=' ) )
			}
			
			return new URL( '#' + this.prolog + chunks.join( this.separator ) , this.href_absolute() ).toString()
		}

		@ $mol_action
		static go( next : { [ key : string ] : string | null } ) {
			$mol_dom_context.location.href = this.link( next )
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
		
		link( next : Record<string, string | null> ) {
			var prefix = this.prefix
			var dict : typeof next = {}
			for( var key in next ) {
				dict[ prefix + key ] = next[ key ]
			}
			return ( this.constructor as typeof $mol_state_arg ).link( dict )
		}
		
	}

	function $mol_state_arg_change( ) {
		$mol_state_arg.href( $mol_dom_context.location.href )
	}

	self.addEventListener( 'hashchange' , $mol_state_arg_change )
	
}
