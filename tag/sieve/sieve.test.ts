namespace $ {
	function create_sieve({
		path = '',
		ids_tags
	}: {
		path: string
		ids_tags: Record<string, string[]>
	}) {
		let bag = new $mol_tag_sieve
		bag.ids_tags = () => ids_tags

		if (path) {
			bag = path.split('/').reduce((bag, seg) => bag.select(seg), bag)
		}

		return bag
	}

	function create_tests({ title, ids_tags, test_data }: {
		title: string;
		ids_tags: Record<string, string[]>
		test_data: Record<string, { tags: string[], ids: string[] }>
	}) {
		return Object.keys(test_data).reduce((acc, path) => {
			return {
				...acc,
				[`${title} ${path}`]() {
					const bag = create_sieve({ path, ids_tags })
					$mol_assert_like(bag.tags(), test_data[path].tags)
					$mol_assert_like(bag.ids(), test_data[path].ids)
				}
			}
		}, {} as Record<string, () => void>)
	}

	$mol_test({
		...create_tests({
			title: 'ony tag on level without ids',
			ids_tags: {
				button: [ 'widget' ],
				card: [ 'widget' ],
				some1: [ 'widget/layout' ],
				some2: [ 'widget/layout' ],
			},
			test_data: {
				'': {
					tags: [ 'layout' ],
					ids: [ 'button', 'card' ],
				},
				'layout': {
					tags: [ ],
					ids: [ 'some1', 'some2' ],
				}
			}
		}),

		...create_tests({
			title: 'select heroes',
			ids_tags: {
				thanos: [
					'side/bad',
					'universe/marvel',
					'sex/male',
				],
				locky: [
					'side/bad',
					'universe/marvel',
					'sex/male',
				],
				harley: [
					'side/bad',
					'universe/dc',
					'sex/female',
				],
				wonderwoman: [
					'side/good',
					'universe/dc',
					'sex/female',
				],
				hela: [
					'side/bad',
					'universe/marvel',
					'sex/female',
				],
			},
			test_data: {
				'': {
					tags: [ 'side', 'universe', 'sex', ],
					ids: [ ],
				},
		
				'sex': {
					tags: [ 'male', 'female', ],
					ids: [ ],
				},
		
				'sex/female': {
					tags: [ 'side', 'universe', ],
					ids: [ ],
				},
		
				'sex/female/side': {
					tags: [ 'bad' ],
					ids: [ 'wonderwoman' ],
				},
		
				'sex/female/side/bad': {
					tags: [ ],
					ids: [ 'harley' ,'hela' ],
				},
			}
		})
	})
}
