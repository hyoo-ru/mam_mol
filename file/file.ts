namespace $ {

	export type $mol_file_type = 'file' | 'dir' | 'link'

	export interface $mol_file_stat {
		type: $mol_file_type
		size: number
		atime: Date
		mtime: Date
		ctime: Date
	}

	// export class $mol_file_not_found extends Error {}

	export class $mol_file extends $mol_object {
		
		@ $mol_mem_key
		static absolute( path : string ) {
			return this.make({
				path : $mol_const( path )
			})
		}

		static relative( path : string ) : $mol_file {
			throw new Error( 'Not implemented yet' )
		}
		
		static base = ''
		
		path() {
			return '.'
		}
		
		parent() {
			return this.resolve( '..' )
		}

		@ $mol_mem
		stat(next? : $mol_file_stat | null, virt?: 'virt') {

			const path = this.path()
			const parent = this.parent()
			parent.watcher()

			// Отслеживать проверку наличия родительской папки не стоит до корня диска
			// Лучше ограничить mam-ом
			const root = this.$.$mol_file.watch_root ?? this
			if ( this !== root ) {
				// Если родитель удалился, надо ресетнуть все дочерние на любой глубине
				// Родитель может удалиться, потом создасться, а дочерняя папка только удалиться.
				// Поэтому parent.exists() не запустит перевычисления
				// parent.version() меняется не только при удалении, будет ложное срабатывание
				// события вотчера addDir сбрасывает только parent.sub(), а parent.version() может остаться та же
				// тогда дочерний не перзапустится
				// Если addDir будет сбрасывать parent.version(), то будет лишний раз перевычислен parent, хоть и он сам не поменялся
				parent.version()
				// parent.sub_version()
			}

			if( virt ) return next ?? null
			
			return next ?? this.info(path)
		}

		protected static changed = new Set<$mol_file>
		protected static added = new Set<$mol_file>

		protected static frame = null as null | $mol_after_timeout

		protected static changed_add(type: 'addDir' | 'unlinkDir' | 'add' | 'change' | 'unlink', path: string) {
			const file = this.$.$mol_file.relative( path.at(-1) === '/' ? path.slice(0, -1) : path )

			if (type === 'add') {
				// добавился файл - у parent надо обновить список sub, если он был заюзан
				this.added.add(file)
			}

			if (type === 'change' || type === 'unlink') {
				// обновился или удалился файл - ресетим
				this.changed.add(file)
			}

			if ( type === 'addDir' ) {
				// добавилась папка, у parent обновляем список директорий в sub
				// дочерние ресетим
				// версию папки не меняем, т.к. иначе выполнится логика, связанная
				this.added.add(file)
			}

			if ( type === 'unlinkDir') {
				// удалилась папка, ресетим ее
				// stat у всех дочерних обновится сам, т.к. связан с parent.version()
				this.changed.add(file)
			}

			if (! this.watching) return

			this.frame?.destructor()
			this.frame = new this.$.$mol_after_timeout(500, () => {
				if (! this.watching) return
				this.watching = false
				$mol_wire_async(this).flush()
			} )
		}

		@ $mol_mem
		static flush_counter(reset?: null): number {
			return 1 + ( $mol_wire_probe(() => this.flush_counter()) ?? 0 )
		}

		@ $mol_mem
		static flusher() {
			try {
				// this.flush()
			} catch (e) {
				this.$.$mol_fail_log(e)
			}
		}

		@ $mol_action
		static flush() {
			// this.flush_counter()
			// Пока flush работает, вотчер сюда не заходит, но может добавлять новые изменения
			// на каждом перезапуске они применятся
			// Пока run выполняется, изменения накапливаются, в конце run вызывается flush
			// Пока применяются изменения, run должен ожидать конца flush

			for (const file of this.added) {
				const parent = file.parent()
				if ($mol_wire_probe(() => parent.sub())) parent.sub(null)
				file.reset()
				// file.sub_version(null)
			}

			this.changed.forEach(file => file.reset())

			this.added.clear()
			this.changed.clear()

			// Выставляем обратно в true, что б watch мог зайти сюда
			this.watching = true
		}

		@ $mol_mem
		protected sub_version(reset?: null): number {
			return 1 + ( $mol_wire_probe(() => this.sub_version()) ?? 0 )
		}

		protected static watching = true

		// @ $mol_action
		static watch_off<Result>(cb: () => Result, path: string) {
			try {
				this.watching = false
				const result = cb()
				// this.flush_counter(null)
				// watch запаздывает и событие может прилететь через 3 сек после окончания git pull
				this.$.$mol_file.absolute(path).reset()
				this.flush()
				return result
			} catch (e) {
				if ( ! $mol_promise_like(e) ) this.flush()
				$mol_fail_hidden(e)
			}
		}

		reset() {
			this.stat( null )
		}

		@ $mol_mem
		modified() { return this.stat()?.mtime ?? null }

		@ $mol_mem
		version() {
			return this.modified()?.getTime().toString( 36 ).toUpperCase() ?? ''
		}

		protected info( path: string ) { return null as null | $mol_file_stat }
		protected ensure() {}
		protected drop() {}
		protected copy(to: string) {}

		@ $mol_mem_key
		clone(to: string) {
			if (! this.exists() ) return null

			const target = this.$.$mol_file.absolute(to)

			try {
				this.version()
				target.parent().exists(true)
				this.copy(to)
				target.reset()
				return target
			} catch (error) {
				if ( $mol_fail_catch(error)) {
					console.error(error)
				}
			}
			return null
		}

		protected static watch_root = null as null | $mol_file

		static root( path: string) {
			this.watch_root = this.absolute( path )
			return this.watch_root
		}


		watcher() {
			console.warn('$mol_file_web.watcher() not implemented')

			return {
				destructor() {}
			}
		}
		
		@ $mol_mem
		exists( next? : boolean ) {
			
			const exists = Boolean( this.stat() )

			if( next === undefined ) return exists
			if( next === exists ) return exists

			if( next ) {
				this.parent().exists( true )
				this.ensure()
				this.reset()
				return next
			}

			this.drop()
			// удалили директорию, все дочерние потеряли актуальность
			this.reset()

			return next
		}
		
		@ $mol_mem
		type() {
			return this.stat()?.type ?? ''
		}
		
		name() {
			return this.path().replace( /^.*\//, '' )
		}
		
		ext() {
			const match = /((?:\.\w+)+)$/.exec( this.path() )
			return match ? match[ 1 ].substring( 1 ) : ''
		}

		@ $mol_mem
		buffer( next? : Uint8Array ) { return next ?? new Uint8Array }

		text(next?: string, virt?: 'virt') {
			if (next !== undefined) this.version()
			return this.text_int(next, virt)
		}

		@ $mol_mem
		text_int(next?: string, virt?: 'virt') {
			if( virt ) {
				const now = new Date
				this.stat( {
					type: 'file',
					size: 0,
					atime: now,
					mtime: now,
					ctime: now,
				}, 'virt' )
				return next!
			}

			if( next === undefined ) {
				return $mol_charset_decode( this.buffer( ) )	
			} else {
				const buffer = $mol_charset_encode( next )
				this.buffer( buffer )
				return next
			}
		}

		@ $mol_mem
		sub(reset?: null) {
			if (! this.exists() ) return []
			if ( this.type() !== 'dir') return []

			this.stat()

			// Если дочерний file удалился, список надо обновить
			return this.kids().filter(file => file.exists())
		}

		protected kids() {
			return [] as readonly $mol_file[]
		}

		resolve(path: string): $mol_file {
			throw new Error('implement')
		}

		relate( base?: $mol_file ): string {
			throw new Error('implement')
		}

		protected append( next : Uint8Array | string ) {}
		
		find(
			include? : RegExp ,
			exclude? : RegExp
		) {
			const found = [] as $mol_file[]
			const sub = this.sub()

			for (const child of sub) {
				const child_path = child.path()

				if( exclude && child_path.match( exclude ) ) continue

				if( !include || child_path.match( include ) ) found.push( child )

				if( child.type() === 'dir' ) {
					const sub_child = child.find( include , exclude )
					for (const child of sub_child) found.push(child)
				}
			}

			return found
		}

		@ $mol_mem
		size() {
			switch( this.type() ) {
				case 'file': return this.stat()?.size ?? 0
				default: return 0
			}
		}
		
		open( ... modes: readonly ( 'create' | 'exists_truncate' | 'exists_fail' | 'read_only' | 'write_only' | 'read_write' | 'append' )[] ) {
			return 0
		}
		
		toJSON() {
			return this.path()
		}
		
	}

	$mol_file.flusher()
}
