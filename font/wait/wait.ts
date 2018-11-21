namespace $ {

	export class $mol_font_wait extends $mol_object2 {

		static face( config : { face : string , text : string } ) {

			if( this.$.$mol_font_loaded( config ) ) return true
			
			$mol_fail_hidden( new Promise( ( done , fail )=> {

				const check = ()=> {
					if( this.$.$mol_font_loaded( config ) ) done()
					else new this.$.$mol_after_frame( check )				
				}
	
				new this.$.$mol_after_frame( check )
	
				new this.$.$mol_after_timeout( 5000 , ()=> {
					this.$.$mol_font_loaded( config , true )
					fail( new Error( `Font loading timeout ${ config.face }` ) )
				} )
				
			} ) )
			
		}

	}

}
