namespace $ {
	
	/// Common superclass that provides base functionality.
	export class $mol_object {
		
		Class() {
			return this.constructor as any
		}
		
		static toString() : string {
			return $mol_func_name( this )
		}
		
		/// Owner object.
		private 'object_owner()' : Object
		
		object_owner( next? : Object ) {
			if( this[ 'object_owner()' ] ) return this[ 'object_owner()' ]
			return this[ 'object_owner()' ] = next
		}
		
		/// Field in owner where this object is stored.
		private 'object_field()' : string
		
		object_field( next? : string ) {
			if( this[ 'object_field()' ] ) return this[ 'object_field()' ] || ''
			return this[ 'object_field()' ] = next
		}
		
		/// JS-path to this object from global scope. Can not be redefined.
		toString() {
			var path = ''
			
			var owner = this.object_owner()
			if( owner ) path = owner.toString()
			
			var field = this.object_field()
			if( field ) path += '.' + field
			
			return path
		}
		
		/// Helper to override fields in fluent style.
		setup( script : ( obj : this )=> void ) : this {
			script( this )
			return this
		}
		
		'destroyed()' = false
		
		destroyed( next? : boolean ) {
			if( next === void 0 ) return this[ 'destroyed()' ]
			this[ 'destroyed()' ] = next
			this.log( [ '.destroyed()' , next ] )
			return next
		}
		
		log( values : any[] ) {
			if( $mol_log.filter() == null ) return
			$mol_log( this.toString() , values )
		}
		
	}
	
}
