namespace $ {
	
	const handled = new WeakSet< Promise< unknown > >()
	const nothing = ()=> {}
	
	/**
	 * Suspendable task with with support both sync/async api.
	 * 
	 * 	A1 A2 A3 A4 P1 P2 P3 P4 S1 S2 S3
	 * 	^           ^           ^
	 * 	args_from   pubs_from   subs_from
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
			
			return new this( host, task, host + '.' + task.name + '(#' + $mol_guid() + '#)', ... args )
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
			
			const field = task.name + '()'
			
			let dict, key, existen, fiber
			
			if( args.length ) {

				key = host + '.' + task.name + '(' + args.map( v => $mol_key( v ) ).join(',') + ')'
				dict = Object.getOwnPropertyDescriptor( host, field )?.value
				
				if( dict ) existen = dict.get( key )
				else dict = host[ field ] = new Map<any,any>()
				
			} else {
				
				key = host + '.' + task.name + '()'
				existen = Object.getOwnPropertyDescriptor( host, field )?.value
				
			}
			
			reuse: if( existen ) {
				
				if(!( existen instanceof $mol_wire_fiber )) break reuse
			
				if( existen.host !== host ) break reuse
				if( existen.task !== task ) break reuse
				
				return existen
			}
			
			fiber = new this( host, task, key, ... args )
			
			if( args.length ) dict.set( key, fiber )
			else host[ field ] = fiber
			
			return fiber
		}
		
		static warm = true
		
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
			return id[ id.length - 2 ] !== '#'
		}
		
		constructor(
			readonly host: Host,
			readonly task: ( this : Host , ... args : Args )=> Result,
			id: string,
			... args: Args
		) {
			super( ... args as any, undefined as any )
			this.pop()
			this.pubs_from = this.subs_from = args.length
			this[ Symbol.toStringTag ] = id
		}
		
		destructor() {
			
			super.destructor()
			
			const prev = this.cache
			if( $mol_owning_check( this, prev ) ) {
				prev.destructor()
			}
			
			this.cache = undefined as any
			
			if( this.persist ) {
				if( this.pubs_from === 0 ) {
					this.host[ this.task.name + '()' ] = null
				} else {
					this.host[ this.task.name + '()' ].delete( this[ Symbol.toStringTag ] )
				}
			}
			
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
		
		toString() {
			return this[ Symbol.toStringTag ]
		}

		[ $mol_dev_format_head ]() {
			
			const cursor = this.cursor >= 0
				? '@' + this.cursor
				: this.cursor?.constructor?.name
			
			return $mol_dev_format_div( {},
				$mol_dev_format_native( this ),
				$mol_dev_format_shade( ' ' + cursor +  ' = ' ),
				$mol_dev_format_auto( this.cache ),
			)
			
		}
		
		get $() {
			return this.host['$']
		}
		
		affect( quant: number ) {

			if( !super.affect( quant ) ) return false
			
			if( this.subs_from === this.length ) {
				this.plan()
			}
			
			return true
		}
		
		sleep() {
			if( this.persist ) return
			this.destructor()
		}
		
		touch() {
			
			type Result = typeof this.cache
			
			if( this.cursor === $mol_wire_cursor.fresh ) return
			
			check: if( this.cursor === $mol_wire_cursor.doubt ) {
				
				for( let i = this.pubs_from ; i < this.subs_from; i += 2 ) {
					;( this[i] as $mol_wire_pub )?.touch()
					if( this.cursor !== $mol_wire_cursor.doubt ) break check
				}
				
				this.cursor = $mol_wire_cursor.fresh
				return
				
			}
			
			const bu = this.begin()
			let result: typeof this.cache

			try {

				result = this.task.call( this.host, ... this.args )
				
				if( result instanceof Promise ) {
					
					const put = ( res: Result )=> {
						if( this.cache === result ) this.put( res )
						return res
					}
					
					result = Object.assign( result.then( put, put ), {
						destructor: result['destructor']
					} )
					
					handled.add( result )
				}
				
			} catch( error: any ) {
				
				result = error
				
				if( result instanceof Promise && !handled.has( result ) ) {
					
					result = Object.assign( result.finally( ()=> {
						if( this.cache === result ) this.stale()
					} ), {
						destructor: result['destructor']
					} )
					
					handled.add( result )
				}
				
			}
			
			this.end( bu )
			this.put( result )

		}
		
		put( next: Result | Error | Promise< Result | Error > ) {
			
			const prev = this.cache
			
			if( next !== prev ) {
				
				if( $mol_owning_check( this, prev ) ) {
					prev.destructor()
				}
				
				this.cache = next
				
				if( this.persist && $mol_owning_catch( this, next ) ) {
					try {
						next[ Symbol.toStringTag ] = this[ Symbol.toStringTag ]
					} catch {} // Promises throws in strict mode
				}
				
				if( this.subs_from < this.length ) {
					if( !$mol_compare_deep( prev, next ) ) {
						this.emit()
					}
				}
				
			}
			
			this.cursor = $mol_wire_cursor.fresh
			
			if( next instanceof Promise ) return next
			
			if( this.persist ) {
			
				for(
					let cursor = this.pubs_from;
					cursor < this.subs_from;
					cursor += 2
				) {
					const pub = this[ cursor ] as $mol_wire_pub
					pub.sleep()
				}
				
			} else {
				
				this.cursor = this.pubs_from
				this.forget()
				this.cursor = $mol_wire_cursor.fresh
				
			}
			
			return next
		}
		
		'update()'?: $mol_wire_fiber< Host, [ ... Args ], Result >
		@ $mol_wire_method
		update( ... args: Args ) {
			
			if( this['update()'] && $mol_wire_auto !== this['update()'] ) {
				this['update()'].destructor()
				this['update()'].put( new Error( 'Aborted by new update' ) )
			}
			
			this['update()'] = $mol_wire_auto as $mol_wire_fiber< Host, [ ... Args ], Result >
			const res = this.task.call( this.host, ... args )

			this['update()'] = undefined
			return this.put( res )
			
		}
		
		sync() {
			
			if( !$mol_wire_fiber.warm ) {
				return this.result as Awaited< Result >
			}
			
			this.promote()
			this.touch()
			
			if( this.cache instanceof Error ) {
				return $mol_fail_hidden( this.cache )
			}
			
			if( this.cache instanceof Promise ) {
				return $mol_fail_hidden( this.cache )
			}
			
			return this.cache as Awaited< Result >
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
