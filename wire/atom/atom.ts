namespace $ {

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
			
			const prefix = host?.[ Symbol.toStringTag ] ?? ( host instanceof Function ? $$.$mol_func_name( host ) : host )
			const key = `${ prefix }.${ field }`
			
			const fiber = new $mol_wire_atom( key, task, host, [] as any as Args )
			;( host ?? task )[ field ] = fiber
			
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
			const prefix = host?.[ Symbol.toStringTag ] ?? ( host instanceof Function ? $$.$mol_func_name( host ) : host )
			const id = `${ prefix }.${ task.name }(${ $mol_key( key ) })`
			
			if( dict ) {
				const existen = dict.get( id )
				if( existen ) return existen
			} else {
				dict = ( host ?? task )[ field ] = new Map<any,any>()
			}
			
			const fiber = new $mol_wire_atom( id, task, host, [ key ] as any as Args )
			dict.set( id, fiber )
			
			return fiber
		}
		
		static watching = new Set< $mol_wire_atom< any, any, any > >()
		
		static watch() {
		
			new $mol_after_frame( $mol_wire_atom.watch )
			
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
			$mol_wire_atom.watching.add( this )
		}
		
		/**
		 * Update fiber value through another temp fiber.
		 */
		@ $mol_wire_method
		resync( args: Args ) {
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
		
		put( next: Result | Error | Promise< Result | Error > ) {
			
			const prev = this.cache
			
			if( next !== prev ) {
				
				if( $mol_owning_check( this, prev ) ) {
					prev.destructor()
				}
				
				this.cache = next
				
				if( $mol_owning_catch( this, next ) ) {
					try {
						next[ Symbol.toStringTag ] = this[ Symbol.toStringTag ]
					} catch { // Promises throws in strict mode
						Object.defineProperty( next, Symbol.toStringTag, { value: this[ Symbol.toStringTag ] } )
					}
				}
				
				if( this.sub_from < this.data.length ) {
					if( !$mol_compare_deep( prev, next ) ) {
						this.emit()
					}
				}
				
			}
			
			this.cursor = $mol_wire_cursor.fresh
			
			if( next instanceof Promise ) return next
			
			this.complete_pubs()
			
			return next
		}
		
	}
	
	$mol_wire_atom.watch()
	
}
