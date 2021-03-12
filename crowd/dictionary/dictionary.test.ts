namespace $ {
	$mol_test({
		
		'Put values'() {
			
			$mol_assert_like(
				
				new $mol_crowd_dictionary( 1 )
				.put( ':foo', 666 )
				.put( ':bar', 777 )
				.put( ':foo', 888 )
				.toJSON(),
				
				[
					[ ':foo', [ 888, 200001 ] ],
					[ ':bar', [ 777, 100001 ] ],
				],
				
			)
			
		},
		
		'Bring and kick keys'() {
			
			$mol_assert_like(
				
				new $mol_crowd_dictionary( 1 )
				.bring( '=foo', 666 )
				.bring( '=bar', 777 )
				.bring( '=foo', 888, 0 )
				.kick( '=bar', 777 )
				.toJSON(),
				
				[
					[ '=foo', [
						[ 888, 200001 ],
						[ 666, 100001 ],
					] ],
					[ '=bar', [
						[ 777, -200001 ]
					] ],
				],
				
			)
			
		},
		
		'Merge different documents'() {
			
			const left = new $mol_crowd_dictionary( 1 )
			.put( ':foo', 666 )
			.bring( '=bar', 'xxx' )
			
			const right = new $mol_crowd_dictionary( 2 )
			.put( ':foo', 777 )
			.bring( '=bar', 'yyy' )
			
			$mol_assert_like(
				left.merge( right ).toJSON(),
				[
					[ ':foo', [ 777, 100002 ] ],
					[ '=bar', [
						[ 'xxx', 100001 ],
						[ 'yyy', 100002 ],
					] ],
				],
			)
			
		},
		
	})
}
