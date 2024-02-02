namespace $ {

	export namespace $$ { let $ }

	export const $mol_object_field = Symbol( '$mol_object_field' )
	
	export class $mol_object extends $mol_object2 {
		
		public static make< This extends typeof $mol_object >(
			this: This,
			config: Partial< InstanceType< This > >,
		) {
			return super.create( obj => {
				for( let key in config ) ( obj as any )[ key ] = config[ key ]!
			} ) as InstanceType< This >
		}
		
	}

}
