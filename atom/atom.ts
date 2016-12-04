declare var Proxy : any

namespace $ {
	
	export enum $mol_atom_status {
		obsolete = 'obsolete' as any ,
		checking = 'checking' as any ,
		pulling = 'pulling' as any ,
		actual = 'actual' as any ,
	}
	
	export class $mol_atom< Value > extends $mol_object {
		
		masters : $mol_set< $mol_atom<any> > = null
		slaves : $mol_set< $mol_atom<any> > = null
		
		status = $mol_atom_status.obsolete
		autoFresh = true
		
		handler : ( next? : Value|Error , force? : $mol_atom_force )=> Value
		host : { [ key : string ] : any }
		field : string
		
		constructor(
			handler : ( next? : Value|Error , force? : $mol_atom_force )=> Value ,
			host? : { [ key : string ] : any } ,
			field = 'value()'
		) {
			super()
			
			this.handler = handler
			this.host = Object( host )
			this.field = field || 'value()'
		}
		
		destroyed( next? : boolean ) {
			if( next ) {
				this.unlink()
				
				const host = this.host
				const value = host[ this.field ]
				if( value instanceof $mol_object ) {
					if( ( value.objectOwner() === host ) && ( value.objectField() === this.field ) ) {
						value.destroyed( true );
					}
				}
				
				host[ this.field ] = void null
				if( host[ '$mol_atom_state' ] ) host[ '$mol_atom_state' ][ this.field ] = void null
				
				this[ 'destroyed()' ] = true
				this.log( [ '.destroyed()' , true , 'atom' ] )
				
				return true
			} else {
				return this[ 'destroyed()' ]
			}
		}
		
		unlink() {
			this.disobeyAll()
			this.checkSlaves()
		}
		
		objectPath() {
			return `${ this.host }.${ this.field }`
		}
		
		get( force? : $mol_atom_force ) {
			if( this.status === $mol_atom_status.pulling ) {
				throw new Error( `Cyclic atom dependency of ${ this }` )
			}
			
			this.actualize( force )
			
			const slave = $mol_atom.stack[0]
			if( slave ) this.lead( slave )
			if( slave ) slave.obey( this )
			
			const value : Value = this.host[ this.field ]
			
			if( value instanceof Error ) {
				if( typeof Proxy !== 'function' ) throw value
				//if(!( value instanceof $mol_atom_wait )) throw value
			}
			
			return value
		}
		
		actualize( force? : $mol_atom_force ) {
			
			//this.log([ 'actualize' ])
			
			if( !force && this.status === $mol_atom_status.actual ) return
			
			const slave = $mol_atom.stack[0]
			$mol_atom.stack[0] = this
			
			if( !force && this.status === $mol_atom_status.checking ) {
				
				this.masters.forEach(
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
				
				this.push( next )
				
			}
			
			$mol_atom.stack[0] = slave
		}
		
		pull( force? : $mol_atom_force ) {
			try {
				return this.handler( this._next , force )
			} catch( error ) {
				if( !error['$mol_atom_catched'] ) {
					if( error instanceof $mol_atom_wait ) {
					} else {
						if( error instanceof Error ) {
							console.error( error.stack )
						} else {
							throw error
						}
					}
					void( ( error as any )['$mol_atom_catched'] = true )
				}
				return error
			}
		}
		
		_next : Value
		
		set( next : Value ) : Value {
			this._next = next
			this.obsolete()
			return this.get()
		}
		
		push( next : Value|Error ) {
			const host = this.host
			const prev = host[ this.field ]
			if( next === void null ) next = prev
			comparing: if( ( next !== prev ) && ( next instanceof Array ) && ( prev instanceof Array ) && ( next.length === prev.length ) ) {
				for( let i = 0 ; i < next[ 'length' ] ; ++i ) {
					if( next[ i ] !== prev[ i ] ) break comparing
				}
				next = <any> prev
			}
			if( prev !== next ) {
				if( next instanceof $mol_object ) {
					next[ 'objectField' ]( this.field ) // FIXME: type checking
					next[ 'objectOwner' ]( host ) // FIXME: type checking
				}
				if(( typeof Proxy === 'function' )&&( next instanceof Error )) {
					next = new Proxy( next , {
						get( target : Error ) {
							throw target.valueOf()
						} ,
						ownKeys( target : Error ) {
							throw target.valueOf()
						} ,
					} )
				}
				host[ this.field ] = next
				this.log( [ 'push' , next , prev ] )
				
				this.obsoleteSlaves()
			}
			this.status = $mol_atom_status.actual
			this._next = void null
			return next
		}
		
		obsoleteSlaves() {
			if( !this.slaves ) return
			
			this.slaves.forEach( slave => slave.obsolete() )
		}
		
		checkSlaves() {
			if( this.slaves ) {
				this.slaves.forEach( slave => slave.check() )
			} else {
				if( this.autoFresh ) $mol_atom.actualize( this )
			}
		}
		
		check() {
			//if( this.status === $mol_atom_status.pulling ) {
			//	throw new Error( `May be obsolated while pulling ${ this }` )
			//}
			
			if( this.status === $mol_atom_status.actual ) {
				//this.log([ 'checking' ])
				this.status = $mol_atom_status.checking
				
				this.checkSlaves()
			}
		}
		
		obsolete() : Value {
			if( this.status === $mol_atom_status.obsolete ) return
			
			//if( this.status === $mol_atom_status.pulling ) {
			//	throw new Error( `Obsolated while pulling ${ this }` )
			//} 
			
			this.log( [ 'obsolete' ] )
			
			this.status = $mol_atom_status.obsolete
			
			this.checkSlaves()
			
			return void null
		}
		
		lead( slave : $mol_atom<any> ) {
			if( !this.slaves ) {
				this.slaves = new $mol_set<$mol_atom<any>>()
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
			if( !this.masters ) this.masters = new $mol_set< $mol_atom<any> >()
			this.masters.add( master )
		}
		
		disobey( master : $mol_atom<any> ) {
			if( !this.masters ) return
			this.masters.delete( master )
		}
		
		disobeyAll() {
			if( !this.masters ) return
			
			this.masters.forEach( master => master.dislead( this ) )
			
			this.masters = null
		}
		
		value( next? : Value , force? : $mol_atom_force ) {
			if( next === void null ) {
				return this.get( force )
			} else {
				if( force ) {
					return this.push( next )
				} else {
					return this.set( next )
				}
			}
		}
		
		static stack = [ null ] as $mol_atom<any>[]
		static updating : $mol_atom<any>[] = []
		static reaping = new $mol_set< $mol_atom<any> >()
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
				() => {
					if( !this.scheduled ) return
					this.scheduled = false
					this.sync()
				}
			)
			
			this.scheduled = true
		}
		
		static sync() {
			$mol_log( '$mol_atom.sync' , [] )
			this.schedule()
			
			while( this.updating.length ) {
				const atom = this.updating.shift()
				if( this.reaping.has( atom ) ) continue
				if( !atom.destroyed() ) atom.get()
			}
			
			while( this.reaping.size ) {
				this.reaping.forEach(
					atom => {
						this.reaping.delete( atom )
						if( !atom.slaves ) atom.destroyed( true )
					}
				)
			}
			
			this.scheduled = false
		}
		
	}
	
	$mol_state_stack.set( '$mol_atom.stack' , $mol_atom.stack )
	
	export class $mol_atom_wait extends Error {
		name = '$mol_atom_wait'
		
		constructor( public message = 'Wait...' ) {
			super( message )
			const error : any = new Error( message )
			error.name = this.name
			error['__proto__'] = $mol_atom_wait.prototype
			return error
		}
	}
	
	export class $mol_atom_force extends Object {
		$mol_atom_force : boolean
		static $mol_atom_force : boolean
	}
	
	export function $mol_atom_task< Value >(
		handler : ()=> Value ,
	) {
		const atom = new $mol_atom<any>(
			() => {
				try {
					handler()
				} catch( error ) {
					if(!( error instanceof $mol_atom_wait )) atom.destroyed( true )
					throw error
				}
				atom.destroyed( true )
			} ,
		)
		
		$mol_atom.actualize( atom )
		
		return atom
	}
	
}
