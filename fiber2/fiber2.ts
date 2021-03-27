namespace $ {
	
	const handled = new WeakSet< Promise< unknown > >()

	export class $mol_fiber2<
		Host,
		Args extends readonly unknown[],
		Result,
	> extends $mol_wire_sub {
		
		protected result: Result | Error | Promise< Result > = undefined as any
		
		host: Host
		task: ( this : Host , ... args : Args )=> Result
		args: Args
		
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
			
			const existen = $mol_wire_auto?.wire_next()
			if( !existen ) return
			if(!( existen instanceof $mol_fiber2 )) return
			
			if( existen.host !== host ) return
			if( existen.task !== task ) return
			if( !$mol_compare_deep( existen.args, this.args ) ) return
			
			return existen
		}
		
		wire_absorb( quant: unknown ) {
			
			if( this.wire_cursor < 0 ) return
			this.wire_cursor = -1

			if( this.wire_subs.length ) {
				this.wire_emit( quant )
			} else {
				new $mol_after_frame( ()=> this.run() )
			}
			
		}
		
		run() {
			
			$mol_wire_auto?.wire_promo( this )
			
			if( this.wire_cursor >= 0 ) return
			
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
		
		sync() {
			
			this.run()
			
			if( this.result instanceof Error ) {
				return $mol_fail_hidden( this.result )
			}
			
			if( this.result instanceof Promise ) {
				
				if( !$mol_wire_auto || !( $mol_wire_auto instanceof $mol_fiber2 ) ) {
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
				const fiber = new $mol_fiber2( this ?? null as any, descr.value!, ... args )
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
					const fiber = new $mol_fiber2( obj, val, ... args )
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
					const fiber = new $mol_fiber2( obj, val, ... args )
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
	
}
