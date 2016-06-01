class $mol_atom< Value > extends $mol_object {
	
	constructor(
		public host : { objectPath() : string } ,
		public field : string ,
		public handler : ( ...diff : (Value|Error)[] )=> Value ,
		public fail? : ( error : Error )=> Value|Error
	) {
		super()
	}
	
	destroy() {
		super.destroy()
		
		this.unlink()
		
		var value = this.host[ this.field ]
		if( value instanceof $mol_object ) {
			if( value.objectPath() === this.objectPath() ) {
				value.destroy();
			}
		}
		
		this.host[ this.field ] = void 0
	}
	
	unlink() {
		this.disobeyAll()
		this.notifySlaves()
	}
	
	objectPath() {
		return this.host.objectPath() + '.' + this.field
	}
	
	masters : Set< $mol_atom<any> >
	mastersDeep = 0
	
	slaves : Set< $mol_atom<any> >
	
	get() {
		if( $mol_atom.stack.indexOf( this ) !== -1 ) {
			throw new Error( 'Recursive dependency! ' + this.objectPath() )
		}
		
		var slave = $mol_atom.stack[ $mol_atom.stack.length - 1 ]
		if( slave ) this.lead( slave )
		if( slave ) slave.obey( this )
		
		var value : Value|Error = this.host[ this.field ]
		if( value === void 0 ) {
			var value = this.pull()
		}
		
		if( value instanceof Error ) throw value
		else return value
	}
	
	pull() {
		this.log( 'pull' )
		
		var level = $mol_atom.plan[ this.mastersDeep ]
		if( level ) level.delete( this )
		
		var oldMasters = this.masters
		
		this.masters = null
		this.mastersDeep = 0
		
		var index = $mol_atom.stack.length
		$mol_atom.stack.push( this )
		var next = this.handler()
		$mol_atom.stack.length = index
		
		if( oldMasters ) oldMasters.forEach( master => {
			if( this.masters && this.masters.has( master ) ) return
			master.dislead( this )
		} )
		
		return this.push( next )
	}
	
	set( ...diff : (Value|Error)[] ) {
		return this.push( this.handler( ...diff ) )
	}
	
	push( next : Value|Error ) {
		var prev = this.host[ this.field ]
		if( next instanceof Error && this.fail ) next = this.fail( <Error> next )
		if( prev !== next ) {
			if( next instanceof $mol_object ) {
				next['objectField']( this.field ) // FIXME: type checking
				next['objectOwner']( this.host ) // FIXME: type checking
			}
			this.host[ this.field ] = next
			this.log( 'push' , [ next , prev ] )
			this.notifySlaves()
		}
		return next
	}
	
	notifySlaves( ) {
		if( this.slaves ){
			this.slaves.forEach( slave => {
				if( $mol_atom.stack[ $mol_atom.stack.length - 1 ] === slave ) return
				slave.update()
			} )
		}
	}
	
	update() {
		$mol_atom.actualize( this )
	}
	
	lead( slave : $mol_atom<any> ) {
		if( !this.slaves ) this.slaves = new Set< $mol_atom<any> >()
		this.slaves.add( slave )
	}
	
	dislead( slave : $mol_atom<any> ){
		if( !this.slaves ) return
		
		this.slaves.delete( slave )
		
		if( !this.slaves.size ){
			this.slaves = null
			this.destroy()
		}
	}
	
	obey( master : $mol_atom<any> ) {
		if( !this.masters ) this.masters = new Set< $mol_atom<any> >()
		
		this.masters.add( master )
		
		var masterDeep = master.mastersDeep
		if( this.mastersDeep <= masterDeep ) {
			this.mastersDeep = masterDeep + 1
		}
	}
	
	disobey( master : $mol_atom<any> ){
		if( !this.masters ) return
		this.masters.delete( master )
		if( !this.masters.size ) this.masters = null
	}
	
	disobeyAll( ) {
		if( !this.masters ) return
		
		this.masters.forEach( master => master.dislead( this ) )
		
		this.masters = null
		this.mastersDeep = 0
	}
	
	value( ...diff : (Value|Error)[] ) {
		if( diff[0] === void 0 ) {
			if( diff.length > 1 ) return this.push( diff[1] )
			if( diff.length > 0 ) this.update()
			return this.get()
		} else {
			return this.set( ...diff )
		}
	}
	
	static stack = <$mol_atom<any>[]> []
	static plan : Array< Set< $mol_atom<any> > > = []
	static scheduled = false
	
	static actualize( atom : $mol_atom<any> ) {
		var deep = atom.mastersDeep
		var plan = $mol_atom.plan
		
		var level = plan[ deep ]
		if( !level ) level = plan[ deep ] = new Set< $mol_atom<any> >()
		
		level.add( atom )
		
		$mol_atom.schedule()
	}
	
	static schedule( ) {
		if( $mol_atom.scheduled ) return
		
		requestAnimationFrame( () => {
			$mol_atom.scheduled = false
			$mol_atom_sync()
		} )
		
		$mol_atom.scheduled = true
	}
		
}

$mol_state_stack.set( '$mol_atom.stack' , $mol_atom.stack )

class $mol_atom_wait extends Error {
	constructor( public message = 'Wait...' ) {
		super( message )
	}
}

function $mol_atom_sync() {
	for( var i = 0 ; i < $mol_atom.plan.length ; ++ i ) {
		var level = $mol_atom.plan[ i ]
		if( !level ) continue
		
		while( level.size ) {
			level.forEach(
				atom => {
					level.delete( atom )
					atom.pull()
				}
			)
		}
		
		$mol_atom.plan[ i ] = null
	}
}

function $mol_atom_restore() {
	$mol_atom.stack.splice( 0 , $mol_atom.stack.length )
}
