namespace $ {
	function create_bag({
		path = '',
		ids_tags
	}: {
		path: string
		ids_tags: Record<string, string[]>
	}) {
		let bag = new $mol_tag_tree_bag
		bag.ids_tags = () => ids_tags

		if (path) {
			bag = path.split('/').reduce((bag, seg) => bag.select(seg), bag)
		}

		return bag
	}

	const ids_tags = {
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
	}

	const test_data: Record<string, { tags: string[], ids?: string[] }> = {
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

	const tests = Object.keys(test_data).reduce((acc, path) => {
		return {
			...acc,
			[`select ${path}`]() {
				const bag = create_bag({ path, ids_tags })
				$mol_assert_like(bag.tags(), test_data[path].tags)
				$mol_assert_like(bag.ids(), test_data[path].ids)
			}
		}
	}, {} as Record<string, () => void>)

	$mol_test(tests)
}
