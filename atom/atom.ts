class $mol_atom< Value > extends $mol_object {
	
	constructor(
		public host : { objectPath() : string } ,
		public field : string ,
		public handler : ( ...diff : (Value|Error)[] )=> Value ,
		public fail? : ( host : any , error : Error )=> Value|Error ,
		public key? : any
	) {
		super()
	}
	
	destroyed( ...diff : boolean[] ) {
		if( diff[0] ) {
			this.unlink()
			
			var value = this.host[ this.field ]
			if( value instanceof $mol_object ) {
				if( ( value.objectOwner() === this.host ) && ( value.objectField() === this.field ) ) {
					value.destroyed( true );
				}
			}
			
			this.host[ this.field ] = void 0
			this.host[ '$mol_atom_state' ][ this.field ] = void 0
			
			this['destroyed()'] = true
			this.log([ '.destroyed()' , true , 'atom' ])
			
			return true
		} else {
			return this['destroyed()']
		}
	}
	
	unlink() {
		this.disobeyAll()
		this.notifySlaves()
	}
	
	objectPath() {
		return this.host.objectPath() + '.' + this.field
	}
	
	masters : $mol_set< $mol_atom<any> >
	mastersDeep = 0
	planned = false
	
	slaves : $mol_set< $mol_atom<any> >
	
	get() {
		if( $mol_atom.stack.indexOf( this ) !== -1 ) {
			throw new Error( 'Recursive dependency! ' + this.objectPath() )
		}
		
		var slave = $mol_atom.stack[ $mol_atom.stack.length - 1 ]
		if( slave ) this.lead( slave )
		if( slave ) slave.obey( this )
		
		var value : Value|Error = this.host[ this.field ]
		if( value === void 0 ) {
			value = this.pull()
		}
		
		if( value instanceof Error ) throw value
		else return value
	}
	
	pull() {
		this.log( [ 'pull' ] )
		
		if( this.planned ) {
			var level = $mol_atom.plan[ this.mastersDeep ]
			if( level ) {
				var index = level.indexOf( this )
				if( index !== -1 ) level.splice( index , 1 )
			}
			this.planned = false
		}
		
		var oldMasters = this.masters
		
		if( oldMasters ) oldMasters.forEach( master => {
			//if( this.masters && this.masters.has( master ) ) return
			master.dislead( this )
		} )
		
		this.masters = null
		this.mastersDeep = 0
		
		var index = $mol_atom.stack.length
		$mol_atom.stack.push( this )
		if( this.key !== void 0 ) {
			var next = this.handler.call( this.host , this.key )
		} else {
			var next = this.handler.call( this.host )
		}
		if( next === void 0 ) next = this.host[ this.field ]
		$mol_atom.stack.length = index
		
		return this.push( next )
	}
	
	set( ...diff : (Value|Error)[] ) {
		if( this.key !== void 0 ) {
			var next = this.handler.call( this.host , this.key , ...diff )
		} else {
			var next = this.handler.call( this.host , ...diff )
		}
		if( next === void 0 ) return this.host[ this.field ]
		return this.push( next )
	}
	
	push( next : Value|Error ) {
		var prev = this.host[ this.field ]
		if( next instanceof Error && this.fail ) {
			if( this.key !== void 0 ) {
				next = this.fail.call( this.host , this.key , this.host , <Error> next )
			} else {
				next = this.fail.call( this.host , this.host , <Error> next )
			}
		}
		if( prev !== next ) {
			if( next instanceof $mol_object ) {
				next['objectField']( this.field ) // FIXME: type checking
				next['objectOwner']( this.host ) // FIXME: type checking
			}
			this.host[ this.field ] = next
			this.log([ 'push' , next , prev ])
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
		if( this.planned ) return
		this.planned = true
		
		this.log( [ 'update' ] )
		$mol_atom.actualize( this )
		
		return void 0
	}
	
	lead( slave : $mol_atom<any> ) {
		if( !this.slaves ) this.slaves = new $mol_set< $mol_atom<any> >()
		this.slaves.add( slave )
	}
	
	dislead( slave : $mol_atom<any> ){
		if( !this.slaves ) return
		
		this.slaves.delete( slave )
		
		if( !this.slaves.size ){
			this.slaves = null
			$mol_atom.reaping.add( this )
		}
	}
	
	obey( master : $mol_atom<any> ) {
		if( !this.masters ) this.masters = new $mol_set< $mol_atom<any> >()
		
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
			if( diff.length > 0 ) return this.update()
			return this.get()
		} else {
			return this.set( ...diff )
		}
	}
	
	static stack = [] as $mol_atom<any>[]
	static plan : $mol_atom<any>[][] = []
	static planStart = 0
	static reaping = new $mol_set< $mol_atom<any> >()
	static scheduled = false
	
	static actualize( atom : $mol_atom<any> ) {
		var deep = atom.mastersDeep
		var plan = $mol_atom.plan
		
		var level = plan[ deep ]
		if( !level ) level = plan[ deep ] = []
		
		level.push( atom )
		if( deep < this.planStart ) this.planStart = deep
		
		$mol_atom.schedule()
	}
	
	static schedule( ) {
		if( this.scheduled ) return
		
		new $mol_defer( () => {
			if( !this.scheduled ) return
			this.scheduled = false
			this.sync()
		} )
		
		this.scheduled = true
	}
	
	static sync() {
		$mol_log( '$mol_atom.sync' , [] )
		this.schedule()
		
		for( var i = this.planStart ; i < this.plan.length ; ++i ) {
			var level = this.plan[ i ]
			if( !level ) continue
			if( level.length === 0 ) continue
			
			var atom = level.pop()
			if( !atom.destroyed() ) {
				atom.planned = false
				atom.pull()
			}
			
			i = this.planStart - 1
		}
		
		this.reaping.forEach( atom => {
			this.reaping.delete( atom )
			if( !atom.slaves ) atom.destroyed( true )
		} )
		
		this.scheduled = false
	}
	
	static restore() {
		this.stack.splice( 0 , this.stack.length )
	}
}

$mol_state_stack.set( '$mol_atom.stack' , $mol_atom.stack )

class $mol_atom_wait extends Error {
	name = '$mol_atom_wait'
	constructor( public message = 'Wait...' ) {
		super( message )
	}
}
