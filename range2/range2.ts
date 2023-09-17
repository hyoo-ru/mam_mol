namespace $ {

	/** Lazy computed lists with native Array interface. $mol_range2_array is mutable but all derived ranges are immutable. */
	export function $mol_range2< Item = number >(
		item : ( index : number )=> Item = index => index as any ,
		size = ()=> Number.POSITIVE_INFINITY ,
	) : Item[] {

		return new Proxy( new $mol_range2_array< Item >() , {

			get( target , field ) {

				if( typeof field === 'string' ) {
					if( field === 'length' ) return size()
					
					const index = Number( field )
					if( index < 0 ) return undefined
					if( index >= size() ) return undefined
					if( index === Math.trunc( index ) ) return item( index )
				}

				return target[ field as any ]
			} ,

			set( target , field ) {
				return $mol_fail( new TypeError( `Lazy range is read only (trying to set field ${ JSON.stringify( field ) })`  ) )
			} ,

			ownKeys( target ) {
				return [ ... Array( size() ) ].map( ( v, i ) => String( i ) ).concat( 'length' )
			} ,

			getOwnPropertyDescriptor( target , field ) : PropertyDescriptor | undefined {
				
				if( field === "length" ) return {
					value : size() ,
					writable : true ,
					enumerable : false ,
					configurable : false ,
				}

				const index = Number( field )
				if( index === Math.trunc( index ) ) return {
					get : ()=> this.get!( target , field , this ) ,
					enumerable : true ,
					configurable : true ,
				}

				return Object.getOwnPropertyDescriptor( target , field )
			}

		} )

	}

	export class $mol_range2_array< Item > extends Array< Item > {
		
		// Lazy
		concat( ... tail : Item[][] ) : Item[] {
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

		// Diligent
		filter< Context > (
			check : ( val : Item , index : number , list : Item[] )=> boolean ,
			context? : Context ,
		) {
			const filtered = new $mol_range2_array< Item >() as any as Item[]
			for( let index = 0 ; index < this.length ; ++ index ) {
				const item = this[ index ]
				if( check.call( context , item , index , this ) ) filtered.push( item )
			}
			return filtered
		}

		// Diligent
		forEach< Context > (
			proceed : ( this : Context , val : Item , index : number , list : Item[] )=> void ,
			context? : Context,
		) {
			for( let [ key , value ] of this.entries() ) proceed.call( context as Context , value , key , this )
		}

		// Lazy
		map< Item_out , Context > (
			proceed : ( this : Context , val : Item , index : number , list : Item[] )=> Item_out ,
			context? : Context ,
		) : Item_out[] {
			return $mol_range2(
				index => proceed.call( context as Context , this[ index ] , index , this ) ,
				()=> this.length ,
			)
		}

		// Diligent
		reduce< Result > (
			merge : ( result : Result , val : Item , index : number , list : Item[] )=> Result ,
			result? : Result ,
		) {
			let index = 0

			if( arguments.length === 1 ) {
				result = this[ index ++ ] as any
			}
			
			for( ; index < this.length ; ++ index ) {
				result = merge( result as Result , this[ index ] , index , this as any )
			}
			
			return result
		}

		// Lazy
		toReversed(): Item[] {
			return $mol_range2(
				index => this[ this.length - 1 - index ] ,
				()=> this.length ,
			)
		}

		// Lazy
		slice( from = 0 , to = this.length ) {
			return $mol_range2(
				index => this[ from + index ] ,
				()=> Math.min( to , this.length ) - from ,
			)
		}

		// Lazy
		some< Context > (
			check : ( this : Context , val : Item , index : number , list : Item[] )=> boolean ,
			context? : Context ,
		) {
			for( let index = 0 ; index < this.length ; ++ index ) {
				if( check.call( context as Context , this[ index ] , index , this ) ) return true
			}
			return false
		}

		// Lazy
		every< Context = null > (
			check : ( this : Context , val : Item , index : number , list : Item[] )=> boolean ,
			context? : Context ,
		) {
			for( let index = 0 ; index < this.length ; ++ index ) {
				if( !check.call( context as Context , this[ index ] , index , this ) ) return false
			}
			return true
		}

		reverse() {
			return $mol_fail( new TypeError( `Mutable reverse is forbidden. Use toReversed instead.`  ) )
		}

		sort() {
			return $mol_fail( new TypeError( `Mutable sort is forbidden. Use toSorted instead.`  ) )
		}

	}

}
