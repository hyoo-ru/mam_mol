namespace $ {

	/** State of arguments like `foo=bar xxx` */
	export class $mol_state_arg extends $mol_object {
		
		static prolog = ''
		static separator = ' '
		
		@ $mol_mem
		static href( next? : string ) {
			return next || process.argv.slice( 2 ).join( ' ' )
		}
		
		@ $mol_mem
		static href_normal() {
			return this.link({})
		}
		
		@ $mol_mem
		static dict( next? : { [ key : string ] : string | null } ) {
			if( next !== void 0 ) this.href( this.make_link( next ) )
			
			var href = this.href()
			var chunks = href.split( ' ' )
			
			var params : { [ key : string ] : string } = {}
			chunks.forEach(
				chunk => {
					if( !chunk ) return
					var vals = chunk.split( '=' ).map( decodeURIComponent )
					params[ vals.shift()! ] = vals.join('=')
				}
			)
			
			return params as Readonly< typeof params >
		}
		
		@ $mol_mem_key
		static value( key : string , next? : string | null ) {
			if( next === void 0 ) return this.dict()[ key ] ?? null
			this.href( this.link( { [ key ] : next } ) )
			return next
		}
		
		static link( next : Record<string, string | null> ) {
			const params : Record<string, string | null> = {}
			
			var prev = this.dict()
			for( var key in prev ) {
				params[ key ] = prev[ key ]
			}
			
			for( var key in next ) {
				params[ key ] = next[ key ]
			}
			
			return this.make_link( params )
		}
		
		static make_link( next : Record<string, string | null>) {
			const chunks : string[] = []
			for( const key in next ) {
				if( next[ key ] !== null ) {
					chunks.push([key, next[key]!].map(encodeURIComponent).join('='))
				}
			}
			
			return chunks.join( ' ' )
		}
		
		@ $mol_action
		static go( next : { [ key : string ] : string | null } ) {
			this.href( this.link( next ) )
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
			const prefix = this.prefix
			const dict : Record<string, string | null> = {}
			for( var key in next ) {
				dict[ prefix + key ] = next[ key ]
			}
			return ( this.constructor as typeof $mol_state_arg ).link( dict )
		}
		
	}
	
}
