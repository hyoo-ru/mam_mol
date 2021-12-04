namespace $ {
	
	const handled = new WeakSet< Promise< unknown > >()
	const nothing = ()=> {}
	
	/**
	 * Suspendable task with with support both sync/async api.
	 **/
	export class $mol_wire_fiber<
		Host,
		Args extends readonly unknown[],
		Result,
	> extends $mol_wire_pub_sub {
		
		static temp<
			Host,
			Args extends readonly unknown[],
			Result,
		>(
			host: Host,
			task: ( this : Host , ... args : Args )=> Result,
			... args: Args
		): $mol_wire_fiber< Host, [ ... Args ], Result > {
			
			const existen = $mol_wire_auto?.next()
			
			reuse: if( existen ) {
				
				if(!( existen instanceof $mol_wire_fiber )) break reuse
			
				if( existen.host !== host ) break reuse
				if( existen.task !== task ) break reuse
				if( !$mol_compare_deep( existen.args, args ) ) break reuse
				
				return existen
			}
			
			return new this( host, task, task.name + '(...)', ... args )
		}
		
		static persist<
			Host,
			Args extends readonly unknown[],
			Result,
		>(
			host: Host,
			task: ( this : Host , ... args : Args )=> Result,
			... args: Args
		): $mol_wire_fiber< Host, [ ... Args ], Result > {
			
			const name = task.name + '()'
			
			let dict, key, existen, fiber
			
			if( args.length ) {

				dict = host[ name ]
				if( !dict ) dict = host[ name ] = new Map<any,any>()
				
				key = args.map( v => $mol_key( v ) ).join(',')
				existen = dict.get( key )
				
			} else {
			
				existen = host[ name ]
				
			}
			
			reuse: if( existen ) {
				
				if(!( existen instanceof $mol_wire_fiber )) break reuse
			
				if( existen.host !== host ) break reuse
				if( existen.task !== task ) break reuse
				
				return existen
			}
			
			if( args.length ) {
				
				fiber = new this( host, task, task.name + '(' + key + ')', ... args )
				dict.set( key, fiber )
				
			} else {
				
				fiber = new this( host, task, name, ... args )
				host[ name ] = fiber
				
			}
			
			return fiber
		}
		
		static planning = [] as $mol_wire_fiber< any, any, any >[]
		static reaping = [] as $mol_wire_fiber< any, any, any >[]
		
		static plan_task: $mol_after_frame | null = null
		static plan() {
			
			if( this.plan_task ) return
			
			this.plan_task = new $mol_after_frame( ()=> {
				
				try {
					this.sync()
				} finally {
					$mol_wire_fiber.plan_task = null
				}

			} )
			
		}
		
		static sync() {
			
			// Sync whole fiber graph
			while( this.planning.length ) {
				
				const fibers = this.planning.splice( 0, this.planning.length )
				
				for( const fiber of fibers ) {
					fiber.touch()
				}
				
			}
			
			// Collect garbage
			while( this.reaping.length ) {
				
				const fibers = this.reaping.splice( 0, this.reaping.length )
				
				for( const fiber of fibers ) {
					if( !fiber.alone ) continue
					fiber.destructor()
				}
				
			}
			
		}
		
		public cache: Result | Error | Promise< Result | Error > = undefined as any
		
		get args() {
			return this.slice( 0 , this.pubs_from ) as any as Args
		}
		
		get result() {
			if( this.cache instanceof Promise ) return
			if( this.cache instanceof Error ) return
			return this.cache
		}
		
		get persist() {
			const id = this[ Symbol.toStringTag ]
			return id[ id.length - 2 ] !== '.'
		}
		
		get alone() {
			return this.subs_from === this.length
		}
		
		constructor(
			readonly host: Host,
			readonly task: ( this : Host , ... args : Args )=> Result,
			key: string,
			... args: Args
		) {
			super()
			this.push( ... args as any )
			this.pubs_from = this.subs_from = args.length
			this[ Symbol.toStringTag ] = this.host + '.' + key
		}
		
		destructor() {
			
			super.destructor()
			
			const prev = this.cache
			if( $mol_owning_check( this, prev ) ) {
				prev.destructor()
			}
			
			this.cache = undefined as any
		}
		
		solid() {
			this.reap = nothing
		}
		
		plan() {
			$mol_wire_fiber.planning.push( this )
			$mol_wire_fiber.plan()
		}
		
		reap() {
			$mol_wire_fiber.reaping.push( this )
			$mol_wire_fiber.plan()
		}

		[ $mol_dev_format_head ]() {
			
			const cursor = this.cursor >= 0
				? '@' + this.cursor
				: this.cursor.constructor.name
			
			return $mol_dev_format_div( {},
				$mol_dev_format_native( this ),
				$mol_dev_format_shade( ' ' + cursor +  ' = ' ),
				$mol_dev_format_auto( this.cache ),
			)
			
		}
		
		affect( quant: number ) {

			if( !super.affect( quant ) ) return false
			
			if( this.subs_from === this.length ) {
				this.plan()
			}
			
			return true
		}
		
		touch() {
			
			type Result = typeof this.cache
			
			if( this.cursor === $mol_wire_cursor.fresh ) return
			
			check: if( this.cursor === $mol_wire_cursor.doubt ) {
				
				for( let i = this.pubs_from ; i < this.subs_from; i += 2 ) {
					;( this[i] as $mol_wire_pub ).touch()
					if( this.cursor === $mol_wire_cursor.stale ) break check
				}
				
				this.cursor = $mol_wire_cursor.fresh
				return
				
			}
			
			const bu = this.begin()

			try {

				let result: Result = this.task.call( this.host, ... this.args )
				
				if( result instanceof Promise ) {
					const put = this.put.bind( this )
					result = result.then( put, put )
					handled.add( result )
				}
				
				this.end( bu )
				this.put( result )
				
				if( result instanceof Promise ) return
				
				if( !this.persist ) {
					this.forget()
				}
				
			} catch( error: any ) {
				
				if( error instanceof Promise && !handled.has( error ) ) {
					error = error.finally( ()=> this.stale() )
					handled.add( error )
				}
				
				this.end( bu )
				this.put( error )
				
			}

		}
		
		put( next: Result | Error | Promise< Result | Error > ) {
			
			const prev = this.cache
			
			if( next !== prev ) {
				
				if( $mol_owning_check( this, prev ) ) {
					prev.destructor()
				}
				
				this.cache = next
				
				if( $mol_owning_catch( this, next ) ) {
					next[ Symbol.toStringTag ] = this[ Symbol.toStringTag ]
				}
				
				if( this.subs_from < this.length ) {
					if( !$mol_compare_deep( prev, next ) ) {
						this.emit()
					}
				}
				
			}
			
			this.cursor = $mol_wire_cursor.fresh
			
			return next
		}
		
		sync() {
			
			this.promo()
			this.touch()
			
			if( this.cache instanceof Error ) {
				return $mol_fail_hidden( this.cache )
			}
			
			if( this.cache instanceof Promise ) {
				return $mol_fail_hidden( this.cache )
			}
			
			return this.cache as Result extends Promise< infer Res > ? Res : Result
		}

		async async() {
			
			while( true ) {
				
				this.touch()
				
				if( this.cache instanceof Error ) {
					$mol_fail_hidden( this.cache )
				}
				
				if( this.cache instanceof Promise ) {
					await this.cache
				} else break
				
			}
			
			return this.cache
		}
		
	}
	
}
