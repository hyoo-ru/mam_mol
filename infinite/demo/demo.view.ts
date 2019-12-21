namespace $.$$ {
	
	export class $mol_infinite_demo extends $.$mol_infinite_demo {
		
		@ $mol_fiber.method
		after( anchor : $mol_view ) {
			return [ ... $mol_range2(
				id => this.Item( $mol_stub_code() ) ,
				()=> this.chunk_size() 
			) ]
		}

		item_title( id : string ) {
			return id
		}
		
	}

	$mol_style_define( $mol_infinite_demo , {
		List : {
			padding: '.5rem',
		}
	} )

}
