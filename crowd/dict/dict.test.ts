namespace $ {
	$mol_test({
		
		'Put values'() {
			
			$mol_assert_like(
				
				new $mol_crowd_dict(1)
				.put( ':foo', 666 )
				.put( ':bar', 777 )
				.put( ':foo', 888 )
				.toJSON(),
				
				[
					[ ':foo', [ 888, 3001 ] ],
					[ ':bar', [ 777, 2001 ] ],
				],
				
			)
			
		},
		
		'Bring and kick keys'() {
			
			$mol_assert_like(
				
				new $mol_crowd_dict(1)
				.bring( '=foo', 666 )
				.bring( '=bar', 777 )
				.bring( '=foo', 888, 0 )
				.kick( '=bar', 777 )
				.toJSON(),
				
				[
					[ '=foo', [
						[ 888, 3001 ],
						[ 666, 1001 ],
					] ],
					[ '=bar', [
						[ 777, -4001 ]
					] ],
				],
				
			)
			
		},
		
		'Merge different documents'() {
			
			const left = new $mol_crowd_dict(1)
			.put( ':foo', 666 )
			.bring( '=bar', 'xxx' )
			
			const right = new $mol_crowd_dict(2)
			.put( ':foo', 777 )
			.bring( '=bar', 'yyy' )
			.bring( '=bar', 'zzz' )
			
			$mol_assert_like(
				left.merge( right ).toJSON(),
				[
					[ ':foo', [ 777, 1002 ] ],
					[ '=bar', [
						[ 'xxx', 2001 ],
						[ 'yyy', 2002 ],
						[ 'zzz', 3002 ],
					] ],
				],
			)
			
		},
		
		'Merge increases versions'() {
			
			const left = new $mol_crowd_dict(1)
			.bring( '=foo', 'xxx' )
			
			const right = new $mol_crowd_dict(2)
			.put( ':bar', 17 )
			.put( ':bar', 18 )
			
			$mol_assert_like(
				
				left.merge( right )
				.bring( '=foo', 'yyy' )
				.toJSON(),
				
				[
					[ '=foo', [
						[ 'xxx', 1001 ],
						[ 'yyy', 3001 ],
					] ],
					[ ':bar', [ 18, 2002 ] ],
				],
				
			)
			
		},
		
	})
}
