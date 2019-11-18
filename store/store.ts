namespace $ {

	@ $mol_class
	export class $mol_store< Data > extends $mol_object2 {

		constructor( data? : Data ) {
			super()
			if( data !== undefined ) this.data( data )
		}

		@ $mol_mem
		data( next? : Data ) {
			return next!
		}

		snapshot( next? : string ) {
			return JSON.stringify( this.data( next === undefined ? next : JSON.parse( next ) ) )
		}

		value< Key extends keyof Data >( key : Key , next? : Data[ Key ] ) {
			
			const data = this.data()
			if( next === undefined ) return data[ key ]!
			
			this.data( Object.assign( {} , data , { [ key ] : next } ) )

			return next!
		}

		sub<
			Key extends keyof Data ,
			Lens extends $mol_store< Data[ Key ] > = $mol_store< Data[ Key ] >
		>( key : Key , lens? : Lens ) {

			if( !lens ) lens = new $mol_store< Data[ Key ] >() as any

			lens!.data = next => {
				if( next == undefined ) return this.value( key )
				return this.value( key , next )
			}

			return lens!

		}

	}

}
