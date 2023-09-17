namespace $ {
	function stub_ids(max = 10): string[] {
		const ids: string[] = []
		for (let i = 0; i < max; i++) {
			ids.push($mol_stub_code())
		}
		return ids
	}

	function make_range(count = 25, chunk_size = 10) {
		const stub = stub_ids(count)
		const range = new $mol_slicer<string>()
		range.count = () => count
		range.chunk_size = () => chunk_size
		range.chunk = offset => stub.slice(offset, offset + chunk_size)

		return { range, stub, chunk_size }
	}

	$mol_test({

		'chunk addressing'($) {
			const { range, stub } = make_range()
			const arr = range.range()
			$mol_assert_equal(range.length, stub.length)
			$mol_assert_equal(arr[1], stub[1])
			$mol_assert_equal(arr.at(-1), stub.at(-1))
		},

		'push temp'($) {
			const { range, stub } = make_range()
			const arr = range.range()
			$mol_assert_equal(arr.length, stub.length)
			range.temp_push('123')
			$mol_assert_equal(arr.length, stub.length + 1)
			$mol_assert_equal(arr.at(-1), '123')
		},

		'multiple push'($) {
			const { range, stub } = make_range()
			const arr = range.range()

			const appended = stub_ids(30)
			range.temp_push(...appended)

			$mol_assert_equal(arr.length, appended.length + stub.length)

			let calls = 0
			range.chunk = offset => {
				calls++
				return []
			}

			arr[50]

			$mol_assert_equal(calls, 0)
		},
	})
}

