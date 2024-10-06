namespace $ {
	export let $mol_exec_deadline = 5000

	export type $mol_exec_error_context = {
		timeout?: boolean
		pid?: number
		stdout: Buffer
		stderr: Buffer
		status?: number | null
		signal: NodeJS.Signals | null,
	}

	export class $mol_exec_error extends $mol_error_mix<$mol_exec_error_context> {}

	const child_process = $node['child_process']
	export const $mol_exec_spawn = child_process.spawn.bind(child_process)

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

		const sub = this.$mol_exec_spawn(app, args, {
			shell: true,
			cwd: dir,
			env: this.$mol_env(),
		})

		let timeout = false
		let error = null as null | Error
		let timer: undefined | ReturnType<typeof setTimeout>

		const std_data = [] as Buffer[]
		const error_data = [] as Buffer[]

		const reset = (std_chunk?: Buffer, error_chunk?: Buffer) => {
			if (std_chunk) std_data.push(std_chunk)
			if (error_chunk) error_data.push(error_chunk)

			clearTimeout(timer)

			timer = setTimeout(() => {
				const signal = timeout ? 'SIGKILL' : 'SIGTERM'
				timeout = true
				reset()
				sub.kill(signal)
			}, this.$mol_exec_deadline)
		}

		reset()

		sub.stdout?.on('data', data => reset(data) )
		sub.stderr?.on('data', data => reset(undefined, data) )
		sub.on('error', err => { error = err })

		const promise = new Promise<$mol_exec_error_context>((done, fail) => {
			sub.on('close', (status, signal) => {
				clearTimeout(timer)
				const stderr = Buffer.concat(error_data)
				const stdout = Buffer.concat(std_data)
				const res = { pid: sub.pid, stdout, stderr, status, signal, timeout }
				if (error || status || timeout) return fail( new $mol_exec_error(
					stderr.toString() || stdout.toString() || 'Exec timeout',
					res,
					...error ? [ error ] : []
				) )

				done(res)
			})
		})

		return promise

		return Object.assign(promise, { destructor: () => {
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
