namespace $ {

	export class $mol_font_wait extends $mol_object2 {

		@ $mol_mem_key
		static face( config : { face : string , text : string } ) {

			if( this.$.$mol_font_loaded( config ) ) return true

			const atom = this.$.$mol_atom_current()
			
			const check = ()=> {
				if( this.$.$mol_font_loaded( config ) ) atom.push( true )
				else this.$.requestAnimationFrame( check )				
			}

			this.$.requestAnimationFrame( check )

			this.$.setTimeout( ()=> $mol_font_loaded( config , true ) , 5000 )
			
			throw new this.$.$mol_atom_wait( `Wait font face: ${ config.face }` )

		}

	}

}
