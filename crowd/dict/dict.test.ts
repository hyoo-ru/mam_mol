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
					[ ':foo', [ 888, 300001 ] ],
					[ ':bar', [ 777, 200001 ] ],
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
						[ 888, 300001 ],
						[ 666, 100001 ],
					] ],
					[ '=bar', [
						[ 777, -400001 ]
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
					[ ':foo', [ 777, 100002 ] ],
					[ '=bar', [
						[ 'xxx', 200001 ],
						[ 'yyy', 200002 ],
						[ 'zzz', 300002 ],
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
						[ 'xxx', 100001 ],
						[ 'yyy', 300001 ],
					] ],
					[ ':bar', [ 18, 200002 ] ],
				],
				
			)
			
		},
		
	})
}
