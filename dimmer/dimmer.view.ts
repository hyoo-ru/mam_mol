namespace $.$$ {

	/**
	 * Output text with dimmed mismatched substrings.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_dimmer_demo
	 */
	export class $mol_dimmer extends $.$mol_dimmer {
		
		parts() {
			const needle = this.needle()
			if( needle.length < 2 ) return [ this.haystack() ]
			
			let chunks : any[] = []
			let strings = this.strings()
			
			for( let index = 0 ; index < strings.length ; index++ ) {
				if( strings[ index ] === '' ) continue
				
				chunks.push( ( index % 2 ) ? this.High( index ) : this.Low( index ) )
			}
			
			return chunks
		}
		
		@ $mol_mem
		strings() {
			
			const options = this.needle().split( /\s+/g ).filter( Boolean )
			if( !options.length ) return [ this.haystack() ]
			
			const variants = { ... options } as Record< number, string >
			const regexp = $mol_regexp.from( { needle: variants } , { ignoreCase: true } )
			
			return this.haystack().split( regexp )
		}
		
		string( index: number ) {
			return this.strings()[ index ]
		}
		
		*view_find(
			check: ( path : $mol_view, text?: string )=> boolean,
			path = [] as $mol_view[],
		): Generator< $mol_view[] > {

			if( check( this, this.haystack() ) ) {
				yield [ ... path, this ]
			}
			
		}

	}
}
