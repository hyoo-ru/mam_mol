namespace $ {

	export class $mol_file_base extends $mol_object {
		
		@ $mol_mem_key
		static absolute<This extends typeof $mol_file_base>(this: This, path : string ) {
			return this.make<typeof $mol_file_base>({
				path : $mol_const( path )
			}) as InstanceType< This >
		}

		static relative<This extends typeof $mol_file_base>(this: This, path : string ) : InstanceType<This> {
			throw new Error( 'Not implemented yet' )
		}
		
		static base = ''
		
		path() {
			return '.'
		}
		
		parent() {
			return this.resolve( '..' )
		}

		@ $mol_action
		exists_cut() { return this.exists() }

		protected root() {
			const path = this.path()
			const base = (this.constructor as typeof $mol_file_base).base

			// Если путь выше или равен base или если parent такойже как и this - считаем это корнем
			return base.startsWith(path) || this == this.parent()
		}

		@ $mol_mem
		protected stat(next? : $mol_file_stat | null, virt?: 'virt') {

			const path = this.path()
			const parent = this.parent()

			// Отслеживать проверку наличия родительской папки не стоит до корня диска
			// Лучше ограничить mam-ом
			if ( ! this.root() ) {
				/*
				Если parent папка удалилась, надо ресетнуть все объекты в ней на любой глубине.
				Например, rm -rf с последующим git pull: parent папка может удалиться, потом создасться,
				а текущая папка успеет только удалиться до момента выполнения stat.
				Поэтому parent.exists() не запустит перевычисления, нужна именно parent.version()

				Однако, parent.version() меняется не только при удалении, будет ложное срабатывание
				С этим придется мириться, красивого решения пока нет.
				*/

				parent.version()
			}
			parent.watcher()

			if( virt ) return next ?? null
			
			return next ?? this.info(path)
		}

		protected static changed = new Set<$mol_file_base>

		protected static frame = null as null | $mol_after_timeout

		protected static changed_add(type: 'change' | 'rename', path: string) {
			if (/([\/\\]\.|___$)/.test( path )) return

			const file = this.relative( path.at(-1) === '/' ? path.slice(0, -1) : path )
			// console.log(type, path)

			// add (change): добавился файл - у parent надо обновить список sub, если он был заюзан
			// change, unlink (rename): обновился или удалился файл - ресетим
			// addDir (change), добавилась папка, у parent обновляем список директорий в sub
			// дочерние ресетим

			// unlinkDir (rename), удалилась папка, ресетим ее
			// stat у всех дочерних обновится сам, т.к. связан с parent.version()
			this.changed.add(file)

			if (! this.watching) return

			// throttle, пока события поступают не сбрасываем.
			// аналог awaitWriteFinish из chokidar
			// интервалы между change-сообщениями модифицируемого файла должны быть меньше watch_debounce
			this.frame?.destructor()
			this.frame = new this.$.$mol_after_timeout(this.watch_debounce(), () => {
				if (! this.watching) return
				this.watching = false
				$mol_wire_async(this).flush()
			} )
		}

		/**
		 * Должно быть больше, чем время между событиями от вотчера при записи внешним процессом.
		 * Иначе запуск ресетов паралельно с изменением может привести к неконсистентности.
		 */
		static watch_debounce() { return 500 }

		@ $mol_action
		static flush() {
			// Пока flush работает, вотчер сюда не заходит, но может добавлять новые изменения
			// на каждом перезапуске они применятся
			// Пока run выполняется, изменения накапливаются, в конце run вызывается flush
			// Пока применяются изменения, run должен ожидать конца flush

			for (const file of this.changed) {
				const parent = file.parent()

				try {
					if ( $mol_wire_probe(() => parent.sub()) ) parent.sub(null)
					file.reset()
				} catch (error) {
					if ($mol_fail_catch(error)) $mol_fail_log(error)
				}
			}

			this.changed.clear()
			this.watching = true

			// this.watch_wd?.destructor()
			// this.watch_wd = null
	}

		protected static watching = true

		protected static lock = new $mol_lock

		@ $mol_action
		protected static watch_off(path: string) {
			this.watching = false
			// run должен ожидать конца flush
			this.flush()
			this.watching = false

			/*
			watch запаздывает и событие может прилететь через 3 сек после окончания сайд эффекта
			поэтому добавляем папку, которую меняет side_effect
			Когда дойдет до выполнения flush, он ресетнет ее
			
			Иначе будут лишние срабатывания
			Например, удалили hyoo/board, watch ресетит и exists начинает отдавать false, срабатывает git clone
			Сразу после него событие addDir еще не успело прийти,
			на следующем перезапуске вызывается git pull, т.к.
			с точки зрения реактивной системы hyoo/board еще не существует.
			*/
			this.changed.add(this.absolute(path))
		}
	
		// protected static watch_wd = null as null | $mol_after_timeout

		static unwatched<Result>(side_effect: () => Result, affected_dir: string) {
			// ждем, пока выполнится предыдущий unwatched
			const unlock = this.lock.grab()
			this.watch_off(affected_dir)

			try {
				const result = side_effect()
				this.flush()
				unlock()
				return result
			} catch(e) {
				if (! $mol_promise_like(e)) {
					this.flush()
					unlock()
				}
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
			const next = this.stat()?.mtime.getTime().toString( 36 ).toUpperCase() ?? ''
			// console.log('version', next, this.path())
			return next
		}

		protected info( path: string ) { return null as null | $mol_file_stat }
		protected ensure() {}
		protected drop() {}
		protected copy(to: string) {}
		protected read(): Uint8Array<ArrayBuffer> { return new Uint8Array }
		protected write(buffer: Uint8Array<ArrayBuffer>) { }
		protected kids() {
			return [] as readonly this[]
		}

		@ $mol_mem_key
		readable(opts: { start?: number, end?: number }) {
			return new ReadableStream<Uint8Array<ArrayBuffer>>
		}

		@ $mol_mem_key
		writable(opts: { start?: number }) {
			return new WritableStream<Uint8Array<ArrayBuffer>>
		}

		// open( ... modes: readonly $mol_file_mode[] ) { return 0 }

		@ $mol_mem
		buffer( next? : Uint8Array<ArrayBuffer> ): Uint8Array<ArrayBuffer> {

			// Если версия пустая - возвращаем пустой буфер
			let readed: Uint8Array<ArrayBuffer> = new Uint8Array()

			if( next === undefined ) {
				// Если меняется версия файла, буфер надо перечитать
				if ( this.version() ) readed = this.read()
			}

			const prev = $mol_mem_cached( ()=> this.buffer() )
			const changed = prev === undefined || ! $mol_compare_array( prev, next ?? readed)

			if( prev !== undefined && changed ) {
				// Логируем, если повторно читаем/пишем и буфер поменялся
				this.$.$mol_log3_rise({
					place: `$mol_file_node.buffer()`,
					message: 'Changed' ,
					path: this.relate() ,
				})
			}

			if (next === undefined) return changed ? readed : prev

			// Если буфер при записи не поменялся и файл не удаляли перед этим - не записываем новую версию.
			// Если записывать, это приведет к смене mtime и вотчер снова триггернется, даже если содержимое файла не поменялось.

			// В этом алгоритме есть изъян.
			// Если файл записали, потом отключили вотчер, кто-то из вне его поменял, потом включили вотчер, снова записали тот же буфер,
			// то буфер не запишется на диск, т.к. кэш не консистентен с диском.
			
			if (! changed && this.exists()) return prev
			
			this.parent().exists( true )
			this.stat( this.stat_make(next.length), 'virt' )

			this.write(next)

			return next

		}

		@ $mol_action
		stat_make(size: number) {
			const now = new Date()
			return {
				type: 'file',
				size,
				atime: now,
				mtime: now,
				ctime: now,
			} as const
		}

		@ $mol_mem_key
		clone(to: string) {
			if (! this.exists() ) return null

			const target = (this.constructor as typeof $mol_file_base).absolute(to) as this

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

		// static watch_root = ''

		// static watcher_warned = false
		watcher() {
			// const constructor = this.constructor as typeof $mol_file_base
			// if (! constructor.watcher_warned) {
			// 	console.warn(`${constructor}.watcher() not implemented`)
			// 	constructor.watcher_warned = true
			// }

			return {
				destructor() {}
			}
		}
		
		@ $mol_mem
		exists( next? : boolean ) {
			
			const exists = Boolean( this.stat() )

			// console.log('exists current', exists, 'next', next, this.path())
			if( next === undefined ) return exists
			if( next === exists ) return exists

			if( next ) {
				this.parent().exists( true )
				this.ensure()
			} else {
				this.drop()
			}

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

		text(next?: string, virt?: 'virt') {
			// Если записываем text, и вотчер ресетнул записанный файл,
			// то надо снова его обновить, вызвать логику, которая делала пуш в text.
			// Например файл удалили, потом снова создали, версия поменялась - перезаписываем
			// Если использовать version, то вновь созданный файл, через вотчер запустит свое пересоздание
			if (next !== undefined) this.exists()
			return this.text_int(next, virt)
		}

		@ $mol_mem
		text_int(next?: string, virt?: 'virt') {
			if( virt ) {
				this.stat( this.stat_make(0), 'virt' )
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

			this.version()

			// Если дочерний file удалился, список надо обновить
			return this.kids().filter(file => file.exists())
		}

		resolve(path: string): this {
			throw new Error('implement')
		}

		relate( base = ( this.constructor as typeof $mol_file_base ).relative( '.' )): string {
			const base_path = base.path()
			const path = this.path()
			return path.startsWith(base_path) ? path.slice(base_path.length) : path
		}

		find(
			include? : RegExp ,
			exclude? : RegExp
		) {
			const found = [] as typeof this[]
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
		
		toJSON() {
			return this.path()
		}
		
		@ $mol_action
		open( ... modes: readonly $mol_file_transaction_mode[] ) {
			return this.$.$mol_file_transaction.make({
				path: () => this.path(),
				modes: () => modes
			})
		}
	}

}
