namespace $ {
	
	const handled = new WeakSet< Promise< unknown > >()
	
	/**
	 * Suspendable task with with support both sync/async api.
	 * 
	 * 	A1 A2 A3 A4 P1 P2 P3 P4 S1 S2 S3
	 * 	^           ^           ^
	 * 	args_from   pubs_from   subs_from
	 **/
	export abstract class $mol_wire_fiber<
		Host,
		Args extends readonly unknown[],
		Result,
	> extends $mol_wire_pub_sub {
		
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
					fiber.refresh()
				}
				
			}
			
			// Collect garbage
			while( this.reaping.length ) {
				
				const fibers = this.reaping.splice( 0, this.reaping.length )
				
				for( const fiber of fibers ) {
					if( !fiber.sub_empty ) continue
					fiber.destructor()
				}
				
			}
			
		}
		
		public cache: Result | Error | Promise< Result | Error > = undefined as any
		
		get args() {
			return this.slice( 0 , this.pub_from ) as any as Args
		}
		
		result() {
			if( this.cache instanceof Promise ) return
			if( this.cache instanceof Error ) return
			return this.cache
		}
		
		field() {
			return this.task.name + '()'
		}
		
		constructor(
			id: string,
			readonly task: ( this : Host , ... args : Args )=> Result,
			readonly host?: Host,
			... args: Args
		) {
			
			super( ... args as any, undefined as any, undefined as any )
			
			// reserve capacity for first subscriber
			this.pop()
			this.pop()
			
			this.pub_from = this.sub_from = args.length
			this[ Symbol.toStringTag ] = id
			
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
		
		toJSON() {
			return this[ Symbol.toStringTag ]
		}

		[ $mol_dev_format_head ]() {
			
			const cursor = {
				[-1]: '🔴',
				[-2]: '🟡',
				[-3]: '🟢',
				[-4]: '🔵',
			}[ this.cursor ] ?? this.cursor.toString()
			
			return $mol_dev_format_div( {},
				$mol_dev_format_native( this ),
				$mol_dev_format_shade( cursor + ' ' ),
				$mol_dev_format_auto( this.cache ),
			)
			
		}
		
		get $() {
			return ( this.host ?? this.task )['$']
		}
		
		emit( quant = $mol_wire_cursor.stale ) {
			if( this.sub_empty ) this.plan()
			else super.emit( quant )
		}
		
		refresh() {

			type Result = typeof this.cache
			
			if( this.cursor === $mol_wire_cursor.fresh ) return
			if( this.cursor === $mol_wire_cursor.final ) return
			
			check: if( this.cursor === $mol_wire_cursor.doubt ) {
				
				for( let i = this.pub_from ; i < this.sub_from; i += 2 ) {
					;( this[i] as $mol_wire_pub )?.refresh()
					if( this.cursor !== $mol_wire_cursor.doubt ) break check
				}
				
				this.cursor = $mol_wire_cursor.fresh
				return
				
			}
			
			const bu = this.track_on()
			let result: typeof this.cache

			try {

				switch( this.pub_from ) {
					case 0: result = (this.task as any).call( this.host! ); break
					case 1: result = (this.task as any).call( this.host!, this[0] ); break
					default: result = (this.task as any).call( this.host!, ... this.slice( 0 , this.pub_from ) ); break
				}
				
				// result = this.task.call( this.host!, ... ( this.pub_from ? this.pub_from > 1 ? this.slice( 0 , this.pub_from ) : [ this[0] ] : [] ) as any as Args )
				
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
						if( this.cache === result ) this.absorb()
					} ), {
						destructor: result['destructor']
					} )
					
					handled.add( result )
				}
				
			}
			
			if(!( result instanceof Promise )) {
				this.track_cut()
			}
			
			this.track_off( bu )
			this.put( result )

		}
		
		put( next: Result | Error | Promise< Result | Error > ) {
			
			const prev = this.cache
			
			if( next !== prev ) {
				
				if( $mol_owning_check( this, prev ) ) {
					prev.destructor()
				}
				
				this.cache = next
				
				if( this instanceof $mol_wire_fiber_persist && $mol_owning_catch( this, next ) ) {
					try {
						next[ Symbol.toStringTag ] = this[ Symbol.toStringTag ]
					} catch {} // Promises throws in strict mode
				}
				
				if( this.sub_from < this.length ) {
					if( !$mol_compare_deep( prev, next ) ) {
						this.emit()
					}
				}
				
			}
			
			this.cursor = $mol_wire_cursor.fresh
			
			if( next instanceof Promise ) return next
			
			if( this instanceof $mol_wire_fiber_persist ) {
				
				this.complete_pubs()
				
			} else {
				
				this.cursor = $mol_wire_cursor.final
				if( this.sub_empty ) this.destructor()
				
			}
			
			return next
		}
		
		/**
		 * Synchronous execution. Throws Promise when waits async task (SuspenseAPI provider).
		 * Should be called inside SuspenseAPI consumer (ie fiber).
		 */
		sync() {
			
			if( !$mol_wire_fiber.warm ) {
				return this.result() as Awaited< Result >
			}
			
			this.promote()
			this.refresh()
			
			if( this.cache instanceof Error ) {
				return $mol_fail_hidden( this.cache )
			}
			
			if( this.cache instanceof Promise ) {
				return $mol_fail_hidden( this.cache )
			}
			
			return this.cache as Awaited< Result >
		}

		/**
		 * Asynchronous execution.
		 * It's SuspenseAPI consumer. So SuspenseAPI providers can be called inside.
		 */
		async async() {
			
			while( true ) {
				
				this.refresh()
				
				if( this.cache instanceof Error ) {
					$mol_fail_hidden( this.cache )
				}
				
				if(!( this.cache instanceof Promise )) return this.cache
					
				await this.cache
					
				if( this.cursor === $mol_wire_cursor.final ) {
					// never ends on destructed fiber
					await new Promise( ()=> {} )
				}
				
			}
			
		}
		
	}
	
	export class $mol_wire_fiber_temp<
		Host,
		Args extends readonly unknown[],
		Result,
	> extends $mol_wire_fiber< Host, Args, Result > {
		
		static getter<
			Host,
			Args extends readonly unknown[],
			Result,
		>(
			task: ( this : Host , ... args : Args )=> Result,
		): ( host: Host, args: Args )=> $mol_wire_fiber_temp< Host, [ ... Args ], Result > {
			
			return function $mol_wire_fiber_temp_get( host: Host, args: Args ) {
				
				const existen = $mol_wire_auto()?.track_next()
			
				reuse: if( existen ) {
					
					if(!( existen instanceof $mol_wire_fiber_temp )) break reuse
				
					if( existen.host !== host ) break reuse
					if( existen.task !== task ) break reuse
					if( !$mol_compare_deep( existen.args, args ) ) break reuse
					
					return existen
				}
				
				return new $mol_wire_fiber_temp( `${ host?.[ Symbol.toStringTag ] ?? host }.${ task.name }(#)`, task, host, ... args )
			}
			
		}

		complete() {
			this.destructor()
		}
		
	}
	
	export class $mol_wire_fiber_persist<
		Host,
		Args extends readonly unknown[],
		Result,
	> extends $mol_wire_fiber< Host, Args, Result > {

		static getter<
			Host,
			Args extends readonly unknown[],
			Result,
		>(
			task: ( this : Host , ... args : Args )=> Result,
			keys: number,
		): ( host: Host, args: Args )=> $mol_wire_fiber_persist< Host, [ ... Args ], Result > {
			
			const field = task.name + '()'
			
			if( keys ) {
				
				return function $mol_wire_fiber_persist_get( host: Host, args: Args ) {
					
					let dict, key!: string, fiber
					
					key = `${ host?.[ Symbol.toStringTag ] ?? host }.${ task.name }(${ args.map( v => $mol_key( v ) ).join(',') })`
					dict = Object.getOwnPropertyDescriptor( host ?? task, field )?.value
					
					if( dict ) {
						const existen = dict.get( key )
						if( existen ) return existen
					} else {
						dict = ( host ?? task )[ field ] = new Map<any,any>()
					}
					
					fiber = new $mol_wire_fiber_persist( key, task, host, ... args )
					dict.set( key, fiber )
					
					return fiber
				}
				
			} else {
				
				return function $mol_wire_fiber_persist_get( host: Host, args: Args ) {
					
					const existen = Object.getOwnPropertyDescriptor( host ?? task, field )?.value
					if( existen ) return existen
					
					const key = `${ host?.[ Symbol.toStringTag ] ?? host }.${ field }`
					
					const fiber = new $mol_wire_fiber_persist( key, task, host, ... args )
					;( host ?? task )[ field ] = fiber
					
					return fiber
				}
				
			}
			
		}
		
		/**
		 * Update fiber value through another temp fiber.
		 */
		@ $mol_wire_method
		recall( ... args: Args ) {
			
			if( this.cursor > $mol_wire_cursor.fresh ) {
				try {
					this.once()
				} catch( error: unknown ) {
					if( error instanceof Promise ) $mol_fail_hidden( error )
				}
			}
			
			return this.put( this.task.call( this.host!, ... args ) )
			
		}
		
		@ $mol_wire_method
		once() {
			return this.sync()
		}
		
		destructor() {
			
			super.destructor()
			
			const prev = this.cache
			if( $mol_owning_check( this, prev ) ) {
				prev.destructor()
			}
			
			if( this.pub_from === 0 ) {
				;( this.host ?? this.task )[ this.field() ] = null
			} else {
				;( this.host ?? this.task )[ this.field() ].delete( this[ Symbol.toStringTag ] )
			}
			
		}
		
	}
	
}
