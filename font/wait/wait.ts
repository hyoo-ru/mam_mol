namespace $ {

	export class $mol_font_wait extends $mol_object2 {

		@ $mol_mem_key
		static face( face : string ) {

			if( this.$.$mol_font_loaded( face ) ) return true

			const atom = this.$.$mol_atom_current()
			
			const check = ()=> {
				if( this.$.$mol_font_loaded( face ) ) atom.push( true )
				else this.$.requestAnimationFrame( check )				
			}

			this.$.requestAnimationFrame( check )

			this.$.setTimeout( ()=> $mol_font_loaded( face , true ) , 5000 )
			
			throw new this.$.$mol_atom_wait( `Wait font face: ${ face }` )
			
		}

	}

}
