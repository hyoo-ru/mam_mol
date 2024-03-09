namespace $ {
	export class $mol_state_local_node< Value > extends $mol_state_local< Value > {
		
		@ $mol_mem
		static dir() {
			const base = process.env.XDG_DATA_HOME || ( $node.os.homedir() + '/.local/share' )
			return $mol_file.absolute( base ).resolve( './hyoo_state_local' )
		}
		
		@ $mol_mem_key
		static value< Value >(
			key : string ,
			next? : Value | null ,
		) : Value | null {
			
			const file = this.dir().resolve( encodeURIComponent( key ) + '.json' )
			
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
