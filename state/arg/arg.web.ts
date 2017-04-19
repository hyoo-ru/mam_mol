namespace $ {
	
	export class $mol_state_arg< Value > extends $mol_object {
		
		@ $mol_mem()
		static href( next? : string , force? : $mol_atom_force ) {
			if( next ) history.replaceState( history.state , $mol_dom_context.document.title , `${ next }` )
			return window.location.search + window.location.hash
		}
		
		@ $mol_mem()
		static dict( next? : { [ key : string ] : string } ) {
			var href = this.href( next && this.make( next ) )
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
		
		@ $mol_mem_key()
		static value( key : string , next? : string ) {
			const nextDict = ( next === void 0 ) ? void 0 : $mol_merge_dict( this.dict() , { [ key ] : next } ) 
			return this.dict( nextDict )[ key ] || null
		}
		
		static link( next : { [ key : string ] : string } ) {
			return this.make( $mol_merge_dict( this.dict() , next ) )
		}
		
		static make( next : { [ key : string ] : string } ) {
			const chunks : string[] = []
			for( let key in next ) {
				if( null == next[ key ] ) continue
				chunks.push( [ key ].concat( next[ key ] ? next[ key ] : [] ).map( encodeURIComponent ).join( '=' ) )
			}
			
			return '#' + chunks.join( '/' )
		}
		
		constructor( public prefix = '' ) {
			super()
		}
		
		value( key : string , next? : string ) {
			return $mol_state_arg.value( this.prefix + key , next )
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
	
	window.addEventListener( 'hashchange' , event => $mol_state_arg.href( void null , $mol_atom_force ) )
	
}
