namespace $.$$ {

	export type $mol_drag_demo_product = {
		id: string
		title: string
	}

	export class $mol_drag_demo extends $.$mol_drag_demo {

		@ $mol_mem
		products( next? : $mol_drag_demo_product[] ) {
			return next ?? [ ... $mol_range2( index => this.Product( String( index + 1 ) ) , ()=> this.products_count() ) ]
		}

		@ $mol_mem_key
		Product( id : string ) {
			return { id : id , title : `Task #${ id }` }
		}

		product_cards() {
			return this.products().map( task => this.Product_item( task ) )
		}

		product_title( product : $mol_drag_demo_product ) {
			return product.title
		}

		@ $mol_mem_key
		product_uri( product : $mol_drag_demo_product ) {
			return this.$.$mol_state_arg.make_link({
				... this.$.$mol_state_arg.dict() ,
				'product' : product.id ,
			})
		}

		transfer_adopt( transfer : DataTransfer ) {

			const uri = transfer.getData( "text/uri-list" )
			if( !uri ) return

			return this.products().find( prod => this.product_uri( prod ) === uri )

		}

		receive_before( prod : $mol_drag_demo_product , prod2 : $mol_drag_demo_product ) {

			if( prod === prod2 ) return
			
			const products = this.products().filter( p => p !== prod2 )
			
			const index = products.indexOf( prod )
			products.splice( index , 0 , prod2 )
			
			this.products( products )

		}

		receive( prod : $mol_drag_demo_product ) {

			const products = this.products().filter( p => p !== prod )
			products.push( prod )
			
			this.products( products )

		}

		receive_trash( prod : $mol_drag_demo_product ) {
			this.products( this.products().filter( p => p !== prod ) )
		}

	}

}
