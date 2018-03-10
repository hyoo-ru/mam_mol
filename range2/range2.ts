namespace $ {

	export function $mol_range2< Item = number >(
		item : ( index : number )=> Item = index => index as any ,
		size = ()=> Number.POSITIVE_INFINITY ,
	) : Item[] {

		return new Proxy( new $mol_range2_array< Item >() , {

			get( target , field ) {

				if( typeof field === 'string' ) {
					if( field === 'length' ) return size()
					
					const index = Number( field )
					if( index === Math.trunc( index ) ) return item( index )
				}

				return target[ field ]
			} ,

			ownKeys( target ) {
				return [ ... Array( size() ) ].map( ( v, i ) => String( i ) ).concat( 'length' )
			} ,

			getOwnPropertyDescriptor( target , field ) {
				
				const index = Number( field )
				if( index === Math.trunc( index ) ) return {
					get : this.get ,
					enumerable : true ,
					configurable : true ,
				}

				if( field === "length" ) return {
					value : size() ,
					writable : false ,
					enumerable : false ,
					configurable : false ,
				}

				return Object.getOwnPropertyDescriptor( target , field )
			}

		} )

	}

	export class $mol_range2_array< Item > extends Array< Item > {

		concat( ... tail : this[] ) : Item[] {
			if( tail.length === 0 ) return this as any

			if( tail.length > 1 ) {
				let list = this as any
				for( let item of tail ) list = list.concat( item )
				return list
			}
			
			return $mol_range2(
				index => index < this.length ? this[ index ] : tail[0][ index - this.length ] ,
				()=> this.length + tail[0].length ,
			)
		}

		filter< Context > (
			check : ( val? : Item , index? : number , list? : Item[] )=> boolean ,
			context? : Context ,
		) {
			const filtered = new $mol_range2_array< Item >() as any as Item[]
			for( let index = 0 ; index < this.length ; ++ index ) {
				const item = this[ index ]
				if( check.call( context , item , index , this ) ) filtered.push( item )
			}
			return filtered
		}

		forEach< Context > (
			proceed : ( this : Context , val? : Item , index? : number , list? : Item[] )=> void ,
			context? : Context,
		) {
			for( let [ key , value ] of this.entries() ) proceed.call( context , value , key , this )
		}

		map< Item_out , Context > (
			proceed : ( this : Context , val? : Item , index? : number , list? : Item[] )=> Item_out ,
			context? : Context ,
		) {
			return $mol_range2(
				index => proceed.call( context , this[ index ] , index , this ) ,
				()=> this.length ,
			)
		}

		reduce< Result > (
			merge : ( result : Result , val? : Item , index? : number , list? : Item[] )=> Result ,
			result? : Result ,
		) {
			let index = 0

			if( arguments.length === 1 ) {
				result = this[ index ++ ] as any
			}
			
			for( ; index < this.length ; ++ index ) {
				result = merge( result , this[ index ] , index , this as any )
			}
			
			return result
		}

		slice( from? : number , to = this.length ) : Item[] {
			return $mol_range2(
				index => this[ from + index ] ,
				()=> Math.min( to , this.length ) - from ,
			)
		}

		some< Context > (
			check : ( this : Context , val? : Item , index? : number , list? : Item[] )=> boolean ,
			context? : Context ,
		) {
			const legth = this.length
			for( let index = 0 ; index < this.length ; ++ index ) {
				if( check.call( context , this[ index ] , index , this ) ) return true
			}
			return false
		}

		every< Context > (
			check : ( this : Context , val? : Item , index? : number , list? : Item[] )=> boolean ,
			context? : Context ,
		) {
			const legth = this.length
			for( let index = 0 ; index < this.length ; ++ index ) {
				if( !check.call( context , this[ index ] , index , this ) ) return false
			}
			return true
		}

	}

}
