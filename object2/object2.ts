namespace $ {

	export namespace $$ { let $ }

	export class $mol_object2 {
		
		static $ = $ as $mol_ambient_context
		$ = this.constructor['$'] as typeof $mol_object2.$

		public static make< Instance >( this : { new() : Instance } , init? : ( instance : Instance )=> void  ) : Instance {
			const instance = new this
			if( init ) init( instance )
			return instance
		}
		
		static toString() : string {
			return this.name
		}

		destructor() { }

		[ Symbol.toStringTag ] = `${ this.constructor }.make()`
		
		toString() {
			return this[ Symbol.toStringTag ]
		}
		
	}
	
}
