namespace $ {
	$mol_test({
		
		async 'unique index'() {
			
			const db = await $$.$mol_db( '$mol_db_test', [
				trans => trans.store_make( 'users', store => store
					.index_make( 'names', [ 'name' ], !!'unique' ),
				)
			] )
			const trans = db.change( 'users' )
			
			try {
			
				const { users } = trans.stores
				await users.put( 'jin', { name: 'Jin' } )
				await users.put( 'john', { name: 'John' } )

				const { names } = users.indexes
				$mol_assert_like( await names.get( [ 'Jin' ], 10 ), [{ name: 'Jin' }] )
				$mol_assert_like( await names.get( [ 'John' ], 10 ), [{ name: 'John' }] )
				$mol_assert_like( await names.count(), 2 )
				
				try {
					await users.put( 'jin2', { name: 'Jin' } )
					$mol_fail( new Error( 'Exception expected' ) )
				} catch( error ) {
					$mol_assert_equal( error.message, `Unable to add key to index 'names': at least one key does not satisfy the uniqueness requirements.` )
				}
				
			} finally {
				
				trans.abort()
				db.kill()
				
			}
			
		},
		
		async 'multi path index'() {
			
			const db = await $$.$mol_db( '$mol_db_test', [
				trans => trans.store_make( 'users', store => store
					.index_make( 'names', [ 'first', 'last' ] ),
				)
			] )
			const trans = db.change( 'users' )
			
			try {
			
				const { users } = trans.stores
				await users.put( 'jin', { first: 'Jin', last: 'Johnson' } )
				await users.put( 'john', { first: 'John', last: 'Jinson' } )
				
				const { names } = users.indexes
				$mol_assert_like( await names.get( [ 'Jin', 'Johnson' ], 10 ), [{ first: 'Jin', last: 'Johnson' }] )
				$mol_assert_like( await names.get( [ 'John', 'Jinson' ], 10 ), [{ first: 'John', last: 'Jinson' }] )
				$mol_assert_like( await names.count(), 2 )
				
			} finally {
				
				trans.abort()
				db.kill()
				
			}
			
		},
		
		async 'multiple indexes'() {
			
			const db = await $$.$mol_db( '$mol_db_test', [
				trans => trans.store_make( 'users', store => store
					.index_make( 'names', [ 'name' ], !!'unique' )
					.index_make( 'ages', [ 'age' ] )
				)
			] )
			const trans = db.change( 'users' )
			
			try {
			
				const { users } = trans.stores
				await users.put( 'jin', { name: 'Jin', age: 18 } )
				await users.put( 'john', { name: 'John', age: 18 } )
				
				const { names, ages } = users.indexes
				
				$mol_assert_like( await names.get([ 'Jin' ]), [{ name: 'Jin', age: 18 }] )
				$mol_assert_like( await names.get([ 'John' ]), [{ name: 'John', age: 18 }] )
				$mol_assert_like( await names.count(), 2 )
				
				$mol_assert_like( await ages.get([ 18 ]), [ { name: 'Jin', age: 18 } ] )
				$mol_assert_like( await ages.get( [18], 100 ), [ { name: 'Jin', age: 18 }, { name: 'John', age: 18 } ] )
				$mol_assert_like( await ages.count(), 2 )
				
			} finally {
				
				trans.abort()
				db.kill()
				
			}
			
		},
		
	})
}
