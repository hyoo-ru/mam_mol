namespace $ {

	let tree: $mol_tree2
	let json: any
	let out: NodeJS.WritableStream

	async function measure( label: string, task: ()=> Promise<any> ) {
		console.time( label )
			await task()
		console.timeEnd( label )
	}

	async function run() {

		if( !$node.fs.existsSync( 'mol/tree2/bench/-big.json' ) ) {
			const src = 'https://raw.githubusercontent.com/discoveryjs/json-ext/b1ef3c85ac9e3224159d3747379fc024f80570f7/benchmarks/fixture/medium.json'
			const res = await fetch( src )
			const buf = await res.arrayBuffer()
			$node.fs.writeFileSync( 'mol/tree2/bench/-big.json', Buffer.from( buf ) )
		}

		await measure( 'json <= string <= file', async()=> {
			json = JSON.parse( $node.fs.readFileSync('mol/tree2/bench/-big.json').toString() )
		} )

		await measure( 'json => string => file', async()=> {
			$node.fs.writeFileSync( 'mol/tree2/bench/-big.json', JSON.stringify( json, null, '\t' ) )
		} )

		await measure( 'tree <= json', async()=> {
			tree = $mol_tree2_from_json( json )
		} )

		json = null

		await measure( 'tree => string => file', async()=> {
			$node.fs.writeFileSync( 'mol/tree2/bench/-big.tree', tree.toString() )
		} )

		await measure( 'tree => file stream', async()=> {
			out = $node.fs.createWriteStream('mol/tree2/bench/-big.tree')
			await $mol_tree2_to_stream( tree, out )
			await new Promise( done => out.end( ()=> done( null ) ) )
		} )

		out = null!
		tree = null!

		await measure( 'tree <= string <= file', async()=> {
			tree = $$.$mol_tree2_from_string(
				$node.fs.readFileSync('mol/tree2/bench/-big.tree').toString(),
				'mol/tree2/bench/-big.tree',
			)
		} )

		tree = null!

	}

	if( !/\.test\./.test( process.argv[1] ) ) {
		setTimeout( run )
	}

}
