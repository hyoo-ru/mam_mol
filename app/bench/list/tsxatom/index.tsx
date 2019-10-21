/** @jsx $mol_jsx_make */
namespace $ {

	@ $mol_fiber.class
	export class $mol_app_bench_list_tsxatom_item extends $mol_jsx_view {

		@ $mol_mem
		title() { return '' }

		@ $mol_mem
		content() { return '' }

		@ $mol_mem
		selected( next = false ) { return next }

		@ $mol_mem
		valueOf() { return super.valueOf() }

		render() { return (
			<div
				classList={[ `list-item list-item-selected-${ this.selected() }` ]}
				onclick={ $mol_fiber_root( ()=> this.selected( true ) ) }
				>
				<div
					id="/title"
					classList={[ 'list-item-title' ]}
					>
					{ this.title() }
				</div>
				<div
					id="/content"
					classList={[ 'list-item-content' ]}
					>
					{ this.content() }
				</div>
			</div>
		) }

	}

	@ $mol_fiber.class
	export class $mol_app_bench_list_tsxatom extends $mol_jsx_view {

		constructor() {
			
			super()

			window.addEventListener( 'message' , event => {

				switch( event.data[ 0 ] ) {
					case 'set data' :
						this.data( event.data[ 1 ] )
						break
				}
		
			} )
				
		}

		@ $mol_mem
		data( next = {
			sample : '' ,
			items : [] as {
				id : number
				title : string
				content : string
			}[]	
		} ) { return next }
		
		@ $mol_mem
		selected( next = -1 ) { return next }
		
		@ $mol_mem_key
		item_selected( id : number , next? : boolean ) {
			return this.selected( next === undefined ? undefined : next ? id : -1 ) === id
		}
		
		@ $mol_mem
		valueOf() { return super.valueOf() }

		render() { return (
			<div classList={[ 'list' ]} >
				{ ... this.data().items.map( item => (
					<$mol_app_bench_list_tsxatom_item
						id={ '/item:' + item.id }
						title={ ()=> item.title }
						content={ ()=> item.content }
						selected={ next => this.item_selected( item.id , next ) }
					/>
				) ) }
			</div>
		) }

	}

	$mol_atom2_autorun( ()=>
		$mol_jsx_attach( $mol_dom_context.document , ()=>
			<$mol_app_bench_list_tsxatom id="/list" />
		)
	)

}
