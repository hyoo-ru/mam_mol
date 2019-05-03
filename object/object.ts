namespace $ {

	export namespace $$ { let $ }

	export const $mol_object_field = Symbol( '$mol_object_field' )
	
	export class $mol_object extends Object {
		
		static $ = $ as $mol_ambient_context
		static get $$() { return this.$ }

		@ $mol_atom2_field
		_$ : $mol_ambient_context
		get $() {
			if( this._$ ) return this._$
			const owner = $mol_owning_get( this ) as any
			return this._$ = ( owner && owner.$$ || $ ) as $mol_ambient_context
		}
		set $( next : $mol_ambient_context ) {
			this._$ = next
		}
		get $$() { return this.$ }
		
		public static make< Instance >( this : { new() : Instance } , config : Partial< Instance > ) : Instance {
			const instance = new this
			for( let key in config ) instance[ key ] = config[ key ]!
			return instance
		}
		
		static toString() : string {
			return this.name
		}
		
		toString() {
			return this[ Symbol.toStringTag ]
		}
		
		toJSON() {
			return this.toString()
		}
		
		destructor() { }
		
		[ Symbol.toStringTag ] = `${ this.constructor.name }.make()`

	}
	
	Object.defineProperty( $mol_object.prototype, '$' , { value : $mol_object.$ , enumerable : false , writable : true } )
	$mol_object.prototype[ Symbol.toStringTag ] = '$mol_object.make()'

}
