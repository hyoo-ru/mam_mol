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


	export function $mol_run_async(
		this : $ ,
		{ dir, timeout, command, env, dirty }: $mol_run_options
	) {
		const args_raw = typeof command === 'string' ? command.split( ' ' ) : command
		const [ app, ...args ] = args_raw

		const sub = this.$mol_run_spawn(app, args, {
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

		this.$mol_log3_come({
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

				this.$mol_log3_done({
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

	// export function $mol_run_lock_async( this : $ , options: $mol_run_options ) {
	// 	let spawn_promise: null | undefined | ReturnType<typeof $mol_run_async>

	// 	const promise = (options.dirty ? this.$mol_run_lock.main.lock_async() : Promise.resolve())
	// 		.then(() => spawn_promise === null ? null as unknown as $mol_run_error_context : (spawn_promise = this.$mol_run_async(options)))
	// 		.finally(() => options.dirty ? this.$mol_run_lock.main.unlock() : null)

	// 	return Object.assign(promise, { destructor: () => {
	// 		spawn_promise?.destructor()
	// 		spawn_promise = null
	// 	} })
	// }

	// export function $mol_run( this : $ , options: $mol_run_options ) {
	// 	let result

	// 	if (options.env?.MOL_RUN_SYNC) {
	// 		const args_raw = typeof options.command === 'string' ? options.command.split( ' ' ) : options.command
	// 		const [ app, ...args ] = args_raw
	// 		this.$mol_log3_come({
	// 			place: '$mol_run_sync' ,
	// 			message: 'Run',
	// 			command: args_raw.join(' ') ,
	// 			dir: $node.path.relative( '' , options.dir ) ,
	// 		})
	// 		result = this.$mol_run_spawn_sync(app, args, { shell: true, cwd: options.dir, env: options.env })
	// 		if (result.error) $mol_fail(result.error)
	// 	} else {
	// 		result = $mol_wire_sync(this).$mol_run_lock_async( { ...options, env: options.env ?? this.$mol_env() } )
	// 	}

	// 	return result
	// }

	export function $mol_run( this : $ , options: $mol_run_options ) {
		const locks = this.$mol_run_lock.main
		try {
			if (options.dirty) locks.lock()

			let result
			// const args_raw = typeof options.command === 'string' ? options.command.split( ' ' ) : options.command
			// const [ app, ...args ] = args_raw
			// this.$mol_log3_come({
			// 	place: '$mol_run_sync' ,
			// 	message: 'Run',
			// 	dirty: options.dirty,
			// 	command: args_raw.join(' ') ,
			// 	dir: $node.path.relative( '' , options.dir ) ,
			// })
			// result = this.$mol_run_spawn_sync(app, args, { shell: true, cwd: options.dir, env: options.env })
			// if (result.error) $mol_fail(result.error)

			result = $mol_wire_sync(this).$mol_run_async( { ...options, env: options.env ?? this.$mol_env() } )

			if (options.dirty) locks.unlock()
			return result
		} catch (e) {
			if (options.dirty && ! $mol_promise_like(e)) locks.unlock()
			$mol_fail_hidden(e)
		}
	}

}
