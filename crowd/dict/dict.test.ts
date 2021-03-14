namespace $ {
	$mol_test({
		
		'Registers'() {
			
			const val = new $mol_crowd_dict().fork(1)
			val.reg( 'foo' ).put( 666 )
			val.reg( 'bar' ).put( 777 )
			val.reg( 'foo' ).put( 888 )
		
			$mol_assert_like( val.toJSON(), [
				[ ':foo', [
					[ 888, 3001 ],
				] ],
				[ ':bar', [
					[ 777, 2001 ],
				] ],
			] )
			
		},
		
		'Ordered Sets'() {
			
			const val = new $mol_crowd_dict().fork(1)
			val.list( 'foo' ).insert( 666 )
			val.list( 'bar' ).insert( 777 )
			val.list( 'foo' ).insert( 888, 0 )
			val.list( 'bar' ).cut( 777 )
			
			$mol_assert_like( val.toJSON(), [
				[ '!foo', [
					[ 888, 3001 ],
					[ 666, 1001 ],
				] ],
				[ '!bar', [
					[ 777, -4001 ]
				] ],
			] )
			
		},
		
		'Unordered Sets'() {
			
			const val = new $mol_crowd_dict().fork(1)
			val.set( 'foo' ).add( 666 )
			val.set( 'bar' ).add( 777 )
			val.set( 'foo' ).add( 555 )
			val.set( 'bar' ).remove( 777 )
			
			$mol_assert_like( val.toJSON(), [
				[ '?foo', [
					[ 666, 1001 ],
					[ 555, 3001 ],
				] ],
				[ '?bar', [
					[ 777, -4001 ]
				] ],
			] )
			
		},
		
		'Slice after version'() {
			
			const val = new $mol_crowd_dict().fork(1)
			
			val.reg( 'foo' ).put( 1 )
			val.list( 'bar' ).insert( 2 )
			val.set( 'xxx' ).add( 3 )
			
			val.reg( 'foo' ).put( 4 )
			val.list( 'bar' ).insert( 5 )
			val.set( 'xxx' ).add( 6 )

			$mol_assert_like( val.toJSON( +3001 ), [
				[ ':foo', [
					[ 4, +4001 ],
				] ],
				[ '!bar', [
					[ 2, +2001 ],
					[ 5, +5001 ],
				] ],
				[ '?xxx', [
					[ 6, +6001 ],
				] ],
			] )
			
			$mol_assert_like( val.toJSON( +6001 ), [] )
			
		},
		
		'Merge different documents'() {
			
			const base = new $mol_crowd_dict()
			
			const left = base.fork(1)
			left.reg( 'foo' ).put( 666 )
			left.list( 'bar' ).insert( 'xxx' )
			
			const right = base.fork(2)
			right.reg( 'foo' ).put( 777 )
			right.list( 'bar' ).insert( 'yyy' )
			right.list( 'bar' ).insert( 'zzz' )
			
			$mol_assert_like(
				left.apply( right.toJSON() ).toJSON(),
				[
					[ ':foo', [
						[ 777, 1002 ],
					] ],
					[ '!bar', [
						[ 'yyy', 2002 ],
						[ 'zzz', 3002 ],
						[ 'xxx', 2001 ],
					] ],
				],
			)
			
		},
		
		'Merge increases versions'() {
			
			const base = new $mol_crowd_dict()
			
			const left = base.fork(1)
			left.list( 'foo' ).insert( 'xxx' )
			
			const right = base.fork(2)
			right.reg( 'bar' ).put( 17 )
			right.reg( 'bar' ).put( 18 )
			
			left.apply( right.toJSON() )
			left.list( 'foo' ).insert( 'yyy' )
			
			$mol_assert_like( left.toJSON(), [
				[ '!foo', [
					[ 'xxx', 1001 ],
					[ 'yyy', 3001 ],
				] ],
				[ ':bar', [
					[ 18, 2002 ],
				] ],
			] )
			
		},
		
	})
}
