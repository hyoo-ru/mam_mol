namespace $ {
	$mol_test( {
		'git version'($) {
			let close_cb = () => {}

			const context_mock = $.$mol_ambient({
				$mol_exec_deadline: 100,
				$mol_exec_spawn: () => ({
					on(name: string, cb: () => void) {
						if (name === 'close') close_cb = cb
					},
					kill() {
						console.log('killed')
						close_cb()
					}
				} as any)
			})

			$mol_assert_fail(() => {
				context_mock.$mol_exec('.', 'sleep', '10')
			}, 'Exec timeout')
		}
		
	} )
}
