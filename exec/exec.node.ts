namespace $ {
	export function $mol_exec( dir : string , command : string , ...args : string[] ) {

		let [ app , ... args0 ] = command.split( ' ' )
		
		var res = $node.child_process.spawnSync(
			app ,
			[ ... args0 , ... args ] ,
			{ cwd : dir }
		)
		
		if( res.status ) throw new Error( `${dir}> ${command} ${args.join( ' ' )}\n ${ res.stderr }` )
		
		return res
	}
}
