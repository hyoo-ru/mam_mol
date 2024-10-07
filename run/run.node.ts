namespace $ {

	export type $mol_run_error_context = {
		timeout?: boolean
		pid?: number
		stdout: Buffer
		stderr: Buffer
		status?: number | null
		signal: NodeJS.Signals | null,
	}

	export class $mol_run_error extends $mol_error_mix<$mol_run_error_context> {}

	const child_process = $node['child_process']
	export const $mol_run_spawn = child_process.spawn.bind(child_process)

	export type $mol_run_options = {
		cwd ?: string
		timeout?: number
	}

	export function $mol_run_async(
		this : $ ,
		command_args: readonly string[] | string,
		opts?: $mol_run_options
	) {
		const args_raw = typeof command_args === 'string' ? command_args.split( ' ' ) : command_args
		const [ app, ...args ] = args_raw

		const timeout = opts?.timeout ?? null
		const cwd = opts?.cwd ?? '.'

		this.$mol_log3_come({
			place: '$mol_run_async' ,
			cwd: $node.path.relative( '' , cwd ) ,
			message: 'Run',
			command: app ,
			args: args.join(' ')
		})

		const sub = this.$mol_run_spawn(app, args, {
			shell: true,
			cwd,
			env: this.$mol_env(),
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
				const res = { pid: sub.pid, stdout, stderr, status, signal, timeout: killed }

				if (error || status || killed) return fail( new $mol_run_error(
					stderr.toString() || stdout.toString() || 'Exec timeout',
					res,
					...error ? [ error ] : []
				) )

				done(res)
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
		command_args: readonly string[] | string,
		options?: $mol_run_options
	) {
		return $mol_wire_sync(this).$mol_run_async( command_args, options )
	}
}
