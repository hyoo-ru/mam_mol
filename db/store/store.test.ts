namespace $ {
	$mol_test({
		
		async 'put, get, drop, count records and clear store'() {
			
			const db = await $$.$mol_db<{
				letters: { Key: number, Doc: string, Indexes: {} }
			}>( '$mol_db_test',
				mig => mig.store_make( 'letters' )
			)
			const trans = db.change( 'letters' )
			
			try {
			
				const { letters } = trans.stores
				
				$mol_assert_like( await letters.get(1), undefined )
				$mol_assert_like( await letters.get(2), undefined )
				$mol_assert_like( await letters.count(), 0 )
				
				await letters.put( 'a' )
				await letters.put( 'b', 1 )
				await letters.put( 'c', 2 )
				
				$mol_assert_like( await letters.get(1), 'b' )
				$mol_assert_like( await letters.get(2), 'c' )
				$mol_assert_like( await letters.count(), 2 )
				
				await letters.drop( 1 )
				
				$mol_assert_like( await letters.get(1), undefined )
				$mol_assert_like( await letters.count(), 1 )
				
				await letters.clear()
				$mol_assert_like( await letters.count(), 0 )
			
			} finally {
				
				trans.abort()
				db.kill()
				
			}

		},
		
		async 'select by query'() {
			
			const db = await $$.$mol_db<{
				letters: { Key: number, Doc: string, Indexes: {} }
			}>( '$mol_db_test',
				mig => mig.store_make( 'letters' )
			)
			const trans = db.change( 'letters' )
			
			try {
			
				const { letters } = trans.stores
				
				await letters.put( 'a' )
				await letters.put( 'b' )
				await letters.put( 'c' )
				await letters.put( 'd' )
				
				$mol_assert_like( await letters.select(), [ 'a', 'b', 'c', 'd' ] )
				$mol_assert_like( await letters.select( null, 2 ), [ 'a', 'b' ] )
				$mol_assert_like( await letters.select( $mol_dom_context.IDBKeyRange.bound( 2, 3 ) ), [ 'b', 'c' ] )
				
			} finally {
				
				trans.abort()
				db.kill()
				
			}

		},
		
	})
}
