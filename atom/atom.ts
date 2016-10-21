declare var Proxy : any

module $ {
	
	export enum $mol_atom_status {
		obsolete = 'obsolete' as any ,
		checking = 'checking' as any ,
		actual = 'actual' as any ,
	}
	
	export class $mol_atom< Value > extends $mol_object {
		
		masters : $mol_set< $mol_atom<any> > = null
		slaves : $mol_set< $mol_atom<any> > = null
		
		status = $mol_atom_status.obsolete
		autoFresh = true
		
		'value()' = <Value> void 0
		
		constructor(
			public handler : ( next? : Value|Error , prev? : Value|Error )=> Value ,
			public fail? : ( host : any , error : Error )=> Value|Error ,
			public host? : { objectPath() : string , [ key : string ] : any } ,
			public field = 'value()' ,
			public key? : any
		) {
			super()
		}
		
		destroyed( next? : boolean ) {
			if( next ) {
				this.unlink()
				
				const host = this.host || this
				const value = host[ this.field ]
				if( value instanceof $mol_object ) {
					if( ( value.objectOwner() === host ) && ( value.objectField() === this.field ) ) {
						value.destroyed( true );
					}
				}
				
				if( this.host ) {
					host[ this.field ] = void 0
					host[ '$mol_atom_state' ][ this.field ] = void 0
				}
				
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
			return this.host ? this.host.objectPath() + '.' + this.field : this.field
		}
		
		get() {
			const slave = $mol_atom.stack[0]
			if( slave ) this.lead( slave )
			if( slave ) slave.obey( this )
			
			this.actualize()
			
			const value : Value|Error = ( this.host || this )[ this.field ]
			
			if( value instanceof Error ) {
				if( typeof Proxy !== 'function' ) throw value
				//if(!( value instanceof $mol_atom_wait )) throw value
			}
			
			return value
		}
		
		actualize() {
			
			//this.log([ 'actualize' ])
			
			if( this.status === $mol_atom_status.actual ) return
			
			const slave = $mol_atom.stack[0]
			$mol_atom.stack[0] = this
			
			if( this.status === $mol_atom_status.checking ) {
				
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
			
			if( this.status !== $mol_atom_status.actual ) {
				
				const oldMasters = this.masters
				this.masters = null
				
				if( oldMasters ) oldMasters.forEach(
					master => {
						master.dislead( this )
					}
				)
				
				this.push( this.pull() )
				
			}
			
			$mol_atom.stack[0] = slave
		}
		
		pull() {
			const host = this.host || this
			try {
				if( this.key !== void 0 ) {
					return this.handler.call( host , this.key )
				} else {
					return this.handler.call( host )
				}
			} catch( error ) {
				if( !error['$mol_atom_catched'] ) {
					if( error instanceof $mol_atom_wait ) {
					} else {
						console.error( error )
					}
					error['$mol_atom_catched'] = true
				}
				return error
			}
		}
		
		set( next : Value|Error , prev? : Value|Error ) {
			const host = this.host || this
			let next2 : Value|Error
			if( this.key !== void 0 ) {
				next2 = this.handler.call( host , this.key , next , prev )
			} else {
				next2 = this.handler.call( host , next , prev )
			}
			if( next2 === void 0 ) return host[ this.field ]
			return this.push( next2 )
		}
		
		push( next : Value|Error ) {
			const host = this.host || this
			const prev = host[ this.field ]
			if( next instanceof Error && this.fail ) {
				if( this.key !== void 0 ) {
					next = this.fail.call( host , this.key , host , <Error> next )
				} else {
					next = this.fail.call( host , host , <Error> next )
				}
			}
			comparing: if( ( next instanceof Array ) && ( prev instanceof Array ) && ( next.length === prev.length ) ) {
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
						}
					} )
				}
				host[ this.field ] = next
				this.log( [ 'push' , next , prev ] )
				
				this.obsoleteSlaves()
			}
			this.status = $mol_atom_status.actual
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
			if( this.status === $mol_atom_status.actual ) {
				//this.log([ 'checking' ])
				this.status = $mol_atom_status.checking
				
				this.checkSlaves()
			}
		}
		
		obsolete() : Value {
			if( this.status === $mol_atom_status.obsolete ) return
			
			this.log( [ 'obsolete' ] )
			
			this.status = $mol_atom_status.obsolete
			
			this.checkSlaves()
			
			return void 0
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
		
		//value( ...diff : (Value|Error)[] ) {
		//	if( diff[ 0 ] === void 0 ) {
		//		if( diff.length > 1 ) return this.push( diff[ 1 ] )
		//		if( diff.length > 0 ) return this.obsolete()
		//		return this.get()
		//	} else {
		//		return this.set( ...diff )
		//	}
		//}
		
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
	
	export function $mol_atom_task< Value >(
		handler : ()=> Value ,
		fail? : ( error : Error )=> Error|Value
	) {
		const atom = new $mol_atom<any>(
			() => {
				handler()
				atom.destroyed( true )
			} ,
			fail ,
		)
		
		$mol_atom.actualize( atom )
		
		return atom
	}
	
}
