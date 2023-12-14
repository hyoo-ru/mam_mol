namespace $ {
	
	/** One-shot fiber */
	export class $mol_wire_task<
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
		): ( host: Host, args: Args )=> $mol_wire_task< Host, Args, Result > {
			
			return function $mol_wire_task_get( host: Host, args: Args ) {
				
				const sub = $mol_wire_auto()
				const existen = sub?.track_next() as $mol_wire_task< Host, Args, Result > | undefined
				
				reuse: if( existen ) {
					
					if( !existen.temp ) break reuse
					
					if( existen.host !== host ) break reuse
					if( existen.task !== task ) break reuse
					if( !$mol_compare_deep( existen.args, args ) ) break reuse
					
					return existen
				}
				
				// Disabled because non-idempotency is required for try-catch
				// if( existen?.temp ) {
				// 	$mol_fail( new Error( `$mol_wire_task detects nonidempotency\n${existen}` ) )
				// }
				
				return new $mol_wire_task( `${ (host as any)?.[ Symbol.toStringTag ] ?? host }.${ task.name }(#)`, task, host, args )
			}
			
		}

		get temp() {
			return true
		}
		
		complete() {
			if( $mol_promise_like( this.cache ) ) return
			this.destructor()
		}
		
		put( next: Result | Error | Promise< Result | Error > ) {
			
			const prev = this.cache
			this.cache = next
			
			if( $mol_promise_like( next ) ) {
				
				this.cursor = $mol_wire_cursor.fresh
				if( next !== prev ) this.emit()
				
				return next
			}
			
			this.cursor = $mol_wire_cursor.final
			
			if( this.sub_empty ) this.destructor()
			else if( next !== prev ) this.emit()
			
			return next
		}
		
	}

}
