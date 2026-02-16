namespace $.$$ {
	export class $mol_spell_demo extends $.$mol_spell_demo {
		
		@ $mol_mem
		words() {
			return [ ... this.article().toLowerCase().match( /\p{Letter}{1,}/ug )! ]
		}
		
		@ $mol_mem
		report() {
			
			const wrong = [] as string[]
			const words = new Set( this.words() )
			
			for( const word of words ) {
				if( $mol_spell_any.check( word ) ) continue
				wrong.push( word )
			}
			
			return wrong.join( '\n' )
		}
		
		@ $mol_mem
		segments() {
			return this.words().map( word => $mol_spell_ru.split( word ).join( '-' ) ).join( ' ' )
		}
		
	}
}
