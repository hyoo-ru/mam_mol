namespace $ {
	$mol_test( {
		async 'git version'($) {
			let close_mock = () => {}

			const context_mock = $.$mol_ambient({
				$mol_exec_deadline: 100,
				$mol_exec_spawn: () => ({
					on(name: string, cb: () => void) {
						if (name === 'exit') close_mock = cb
					},
					kill() { close_mock() }
				} as any)
			})
			
			let message = ''
			try {
				const res = await $mol_wire_async(context_mock).$mol_exec('.', 'sleep', '10')
			} catch (e) {
				message= (e as Error).message
			}
			$mol_assert_equal(message, 'Exec timeout')
		}
		
	} )
}
