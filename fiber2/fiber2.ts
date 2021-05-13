namespace $ {
	
	const handled = new WeakSet< Promise< unknown > >()

	export class $mol_fiber2<
		Host,
		Args extends readonly unknown[],
		Result,
	> extends $mol_wire_sub {
		
		public result: Result | Error | Promise< Result > = undefined as any
		
		host: Host
		task: ( this : Host , ... args : Args )=> Result
		args: Args
		
		static make<
			Host,
			Args extends readonly unknown[],
			Result,
		>(
			host: Host,
			task: ( this : Host , ... args : Args )=> Result,
			... args: Args
		): $mol_fiber2< Host, [ ... Args ], Result > {
			
			const existen = $mol_wire?.wire_next()
			
			reuse: if( existen ) {
				
				if(!( existen instanceof $mol_fiber2 )) break reuse
			
				if( existen.host !== host ) break reuse
				if( existen.task !== task ) break reuse
				if( !$mol_compare_deep( existen.args, args ) ) break reuse
				
				return existen				
			}
			
			return new this( host, task, ... args )
		}
		
		constructor(
			host: Host,
			task: ( this : Host , ... args : Args )=> Result,
			... args: Args
		) {
			super()
			
			this.host = host
			this.task = task
			this.args = args
			
			this[ Symbol.toStringTag ] = String( host ) + '.' + $$.$mol_func_name( task )
			
		}
		
		wire_absorb( quant: unknown ) {
			
			if( this.wire_pubs_cursor < 0 ) return
			this.wire_pubs_cursor = -1

			if( this.wire_peers.length ) {
				this.wire_emit( quant )
			} else {
				new $mol_after_frame( ()=> this.run() )
			}
			
		}
		
		run() {
			
			$mol_wire?.wire_promo( this )
			
			if( this.wire_pubs_cursor >= 0 ) return
			
			const bu = this.wire_begin()

			try {
				
				this.result = this.task.call( this.host, ... this.args )
				
				if( this.result instanceof Promise ) {
					
					if( handled.has( this.result ) ) return
					
					this.result = this.result.then(
						res => {
							this.result = res
							this.wire_emit()
							return res
						},
						error => {
							this.result = error
							this.wire_emit()
						},
					)
					
					handled.add( this.result )

				}
				
			} catch( error ) {
				
				this.result = error
				
				if( handled.has( error ) ) return
				handled.add( error )
				
				if( error instanceof Promise ) {
					error.then(
						res => this.wire_absorb( res ),
						err => this.wire_absorb( err ),
					)
				}
				
			} finally {
				this.wire_end( bu )
			}

		}
		
		push( next: Result | Error | Promise< Result > ) {
			this.result = next
			this.wire_emit()
		}
		
		sync() {
			
			this.run()
			
			if( this.result instanceof Error ) {
				return $mol_fail_hidden( this.result )
			}
			
			if( this.result instanceof Promise ) {
				
				if( !$mol_wire || !( $mol_wire instanceof $mol_fiber2 ) ) {
					$mol_fail( new Error( 'Sync execution of fiber available only inside $mol_fiber2_async' ) )
				}
				
				return $mol_fail_hidden( this.result )
			}
			
			return this.result as Result extends Promise< infer Res > ? Res : Result
		}

		async async() {
			
			while( true ) {
				
				this.run()
				
				if( this.result instanceof Error ) throw this.result
				
				if( this.result instanceof Promise ) await this.result
				else break
				
			}
			
			return this.result
		}

	}
	
	export function $mol_fiber2_method<
		Host extends object,
		Args extends any[],
		Result,
	>(
		host : Host,
		field : PropertyKey,
		descr : TypedPropertyDescriptor< ( ... args: Args )=> Result >,
	) {
		return {
			... descr,
			value: function( this: Host, ... args: Args ) {
				const fiber = $mol_fiber2.make( this ?? null as any, descr.value!, ... args )
				return fiber.sync() as Result
			}
		}
	}
	
	export function $mol_fiber2_sync< Host extends object >( obj: Host ) {
		return new Proxy( obj, {
			get( obj, field ) {
				const val = obj[ field ]
				if( typeof val !== 'function' ) return val
				return function( this: Host, ... args: any[] ) {
					const fiber = $mol_fiber2.make( obj, val, ... args )
					return fiber.sync()
				}
			}
		} ) as any as {
			[ key in keyof Host ]: Host[ key ] extends ( ... args: infer Args )=> Promise< infer Res >
				? ( ... args: Args )=> Res
				: Host[ key ]
		}
	}
	
	export function $mol_fiber2_async< Host extends object >( obj: Host ) {
		return new Proxy( obj, {
			get( obj, field ) {
				const val = obj[ field ]
				if( typeof val !== 'function' ) return val
				return function( this: Host, ... args: any[] ) {
					const fiber = $mol_fiber2.make( obj, val, ... args )
					return fiber.async()
				}
			}
		} ) as any as {
			[ key in keyof Host ]: Host[ key ] extends ( ... args: infer Args )=> infer Res
				? Res extends Promise<any>
					? Host[ key ]
					: ( ... args: Args )=> Promise< Res >
				: Host[ key ]
		}
	}
	
	export function $mol_fiber2_chan<
		Host extends object ,
		Field extends keyof Host ,
		Prop extends Extract< Host[ Field ] , ( next? : any )=> any >,
	>(
		proto : Host ,
		name : Field ,
		descr? : TypedPropertyDescriptor< Prop >
	) {

		type Input = $mol_type_param< Prop , 0 >
		type Output = $mol_type_result< Prop >

		if( !descr ) descr = Reflect.getOwnPropertyDescriptor( proto , name )
		const orig = descr!.value!
		
		const key = name instanceof Symbol ? name : Symbol( name as string | number )

		;( proto as any )[ key ] = null

		const cached = ( host : Host ): $mol_fiber2< Host, readonly Input[], Output > => {
			
			let cache = ( host as any )[ key ]
			if( cache ) return cache

			let cache2 = new $mol_fiber2( host, orig )
			;( host as any )[ key ] = cache2

			return cache2
		}
		
		function value( this : Host , next? : Input ) {
			
			const cache = cached( this )
			
			if( next === undefined ) {
				return cache.sync()
			}  else {
				const fiber = $mol_fiber2.make( this, orig, next )
				const res = fiber.sync()
				cache.push( res )
				return res
			}
			
		}
		
		const descr2 = { ... descr, value }
		Reflect.defineProperty( proto, name, descr2 )
		
		return descr2

	}
	
}
