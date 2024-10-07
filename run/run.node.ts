namespace $ {

	export type $mol_run_error_context = {
		pid?: number
		stdout: Buffer
		stderr: Buffer
		status?: number | null
		signal: NodeJS.Signals | null,
	}

	export class $mol_run_error extends $mol_error_mix<{ timeout?: boolean, signal?: NodeJS.Signals | null}> {}

	const child_process = $node['child_process']
	export const $mol_run_spawn = child_process.spawn.bind(child_process)

	export type $mol_run_options = {
		command : readonly string[] | string,
		dir : string
		timeout?: number
		env?: Record<string, string | undefined>
	}

	export function $mol_run_async(
		this : $ ,
		{ dir, timeout, command, env }: $mol_run_options
	) {
		const args_raw = typeof command === 'string' ? command.split( ' ' ) : command
		const [ app, ...args ] = args_raw

		this.$mol_log3_come({
			place: '$mol_run_async' ,
			dir: $node.path.relative( '' , dir ) ,
			message: 'Run',
			command: args_raw.join(' ') ,
		})

		const sub = this.$mol_run_spawn(app, args, {
			shell: true,
			cwd: dir,
			env
		})

		let killed = false
		let timer: undefined | ReturnType<typeof setTimeout>

		const std_data = [] as Buffer[]
		const error_data = [] as Buffer[]

		const reset = (std_chunk?: Buffer, error_chunk?: Buffer) => {
			if (std_chunk) std_data.push(std_chunk)
			if (error_chunk) error_data.push(error_chunk)
			if (! timeout) return

			clearTimeout(timer)

			timer = setTimeout(() => {
				const signal = killed ? 'SIGKILL' : 'SIGTERM'
				killed = true
				reset()
				sub.kill(signal)
			}, timeout)
		}

		reset()

		sub.stdout?.on('data', data => reset(data) )
		sub.stderr?.on('data', data => reset(undefined, data) )

		const promise = new Promise<$mol_run_error_context>((done, fail) => {
			const close = (error: Error | null, status: number | null = null, signal: NodeJS.Signals | null = null) => {
				if (! timer && timeout) return

				clearTimeout(timer)
				timer = undefined

				const stderr = Buffer.concat(error_data)
				const stdout = Buffer.concat(std_data)

				if (error || status || killed) return fail( new $mol_run_error(
					(stderr.toString() || stdout.toString() || 'Run error') + (killed ? ', timeout' : ''),
					{ signal, timeout: killed },
					...error ? [ error ] : []
				) )

				done({ pid: sub.pid, stdout, stderr, status, signal })
			}
	
			sub.on('disconnect', () => close(new Error('Disconnected')) )
			sub.on('error', err => close(err) )
			sub.on('exit', (status, signal) => close(null, status, signal) )
		})

		return Object.assign(promise, { destructor: () => {
			clearTimeout(timer)
			sub.kill('SIGKILL')
		} })
	}

	export function $mol_run(
		this : $ ,
		options: $mol_run_options
	) {
		if (! options.env) options = { ...options, env: this.$mol_env() }
		return $mol_wire_sync(this).$mol_run_async( options )
	}
}
