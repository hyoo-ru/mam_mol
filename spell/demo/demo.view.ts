namespace $.$$ {
	export class $mol_spell_demo extends $.$mol_spell_demo {
		
		@ $mol_mem
		report() {
			
			const wrong = [] as string[]
			const words = new Set( this.article().toLowerCase().match( /\p{Letter}{2,}/ug )! )
			
			for( const word of words ) {
				if( $mol_spell_any.check( word ) ) continue
				wrong.push( word )
			}
			
			return wrong.join( '\n' )
		}
		
	}
}
