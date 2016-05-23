/// Common superclass that provides base functionality.
class $mol_object {
	
	static objectPath() {
		return this['name']
	}
	
	/// JS-path to this object from global scope. Can not be redefined.
	private 'objectPath()' : string
	objectPath( next? : string ) {
		if( this['objectPath()'] ) return this['objectPath()']
		return this['objectPath()'] = next
	}
	
	/// Helper to override fields in fluent style.
	setup( script : ( obj : this )=> void ) : this {
		script( this )
		return this
	}
	
	destroy() {
		$jin2_log_info( 'destroy' , this.objectPath() )
	}
	
	toString() {
		return this.objectPath()
	}
}
