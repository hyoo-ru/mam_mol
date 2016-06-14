/// Common superclass that provides base functionality.
class $mol_object {
	
	static objectPath() {
		return this['name']
	}
	
	/// Owner object.
	private 'objectOwner()' : { objectPath() : string }
	objectOwner( next? : { objectPath() : string } ) {
		if( this['objectOwner()'] ) return this['objectOwner()']
		return this['objectOwner()'] = next
	}
	
	/// Field in owner where this object is stored.
	private 'objectField()' : string
	objectField( next? : string ) {
		if( this['objectField()'] ) return this['objectField()'] || ''
		return this['objectField()'] = next
	}
	
	/// JS-path to this object from global scope. Can not be redefined.
	objectPath( next? : string ) {
		var path = ''
		
		var owner = this.objectOwner()
		if( owner ) path = owner.objectPath()
		
		var field = this.objectField()
		if( field ) path += '.' + field
		
		return path
	}
	
	/// Helper to override fields in fluent style.
	setup( script : ( obj : this )=> void ) : this {
		script( this )
		return this
	}
	
	destroy() {
		this.log( 'destroy' )
	}
	
	log( ...values : any[] ) {
		$mol_log( this.objectPath() , ...values )
	}

	static toString() {
		return this.objectPath()
	}
	
	toString() {
		return this.objectPath()
	}
}
