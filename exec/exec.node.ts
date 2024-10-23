namespace $ {

	export function $mol_exec(
		this : $ ,
		dir : string ,
		command : string ,
		...args : readonly string[]
	) {
		return this.$mol_run.spawn( { command: [ command, ...args ], dir } )
	}
}
