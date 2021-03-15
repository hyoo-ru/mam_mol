namespace $ {
	$mol_test({
		
		'Registers'() {
			
			const val = new $mol_crowd_dict( $mol_crowd_reg ).fork(1)
			val.get( 'foo' ).put( 666 )
			val.get( 'bar' ).put( 777 )
			val.get( 'foo' ).put( 888 )
		
			$mol_assert_like( val.toJSON(), [
				[ 'foo', [
					[ 888, 3001 ],
				] ],
				[ 'bar', [
					[ 777, 2001 ],
				] ],
			] )
			
		},
		
		'Ordered Sets'() {
			
			const val = new $mol_crowd_dict( $mol_crowd_list ).fork(1)
			val.get( 'foo' ).insert( 666 )
			val.get( 'bar' ).insert( 777 )
			val.get( 'foo' ).insert( 888, 0 )
			val.get( 'bar' ).cut( 777 )
			
			$mol_assert_like( val.toJSON(), [
				[ 'foo', [
					[ 888, 3001 ],
					[ 666, 1001 ],
				] ],
				[ 'bar', [
					[ 777, -4001 ]
				] ],
			] )
			
		},
		
		'Unordered Sets'() {
			
			const val = new $mol_crowd_dict( $mol_crowd_set ).fork(1)
			val.get( 'foo' ).add( 666 )
			val.get( 'bar' ).add( 777 )
			val.get( 'foo' ).add( 555 )
			val.get( 'bar' ).remove( 777 )
			
			$mol_assert_like( val.toJSON(), [
				[ 'foo', [
					[ 666, 1001 ],
					[ 555, 3001 ],
				] ],
				[ 'bar', [
					[ 777, -4001 ]
				] ],
			] )
			
		},
		
		'Slice after version'() {
			
			const val = new $mol_crowd_dict( $mol_crowd_set ).fork(1)
			
			val.get( 'foo' ).add( 1 )
			val.get( 'bar' ).add( 2 )
			val.get( 'xxx' ).add( 3 )
			
			val.get( 'foo' ).add( 4 )
			val.get( 'bar' ).add( 5 )
			val.get( 'xxx' ).add( 6 )

			$mol_assert_like( val.toJSON( +3001 ), [
				[ 'foo', [
					[ 4, +4001 ],
				] ],
				[ 'bar', [
					[ 5, +5001 ],
				] ],
				[ 'xxx', [
					[ 6, +6001 ],
				] ],
			] )
			
			$mol_assert_like( val.toJSON( +6001 ), [] )
			
		},
		
		'Merge different documents'() {
			
			const base = new $mol_crowd_dict( $mol_crowd_list )
			
			const left = base.fork(1)
			left.get( 'foo' ).insert( 666 )
			left.get( 'bar' ).insert( 'xxx' )
			
			const right = base.fork(2)
			right.get( 'foo' ).insert( 777 )
			right.get( 'bar' ).insert( 'yyy' )
			right.get( 'bar' ).insert( 'zzz' )
			
			$mol_assert_like(
				left.apply( right.toJSON() ).toJSON(),
				[
					[ 'foo', [
						[ 777, 1002 ],
						[ 666, 1001 ],
					] ],
					[ 'bar', [
						[ 'yyy', 2002 ],
						[ 'zzz', 3002 ],
						[ 'xxx', 2001 ],
					] ],
				],
			)
			
		},
		
		'Merge increases versions'() {
			
			const base = new $mol_crowd_dict( $mol_crowd_list )
			
			const left = base.fork(1)
			left.get( 'foo' ).insert( 'xxx' )
			
			const right = base.fork(2)
			right.get( 'bar' ).insert( 17 )
			right.get( 'bar' ).insert( 18 )
			
			left.apply( right.toJSON() )
			left.get( 'foo' ).insert( 'yyy' )
			
			$mol_assert_like( left.toJSON(), [
				[ 'foo', [
					[ 'xxx', 1001 ],
					[ 'yyy', 3001 ],
				] ],
				[ 'bar', [
					[ 17, 1002 ],
					[ 18, 2002 ],
				] ],
			] )
			
		},
		
	})
}
