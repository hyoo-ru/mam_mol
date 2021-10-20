namespace $ {
	
	export const $mol_fiber2_ready = $mol_pub_sub_ready
	export const $mol_fiber2_doubt = -2
	export const $mol_fiber2_fresh = -3

	/**
	 * Suspendable task with with support both sync/async api.
	 **/
	export class $mol_fiber2<
		Host,
		Args extends readonly unknown[],
		Result,
	> extends $mol_wire_pub_sub {
		
		static make<
			Host,
			Args extends readonly unknown[],
			Result,
		>(
			host: Host,
			task: ( this : Host , ... args : Args )=> Result,
			... args: Args
		): $mol_fiber2< Host, [ ... Args ], Result > {
			
			const existen = $mol_wire?.next()
			
			reuse: if( existen ) {
				
				if(!( existen instanceof $mol_fiber2 )) break reuse
			
				if( existen.host !== host ) break reuse
				if( existen.task !== task ) break reuse
				if( !$mol_compare_deep( existen.args, args ) ) break reuse
				
				return existen
			}
			
			return new this( host, task, ... args )
		}
		
		public result: Result | Error | Promise< Result | Error > = undefined as any
		readonly args: Args
		
		constructor(
			readonly host: Host,
			readonly task: ( this : Host , ... args : Args )=> Result,
			... args: Args
		) {
			super()
			this.args = args
		}
		
		[ $mol_dev_format_head ]() {
			
			const args = [] as any[]
			for( const val of this.args ) {
				args.push(
					$mol_dev_format_auto( val ),
					$mol_dev_format_shade( ', ' ),
				)
			}
			
			return $mol_dev_format_div( {},
				$mol_dev_format_native( this ),
				$mol_dev_format_shade( ': ' ),
				$mol_dev_format_accent(
					... this.host ? [
						String( this.host ),
						$mol_dev_format_shade( '.' ),
					] : [],
					$$.$mol_func_name( this.task ),
				),
				$mol_dev_format_shade( '(' ),
				... args.slice( 0, -1 ),
				$mol_dev_format_shade( ') = ' ),
				$mol_dev_format_auto( this.result ),
			)
			
		}

		absorb( quant: unknown ) {
			
			if( this.wire_pubs_cursor >= $mol_fiber2_ready ) return
			this.wire_pubs_cursor = $mol_fiber2_ready

			if( this.wire_subs_from < this.length ) {
				this.emit( quant )
			} else {
				new $mol_after_frame( ()=> this.run() )
			}
			
		}
		
		run() {
			
			this.promo()
			
			if( this.wire_pubs_cursor < $mol_fiber2_ready ) return
			
			const bu = this.begin()

			try {
				
				let result: typeof this.result = this.task.call( this.host, ... this.args )
				
				if( result instanceof Promise ) {
					const put = this.put.bind( this )
					result = result.then( put, put )
				}
				
				this.put( result )
				
			} catch( error: any ) {
				
				if( error instanceof Promise ) {
					const absorb = this.absorb.bind( this )
					error = error.then( absorb, absorb )
				}
				
				this.put( error )
				
			} finally {
				this.end( bu )
			}

		}
		
		put( next: Result | Error | Promise< Result | Error > ) {
			
			const prev = this.result
			this.result = next
			
			if( this.wire_subs_from < this.length ) {
				if( !$mol_compare_deep( prev, next ) ) {
					this.emit()
				}
			}
			
			return next
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
	
}
