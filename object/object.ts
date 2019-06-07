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
		
		// 'object_owner()' : any
		// object_owner( next? : any ) {
		// 	return this[ 'object_owner()' ] || ( this[ 'object_owner()' ] = next || $mol_owning_get( this ) )
		// }
		
		// 'object_host()' : any
		// object_host( next? : any ) {
		// 	return this[ 'object_host()' ] || ( this[ 'object_host()' ] = next || $mol_owning_get( $mol_owning_get( this ) ) )
		// }
		
		// 'object_field()' : string
		// object_field( next? : string ) {
		// 	return this[ 'object_field()' ] || ( this[ 'object_field()' ] = next || `${ this }`.replace( /^(.*)\(.*?$/g , '$1' ).replace( /^.*\./g , ''  ) )
		// }
		
		// object_id( next? : string ) {
		// 	return this[ Symbol.toStringTag ] || ( this[ Symbol.toStringTag ] = next ) || ''
		// }

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
