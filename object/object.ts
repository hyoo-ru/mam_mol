namespace $ {

	/// Common superclass that provides base functionality.
	export class $mol_object {
		
		Class() {
			return this.constructor as any
		}
		
		static toString() : string {
			let self : any = this
			return self[ 'name' ]
				|| self[ 'displayName' ]
				|| ( self[ 'displayName' ] = Function.prototype.toString.call( self )
				.match( /^function ([a-z0-9_$]*)/ )[ 1 ] )
		}
		
		'objectClassNames()' : string[]
		
		objectClassNames() {
			if( this.hasOwnProperty( 'objectClassNames()' ) ) return this[ 'objectClassNames()' ]
			
			var names : string[] = []
			var current = this
			
			while( current ) {
				var name = current.constructor.toString()
				if( !name ) continue
				
				names.push( name )
				
				current = Object.getPrototypeOf( current )
			}
			
			return this[ 'objectClassNames()' ] = names
		}
		
		/// Owner object.
		private 'objectOwner()' : Object
		
		objectOwner( next? : Object ) {
			if( this[ 'objectOwner()' ] ) return this[ 'objectOwner()' ]
			return this[ 'objectOwner()' ] = next
		}
		
		/// Field in owner where this object is stored.
		private 'objectField()' : string
		
		objectField( next? : string ) {
			if( this[ 'objectField()' ] ) return this[ 'objectField()' ] || ''
			return this[ 'objectField()' ] = next
		}
		
		/// JS-path to this object from global scope. Can not be redefined.
		toString() {
			var path = ''
			
			var owner = this.objectOwner()
			if( owner ) path = owner.toString()
			
			var field = this.objectField()
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
