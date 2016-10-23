module $ {
	
	export const $mol_atom2_registry = {} as {
		[ path : string ] : $mol_atom2_state< any >
	}
	
	export let $mol_atom2_context = {
		path : '' ,
		index : 0 ,
	}
	
	export let $mol_atom2_version = 0
	
	export function $mol_atom2< Value >( pull : ()=> Value ) {
		const path = $mol_atom2_context.path + '.' + $mol_atom2_context.index
		$mol_atom2_context.index ++
		
		let atom : $mol_atom2_state< Value > = $mol_atom2_registry[ path ]
		if( !atom ) atom = $mol_atom2_registry[ path ] = new $mol_atom2_state({ pull , path })
		
		return atom.get()
	}
	
	export class $mol_atom2_state< Value > {
		
		_pull() {
			return void 0 as Value
		}
		
		_value = void 0 as Value|Error
		_path : string
		_version = -1
		
		constructor( config : {
			pull? : ()=> Value
			path? : string
		} ) {
			if( config.pull ) this._pull = config.pull
			this._path = config.path || ''
		}
		
		pull() {
			const context = $mol_atom2_context
			$mol_atom2_context = {
				path : this._path ,
				index : 0 ,
			}
			
			try {
				console.debug( 'pull' , this._path )
				this.push( this._pull() )
			} catch( error ) {
				this.push( error )
			}
			
			$mol_atom2_context = context
		}
		
		push( next : Value|Error ) {
			this._value = next
			this._version = $mol_atom2_version
		}
		
		get() {
			if( this._version < $mol_atom2_version ) this.pull()
			if( this._value instanceof Error ) throw this._value
			return this._value as Value
		}
		
	}
	
	const x = new $mol_atom2_state({ pull : () => 4 })
	const getZ = ()=> {
		const y = $mol_atom2( () => x.get() + 1 )
		
		const z = $mol_atom2( () => y * 2 )
		
		return z
	}
	const foo = new $mol_atom2_state({ pull : ()=> {
		return getZ()
	} })
	
	console.log( foo.get() )
	$mol_atom2_version ++
	x.push( 1 )
	console.log( foo.get() )
	
}

