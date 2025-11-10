namespace $ {

	/** Benchmark script to measure $mol_vary performance improvements */

	function benchmark(name: string, iterations: number, fn: () => void) {
		const start = performance.now()
		for (let i = 0; i < iterations; i++) {
			fn()
		}
		const end = performance.now()
		const timeMs = end - start
		const opsPerSec = (iterations / timeMs) * 1000
		console.log(`${name}: ${timeMs.toFixed(2)}ms total, ${opsPerSec.toFixed(0)} ops/sec`)
	}

	// Test data
	const simpleData = { a: 1, b: 2, c: "hello", d: true, e: null }
	const arrayData = Array.from({ length: 100 }, (_, i) => i)
	const nestedData = {
		users: Array.from({ length: 10 }, (_, i) => ({
			id: i,
			name: `User ${i}`,
			email: `user${i}@example.com`,
			active: i % 2 === 0,
		})),
		metadata: {
			version: 1,
			timestamp: Date.now(),
		}
	}
	const stringData = "The quick brown fox jumps over the lazy dog. ".repeat(10)
	const typedArrayData = new Uint8Array(Array.from({ length: 1000 }, (_, i) => i % 256))

	console.log("=== $mol_vary Performance Benchmark ===\n")

	// Pack benchmarks
	console.log("Pack operations:")
	benchmark("  Simple object", 10000, () => $mol_vary.pack(simpleData))
	benchmark("  Array (100 items)", 10000, () => $mol_vary.pack(arrayData))
	benchmark("  Nested data", 5000, () => $mol_vary.pack(nestedData))
	benchmark("  String (450 chars)", 10000, () => $mol_vary.pack(stringData))
	benchmark("  Uint8Array (1000 bytes)", 10000, () => $mol_vary.pack(typedArrayData))

	console.log("\nUnpack operations:")
	const simplePacked = $mol_vary.pack(simpleData)
	const arrayPacked = $mol_vary.pack(arrayData)
	const nestedPacked = $mol_vary.pack(nestedData)
	const stringPacked = $mol_vary.pack(stringData)
	const typedArrayPacked = $mol_vary.pack(typedArrayData)

	benchmark("  Simple object", 10000, () => $mol_vary.take(simplePacked))
	benchmark("  Array (100 items)", 10000, () => $mol_vary.take(arrayPacked))
	benchmark("  Nested data", 5000, () => $mol_vary.take(nestedPacked))
	benchmark("  String (450 chars)", 10000, () => $mol_vary.take(stringPacked))
	benchmark("  Uint8Array (1000 bytes)", 10000, () => $mol_vary.take(typedArrayPacked))

	console.log("\nDeduplication test:")
	const repeatedData = Array.from({ length: 100 }, () => "repeated")
	const withoutDedup = repeatedData.join("").length
	const withDedup = $mol_vary.pack(repeatedData).length
	console.log(`  Without dedup: ${withoutDedup} bytes`)
	console.log(`  With dedup: ${withDedup} bytes`)
	console.log(`  Savings: ${((1 - withDedup / withoutDedup) * 100).toFixed(1)}%`)

	console.log("\n=== Benchmark Complete ===")
}
