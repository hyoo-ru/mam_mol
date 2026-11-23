namespace $ {

	export class $mol_build2_root_ensure_git extends $mol_build2_root_ensure_vcs {

		override vcs_type() {
			return 'git'
		}

		override root_repo() {
			return 'https://github.com/hyoo-ru/mam.git'
		}

		@ $mol_mem
		protected version() {
			$mol_wire_solid()
			return this.$.$mol_run.spawn({
				command: 'git version',
				dir: this.root().dir().path(),
			}).stdout.toString().trim().match( /.*\s+([\d.]+\d+)/ )?.[1] ?? ''
		}

		protected deepen_supported() {
			return $mol_compare_text()( this.version(), '2.42.0' ) >= 0
		}

		protected override update( dir: string ) {
			if( this.submodules().has( dir ) ) {
				this.$.$mol_log3_rise({
					place: `${this}.update()`,
					message: 'Submodule detected, no git pull',
					dir,
				})
				return false
			}

			const out = this.$.$mol_run.spawn({
				command: 'git rev-parse --abbrev-ref --symbolic-full-name HEAD',
				dir,
			})
			const current_branch = out.stdout.toString().trim()
			if( !current_branch ) return false

			const command = [ 'git', 'pull' ]

			if( !this.interactive() && this.deepen_supported() ) {
				command.push( '--deepen=1' )
			}

			this.$.$mol_run.spawn({ command, dir, timeout: this.pull_timeout() }).stdout.toString().trim()
			return true
		}

		protected is_git( path: string ) {
			const mod = this.$.$mol_file2.absolute( path )
			const git_dir = mod.resolve( '.git' )
			return git_dir.exists() && git_dir.type() === 'dir'
		}

		@ $mol_action
		protected submodule_dirs( opts: { dir: string, recursive?: boolean } ) {
			const dir = this.$.$mol_file2.absolute( opts.dir )

			try {
				const output = this.$.$mol_run.spawn({
					command: [ 'git', 'submodule', 'status', ...( opts.recursive ? [ '--recursive' ] : [] ) ],
					dir: dir.path(),
				}).stdout.toString().trim()

				return output
					.split( '\n' )
					.map( str => str.match( /^\s*[^ ]+\s+([^ ]*).*/ )?.[1]?.trim() )
					.filter( $mol_guard_defined )
					.map( subdir => dir.resolve( subdir ) )
			} catch( error ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				this.$.$mol_fail_log( error )
				return []
			}
		}

		@ $mol_mem
		protected root_is_submodule() {
			const root_dir = this.root().dir()
			if( this.is_git( root_dir.path() ) ) return false

			const parent = root_dir.parent()

			try {
				return this.submodule_dirs({ dir: parent.path() }).includes( root_dir )
			} catch( error ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				this.$.$mol_fail_log( error )
				return false
			}
		}

		@ $mol_mem
		protected submodules() {
			const root_dir = this.root().dir()
			if( !this.is_git( root_dir.path() ) ) return new Set<string>()

			const dirs = this.submodule_dirs({ dir: root_dir.path(), recursive: true })
			if( this.root_is_submodule() ) dirs.push( root_dir )

			return new Set( dirs.map( mod => mod.path() ) )
		}

		protected override inited( path: string ) {
			return this.is_git( path ) || this.submodules().has( path )
		}

		protected repo_ensured( dir: string ) {
			const repo = this.repo( dir )
			if( !repo ) throw new Error( `"${ dir }" not a repo` )
			return repo
		}

		@ $mol_mem_key
		protected branch_remote( dir: string ) {
			const repo = this.repo_ensured( dir )
			const res = this.$.$mol_run.spawn({ command: [ 'git', 'remote', 'show', repo.url ], dir })
			return res.stdout.toString().match( /HEAD branch: (.*?)\n/ )?.[1] ?? 'master'
		}

		protected override init_existing( dir: string ) {
			const repo = this.repo_ensured( dir )
			const { url, branch } = repo

			this.$.$mol_run.spawn({ command: [ 'git', 'init' ], dir })

			const branch_norm = branch ?? this.branch_remote( dir )
			this.$.$mol_run.spawn({ command: [ 'git', 'remote', 'add', '--track', branch_norm, 'origin', url ], dir })
			this.$.$mol_run.spawn({ command: [ 'git', 'pull', 'origin', branch_norm ], dir })

			return null
		}

		protected override init( path: string ) {
			const mod = this.$.$mol_file2.absolute( path )
			const repo = this.repo_ensured( path )

			const command = [
				'git', 'clone', '--depth', '1',
				...( repo.branch ? [ '-b', repo.branch ] : [] ),
				'--single-branch',
				repo.url,
				mod.relate( this.root().dir() ),
			]

			this.$.$mol_run.spawn({
				command,
				dir: this.root().dir().path(),
			})

			return null
		}

	}

}
