namespace $ {

	function $mol_ghost_test_host( $ : $ ) {

		class $mol_ghost_test_item extends $mol_view {

			static all = [] as $mol_ghost_test_item[]
			static dead = [] as $mol_ghost_test_item[]

			constructor() {
				super()
				$mol_ghost_test_item.all.push( this )
			}

			override destructor() {
				$mol_ghost_test_item.dead.push( this )
				super.destructor()
			}

		}

		class $mol_ghost_test_row extends $mol_ghost {

			Item!: ()=> $mol_ghost_test_item

			@ $mol_mem
			override Sub() {
				return this.Item()
			}

		}

		class $mol_ghost_test_list extends $mol_view {

			@ $mol_mem
			ids( next?: readonly number[] ) {
				return next ?? [ 1 ]
			}

			@ $mol_mem_key
			Item( id: number ) {
				return new $mol_ghost_test_item()
			}

			@ $mol_mem_key
			Row( id: number ) {
				const row = new $mol_ghost_test_row()
				row.$ = this.$
				row.Item = ()=> this.Item( id )
				return row
			}

			override sub() {
				return this.ids().map( id => this.Row( id ) )
			}

		}

		const host = new $mol_ghost_test_list()
		host.$ = $
		host.dom_tree()
		$mol_wire_fiber.sync()

		return { host , Item: $mol_ghost_test_item }

	}

	$mol_test({

		'ghost sub destructor runs when row leaves'($) {

			const { host , Item } = $mol_ghost_test_host( $ )
			const first = Item.all[ 0 ]

			$mol_assert_equal( Item.dead.length , 0 )

			host.ids( [] )
			host.dom_tree()
			$mol_wire_fiber.sync()

			$mol_assert_equal( Item.dead.length , 1 )
			$mol_assert_equal( Item.dead[ 0 ] === first , true )

		} ,

		'ghost sub constructor runs when row returns'($) {

			const { host , Item } = $mol_ghost_test_host( $ )
			const first = Item.all[ 0 ]

			host.ids( [] )
			host.dom_tree()
			$mol_wire_fiber.sync()

			host.ids( [ 1 ] )
			host.dom_tree()
			$mol_wire_fiber.sync()

			$mol_assert_equal( Item.all.length , 2 )
			$mol_assert_equal( Item.all[ 1 ] === first , false )

		} ,

	})

}
