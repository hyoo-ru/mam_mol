function $mol_exec( dir : string , command : string , ...args : string[] ) {
	console.log( `${dir}> ${command} ${args.join(' ')}` )
	var res = $node.child_process.spawnSync( command , args , { cwd : dir , stdio : 'inherit' } )
	if( res.status ) throw res.error
	return res
}
