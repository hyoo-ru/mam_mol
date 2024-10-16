namespace $ {

	export type $mol_run_error_context = {
		pid?: number
		stdout: Buffer
		stderr: Buffer
		status?: number | null
		signal: NodeJS.Signals | null,
	}

	export class $mol_run_error extends $mol_error_mix<{
		timeout_kill?: boolean
		signal?: NodeJS.Signals | null
		status: number | null
		command: string
		dir: string
	}> {}

	const child_process = $node['child_process']
	export const $mol_run_spawn = child_process.spawn.bind(child_process)
	export const $mol_run_spawn_sync = child_process.spawnSync.bind(child_process)

	export type $mol_run_options = {
		command : readonly string[] | string
		dir : string
		timeout?: number
		dirty?: boolean
		env?: Record<string, string | undefined>
	}

	export class $mol_run extends $mol_object {

		protected static lock = new $mol_run_lock

		static grab() { return this.lock.grab() }

		@ $mol_action
		static spawn(options: $mol_run_options) {
			const unlock = options.dirty ? this.grab() : null
			const result = $mol_wire_sync(this).spawn_async( { ...options, env: options.env ?? this.$.$mol_env() } )
			unlock?.()
			return result
		}

		static spawn_async(
			{ dir, timeout, command, env, dirty }: $mol_run_options
		) {
			const args_raw = typeof command === 'string' ? command.split( ' ' ) : command
			const [ app, ...args ] = args_raw
	
			const sub = this.$.$mol_run_spawn(app, args, {
				shell: true,
				cwd: dir,
				env
			})
	
			const log_object = {
				dirty,
				pid: sub.pid,
				command: args_raw.join(' ') ,
				dir: $node.path.relative( '' , dir ) ,
			}
	
			this.$.$mol_log3_come({
				place: '$mol_run_async',
				message: 'Run',
				...log_object
			})
	
			let timeout_kill = false
			let timer: undefined | ReturnType<typeof setTimeout>
	
			const std_data = [] as Buffer[]
			const error_data = [] as Buffer[]
	
			const add = (std_chunk?: Buffer, error_chunk?: Buffer) => {
				if (std_chunk) std_data.push(std_chunk)
				if (error_chunk) error_data.push(error_chunk)
				if (! timeout) return
	
				clearTimeout(timer)
	
				timer = setTimeout(() => {
					const signal = timeout_kill ? 'SIGKILL' : 'SIGTERM'
					timeout_kill = true
					add()
					sub.kill(signal)
				}, timeout)
			}
	
			add()
	
			sub.stdout?.on('data', data => add(data) )
			sub.stderr?.on('data', data => add(undefined, data) )
	
			const result_promise = new Promise<$mol_run_error_context>((done, fail) => {
				const close = (error: Error | null, status: number | null = null, signal: NodeJS.Signals | null = null) => {
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
	
					this.$.$mol_log3_done({
						place: '$mol_run_async',
						message: 'Run',
						...log_object,
						signal,
						timeout_kill,
						status,
					})
	
					if (error || status || timeout_kill) return fail( new $mol_run_error(
						(res.stderr.toString() || res.stdout.toString() || 'Run error') + (timeout_kill ? ', timeout' : ''),
						{ ...log_object, status, signal, timeout_kill },
						...error ? [ error ] : []
					) )
	
					done(res)
				}
	
				sub.on('disconnect', () => close(new Error('Disconnected')) )
				sub.on('error', err => close(err) )
				sub.on('exit', (status, signal) => close(null, status, signal) )
			})
	
			return Object.assign(result_promise, { destructor: () => {
				clearTimeout(timer)
				sub.kill('SIGKILL')
			} })
		}
	}

}
