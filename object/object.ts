namespace $ {

	export namespace $$ { let $ }
	
	export type $mol_object_context = ( Window )&( typeof $.$$ )&( typeof $ )
	
	export class $mol_object {
		
		get $() {
			const owner = this.object_owner()
			return ( owner && owner.$ || $ ) as $mol_object_context
		}
		
		public static make< Instance >( this : { new() : Instance } , config : Partial< Instance > ) : Instance {
			const instance = new this
			for( let key in config ) instance[ key ] = config[ key ]
			return instance
		}
		
		static toString() : string {
			return $mol_func_name( this )
		}
		
		'object_owner()' : any
		object_owner( next? : any ) {
			return this[ 'object_owner()' ] || ( this[ 'object_owner()' ] = next )
		}
		
		'object_host()' : any
		object_host( next? : any ) {
			return this[ 'object_host()' ] || ( this[ 'object_host()' ] = next )
		}
		
		'object_field()' : string
		object_field( next? : string ) {
			return this[ 'object_field()' ] || ( this[ 'object_field()' ] = next ) || ''
		}
		
		'object_id()' : string
		object_id( next? : string ) {
			return this[ 'object_id()' ] || ( this[ 'object_id()' ] = next ) || ''
		}

		toString() {
			return this.object_id()
		}
		
		toJSON() {
			return this.toString()
		}
		
		destructor() { }
		
	}
	
}
