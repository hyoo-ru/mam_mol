class $mol_atom_info< Key , Value > extends $mol_object {
	
	constructor(
		public host : { objectPath() : string } ,
		public field : string ,
		public handler : ( arg? : Key , diff? : (Value|Error)[] )=> Value ,
		public key : Key
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
		this.host[ '$mol_atom_state' ][ this.field ] = void 0
	}
	
	unlink() {
		this.disobeyAll()
		this.notifySlaves()
	}
	
	objectPath() {
		return this.host.objectPath() + '.' + this.field
	}
	
	masters : Set< $mol_atom_any >
	mastersDeep = 0
	
	slaves : Set< $mol_atom_any >
	
	get() {
		var slave = $mol_atom_stack[ $mol_atom_stack.length - 1 ]
		if( slave ) this.lead( slave )
		if( slave ) slave.obey( this )
		
		var value : Value|Error = this.host[ this.field ]
		if( value === void 0 ) {
			var value = this.pull()
			if( value === void 0 ) throw new $mol_atom_wait
		}
		
		if( value instanceof Error ) throw value
		else return value
	}
	
	pull() {
		var level = $mol_atom_plan[ this.mastersDeep ]
		if( level ) level.delete( this )
		
		if( $mol_atom_stack.indexOf( this ) !== -1 ) {
			throw new Error( 'Recursive dependency! ' + this.objectPath() )
		}
		
		var oldMasters = this.masters
		
		this.masters = null
		this.mastersDeep = 0
		
		var index = $mol_atom_stack.length
		$mol_atom_stack.push( this )
		var next = this.handler.call( this.host , this.key )
		$mol_atom_stack.length = index
		
		if( oldMasters ) oldMasters.forEach( master => {
			if( this.masters && this.masters.has( master ) ) return
			master.dislead( this )
		} )
		
		return this.push( next )
	}
	
	set( diff : Array<Value|Error> ) {
		return this.push( this.handler.call( this.host , this.key , diff ) )
	}
	
	push( next : Value|Error ) {
		var prev = this.host[ this.field ]
		if( prev !== next ) {
			if( next instanceof $mol_object ) {
				next['objectPath']( this.objectPath() ) // FIXME: type checking
			}
			this.host[ this.field ] = next
			this.notifySlaves()
		}
		return next
	}
	
	notifySlaves( ) {
		if( this.slaves ){
			this.slaves.forEach( slave => {
				if( $mol_atom_stack[ $mol_atom_stack.length - 1 ] === slave ) return
				slave.update()
			} )
		}
	}
	
	update() {
		$mol_atom_actualize( this )
	}
	
	lead( slave : $mol_atom_any ) {
		if( !this.slaves ) this.slaves = new Set< $mol_atom_any >()
		this.slaves.add( slave )
	}
	
	dislead( slave : $mol_atom_any ){
		if( !this.slaves ) return
		
		this.slaves.delete( slave )
		
		if( !this.slaves.size ){
			this.slaves = null
			this.destroy()
		}
	}
	
	obey( master : $mol_atom_any ) {
		if( !this.masters ) this.masters = new Set< $mol_atom_any >()
		
		this.masters.add( master )
		
		var masterDeep = master.mastersDeep
		if( this.mastersDeep <= masterDeep ) {
			this.mastersDeep = masterDeep + 1
		}
	}
	
	disobey( master : $mol_atom_any ){
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
	
}

type $mol_atom_any = $mol_atom_info< any , any >

var $mol_atom_stack = <$mol_atom_any[]> []
$mol_state_stack.set( '$mol_atom_stack' , $mol_atom_stack )

var $mol_atom_all = new Map< string , $mol_atom_info<any,any> >()

class $mol_atom_wait extends Error {
	constructor( public message = 'Wait...' ) {
		super( message )
	}
}

var $mol_atom_plan : Array< Set< $mol_atom_any > > = []

function $mol_atom_actualize( atom : $mol_atom_any ) {
	var deep = atom.mastersDeep
	var plan = $mol_atom_plan
	
	var level = plan[ deep ]
	if( !level ) level = plan[ deep ] = new Set< $mol_atom_any >()
	
	level.add( atom )
	
	$mol_atom_schedule()
}

var $mol_atom_scheduled = false
function $mol_atom_schedule( ) {
	if( $mol_atom_scheduled ) return
	
	requestAnimationFrame( () => {
		$mol_atom_scheduled = false
		$mol_atom_sync()
	} )
	
	$mol_atom_scheduled = true
}

function $mol_atom_sync() {
	for( var i = 0 ; i < $mol_atom_plan.length ; ++ i ) {
		var level = $mol_atom_plan[ i ]
		if( !level ) continue
		
		while( level.size ) {
			level.forEach(
				atom => {
					level.delete( atom )
					atom.pull()
				}
			)
		}
		
		$mol_atom_plan[ i ] = null
	}
}

module $mol_atom_sync {
}

/// Creates the decorator for caching result value by json-key passed as first argument.
/// Method must be a polymorphic property (getter/setter/getter+setter).
function $mol_atom( ) {
	
	return function< Host extends { objectPath() : string } , Key , Value >(
		obj : Host ,
		name : string ,
		descr : TypedPropertyDescriptor< ( key? : Key , diff? : Value[] ) => Value >
	) {
		var value = descr.value
		descr.value = function( key? : Key , diff? : Value[] ) {
			var host : Host = this
			var field = name + "(" + ( key === void 0 ? '' : JSON.stringify( key ) ) + ")"
			var path = host.objectPath() + '.' + field
			
			var atoms = host[ '$mol_atom_state' ]
			if( !atoms ) atoms = host[ '$mol_atom_state' ] = {}
			
			var info : $mol_atom_any = atoms[ field ]
			if( !info )	atoms[ field ] = info = new $mol_atom_info( host , field , value , key )
			
			if( diff ) {
				return info.set( diff )
			} else if( diff === null ) {
				return info.update()
			} else {
				return info.get()
			}
		}
	}

}
