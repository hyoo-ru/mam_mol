namespace $ {
	function stub_ids(max = 10): string[] {
		const ids: string[] = []
		for (let i = 0; i < max; i++) {
			ids.push($mol_stub_code())
		}
		return ids
	}

	function make_range() {
		const range = new $mol_range3<string>()
		const chunk_size = 10
		const chunks = [
			stub_ids(chunk_size),
			stub_ids(chunk_size),
			stub_ids(chunk_size / 2),
		]
		const count = chunks.reduce((acc, row) => acc + row.length, 0)
		range.count = () => count
		range.chunk_size = () => chunk_size
		range.chunk = offset => chunks[offset]

		return { range, chunks }
	}

	$mol_test({

		'chunk addressing'() {
			const { range, chunks } = make_range()
			const arr = range.range()

			$mol_assert_equal(arr[0], chunks[0][0])
			$mol_assert_equal(arr.at(-1), chunks.at(-1)?.at(-1))
		}

	})
}

