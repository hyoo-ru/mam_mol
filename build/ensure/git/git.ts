namespace $ {
	export class $mol_build_ensure_git extends $mol_build_ensure_vcs {
		override vcs_type() { return 'git' }
		override root_repo() { return 'https://github.com/hyoo-ru/mam.git' }

		@ $mol_mem
		protected version() {
			$mol_wire_solid()
			return this.$.$mol_run.spawn({ command: 'git version', dir: this.root().path() })
				.stdout.toString().trim().match(/.*\s+([\d\.]+\d+)/)?.[1] ?? ''
		}

		protected deepen_supported() {
			return $mol_compare_text()(this.version(), '2.42.0') >= 0
		}

		protected override update(dir: string) {
			if (this.submodules().has(dir)) {
				this.$.$mol_log3_rise({
					place: '$mol_build_ensure_git.update()',
					message: 'Submodule detected, no git pull',
					dir,
				})
				return false
			}

			const out = this.$.$mol_run.spawn({
				command: 'git rev-parse --abbrev-ref --symbolic-full-name HEAD', dir,
			})
			const current_branch = out.stdout.toString().trim()
			// когда не на ветке - не надо пулить, например сборка во время git bisect
			if (! current_branch) return false

			const command = ['git', 'pull']

			if ( ! this.interactive() && this.deepen_supported()) {
				/**
				depth и deepen не годятся для локальной разработки, поэтому оставляем ограничение глубины пула только для CI

				--depth=1 в сочетании с сабмодулями обрезает историю, кроме первого коммита

				--deepen=1 если не сделать unset GIT_DIR
				в git-конфиге сабмодуля выставляет bare=true, после этого все команды падают с сообщением
				warning: core.bare and core.worktree do not make sense
				fatal: unable to set up work tree using invalid config
				 */
				command.push( '--deepen=1' )
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

		@ $mol_action
		protected submodule_dirs(opts: { dir: string, recursive?: boolean }) {
			const dir = this.$.$mol_file.absolute( opts.dir )

			const output = this.$.$mol_run.spawn({
				command: [ 'git', 'submodule', 'status', ...( opts.recursive ? ['--recursive'] : [] ) ],
				dir: dir.path(),
			}).stdout.toString().trim()

			const dirs = output
				.split('\n')
				.map( str => str.match( /^\s*[^ ]+\s+([^ ]*).*/ )?.[1]?.trim() )
				.filter($mol_guard_defined)
				.map(subdir => dir.resolve(subdir))

			return dirs
		}

		@ $mol_mem
		protected root_is_submodule() {
			const root = this.root()
			if (this.is_git(root.path())) return false

			const parent = root.parent()

			try {
				const dirs = this.submodule_dirs({ dir: parent.path() })

				return dirs.includes(root)
			} catch (e) {
				if ($mol_promise_like(e)) $mol_fail_hidden(e)
				this.$.$mol_fail_log(e)
				return false
			}
		}

		@ $mol_mem
		protected submodules() {
			const root = this.root()
			if (! this.is_git( root.path() ) ) return new Set<string>()

			const dirs = this.submodule_dirs({ dir: root.path(), recursive: true })

			if (this.root_is_submodule()) dirs.push(root)

			return new Set(dirs.map(mod => mod.path()))
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

		protected override init_existing(dir: string) {
			const repo = this.repo(dir)
			if (! repo) throw new Error(`"${dir}" not a repo`)
			const { url, branch } = repo
			this.$.$mol_run.spawn( { command: ['git', 'init'], dir } )

			const branch_norm = branch ?? this.branch_remote(dir)

			this.$.$mol_run.spawn( { command: [ 'git', 'remote', 'add', '--track', branch_norm, 'origin' , url ], dir } )
			this.$.$mol_run.spawn( { command: [ 'git', 'pull', 'origin', branch_norm ], dir } )

			return null
		}

		protected override init(path: string) {
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
