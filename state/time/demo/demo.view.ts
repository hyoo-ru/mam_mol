namespace $.$$ {
	const p = Promise.resolve()
	export class $mol_state_time_demo extends $.$mol_state_time_demo {
		some1() {
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
			this.self_count()
			return 'bla'
		}

		@ $mol_mem
		status2() {
			console.log('status2')
			this.status()
			return 'bla2'
		}
	}
}
