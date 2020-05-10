namespace $ {
	export function $mol_exec(
		this : $mol_ambient_context ,
		dir : string ,
		command : string ,
		...args : string[]
	) {

		let [ app , ... args0 ] = command.split( ' ' )
		args = [ ... args0 , ... args ]

		this.$mol_log3_come({
			place: '$mol_exec' ,
			dir: $node.path.relative( '' , dir ) ,
			message: 'Run',
			command: `${app} ${ args.join(' ') }` ,
		})

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
