namespace $ {

	export namespace $$ { let $ }
	
	export class $mol_object2 {
		
		static $ = $ as $mol_ambient_context
		$ = this.constructor['$'] as typeof $mol_object2.$

		public static make< Instance >( this : { new() : Instance } , config : Partial< Instance > ) : Instance {
			const instance = new this
			for( let key in config ) instance[ key ] = config[ key ]
			return instance
		}
		
		static toString() : string {
			return this.name
		}

		destructor() { }

		toString() {
			return `<${ this.constructor.toString() }>`
		}
		
	}
	
}
