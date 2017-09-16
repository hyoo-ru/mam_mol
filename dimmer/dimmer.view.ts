namespace $.$$ {
	export class $mol_dimmer extends $.$mol_dimmer {
		
		parts() {
			const needle = this.needle()
			if( !needle ) return [ this.haystack() ]
			
			let chunks : any[] = []
			let strings = this.strings()
			
			for( let index = 0 ; index < strings.length ; index++ ) {
				if( strings[ index ] === '' ) continue
				
				chunks.push( ( index % 2 ) ? strings[ index ] : this.Low( index ) )
			}
			
			return chunks
		}
		
		@ $mol_mem
		strings() {
			return this.haystack().split( new RegExp( `(${ this.needle() })` , 'gi' ) )
		}
		
		string( index: number ) {
			return this.strings()[ index ]
		}
		
	}
}
