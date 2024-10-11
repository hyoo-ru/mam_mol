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
	export const $mol_run_spawn_sync = child_process.spawnSync.bind(child_process)

	export type $mol_run_options = {
		command : readonly string[] | string
		dir : string
		timeout?: number
		affects?: readonly string[]
		env?: Record<string, string | undefined>
	}

	export const $mol_run_affected = {} as Record<string, number | undefined>

	export function $mol_run_async(
		this : $ ,
		{ dir, timeout, command, env, affects }: $mol_run_options
	) {
		const affected = this.$mol_run_affected
		const args_raw = typeof command === 'string' ? command.split( ' ' ) : command
		const [ app, ...args ] = args_raw

		if (! env?.MOL_RUN_ASYNC) {
			this.$mol_log3_come({
				place: '$mol_run_sync' ,
				message: 'Run',
				command: args_raw.join(' ') ,
				dir: $node.path.relative( '' , dir ) ,
			})
			const res = this.$mol_run_spawn_sync(app, args, { shell: true, cwd: dir, env });
			if( res.status ) $mol_fail( new Error( res.stderr.toString() || 'Exit(' + res.status + ')' ) )
			return res
		}

		const sub = this.$mol_run_spawn(app, args, {
			shell: true,
			cwd: dir,
			env
		})

		this.$mol_log3_come({
			place: '$mol_run_async' ,
			pid: sub.pid,
			message: 'Run',
			command: args_raw.join(' ') ,
			dir: $node.path.relative( '' , dir ) ,
		})

		let killed = false
		let timer: undefined | ReturnType<typeof setTimeout>

		const std_data = [] as Buffer[]
		const error_data = [] as Buffer[]

		const add = (std_chunk?: Buffer, error_chunk?: Buffer) => {
			if (std_chunk) std_data.push(std_chunk)
			if (error_chunk) error_data.push(error_chunk)
			if (! timeout) return

			clearTimeout(timer)

			timer = setTimeout(() => {
				const signal = killed ? 'SIGKILL' : 'SIGTERM'
				killed = true
				add()
				sub.kill(signal)
			}, timeout)
		}

		add()

		sub.stdout?.on('data', data => add(data) )
		sub.stderr?.on('data', data => add(undefined, data) )

		affects?.forEach(path => affected[path] = (affected[path] ?? 0) + 1)

		const promise = new Promise<$mol_run_error_context>((done, fail) => {
			const close = (error: Error | null, status: number | null = null, signal: NodeJS.Signals | null = null) => {
				for (const path of affects ?? []) {
					if (! --affected[path]! ) delete affected[path]
				}
				if (! timer && timeout) return

				clearTimeout(timer)
				timer = undefined

				const res = {
					pid: sub.pid,
					status,
					signal,
					get stdout() { return Buffer.concat(std_data) },
					get stderr() { return Buffer.concat(error_data) }
				}

				this.$mol_log3_done({
					place: '$mol_run_async' ,
					pid: sub.pid,
					message: 'Run',
					status,
					command: args_raw.join(' ') ,
					dir: $node.path.relative( '' , dir ) ,
				})
		
				if (error || status || killed) return fail( new $mol_run_error(
					(res.stderr.toString() || res.stdout.toString() || 'Run error') + (killed ? ', timeout' : ''),
					{ signal, timeout: killed },
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
		options: $mol_run_options
	) {
		if (! options.env) options = { ...options, env: this.$mol_env() }
		return $mol_wire_sync(this).$mol_run_async( options )
	}
}
