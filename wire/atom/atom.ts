namespace $ {

	/** Long-living fiber. */
	export class $mol_wire_atom<
		Host,
		Args extends readonly unknown[],
		Result,
	> extends $mol_wire_fiber< Host, Args, Result > {

		static solo<
			Host,
			Args extends readonly unknown[],
			Result,
		>(
			host: Host,
			task: ( this: Host, ... args: Args )=> Result,
		): $mol_wire_atom< Host, Args, Result > {
			
			const field = task.name + '()'
			
			const existen = Object.getOwnPropertyDescriptor( host ?? task, field )?.value
			if( existen ) return existen
			
			const prefix = (host as any)?.[ Symbol.toStringTag ] ?? ( host instanceof Function ? $$.$mol_func_name( host ) : host )
			const key = prefix + ( '.' + task.name + '<>' )
			
			const fiber = new $mol_wire_atom( key, task, host, [] as any as Args )
			;( host as any ?? task )[ field ] = fiber
			
			return fiber
		}
		
		static plex<
			Host,
			Args extends readonly unknown[],
			Result,
		>(
			host: Host,
			task: ( this: Host , ... args: Args )=> Result,
			key: Args[0],
		): $mol_wire_atom< Host, Args, Result > {
			
			const field = task.name + '()'
			let dict = Object.getOwnPropertyDescriptor( host ?? task, field )?.value
			const prefix = (host as any)?.[ Symbol.toStringTag ] ?? ( host instanceof Function ? $$.$mol_func_name( host ) : host )
			const key_str = $mol_key( key )
			
			if( dict ) {
				const existen = dict.get( key_str )
				if( existen ) return existen
			} else {
				dict = ( host as any ?? task )[ field ] = new Map<any,any>()
			}
			
			const id = prefix + ( '.' + task.name ) + ( '<' + key_str.replace( /^"|"$/g, "'" ) + '>' )
			const fiber = new $mol_wire_atom( id, task, host, [ key ] as any as Args )
			dict.set( key_str, fiber )
			
			return fiber
		}
		
		static watching = new Set< $mol_wire_atom< any, any, any > >()
		static watcher = null as $mol_after_frame | null
		
		static watch() {
		
			$mol_wire_atom.watcher = new $mol_after_frame( $mol_wire_atom.watch )
			
			for( const atom of $mol_wire_atom.watching ) {
				
				if( atom.cursor === $mol_wire_cursor.final ) {
					$mol_wire_atom.watching.delete( atom )
				} else {
					atom.cursor = $mol_wire_cursor.stale
					atom.fresh()
				}
				
			}
			
		}
		
		watch() {
			
			if( !$mol_wire_atom.watcher ) {
				$mol_wire_atom.watcher = new $mol_after_frame( $mol_wire_atom.watch )
			}
			
			$mol_wire_atom.watching.add( this )
			
		}
		
		/**
		 * Update atom value through another temp fiber.
		 */
		@ $mol_wire_method
		resync( args: Args ) {
			
			// enforce pulling tasks abort
			for(
				let cursor = this.pub_from;
				cursor < this.sub_from;
				cursor += 2
			) {
				const pub = this.data[ cursor ] as $mol_wire_pub
				if( pub && pub instanceof $mol_wire_task ) {
					pub.destructor()
				}
			}
			
			return this.put( this.task.call( this.host!, ... args ) )
		}
		
		@ $mol_wire_method
		once() {
			return this.sync()
		}
		
		channel() {
			return Object.assign( ( next?: $mol_type_foot< Args > )=> {
					
				if( next !== undefined ) return this.resync( [ ... this.args, next ] as any ) as never
				if( !$mol_wire_fiber.warm ) return this.result() as never
				
				if( $mol_wire_auto()?.temp ) {
					return this.once()
				} else {
					return this.sync()
				}
				
			}, { atom: this as $mol_wire_atom< Host, Args, Result > } )
		}
		
		destructor() {
			
			super.destructor()
			
			if( this.pub_from === 0 ) {
				;( this.host as any ?? this.task )[ this.field() ] = null
			} else {
				;( this.host as any ?? this.task )[ this.field() ].delete( $mol_key( this.args[0] ) )
			}
			
		}
		
		put( next: Result | Error | Promise< Result | Error > ) {
			
			const prev = this.cache
			
			update: if( next !== prev ) {
				
				try {
					if( $mol_compare_deep( prev, next ) ) break update
				} catch( error: any ) {
					$mol_fail_log( error )
				}
				
				if( $mol_owning_check( this, prev ) ) {
					prev.destructor()
				}
				
				if( $mol_owning_catch( this, next ) ) {
					try {
						(next as any)[ Symbol.toStringTag ] = (this as any)[ Symbol.toStringTag ]
					} catch { // Promises throw in strict mode
						Object.defineProperty( next, Symbol.toStringTag, { value: (this as any)[ Symbol.toStringTag ] } )
					}
				}
				
				if( !this.sub_empty ) this.emit()
				
			}
			
			this.cache = next
			this.cursor = $mol_wire_cursor.fresh
			
			if( $mol_promise_like( next ) ) return next
			
			this.complete_pubs()
			
			return next
		}
		
	}
}
