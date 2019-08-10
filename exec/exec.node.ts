namespace $ {
	export function $mol_exec( dir : string , command : string , ...args : string[] ) {

		let [ app , ... args0 ] = command.split( ' ' )
		args = [ ... args0 , ... args ]

		console.info( `${ $node.path.relative( '' , dir ) }> ${app} ${ args.join( ' ' ) }` )

		var res = $node.child_process.spawnSync(
			app ,
			args,
			{
				cwd : $node.path.resolve( dir ) ,
				shell : true ,
			}
		)
		
		if( res.status || res.error ) return $mol_fail( res.error || new Error( res.stderr ) )
		if( !res.stdout ) res.stdout = ''

		return res
	}
}
