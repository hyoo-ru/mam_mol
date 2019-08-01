namespace $ {

	@ $mol_class
	export class $mol_object2 extends Object {
		
		static $ = $ as $mol_ambient_context
		static get $$() { return this.$ }

		$! : typeof $mol_object2.$
		get $$() { return this.$ }

		constructor( init? : ( obj : any )=> void ) {
			super()
			if( init ) init( this )
		}

		public static make< Instance >(
			this : new( init? : ( instance : any )=> void )=> Instance ,
			init? : ( instance : Instance )=> void
		) : Instance {
			return new this( init )
		}
		
		static toString() { return this[ Symbol.toStringTag ] || this.name }

		destructor() { }

		toString() {
			return this[ Symbol.toStringTag ]
		}
		
		toJSON() {
			return this.toString()
		}

	}

	Object.defineProperty( $mol_object2.prototype, '$' , { value : $mol_object2.$ , enumerable : false , writable : true } )
	
}
