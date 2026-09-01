namespace $ {
	$mol_test({
		
		async 'unique index'() {
			
			const db = await $$.$mol_db<{
				users: {
					Key: string
					Doc: { name: string }
					Indexes: {
						names: [ string ]
					}
				}
			}>( '$mol_db_test',
				mig => mig.store_make( 'users' ),
				mig => mig.stores.users.index_make( 'names', [ 'name' ], true ),
			)
			const trans = db.change( 'users' )
			
			try {
			
				const { users } = trans.stores
				await users.put( { name: 'Jin' }, 'jin' )
				await users.put( { name: 'John' }, 'john' )
				await users.put( { name: 'Bin' }, 'bin' )

				const { names } = users.indexes
				$mol_assert_like( await names.get([ 'Jin' ]), { name: 'Jin' } )
				$mol_assert_like( await names.get([ 'John' ]), { name: 'John' } )
				$mol_assert_like( await names.count(), 3 )
				
				$mol_assert_like(
					await names.select( $mol_dom_context.IDBKeyRange.bound( [ 'J' ], [ 'J\uFFFF' ] ) ),
					[ { name: 'Jin' }, { name: 'John' } ],
				)
				
				try {
					await users.put( { name: 'Jin' }, 'jin2' )
					$mol_fail( new Error( 'Exception expected' ) )
				} catch( error: any ) {
					$mol_assert_unique( error.message, 'Exception expected' )
				}
				
			} finally {
				trans.abort()
				await db.kill()
			}
			
		},
		
		async 'multi path index'() {
			
			const db = await $$.$mol_db<{
				users: {
					Key: string
					Doc: { first: string, last: string }
					Indexes: {
						names: [ string, string ]
					}
				}
			}>( '$mol_db_test',
				mig => mig.store_make( 'users' ),
				mig => mig.stores.users.index_make( 'names', [ 'first', 'last' ] ),
			)
			const trans = db.change( 'users' )
			
			try {
			
				const { users } = trans.stores
				await users.put( { first: 'Jin', last: 'Johnson' }, 'jin' )
				await users.put( { first: 'John', last: 'Jinson' }, 'john' )
				await users.put( { first: 'Bond', last: 'James' }, '007' )
				
				const { names } = users.indexes
				$mol_assert_like( await names.get([ 'Jin', 'Johnson' ]), { first: 'Jin', last: 'Johnson' } )
				$mol_assert_like( await names.get([ 'John', 'Jinson' ]), { first: 'John', last: 'Jinson' } )
				$mol_assert_like( await names.count(), 3 )
				
				$mol_assert_like(
					await names.select( $mol_dom_context.IDBKeyRange.bound( [ 'Jin', 'Johnson' ], [ 'John', 'Jinson' ] ) ),
					[ { first: 'Jin', last: 'Johnson' }, { first: 'John', last: 'Jinson' } ],
				)
				
			} finally {
				trans.abort()
				await db.kill()
			}
			
		},
		
		async 'multiple indexes'() {
			
			const db = await $$.$mol_db<{
				users: {
					Key: string
					Doc: { name: string, age: number }
					Indexes: {
						names: [ string ]
						ages: [ number ]
					}
				}
			}>( '$mol_db_test',
				mig => mig.store_make( 'users' ),
				mig => mig.stores.users.index_make( 'names', [ 'name' ], true ),
				mig => mig.stores.users.index_make( 'ages', [ 'age' ] ),
			)
			const trans = db.change( 'users' )
			
			try {
			
				const { users } = trans.stores
				await users.put( { name: 'Jin', age: 18 }, 'jin' )
				await users.put( { name: 'John', age: 18 }, 'john' )
				
				const { names, ages } = users.indexes
				
				$mol_assert_like( await names.select([ 'Jin' ]), [{ name: 'Jin', age: 18 }] )
				$mol_assert_like( await names.select([ 'John' ]), [{ name: 'John', age: 18 }] )
				$mol_assert_like( await names.count(), 2 )
				
				$mol_assert_like( await ages.select([ 18 ]), [ { name: 'Jin', age: 18 }, { name: 'John', age: 18 } ] )
				$mol_assert_like( await ages.count(), 2 )
				
			} finally {
				trans.abort()
				await db.kill()
			}
			
		},
		
	})
}
