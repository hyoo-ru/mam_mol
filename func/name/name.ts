namespace $ {
	
	export var $mol_func_name_dict = new WeakMap< Function , string >()

	export function $mol_func_name( func : Function ) : string {
		let name = $mol_func_name_dict.get( func )
		if( name != null ) return name
		name = func.name || Function.prototype.toString.call( func ).match( /([a-z0-9_$]*) ?(\(|\{|extends)/ )[ 1 ]
		$mol_func_name_dict.set( func , name )
		
		return name
	}

}
