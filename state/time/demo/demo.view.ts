namespace $.$$ {
	const p = Promise.resolve()
	export class $mol_state_time_demo extends $.$mol_state_time_demo {
		some1() {
			console.log('init')
			return p
		}

		@ $mol_mem
		self_count() {
			$mol_state_time.now(1000)
			$mol_wire_sync(this).some1()
			return 'test'
		}

		@ $mol_mem
		status() {
			console.log('status')
			this.self_count()
			return 'bla'
		}
	}
}
