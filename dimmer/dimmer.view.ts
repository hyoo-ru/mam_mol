module $.$mol {
	export class $mol_dimmer extends $.$mol_dimmer {
		
		parts() {
			const needle = this.needle()
			if( !needle ) return [ this.haystack() ]
			
			let chunks : any[] = []
			let strings = this.strings()
			
			for( let index = 0 ; index < strings.length ; index++ ) {
				if( index > 0 ) chunks.push( this.needle() )
				if( strings[ index ] !== '' ) chunks.push( this.low( index ) )
			}
			
			return chunks
		}
		
		@ $mol_prop()
		strings() {
			return this.haystack().split( this.needle() )
		}
		
		string( index: number ) {
			return this.strings()[ index ]
		}
		
	}
}
