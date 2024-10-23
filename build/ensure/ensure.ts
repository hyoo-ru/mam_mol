namespace $ {
	export class $mol_build_ensure extends $mol_object {
		root() { return $mol_file.absolute('') }

		root_repo() {
			return 'https://github.com/hyoo-ru/mam.git'
		}

		vcs_type() {
			return 'git'
		}

		interactive() { return process.stdout.isTTY }
		timeout_default() { return 120000 }

		@ $mol_mem_key
		meta( path : string ) {

			const decls = [] as $mol_tree2[]

			const pack = $mol_file.absolute( path )
			for( const file of pack.sub() ) {
				if( !/\.meta\.tree$/.test( file.name() ) ) continue
				decls.push( ... this.$.$mol_tree2_from_string( file.text() , file.path() ).kids )
			}
			return this.$.$mol_tree2.list(decls, decls[0]?.span)
		}

		@ $mol_mem_key
		protected repo( path : string ) {
			const mod = $mol_file.absolute( path )
			const parent = mod.parent()
			const mapping = mod === this.root()
				? this.$.$mol_tree2_from_string( `pack ${ mod.name() } ${this.vcs_type()} \\${this.root_repo()}
` )
				: this.meta( parent.path() )

			return mapping.select( 'pack' , mod.name() , this.vcs_type() ).kids.find($mol_guard_defined)?.text()
		}

		protected pull_disabled = false

		@ $mol_action
		protected pull_run(dir: string) {
			return false
		}
	
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

		@ $mol_mem
		ensurer_git() {
			return this.$.$mol_build_ensure_git.make({
				root: () => this.root(),
				timeout_default: () => this.timeout_default(),
				interactive: () => this.interactive(),
			})
		}

		@ $mol_mem
		ensurer_npm() {
			return this.$.$mol_build_ensure_npm.make({
				root: () => this.root(),
			})
		}

		@ $mol_mem_key
		ensure( path : string ) {
			const mod = $mol_file.absolute( path )
			const parent = mod.parent()

			if( mod !== this.root() ) this.ensure( parent.path() )

			if (this.ensurer_git().ensure(path)) return true
	
			if( parent === this.root() ) {
				throw new Error( `Root package "${ mod.relate( this.root() ) }" not found` )
			}

			return this.ensurer_npm().ensure(path)
		}
	}
}
