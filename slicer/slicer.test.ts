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

			let calls = 0
			const fresh_stub = stub_ids(10)
			range.chunk = () => {
				calls++
				return fresh_stub
			}
			const appended = stub_ids(30)
			range.temp_push(...appended)

			$mol_assert_equal(arr.length, appended.length + stub.length)
			$mol_assert_equal(arr[29], appended[4])
			$mol_assert_equal(arr[30], appended[5])
			range.temp_cut()
			$mol_assert_equal(arr.length, appended.length + stub.length)
			$mol_assert_equal(arr[29], appended[4])
			$mol_assert_equal(arr[30], fresh_stub[0])
			$mol_assert_equal(calls, 1)

			const appended2 = stub_ids(30)
			range.temp_push(...appended2)
			$mol_assert_equal(arr[60], appended2[5])
			range.temp_cut()
			$mol_assert_equal(arr[60], fresh_stub[0])

		},
	})
}

