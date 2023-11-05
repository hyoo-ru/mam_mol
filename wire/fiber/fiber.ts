namespace $ {
	
	const handled = new WeakSet< Promise< unknown > >()
	
	/**
	 * Suspendable task with support both sync/async api.
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
		
		static planning = new Set< $mol_wire_fiber< any, any, any > >()
		static reaping = new Set< $mol_wire_fiber< any, any, any > >()
		
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
			while( this.planning.size ) {
				for( const fiber of this.planning ) {
					this.planning.delete( fiber )
					if( fiber.cursor >= 0 ) continue
					if( fiber.cursor === $mol_wire_cursor.final ) continue
					fiber.fresh()
				}
			}
			
			// Collect garbage
			while( this.reaping.size ) {
				
				const fibers = this.reaping
				this.reaping = new Set
				
				for( const fiber of fibers ) {
					if( !fiber.sub_empty ) continue
					fiber.destructor()
				}
				
			}
			
		}
		
		[Symbol.toStringTag]!: string

		public cache: Result | Error | Promise< Result | Error > = undefined as any
		
		get args() {
			return this.data.slice( 0 , this.pub_from ) as any as Args
		}
		
		result() {
			if( $mol_promise_like( this.cache ) ) return
			if( this.cache instanceof Error ) return
			return this.cache
		}
		
		get incompleted() {
			return $mol_promise_like( this.cache )
		}
		
		field() {
			return this.task.name + '()'
		}
		
		constructor(
			id: string,
			readonly task: ( this : Host , ... args : Args )=> Result,
			readonly host?: Host,
			args?: Args
		) {
			
			super()
			if( args ) this.data.push( ... args )
			this.pub_from = this.sub_from = args?.length ?? 0
			this[ Symbol.toStringTag ] = id
			
		}
		
		plan() {
			$mol_wire_fiber.planning.add( this )
			$mol_wire_fiber.plan()
		}
		
		reap() {
			$mol_wire_fiber.reaping.add( this )
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
				[ $mol_wire_cursor.stale ]: '🔴',
				[ $mol_wire_cursor.doubt ]: '🟡',
				[ $mol_wire_cursor.fresh ]: '🟢',
				[ $mol_wire_cursor.final ]: '🔵',
			}[ this.cursor ] ?? this.cursor.toString()
			
			return $mol_dev_format_div( {},
				$mol_dev_format_native( this ),
				$mol_dev_format_shade( cursor + ' ' ),
				$mol_dev_format_auto( this.cache ),
			)
			
		}
		
		get $() {
			return ( this.host ?? this.task as any )['$']
		}
		
		emit( quant = $mol_wire_cursor.stale ) {
			if( this.sub_empty ) this.plan()
			else super.emit( quant )
		}
		
		fresh() {

			type Result = typeof this.cache
			
			if( this.cursor === $mol_wire_cursor.fresh ) return
			if( this.cursor === $mol_wire_cursor.final ) return
			
			check: if( this.cursor === $mol_wire_cursor.doubt ) {
				
				for( let i = this.pub_from ; i < this.sub_from; i += 2 ) {
					;( this.data[i] as $mol_wire_pub )?.fresh()
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
					case 1: result = (this.task as any).call( this.host!, this.data[0] ); break
					default: result = (this.task as any).call( this.host!, ... this.args ); break
				}
				
				if( $mol_promise_like( result ) ) {
					
					const put = ( res: Result )=> {
						if( this.cache === result ) this.put( res )
						return res
					}
					
					result = Object.assign( result.then( put, put ), {
						destructor: (result as any)['destructor'] ?? (()=> {})
					} )
					
					handled.add( result )
				}
				
			} catch( error: any ) {
				
				if( error instanceof Error || $mol_promise_like( error ) ) {
					result = error
				} else {
					result = new Error( String( error ), { cause: error } )
				}
				
				if( $mol_promise_like( result ) && !handled.has( result ) ) {
					
					result = Object.assign( result.finally( ()=> {
						if( this.cache === result ) this.absorb()
					} ), {
						destructor: (result as any)['destructor'] ?? (()=> {})
					} )
					
					handled.add( result )
				}
				
			}
			
			if( ! $mol_promise_like( result ) ) {
				this.track_cut()
			}
			
			this.track_off( bu )
			this.put( result )

		}
		
		refresh() {
			this.cursor = $mol_wire_cursor.stale
			this.fresh()
		}
		
		abstract put( next: Result | Error | Promise< Result | Error > ): Result | Error | Promise< Result | Error >
		
		/**
		 * Synchronous execution. Throws Promise when waits async task (SuspenseAPI provider).
		 * Should be called inside SuspenseAPI consumer (ie fiber).
		 */
		sync() {
			
			if( !$mol_wire_fiber.warm ) {
				return this.result() as Awaited< Result >
			}
			
			this.promote()
			this.fresh()
			
			if( this.cache instanceof Error ) {
				return $mol_fail_hidden( this.cache )
			}
			
			if( $mol_promise_like( this.cache ) ) {
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
				
				this.fresh()
				
				if( this.cache instanceof Error ) {
					$mol_fail_hidden( this.cache )
				}
				
				if( ! $mol_promise_like( this.cache ) ) return this.cache
					
				await Promise.race([ this.cache, this.step() ])
				if( ! $mol_promise_like( this.cache ) ) return this.cache
					
				if( this.cursor === $mol_wire_cursor.final ) {
					// never ends on destructed fiber
					await new Promise( ()=> {} )
				}
				
			}
			
		}
		
		step() {
			return new Promise< null >( done => {
				const sub = new $mol_wire_pub_sub
				const prev = sub.track_on()
				sub.track_next( this )
				sub.track_off( prev )
				sub.absorb = ()=> {
					done( null )
					sub.destructor()
				}
			} )
		}
		
	}
	
}
