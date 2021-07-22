namespace $ {
	$mol_test({
		
		async 'put, get, drop, count records and clear store'() {
			
			const db = await $$.$mol_db<{
				letters: { Key: number, Doc: string, Indexes: {} }
			}>( '$mol_db_test',
				trans => trans.store_make( 'letters' )
			)
			const trans = db.change( 'letters' )
			
			try {
			
				const { letters } = trans.stores
				
				$mol_assert_like( await letters.get(1), [] )
				$mol_assert_like( await letters.get(2), [] )
				$mol_assert_like( await letters.count(), 0 )
				
				await letters.put( 1, 'a' )
				await letters.put( 1, 'b' )
				await letters.put( 2, 'c' )
				
				$mol_assert_like( await letters.get(1), [ 'b' ] )
				$mol_assert_like( await letters.get(2), [ 'c' ] )
				$mol_assert_like( await letters.count(), 2 )
				
				await letters.drop( 1 )
				
				$mol_assert_like( await letters.get(1), [] )
				$mol_assert_like( await letters.count(), 1 )
				
				await letters.clear()
				$mol_assert_like( await letters.count(), 0 )
			
			} finally {
				
				trans.abort()
				db.kill()
				
			}

		},
		
	})
}
