namespace $ {
	$mol_test({
		
		'Registers'() {
			
			$mol_assert_like(
				
				new $mol_crowd_dict(1)
				.put( ':foo', 666 )
				.put( ':bar', 777 )
				.put( ':foo', 888 )
				.toJSON(),
				
				[
					[ ':foo', [
						[ 888, 3001 ],
					] ],
					[ ':bar', [
						[ 777, 2001 ],
					] ],
				],
				
			)
			
		},
		
		'Ordered Sets'() {
			
			$mol_assert_like(
				
				new $mol_crowd_dict(1)
				.insert( '!foo', 666 )
				.insert( '!bar', 777 )
				.insert( '!foo', 888, 0 )
				.cut( '!bar', 777 )
				.toJSON(),
				
				[
					[ '!foo', [
						[ 888, 3001 ],
						[ 666, 1001 ],
					] ],
					[ '!bar', [
						[ 777, -4001 ]
					] ],
				],
				
			)
			
		},
		
		'Unordered Sets'() {
			
			$mol_assert_like(
				
				new $mol_crowd_dict(1)
				.add( '?foo', 666 )
				.add( '?bar', 777 )
				.add( '?foo', 555 )
				.remove( '?bar', 777 )
				.toJSON(),
				
				[
					[ '?foo', [
						[ 666, 1001 ],
						[ 555, 3001 ],
					] ],
					[ '?bar', [
						[ 777, -4001 ]
					] ],
				],
				
			)
			
		},
		
		'Slice after version'() {
			
			const val = new $mol_crowd_dict(1)
			
			.put( ':foo', 1 )
			.insert( '!bar', 2 )
			.add( '?xxx', 3 )
			
			.put( ':foo', 4 )
			.insert( '!bar', 5 )
			.add( '?xxx', 6 )

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
			
			const left = new $mol_crowd_dict(1)
			.put( ':foo', 666 )
			.insert( '!bar', 'xxx' )
			
			const right = new $mol_crowd_dict(2)
			.put( ':foo', 777 )
			.insert( '!bar', 'yyy' )
			.insert( '!bar', 'zzz' )
			
			$mol_assert_like(
				left.merge( right ).toJSON(),
				[
					[ ':foo', [
						[ 777, 1002 ],
					] ],
					[ '!bar', [
						[ 'xxx', 2001 ],
						[ 'yyy', 2002 ],
						[ 'zzz', 3002 ],
					] ],
				],
			)
			
		},
		
		'Merge increases versions'() {
			
			const left = new $mol_crowd_dict(1)
			.insert( '!foo', 'xxx' )
			
			const right = new $mol_crowd_dict(2)
			.put( ':bar', 17 )
			.put( ':bar', 18 )
			
			$mol_assert_like(
				
				left.merge( right )
				.insert( '!foo', 'yyy' )
				.toJSON(),
				
				[
					[ '!foo', [
						[ 'xxx', 1001 ],
						[ 'yyy', 3001 ],
					] ],
					[ ':bar', [
						[ 18, 2002 ],
					] ],
				],
				
			)
			
		},
		
	})
}
