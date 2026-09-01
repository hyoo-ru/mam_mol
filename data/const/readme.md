# $mol_data_const

Checks for equality to given value and returns expected type.

	const OK = $mol_data_const({ done: true })
	const ok = OK({ done: true }) // ✅

	OK({ done: false }) // ❌ {"done":false} is not {"done":true}
