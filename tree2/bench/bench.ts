namespace $ {

	let tree: $mol_tree2
	let json: any
	let out: NodeJS.WritableStream

	async function run() {

		const src = 'https://raw.githubusercontent.com/discoveryjs/json-ext/b1ef3c85ac9e3224159d3747379fc024f80570f7/benchmarks/fixture/medium.json'
		const res = await $node['node-fetch'].default( src )
		const buf = await res.arrayBuffer()
		$node.fs.writeFileSync( 'mol/tree2/bench/-big.json', Buffer.from( buf ) )

		console.time('JSON.parse')
			json = JSON.parse( $node.fs.readFileSync('mol/tree2/bench/-big.json').toString() )
		console.timeEnd('JSON.parse')

		console.time('JSON => tree')
			let tree = $mol_tree2_from_json( json )
		console.timeEnd('JSON => tree')
		json = null

		console.time('tree dump')
			out = $node.fs.createWriteStream('mol/tree2/bench/-big.tree')
			await $mol_tree2_to_stream( tree, out )
			await new Promise( done => out.end( ()=> done( null ) ) )
		console.timeEnd('tree dump')
		out = null!
		tree = null!

		console.time('tree parse')
			tree = $$.$mol_tree2_from_string(
				$node.fs.readFileSync('mol/tree2/bench/-big.tree').toString(),
				$mol_span.begin( 'mol/tree2/bench/-big.tree' ),
			)
		console.timeEnd('tree parse')
		tree = null!

	}

	if( !/\.test\./.test( process.argv[1] ) ) {
		setTimeout( run )
	}

}
