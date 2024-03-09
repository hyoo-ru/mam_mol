namespace $ {
	export class $mol_state_local_node< Value > extends $mol_state_local< Value > {
		
		@ $mol_mem
		static file() {
			return $mol_file.absolute( $node.os.homedir() ).resolve( './hyoo_state_local' )
		}
		
		@ $mol_mem_key
		static value< Value >(
			key : string ,
			next? : Value | null ,
		) : Value | null {
			
			const file = this.file().resolve( encodeURIComponent( key ) + '.json' )
			
			if( next === null ) {
				file.exists( false )
				return null
			}
			
			const arg = next === undefined ? undefined : JSON.stringify( next )
			return JSON.parse( file.text( arg ) || 'null' )
			
		}
		
	}
	$.$mol_state_local = $mol_state_local_node
}
