namespace $ {

	export class $mol_store< Data > extends $mol_object {

		constructor( data? : Data ) {
			super()
			if( data !== undefined ) this.data( data )
		}

		@ $mol_mem
		data( next? : Data ) {
			return next
		}

		snapshot( next? : string ) {
			return JSON.stringify( this.data( next === undefined ? next : JSON.parse( next ) ) )
		}

		value< Key extends keyof Data >( key : Key , next? : Data[ Key ] ) {
			return this.sub( key ).data( next )
		}

		sub<
			Key extends keyof Data ,
			Lens extends $mol_store< Data[ Key ] > = $mol_store< Data[ Key ] >
		>( key : Key , lens? : Lens ) {

			return this.lens(
				data => data[ key ] ,
				( data , next )=> Object.assign( {} , data , { [ key ] : next } ) ,
				lens ,
			)

		}

		lens<
			Value ,
			Lens extends $mol_store< Value > = $mol_store< Value >
		>(
			get : ( data : Data )=> Value ,
			set? : ( data : Data , next? : Value )=> Data ,
			lens? : Lens
		) {

			if( !lens ) lens = new $mol_store< Value >() as any

			lens.data = next => {
				if( next == undefined ) return get( this.data() )
				return get( this.data( set( this.data() , next ) ) )
			}

			return lens

		}

	}

}
