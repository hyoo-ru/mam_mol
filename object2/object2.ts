namespace $ {

	export class $mol_object2 {
		
		static $ = $ as any as $
		
		[Symbol.toStringTag]!: string

		[ $mol_ambient_ref ] = null as any as $
		get $() {
			if( this[ $mol_ambient_ref ] ) return this[ $mol_ambient_ref ]
			const owner = $mol_owning_get( this ) as any
			return this[ $mol_ambient_ref ] = owner?.$ || $mol_object2.$ as $
		}
		set $( next : $ ) {
			if( this[ $mol_ambient_ref ] ) $mol_fail_hidden( new Error( 'Context already defined' ) )
			this[ $mol_ambient_ref ] = next
		}

		public static create< Instance >(
			this : new( init? : ( instance : any )=> void )=> Instance ,
			init? : ( instance : $mol_type_writable<Instance> )=> void
		) : Instance {
			const obj = new this
			if( init ) init( obj )
			return obj
		}
		
		static [ Symbol.toPrimitive ]() {
			return this.toString()
		}
		
		static toString() {
			if( Symbol.toStringTag in this ) return ( this as any )[ Symbol.toStringTag ] as string
			return this.name
		}
		
		destructor() { }
		static destructor() { }
		
		//[ Symbol.toPrimitive ]( hint: string ) {
		//	return hint === 'number' ? this.valueOf() : this.toString()
		//}
		
		toString(): string {
			return this[ Symbol.toStringTag ] || this.constructor.name + '<>'
		}
		
		static toJSON() {
			return ( this as any )[ Symbol.toStringTag ] || this.$.$mol_func_name( this )
		}
		
		toJSON(): any {
			return this.toString()
		}

	}
}
