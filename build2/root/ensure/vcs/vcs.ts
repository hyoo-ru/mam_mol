namespace $ {

	export class $mol_build2_root_ensure_vcs extends $mol_object2 implements $mol_build2_root_ensure_plugin {

		root(): $mol_build2_root {
			return $mol_fail( new Error( 'root is not set' ) )
		}

		interactive() {
			return process.stdout.isTTY
		}

		pull_timeout() {
			return 120000
		}

		root_repo() {
			return null as null | string
		}

		vcs_type() {
			return null as null | string
		}

		protected inited( _path: string ) {
			return false
		}

		protected init_existing( _path: string ) {
			return null
		}

		protected update( _path: string ) {
			return false
		}

		protected init( _path: string ) {
			return null
		}

		@ $mol_mem_key
		meta( _path: string ) {
			return null as $mol_tree2 | null
		}

		@ $mol_mem_key
		protected repo( path: string ) {

			const vcs_type = this.vcs_type()
			if( !vcs_type ) return null

			const mod = this.$.$mol_file2.absolute( path )
			const root_dir = this.root().dir()
			const root_url = this.root_repo()
			if( mod === root_dir ) return !root_url ? null : { url: root_url, branch: null as null | string }

			const parent = mod.parent()
			const mapping = this.meta( parent.path() )

			const url_branch = mapping?.select( 'pack', mod.name(), vcs_type ).kids
				.find( $mol_guard_defined )?.kids[0]

			const url = url_branch?.value ?? null
			const branch = url_branch?.kids[0]?.value ?? null

			return url ? { url, branch } : null
		}

		protected update_disabled = false
		static ensured = new Set< string >()

		protected pull_disabled() {
			return Boolean( this.$.$mol_env().MAM_PULL_DISABLED )
		}

		@ $mol_action
		protected update_safe( dir: string ) {
			if( this.update_disabled ) return false

			try {
				return this.$.$mol_file2.unwatched( () => this.update( dir ), dir )
			} catch( error ) {
				if( error instanceof $mol_run_error && error.cause.timeout_kill ) {
					this.$.$mol_log3_warn({
						place: `${this}.update_safe()`,
						message: `Timeout - pull disabled`,
						hint: 'Check connection',
					})
					this.update_disabled = true
					return true
				}

				if( error instanceof Error ) {
					this.$.$mol_fail_log( error )
					return false
				}

				$mol_fail_hidden( error )
			}
		}

		@ $mol_mem_key
		ensure( path: string ) {

			const mod = this.$.$mol_file2.absolute( path )
			const ensured_key = mod.path()

			if( mod.exists() ) {
				if( this.pull_disabled() ) return false
				if( $mol_build2_root_ensure_vcs.ensured.has( ensured_key ) ) return true

				if( !this.inited( path ) ) {
					if( !this.repo( path ) ) return false

					this.$.$mol_file2.unwatched( () => this.init_existing( path ), path )
					$mol_build2_root_ensure_vcs.ensured.add( ensured_key )
					return true
				}

				this.update_safe( path )
				$mol_build2_root_ensure_vcs.ensured.add( ensured_key )
				return true
			}

			if( this.repo( path ) ) {
				if( $mol_build2_root_ensure_vcs.ensured.has( ensured_key ) ) return true
				this.$.$mol_file2.unwatched( () => this.init( path ), path )
				$mol_build2_root_ensure_vcs.ensured.add( ensured_key )
				return true
			}

			return false
		}

	}

}
