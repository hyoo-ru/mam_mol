namespace $ {
	$mol_test({
		
		async 'put, get, drop, count records and clear store'() {
			
			const db = await $$.$mol_db( '$mol_db_test', [
				trans => trans.store_make( 'temp' )
			] )
			const trans = db.change( 'temp' )
			
			try {
			
				const { temp } = trans.stores
				
				$mol_assert_like( await temp.get(1), [] )
				$mol_assert_like( await temp.get(2), [] )
				$mol_assert_like( await temp.count(), 0 )
				
				await temp.put( 1, 'a' )
				await temp.put( 1, 'b' )
				await temp.put( 2, 'c' )
				
				$mol_assert_like( await temp.get(1), [ 'b' ] )
				$mol_assert_like( await temp.get(2), [ 'c' ] )
				$mol_assert_like( await temp.count(), 2 )
				
				await temp.drop( 1 )
				
				$mol_assert_like( await temp.get(1), [] )
				$mol_assert_like( await temp.count(), 1 )
				
				await temp.clear()
				$mol_assert_like( await temp.count(), 0 )
			
			} finally {
				
				trans.abort()
				db.kill()
				
			}

		},
		
	})
}
