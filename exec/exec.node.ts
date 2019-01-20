namespace $ {
	export function $mol_exec( dir : string , command : string , ...args : string[] ) {
		
		var res = $node.child_process.spawnSync(
			command ,
			args ,
			{ cwd : dir , stdio : [ 'pipe' , process.stdout , 'pipe' ] }
		)
		
		if( res.status ) throw new Error( `${dir}> ${command} ${args.join( ' ' )}\n ${ res.stderr }` )
		
		return res
	}
}
