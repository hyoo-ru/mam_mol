namespace $ {

	export class $mol_object2 {
		
		static $ = $ as $mol_ambient_context
		
		[ $mol_ambient_ref ] = null as any as $mol_ambient_context
		get $() {
			if( this[ $mol_ambient_ref ] ) return this[ $mol_ambient_ref ]
			const owner = $mol_owning_get( this ) as any
			return this[ $mol_ambient_ref ] = owner?.$ || $mol_object2.$ as $mol_ambient_context
		}
		set $( next : $mol_ambient_context ) {
			if( this[ $mol_ambient_ref ] ) $mol_fail_hidden( new Error( 'Context already defined' ) )
			this[ $mol_ambient_ref ] = next
		}

		constructor( init? : ( obj : any )=> void ) {
			if( init ) init( this )
		}

		public static create< Instance >(
			this : new( init? : ( instance : any )=> void )=> Instance ,
			init? : ( instance : Instance )=> void
		) : Instance {
			return new this( init )
		}
		
		static toString() { return this[ Symbol.toStringTag ] || this.name }

		destructor() { }

		toString() {
			return this[ Symbol.toStringTag ] || this.constructor.name + '()'
		}
		
		toJSON() {
			return this.toString()
		}

	}

}
