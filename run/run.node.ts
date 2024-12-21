namespace $ {

	export type $mol_run_error_context = {
		pid?: number
		stdout: Buffer | string
		stderr: Buffer | string
	}

	export class $mol_run_error extends $mol_error_mix<{
		timeout_kill?: boolean
		pid?: number
		signal?: NodeJS.Signals | null
		status?: number | null
		command: string
		dir: string
	}> {}

	export const $mol_run_spawn = (
		...args: Parameters<typeof $node['child_process']['spawn']>
	) => $node['child_process'].spawn(...args)

	export const $mol_run_spawn_sync = (
		...args: Parameters<typeof $node['child_process']['spawnSync']>
	) => $node['child_process'].spawnSync(...args)

	export type $mol_run_options = {
		command : readonly string[] | string
		dir : string
		timeout?: number
		env?: Record<string, string | undefined>
	}

	export class $mol_run extends $mol_object {

		static async_enabled() {
			return Boolean(this.$.$mol_env()['MOL_RUN_ASYNC'])
		}

		static spawn(options: $mol_run_options) {
			const sync = ! this.async_enabled() || ! Boolean($mol_wire_auto())
			const env = options.env ?? this.$.$mol_env()

			return $mol_wire_sync(this).spawn_async( { ...options, sync, env } )
		}

		static spawn_async(
			{ dir, sync, timeout, command, env }: $mol_run_options & { sync?: boolean }
		) {
			const args_raw = typeof command === 'string' ? command.split( ' ' ) : command
			const [ app, ...args ] = args_raw
			const opts = { shell: true, cwd: dir, env }

			const log_object = {
				place: `${this}.spawn()`,
				message: 'Run',
				command: args_raw.join(' ') ,
				dir: $node.path.relative( '' , dir ) ,
			}

			if (sync) {

				this.$.$mol_log3_come({
					hint: 'Run inside fiber',
					...log_object
				})

				let error: Error | undefined
				let res

				try {
					res = this.$.$mol_run_spawn_sync(app, args, opts)
					error = res.error
				} catch (err) {
					error = err as Error
				}

				if (! res || error || res.status) {
					throw new $mol_run_error(
						this.error_message(res),
						{ ...log_object, status: res?.status, signal: res?.signal },
						...(error ? [error] : [])
					)
				}

				return res
			}

			let sub

			try {
				sub = this.$.$mol_run_spawn(app, args, {
					...opts,
					stdio: [ 'pipe', 'inherit', 'inherit' ],
				})
			} catch (error) {
				throw new $mol_run_error(
					this.error_message(undefined),
					log_object,
					error as Error
				)
			}
	
			const pid = sub.pid ?? 0

			this.$.$mol_log3_come({
				...log_object,
				pid,
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
						pid,
						signal,
						get stdout() { return Buffer.concat(std_data) },
						get stderr() { return Buffer.concat(error_data) }
					}
		
					if (error || status || timeout_kill) return fail( new $mol_run_error(
						this.error_message(res) + (timeout_kill ? ', timeout' : ''),
						{ ...log_object, pid, status, signal, timeout_kill },
						...error ? [ error ] : []
					) )

					this.$.$mol_log3_done({
						...log_object,
						pid,
					})
			
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

		static error_message(res?: $mol_run_error_context) {
			return res?.stderr.toString() || res?.stdout.toString() || 'Run error'
		}
	}

}
