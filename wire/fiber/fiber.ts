namespace $ {
	
	const handled = new WeakSet< Promise< unknown > >()
	
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
				
				key = args.map( v => JSON.stringify( v ) ).join(',')
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
		
		
		public cache: Result | Error | Promise< Result | Error > = undefined as any
		readonly args: Args
		
		get result() {
			if( this.cache instanceof Promise ) return
			if( this.cache instanceof Error ) return
			return this.cache
		}
		
		get persistent() {
			const id = this[ Symbol.toStringTag ]
			return id[ id.length - 2 ] !== '.'
		}
		
		constructor(
			readonly host: Host,
			readonly task: ( this : Host , ... args : Args )=> Result,
			key: string,
			... args: Args
		) {
			super()
			this.args = args
			$mol_owning_catch( host, this )
			this[ Symbol.toStringTag ] = this.host + '.' + key
		}
		
		destructor() {
			super.destructor()
			this.cache = undefined as any
		}
		
		alone() {
			this.destructor()
		}

		[ $mol_dev_format_head ]() {
			
			const args = [] as any[]
			for( const val of this.args ) {
				args.push(
					$mol_dev_format_auto( val ),
					$mol_dev_format_shade( ', ' ),
				)
			}
			
			const cursor = this.pubs_cursor >= 0
				? '@' + this.pubs_cursor
				: this.pubs_cursor.constructor.name
			
			return $mol_dev_format_div( {},
				$mol_dev_format_native( this ),
				$mol_dev_format_shade( ' ' + cursor +  ' = ' ),
				$mol_dev_format_auto( this.cache ),
			)
			
		}
		
		affect( quant: number, pos: number ) {

			if( !super.affect( quant, pos ) ) return false
			
			if( this.subs_from === this.length ) {
				new $mol_after_frame( ()=> this.touch() )
			}
			
			return true
		}
		
		touch() {
			
			type Result = typeof this.cache
			
			if( this.pubs_cursor === $mol_wire_status.fresh ) return
			
			check: if( this.pubs_cursor === $mol_wire_status.doubt ) {
				
				for( let i = 0 ; i < this.subs_from; i += 2 ) {
					;( this[i] as $mol_wire_pub ).touch()
					if( this.pubs_cursor === $mol_wire_status.stale ) break check
				}
				
				this.pubs_cursor = $mol_wire_status.fresh
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
				
				if( !this.persistent ) {
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
			this.cache = next
			if( $mol_owning_catch( this, next ) ) {
				next[ Symbol.toStringTag ] = this[ Symbol.toStringTag ]
			}
			
			if( this.subs_from < this.length ) {
				if( !$mol_compare_deep( prev, next ) ) {
					this.emit()
				}
			}
			
			this.pubs_cursor = $mol_wire_status.fresh
			
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
