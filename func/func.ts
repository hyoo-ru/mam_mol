interface Function {
	name : string
}

namespace $ {
	
	export var $mol_func_name_dict = new WeakMap< Function , string >()

	export function $mol_func_name( func : Function ) : string {
		if( func.name ) return func.name
		
		let name = $mol_func_name_dict.get( func )
		if( name != null ) return name
		
		name = Function.prototype.toString.call( func ).match( /^function ([a-z0-9_$]*)/ )[ 1 ]
		$mol_func_name_dict.set( func , name )
		
		return name
	}

}
