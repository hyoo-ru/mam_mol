namespace $ {

	let tree: $mol_tree2
	let json: any
	let out: NodeJS.WritableStream

	async function run() {

		const src = 'https://raw.githubusercontent.com/discoveryjs/json-ext/b1ef3c85ac9e3224159d3747379fc024f80570f7/benchmarks/fixture/medium.json'
		const res = await $node['node-fetch'].default( src )
		const buf = await res.arrayBuffer()
		$node.fs.writeFileSync( 'mol/tree2/bench/-big.json', Buffer.from( buf ) )

		console.time('json <= JSON.parse <= file')
			json = JSON.parse( $node.fs.readFileSync('mol/tree2/bench/-big.json').toString() )
		console.timeEnd('json <= JSON.parse <= file')

		console.time('json => JSON.stringify => file')
			$node.fs.writeFileSync( 'mol/tree2/bench/-big.json', JSON.stringify( json, null, '\t' ) )
		console.timeEnd('json => JSON.stringify => file')

		console.time('tree <= json')
			let tree = $mol_tree2_from_json( json )
		console.timeEnd('tree <= json')
		json = null

		console.time('tree => string => file')
			$node.fs.writeFileSync( 'mol/tree2/bench/-big.tree', tree.toString() )
		console.timeEnd('tree => string => file')

		console.time('tree => file stream')
			// $node.fs.writeFileSync( 'mol/tree2/bench/-big.tree', tree.toString() )
			out = $node.fs.createWriteStream('mol/tree2/bench/-big.tree')
			await $mol_tree2_to_stream( tree, out )
			await new Promise( done => out.end( ()=> done( null ) ) )
		console.timeEnd('tree => file stream')
		out = null!
		tree = null!

		console.time('tree <= string <= file')
			tree = $$.$mol_tree2_from_string(
				$node.fs.readFileSync('mol/tree2/bench/-big.tree').toString(),
				$mol_span.begin( 'mol/tree2/bench/-big.tree' ),
			)
		console.timeEnd('tree <= string <= file')
		tree = null!

	}

	if( !/\.test\./.test( process.argv[1] ) ) {
		setTimeout( run )
	}

}
