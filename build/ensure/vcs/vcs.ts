namespace $ {
	export class $mol_build_ensure_vcs extends $mol_object {
		root() { return $mol_file.absolute('') }
		interactive() { return process.stdout.isTTY }
		pull_timeout() { return 120000 }

		root_repo() { return null as null | string }
		vcs_type() { return null as null | string }

		protected pull_run(path: string) { return false }
		protected inited(path: string) { return false }
		protected init(path: string) { return null }
		protected clone(path: string) { return null }

		@ $mol_mem_key
		meta( path : string )  {
			return null as $mol_tree2 | null
		}

		@ $mol_mem_key
		protected repo( path : string ) {
			const vcs_type = this.vcs_type()
			if (! vcs_type) return null

			const mod = $mol_file.absolute( path )
			if (mod === this.root()) return this.root_repo()

			const parent = mod.parent()
			const mapping = this.meta( parent.path() )

			const repo = mapping?.select( 'pack' , mod.name(), vcs_type).kids
				.find($mol_guard_defined)?.text() ?? null

			return repo
		}

		protected pull_disabled = false

		@ $mol_action
		protected pull(dir: string) {
			if (this.pull_disabled) return false

			try {
				return this.pull_run(dir)
				// mod.reset()
				// for ( const sub of mod.sub() ) sub.reset()
			} catch (e) {
				if (e instanceof $mol_run_error && e.cause.timeout_kill) {
					this.pull_disabled = true

					this.$.$mol_log3_warn({
						place: `${this}.pull()`,
						message: `Timeout - pull disabled`,
						hint: 'Check connection',
					})

					return true
				}

				if (e instanceof Error) {
					this.$.$mol_fail_log(e)
					return
				}

				$mol_fail_hidden(e)
			}
		}

		@ $mol_mem_key
		ensure( path : string ) {
			const mod = $mol_file.absolute( path )

			if( mod.exists()) {
				if( mod.type() !== 'dir' ) return true

				if (! this.inited(path)) {
					if (! this.repo(path) ) return true
					this.init(path)
				}
				this.pull( path )

				return true
			}

			if( this.repo(path) ) {
				this.clone(path)
				// mod.reset()
				return true
			}
			return false
		}
	}
}
