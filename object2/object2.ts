namespace $ {
	
	if( !Symbol.dispose ) ( Symbol as any ).dispose = Symbol( 'Symbol.dispose' )

	export class $mol_object2 {
		
		static $ = $ as any as $
		
		[Symbol.toStringTag]!: string

		[ $mol_ambient_ref ] = null as any as $
		get $() {
			if( this[ $mol_ambient_ref ] ) return this[ $mol_ambient_ref ]
			const owner = $mol_owning_get( this ) as any
			return this[ $mol_ambient_ref ] = owner?.$ || (this.constructor as { $?: $ }).$ || $mol_object2.$ as $
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
			return ( this as any )[ Symbol.toStringTag ] || this.$.$mol_func_name( this )
		}
		
		static toJSON() {
			return this.toString()
		}
		
		destructor() { }
		static destructor() { }
		
		[ Symbol.dispose ] () {
			this.destructor()
		}
		
		//[ Symbol.toPrimitive ]( hint: string ) {
		//	return hint === 'number' ? this.valueOf() : this.toString()
		//}
		
		toString(): string {
			return this[ Symbol.toStringTag ] || this.constructor.name + '<>'
		}
		
		// toJSON(): any {
		// 	return this.toString()
		// }

	}
}
