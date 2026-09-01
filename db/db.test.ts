namespace $ {
	$mol_test({
		
		async 'take and drop db'() {
			const db = await $$.$mol_db( '$mol_db_test' )
			await db.kill()
		},
		
		async 'make and drop store in separate migrations'() {
			
			try {
				
				const db1 = await $$.$mol_db( '$mol_db_test',
					mig => mig.store_make( 'temp' ),
				)
				db1.destructor()
				
				$mol_assert_like( db1.stores, [ 'temp' ] )
				$mol_assert_like( db1.version, 2 )
				
				const db2 = await $$.$mol_db( '$mol_db_test',
					mig => mig.store_make( 'temp' ),
					mig => mig.store_drop( 'temp' ),
				)
				db2.destructor()
				
				$mol_assert_like( db2.stores, [] )
				$mol_assert_like( db2.version, 3 )
			
			} finally {
				
				const db0 = await $$.$mol_db( '$mol_db_test' )
				await db0.kill()
				
			}
			
		},
		
	})
}
