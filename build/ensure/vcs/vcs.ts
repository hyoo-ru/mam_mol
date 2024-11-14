namespace $ {
	export class $mol_build_ensure_vcs extends $mol_object {
		root() { return $mol_file.absolute('') }
		interactive() { return process.stdout.isTTY }
		pull_timeout() { return 120000 }

		root_repo() { return null as null | string }
		vcs_type() { return null as null | string }

		protected inited(path: string) { return false }
		protected init_existing(path: string) { return null }
		protected update(path: string) { return false }
		protected init(path: string) { return null }

		@ $mol_mem_key
		meta( path : string )  {
			return null as $mol_tree2 | null
		}

		@ $mol_mem_key
		protected repo( path : string ) {
			const vcs_type = this.vcs_type()
			if (! vcs_type) return null

			const mod = $mol_file.absolute( path )
			const root_url = this.root_repo()
			if (mod === this.root()) return ! root_url ? null : { url: root_url, branch: null as null | string }

			const parent = mod.parent()
			const mapping = this.meta( parent.path() )

			const url_branch = mapping?.select( 'pack' , mod.name(), vcs_type).kids
				.find($mol_guard_defined)?.kids[0]

			const url = url_branch?.value ?? null
			const branch = url_branch?.kids[0]?.value ?? null

			return url ? { url, branch } : null
		}

		protected update_disabled = false

		@ $mol_action
		protected update_safe(dir: string) {
			if (this.update_disabled) return false

			try {
				return this.$.$mol_file.watch_off(() => this.update(dir), dir)
			} catch (e) {
				if (e instanceof $mol_run_error && e.cause.timeout_kill) {

					this.$.$mol_log3_warn({
						place: `${this}.update_safe()`,
						message: `Timeout - pull disabled`,
						hint: 'Check connection',
					})

					this.update_disabled = true
					return true
				}

				if (e instanceof Error) {
					this.$.$mol_fail_log(e)
					return false
				}

				$mol_fail_hidden(e)
			}
		}

		@ $mol_mem_key
		ensure( path : string ) {
			const mod = $mol_file.absolute( path )

			if( mod.exists()) {
				if (! this.inited(path)) {
					if (! this.repo(path) ) return false

					this.$.$mol_file.watch_off(() => this.init_existing(path), path)
					return true
				}

				this.update_safe( path )

				// mod.reset()
				// for ( const sub of mod.sub() ) sub.reset()

				return true
			}

			if (this.repo(path)) {

				this.$.$mol_file.watch_off(() => this.init(path), path)

				// mod.reset()
				// for ( const sub of mod.sub() ) sub.reset()
				return true
			}

			return false
		}
	}
}
