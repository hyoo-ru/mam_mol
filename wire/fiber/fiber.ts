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
		
		static make<
			Host,
			Args extends readonly unknown[],
			Result,
		>(
			host: Host,
			task: ( this : Host , ... args : Args )=> Result,
			... args: Args
		): $mol_wire_fiber< Host, [ ... Args ], Result > {
			
			const existen = $mol_wire?.next()
			
			reuse: if( existen ) {
				
				if(!( existen instanceof $mol_wire_fiber )) break reuse
			
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
				$mol_dev_format_shade( this.pubs_cursor >= 0 ? this.pubs_cursor : this.pubs_cursor.constructor.name ),
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

		affect( quant: number ) {

			if( !super.affect( quant ) ) return false
			
			if( this.subs_from === this.length ) {
				new $mol_after_frame( ()=> this.touch() )
			}
			
			return true
		}
		
		touch() {
			
			type Result = typeof this.result
			
			if( this.pubs_cursor === $mol_wire_fresh ) return
			
			check: if( this.pubs_cursor === $mol_wire_doubt ) {
				
				for( let i = 0 ; i < this.subs_from; i += 2 ) {
					;( this[i] as $mol_wire_pub ).touch()
					if( this.pubs_cursor === $mol_wire_stale ) break check
				}
				
				this.pubs_cursor = $mol_wire_fresh
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
				
				this.put( result )
				
			} catch( error: any ) {
				
				if( error instanceof Promise && !handled.has( error ) ) {
					error = error.finally( ()=> this.absorb() )
					handled.add( error )
				}
				
				this.put( error )
				
			} finally {
				this.end( bu )
			}

		}
		
		put( next: Result | Error | Promise< Result | Error > ) {
			
			const prev = this.result
			this.result = next
			
			if( this.subs_from < this.length ) {
				if( !$mol_compare_deep( prev, next ) ) {
					this.emit()
				}
			}
			
			return next
		}
		
		sync() {
			
			this.promo()
			this.touch()
			
			if( this.result instanceof Error ) {
				return $mol_fail_hidden( this.result )
			}
			
			if( this.result instanceof Promise ) {
				
				if( !$mol_wire || !( $mol_wire instanceof $mol_wire_fiber ) ) {
					$mol_fail( new Error( 'Sync execution of fiber available only inside $mol_fiber2_async' ) )
				}
				
				return $mol_fail_hidden( this.result )
			}
			
			return this.result as Result extends Promise< infer Res > ? Res : Result
		}

		async async() {
			
			while( true ) {
				
				this.touch()
				
				if( this.result instanceof Error ) throw this.result
				
				if( this.result instanceof Promise ) await this.result
				else break
				
			}
			
			return this.result
		}

	}
	
}
