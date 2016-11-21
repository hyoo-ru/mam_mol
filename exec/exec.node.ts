namespace $ {
	export function $mol_exec( dir : string , command : string , ...args : string[] ) {
		
		console.log( `${dir}> ${command} ${args.join( ' ' )}` )
		
		var res = $node.child_process.spawnSync(
			command ,
			args ,
			{ cwd : dir , stdio : [ 'pipe' , process.stdout , 'pipe' ] }
		)
		
		if( res.status ) throw new Error( res.stderr.toString() )
		
		return res
	}
}
