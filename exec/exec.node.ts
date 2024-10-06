namespace $ {
	export const $mol_exec_deadline = 5000

	export function $mol_exec_async(
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

		const sub = $node['child_process'].spawn(app, args, {
			stdio: 'inherit',
			shell: true,
			cwd: dir,
			env: this.$mol_env(),
		})

		let first = true
		let error = null as null | Error
		let timer: undefined | ReturnType<typeof setTimeout>

		const std_data = [] as Buffer[]
		const error_data = [] as Buffer[]

		const reset = (std_chunk?: Buffer, error_chunk?: Buffer) => {
			if (std_chunk) std_data.push(std_chunk)
			if (error_chunk) error_data.push(error_chunk)

			clearTimeout(timer)

			timer = setTimeout(() => {
				sub.kill(first ? 'SIGTERM' : 'SIGKILL')

				if (first) reset()

				first = false
			}, this.$mol_exec_deadline)
		}

		reset()

		sub.stderr!.on('data', data => reset(data) )
		sub.stdout!.on('data', data => reset(undefined, data) )
		sub.on('error', err => { error = err })

		let destructed = false

		const promise = new Promise<{
			pid?: number
			stdout: Buffer
			stderr: Buffer
			status?: number | null
			signal: NodeJS.Signals | null,
		}>((done, fail) => {
			sub.on('close', (status, signal) => {
				if (destructed) return
				clearTimeout(timer)
				const stderr = Buffer.concat(error_data)
				const stdout = Buffer.concat(std_data)

				if( status || error ) {
					return fail( error || new Error( stderr.toString(), { cause: stdout } ) )
				}
				
				done({
					pid: sub.pid,
					stdout,
					stderr,
					status,
					signal,
				})

			})
		})

		return Object.assign(promise, { destructor: () => {
			destructed = true
			clearTimeout(timer)
			sub.kill('SIGKILL')
		} })
	}

	export function $mol_exec(
		this : $ ,
		dir : string ,
		command : string ,
		...args : string[]
	) {
		return $mol_wire_sync(this).$mol_exec_async( dir, command, ...args )
	}
}
