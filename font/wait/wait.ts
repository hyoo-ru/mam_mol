namespace $ {

	export class $mol_font_wait extends $mol_object2 {

		static face( config : { face : string , text : string } ) {

			if( this.$.$mol_font_loaded( config ) ) return true
			
			throw new Promise( ( done , fail )=> {

				const check = ()=> {
					if( this.$.$mol_font_loaded( config ) ) done()
					else this.$.requestAnimationFrame( check )				
				}
	
				this.$.requestAnimationFrame( check )
	
				this.$.setTimeout( ()=> {
					this.$.$mol_font_loaded( config , true )
					fail( new Error( `Font loading timeout ${ config.face }` ) )
				} , 5000 )
				
			} )
			
		}

	}

}
