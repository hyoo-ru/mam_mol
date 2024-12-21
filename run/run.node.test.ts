namespace $ {
	$mol_test( {
		async 'exec timeout auto kill child process'($) {
			let close_mock = () => {}
			const error_message = 'Run error, timeout'

			function mol_run_spawn_sync_mock() {
				return {
					output: [],
					stdout: error_message,
					stderr: '',
					status: 0,
					signal: null,
					pid: 123,
				}
			}

			function mol_run_spawn_mock() {
				return {
					on(name: string, cb: () => void) {
						if (name === 'exit') close_mock = cb
					},
					kill() { close_mock() }
				} as any
			}

			const context_mock = $.$mol_ambient({
				$mol_run_spawn_sync: mol_run_spawn_sync_mock,
				$mol_run_spawn: mol_run_spawn_mock
			})

			class $mol_run_mock extends $mol_run {
				static get $() { return context_mock }
				static override async_enabled() {
					return true
				}
			}

			let message = ''
			try {
				const res = await $mol_wire_async($mol_run_mock).spawn({
					command: 'sleep 10',
					dir: '.',
					timeout: 10,
					env: { 'MOL_RUN_ASYNC': '1' }
				})
			} catch (e) {
				message= (e as Error).message
			}
			$mol_assert_equal(message, error_message)
		}
		
	} )
}
