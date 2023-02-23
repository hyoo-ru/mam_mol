namespace $.$$ {

	export class $mol_list_demo extends $.$mol_list_demo {
		override item_title( id : number ) : string {
			return `Item #${ id + 1 }`
		}

		override list_rows() {
			return [ ...Array( this.rows() ).keys() ].map( key => {
				return this.Item( key )
			} )
		}
	}

}
