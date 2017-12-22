namespace $ {
	
	export enum $mol_atom_status {
		obsolete = 'obsolete' ,
		checking = 'checking' ,
		pulling = 'pulling' ,
		actual = 'actual' ,
	}
	
	export class $mol_atom< Value = any > extends $mol_object {
		
		masters : Set< $mol_atom<any> > | null = null
		slaves : Set< $mol_atom<any> > | null = null
		
		status = $mol_atom_status.obsolete
		
		readonly handler : ( next? : Value|Error , force? : $mol_atom_force )=> Value|void

		'value()' : Value|Error
		
		constructor(
			id : string ,
			handler : ( next? : Value , force? : $mol_atom_force )=> Value|void = next => next ,
		) {
			super()
			
			this.object_id( id )
			this.handler = handler
		}
		
		destructor() {
			this.unlink()
			this.status = $mol_atom_status.actual
			
			const value = this['value()']
			
			if( value instanceof $mol_object ) {
				if( value.object_owner() === this ) value.destructor();
			}

			this['value()'] = undefined
		}
		
		unlink() {
			this.disobey_all()
			if( this.slaves ) this.check_slaves()
		}
		
		get( force? : $mol_atom_force ) {
			
			const slave = $mol_atom.stack[0]
			if( slave ) {
				this.lead( slave )
				slave.obey( this )
			}
			
			this.actualize( force )
			
			const value = this['value()'] as Value
			
			if( typeof Proxy !== 'function' && value instanceof Error ) {
				throw value
			}
			
			return value as Value
		}
		
		actualize( force? : $mol_atom_force ) {
			
			if( this.status === $mol_atom_status.pulling ) {
				throw new Error( `Cyclic atom dependency of ${ this }` )
			}
			
			if( !force && this.status === $mol_atom_status.actual ) return
			
			const slave = $mol_atom.stack[0]
			$mol_atom.stack[0] = this
			
			if( !force && this.status === $mol_atom_status.checking ) {
				
				this.masters!.forEach(
					master => {
						if( this.status !== $mol_atom_status.checking ) return
						master.actualize()
					}
				)
				
				if( this.status === $mol_atom_status.checking ) {
					this.status = $mol_atom_status.actual
				}
			}
			
			if( force || this.status !== $mol_atom_status.actual ) {
				
				const oldMasters = this.masters
				this.masters = null
				
				if( oldMasters ) oldMasters.forEach(
					master => {
						master.dislead( this )
					}
				)
				
				this.status = $mol_atom_status.pulling
				const next = this.pull( force )
				
				if( next === undefined ) {
					this.status = $mol_atom_status.actual
				} else {
					this.push( next )
				}
				
			}
			
			$mol_atom.stack[0] = slave
		}
		
		pull( force? : $mol_atom_force ) {
			try {
				return this.handler( this._next , force )
			} catch( error ) {
				if( error[ '$mol_atom_catched' ] ) return error
				if( error instanceof $mol_atom_wait ) return error
				
				console.error( error.stack || error )
				
				if(!( error instanceof Error )) {
					error = new Error( error.stack || error )
				}
				
				error['$mol_atom_catched'] = true
				return error
			}
		}
		
		_next : Value|Error
		_ignore : Value|Error
		
		set( next : Value ) {
			return this.value( next )
		}
		
		push( next_raw? : Value|Error ) : Value {
			if(!( next_raw instanceof $mol_atom_wait )) {
				this._ignore = this._next
				this._next = undefined
			}
			
			this.status = next_raw === undefined ? $mol_atom_status.obsolete : $mol_atom_status.actual
			
			const prev = this['value()']
			
			let next = ( next_raw instanceof Error || prev instanceof Error ) ? next_raw : $mol_conform( next_raw , prev )
			
			if( next === prev ) return prev as Value
			
			if( prev instanceof $mol_object ) {
				if( prev.object_owner() === this ) prev.destructor()
			}
			
			if( next instanceof $mol_object ) {
				next.object_owner( this )
			}
			
			if(( typeof Proxy === 'function' )&&( next instanceof Error )) {
				next = new Proxy( next , {
					get( target : Error ) {
						throw target.valueOf()
					} ,
					ownKeys( target : Error ) : string[] {
						throw target.valueOf()
					} ,
				} )
			}
			
			this['value()'] = next
			$mol_log( this , prev , '➔' , next )
			
			this.obsolete_slaves()
			
			return next as Value
		}
		
		obsolete_slaves() {
			if( !this.slaves ) return
			
			this.slaves.forEach( slave => slave.obsolete() )
		}
		
		check_slaves() {
			if( this.slaves ) {
				this.slaves.forEach( slave => slave.check() )
			} else {
				$mol_atom.actualize( this )
			}
		}
		
		check() {
			//if( this.status === $mol_atom_status.pulling ) {
			//	throw new Error( `May be obsolated while pulling ${ this }` )
			//}
			
			if( this.status === $mol_atom_status.actual ) {
				this.status = $mol_atom_status.checking
				
				this.check_slaves()
			}
		}
		
		obsolete() {
			if( this.status === $mol_atom_status.obsolete ) return
			
			//if( this.status === $mol_atom_status.pulling ) {
			//	throw new Error( `Obsolated while pulling ${ this }` )
			//} 
			
			this.status = $mol_atom_status.obsolete
			
			this.check_slaves()
			
			return
		}
		
		lead( slave : $mol_atom<any> ) {
			if( !this.slaves ) {
				this.slaves = new Set<$mol_atom<any>>()
				$mol_atom.unreap( this )
			}
			this.slaves.add( slave )
		}
		
		dislead( slave : $mol_atom<any> ) {
			if( !this.slaves ) return
			
			if( this.slaves.size === 1 ) {
				this.slaves = null
				$mol_atom.reap( this )
			} else {
				this.slaves.delete( slave )
			}
		}
		
		obey( master : $mol_atom<any> ) {
			if( !this.masters ) this.masters = new Set< $mol_atom<any> >()
			this.masters.add( master )
		}
		
		disobey( master : $mol_atom<any> ) {
			if( !this.masters ) return
			this.masters.delete( master )
		}
		
		disobey_all() {
			if( !this.masters ) return
			
			this.masters.forEach( master => master.dislead( this ) )
			
			this.masters = null
		}

		cache( next? : Value|Error ) {
			if( next === undefined ) return this['value()']
			return this['value()'] = next
		}
		
		value( next? : Value , force? : $mol_atom_force ) : Value {

			if( force === $mol_atom_force_cache ) return this.push( next )

			if( next !== undefined ) {
				
				if( force === $mol_atom_force ) return this.push( next )

				let next_normal = $mol_conform( next , this._ignore )
				if( next_normal === this._ignore ) return this.get( force )

				if(!( this['value()'] instanceof Error )) {
					next_normal = $mol_conform( next , this['value()'] )
					if( next_normal === this['value()'] ) return this.get( force )
				}

				this._next = next_normal
				this._ignore = next_normal

				force = $mol_atom_force_update
			}
			
			return this.get( force )
		}
		
		static stack = [] as $mol_atom<any>[]
		static updating : $mol_atom<any>[] = []
		static reaping = new Set< $mol_atom<any> >()
		static scheduled = false
		
		static actualize( atom : $mol_atom<any> ) {
			$mol_atom.updating.push( atom )
			$mol_atom.schedule()
		}
		
		static reap( atom : $mol_atom<any> ) {
			$mol_atom.reaping.add( atom )
			$mol_atom.schedule()
		}
		
		static unreap( atom : $mol_atom<any> ) {
			$mol_atom.reaping.delete( atom )
		}
		
		static schedule() {
			if( this.scheduled ) return
			
			new $mol_defer(
				$mol_log_group( '$mol_atom.sync()' , () => {
					if( !this.scheduled ) return
					this.scheduled = false
					this.sync()
				} )
			)
			
			this.scheduled = true
		}
		
		static sync() {
			this.schedule()
			
			while( true ) {
				const atom = this.updating.shift()
				if( !atom ) break
				if( this.reaping.has( atom ) ) continue
				if( atom.status !== $mol_atom_status.actual ) atom.get()
			}
			
			while( this.reaping.size ) {
				this.reaping.forEach(
					atom => {
						this.reaping.delete( atom )
						if( !atom.slaves ) atom.destructor()
					}
				)
			}
			
			this.scheduled = false
		}
		
		then< Next >( done : ( prev? : Value )=> Next , fail? : ( error : Error )=> Next ) {
			
			let prev : Value
			let next : Next
			
			const atom = new $mol_atom<any>(
				`${ this }.then(${ done })` ,
				() => {
					try {
						
						if( prev == undefined ) {
							const val = this.get()
							if( val instanceof $mol_atom_wait ) return val
							if( val ) val.valueOf()
							prev = val
						}
						
						if( next == undefined ) {
							const val = done( prev )
							if( val instanceof $mol_atom_wait ) return val
							if( val ) val.valueOf()
							next = val
						}
						
						return next

					} catch( error ) {
						
						if( error instanceof $mol_atom_wait ) return error
						
						if( fail ) return fail( error )
						
						return error
					}

				} ,
			)
			
			$mol_atom.actualize( atom )
			
			return atom
		}
		
		catch( fail : ( error : Error )=> Value ) {
			return this.then( next => next , fail )
		}
		
	}
	
	$mol_state_stack.set( '$mol_atom.stack' , $mol_atom.stack )

	export function $mol_atom_current< Value = any >() {
		return $mol_atom.stack[0] as $mol_atom< Value >
	}
	
	export class $mol_atom_wait extends Error {
		name = '$mol_atom_wait'
	}
	
	export class $mol_atom_force extends Object {
		$mol_atom_force : boolean
		static $mol_atom_force : boolean
		static toString() { return this.name }
	}

	export class $mol_atom_force_cache extends $mol_atom_force {}
	export class $mol_atom_force_update extends $mol_atom_force {}
	
}
