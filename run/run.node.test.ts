namespace $ {
	$mol_test( {
		async 'exec timeout auto kill child process'($) {
			let close_mock = () => {}

			const context_mock = $.$mol_ambient({
				$mol_run_spawn: () => ({
					on(name: string, cb: () => void) {
						if (name === 'exit') close_mock = cb
					},
					kill() { close_mock() }
				} as any)
			})
			
			let message = ''
			try {
				const res = await $mol_wire_async(context_mock).$mol_run({ command: 'sleep 10', dir: '.', timeout: 10 })
			} catch (e) {
				message= (e as Error).message
			}
			$mol_assert_equal(message, 'Run error, timeout')
		}
		
	} )
}
