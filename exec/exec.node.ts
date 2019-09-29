namespace $ {
	export function $mol_exec( dir : string , command : string , ...args : string[] ) {

		let [ app , ... args0 ] = command.split( ' ' )
		args = [ ... args0 , ... args ]

		console.info( `${ $node.chalk.gray( $node.path.relative( '' , dir ) ) }> ${ $node.chalk.blue( app ) } ${ $node.chalk.cyan( args.join( ' ' ) ) }` )

		var res = $node['child_process'].spawnSync(
			app ,
			args,
			{
				cwd : $node.path.resolve( dir ) ,
				shell : true ,
			}
		)
		
		if( res.status || res.error ) return $mol_fail( res.error || new Error( res.stderr.toString() ) )
		if( !res.stdout ) res.stdout = new Buffer('')

		return res
	}
}
