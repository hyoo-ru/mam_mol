namespace $ {
	
	export class $mol_state_arg extends $mol_object {
		
		@ $mol_mem
		static href( next? : string , force? : $mol_atom_force ) {
			if( next ) history.replaceState( history.state , $mol_dom_context.document.title , `${ next }` )
			return window.location.search + window.location.hash
		}
		
		@ $mol_mem
		static dict( next? : { [ key : string ] : string } ) {
			var href = this.href( next && this.make_link( next ) )
			var chunks = href.split( /[\/\?#&;]/g )
			
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
		
		@ $mol_mem_key
		static value( key : string , next? : string ) {
			const nextDict = ( next === void 0 ) ? void 0 : $mol_merge_dict( this.dict() , { [ key ] : next } ) 
			const next2 = this.dict( nextDict )[ key ]
			return ( next2 == null ) ? null : next2
		}
		
		static link( next : { [ key : string ] : string } ) {
			return this.make_link( $mol_merge_dict( this.dict() , next ) )
		}
		
		static make_link( next : { [ key : string ] : string } ) {
			const chunks : string[] = []
			for( let key in next ) {
				if( null == next[ key ] ) continue
				chunks.push( [ key ].concat( next[ key ] ? next[ key ] : [] ).map( this.encode ).join( '=' ) )
			}
			
			return new URL( '#' + chunks.join( '/' ) , window.location.href ).toString()
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
	
	window.addEventListener( 'hashchange' , $mol_log_group( '$mol_state_arg hashchange' , ( event : HashChangeEvent )=> {
		$mol_state_arg.href( undefined , $mol_atom_force_cache ) 
	} ) )
	
}
