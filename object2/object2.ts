namespace $ {

	export class $mol_object2 extends Object {
		
		static $ = $ as $mol_ambient_context
		static get $$() { return this.$ }

		$! : typeof $mol_object2.$
		get $$() { return this.$ }

		public static make< Instance >( this : { new() : Instance } , init? : ( instance : Instance )=> void  ) : Instance {
			const instance = new this
			if( init ) init( instance )
			return instance
		}
		
		static toString() { return this[ Symbol.toStringTag ] || this.name }

		destructor() { }

		toString() {
			return this[ Symbol.toStringTag ]
		}
		
		toJSON() {
			return this.toString()
		}

		[ Symbol.toStringTag ] = `${ this.constructor.name }.make()`
		
	}

	Object.defineProperty( $mol_object2.prototype, '$' , { value : $mol_object2.$ , enumerable : false , writable : true } )
	$mol_object2.prototype[ Symbol.toStringTag ] = '$mol_object2.make()'
	
}
