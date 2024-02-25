namespace $ {
	export function $mol_exec(
		this : $ ,
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
				env: this.$mol_env(),
			}
		)
		
		if( res.status || res.error ) {
			return $mol_fail( res.error || new Error( res.stderr.toString(), { cause: res.stdout } ) )
		}
		
		if( !res.stdout ) res.stdout = Buffer.from([])

		return res
	}
}
