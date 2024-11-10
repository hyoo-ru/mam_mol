namespace $ {
	export class $mol_build_ensure_git extends $mol_build_ensure_vcs {
		override vcs_type() { return 'git' }
		override root_repo() { return 'https://github.com/hyoo-ru/mam.git' }

		@ $mol_mem
		protected version() {
			$mol_wire_solid()
			return this.$.$mol_run.spawn({ command: 'git version', dir: this.root().path() })
				.stdout.toString().trim().match(/.*\s+([\d\.]+)$/)?.[1] ?? ''
		}

		protected deepen_supported() {
			return $mol_compare_text()(this.version(), '2.42.0') >= 0
		}

		protected override pull_run(dir: string) {
			const out = this.$.$mol_run.spawn({
				command: 'git rev-parse --abbrev-ref --symbolic-full-name HEAD', dir,
			})
			const current_branch = out.stdout.toString().trim()
			// когда не на ветке - не надо пулить, например сборка во время git bisect
			if (! current_branch) return false

			const command = ['git', 'pull']

			if ( ! this.interactive() ) {
				// depth и deepen не годятся для локальной разработки, поэтому оставляем ограничение глубины пула только для CI
				// --depth=1 в сочетании с сабмодулями обрезает историю, кроме первого коммита
				// --deepen=1 в git-конфиге сабмодуля выставляет bare=true, после этого все команды падают с сообщением
				// warning: core.bare and core.worktree do not make sense
				// fatal: unable to set up work tree using invalid config
				command.push( this.deepen_supported() ? '--deepen=1' : '--depth=1' )
			}

			const timeout = this.pull_timeout()
			this.$.$mol_run.spawn( { command, dir, timeout }).stdout.toString().trim()
			return true
		}

		protected is_git(path: string) {
			const mod = this.$.$mol_file.absolute( path )
			const git_dir = mod.resolve( '.git' )

			return git_dir.exists() && git_dir.type() === 'dir'
		}

		@ $mol_mem
		protected submodules() {
			const dir = this.root().path()
			if (! this.is_git( dir ) ) return new Set<string>()

			const command = 'git submodule status --recursive'
			const output = this.$.$mol_run.spawn({ command, dir }).stdout.toString().trim()

			const dirs = output
				.split('\n')
				.map( str => str.match( /^\s*[^ ]+\s+([^ ]*).*/ )?.[1]?.trim() )
				.filter($mol_guard_defined)
				.map(str => `${dir}/${str}`)

			return new Set(dirs)
		}

		protected override inited(path: string) {
			return this.is_git(path) || this.submodules().has(path)
		}

		@ $mol_mem_key
		protected branch_remote(dir: string) {
			const repo = this.repo(dir)
			if (! repo) return 'master'

			const res = this.$.$mol_run.spawn( { command: ['git', 'remote', 'show', repo.url ],  dir } )

			return res.stdout.toString().match( /HEAD branch: (.*?)\n/ )?.[1] ?? 'master'
		}

		protected override init(dir: string) {
			const repo = this.repo(dir)
			if (! repo) throw new Error(`"${dir}" not a repo`)
			const { url, branch } = repo
			this.$.$mol_run.spawn( { command: ['git', 'init'], dir } )

			const branch_norm = branch ?? this.branch_remote(dir)

			this.$.$mol_run.spawn( { command: ['git', 'remote', 'add', '--track', branch_norm, 'origin' , url ], dir } )
			this.$.$mol_run.spawn( { command: [ 'git', 'pull', 'origin', branch_norm ], dir } )
	
			return null
		}

		protected override clone(path: string) {
			const mod = this.$.$mol_file.absolute( path )
			const repo = this.repo(path)
			if (! repo) throw new Error(`"${path}" not a repo`)

			const command = [
				'git', 'clone' , '--depth', '1',
				...( repo.branch ? [ '-b', repo.branch ] : [] ),
				' --single-branch',
				repo.url ,
				mod.relate( this.root() )
			]
	
			const dir = this.root().path()
			this.$.$mol_run.spawn( { command, dir } )
	
			return null
		}

	}
}
