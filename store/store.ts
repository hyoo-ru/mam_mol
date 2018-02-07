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

		sub< Key extends keyof Data >( key : Key ) {
			return this.lens(
				data => data[ key ] ,
				( data , next )=> Object.assign( {} , data , { [ key ] : next } ) ,
			)
		}

		lens< Value >(
			get : ( data : Data )=> Value ,
			set? : ( data : Data , next? : Value )=> Data ,
		) {
			const sub = new $mol_store< Value >()
			sub.data = next => {
				if( next == undefined ) return get( this.data() )
				return get( this.data( set( this.data() , next ) ) )
			}
			return sub
		}

	}

}
