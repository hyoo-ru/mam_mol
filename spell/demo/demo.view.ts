namespace $.$$ {
	export class $mol_spell_demo extends $.$mol_spell_demo {
		
		@ $mol_mem
		words() {
			return [ ... new Set( this.article().match( /\p{Letter}{2,}/ug )! ) ]
		}
		
		@ $mol_mem
		report() {
			return this.words()
				.filter( word => !word.match( $mol_spell_any ) )
				.join( '\n' )
		}
		
	}
}
