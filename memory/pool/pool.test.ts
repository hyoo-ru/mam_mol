namespace $.$$ {
	$mol_test({
		
		"linear allocation"( $ ) {
			
			const pool = new $mol_memory_pool
			
			$mol_assert_equal( pool.acquire( 8 ), 0 )
			$mol_assert_equal( pool.acquire( 16 ), 8 )
			$mol_assert_equal( pool.acquire( 32 ), 24 )
			
		},
		
		"allocation in released"( $ ) {
			
			const pool = new $mol_memory_pool
			
			$mol_assert_equal( pool.acquire( 8 ), 0 )
			$mol_assert_equal( pool.acquire( 16 ), 8 )
			
			pool.release( 0, 16 )
			$mol_assert_equal( pool.acquire( 8 ), 0 )
			$mol_assert_equal( pool.acquire( 16 ), 24 )
			$mol_assert_equal( pool.acquire( 8 ), 8 )
			
		},
		
		"space limitation"( $ ) {
			
			const pool = new $mol_memory_pool( 10 )
			
			pool.acquire( 8 )
			pool.release( 2, 4 )
			
			$mol_assert_fail( ()=> pool.acquire( 6 ), 'No free space\nneed: 6\nhave: 4' )
			
		},
		
		"double release"( $ ) {
			
			const pool = new $mol_memory_pool
			
			$mol_assert_fail( ()=> pool.release( 0, 2 ), 'Double release' )
			$mol_assert_fail( ()=> pool.release( 2, 2 ), 'Double release' )
			
			pool.acquire( 16 )
			pool.release( 4, 8 )
			
			$mol_assert_fail( ()=> pool.release( 4, 8 ), 'Double release' )
			$mol_assert_fail( ()=> pool.release( 10, 4 ), 'Double release' )
			$mol_assert_fail( ()=> pool.release( 2, 4 ), 'Double release' )
			
		},
		
	})
}
