namespace $ {

	export function $mol_dict_key( value : any ) : any {
		
		if( !value ) return JSON.stringify( value )
		if( typeof value !== 'object' && typeof value !== 'function' ) return JSON.stringify( value )

		if( Array.isArray( value ) ) return JSON.stringify( value )
		if( Object.getPrototypeOf( Object.getPrototypeOf( value ) ) === null ) return JSON.stringify( value )
		
		return value
	}
	
	export class $mol_dict< Key , Value > extends Map< Key , Value > {

		get( key : Key ) {
			return super.get( $mol_dict_key( key ) )
		}

		has( key : Key ) {
			return super.has( $mol_dict_key( key ) )
		}

		set( key : Key , value : Value ) {
			return super.set( $mol_dict_key( key ) , value )
		}

		delete( key : Key ) {
			return super.delete( $mol_dict_key( key ) )
		}

		forEach( back : ( value : Value , key : Key , dict : Map< Key , Value > ) => void , context? : any ) {
			return super.forEach( ( val , key , dict )=> {
				if( typeof key === 'string' ) key = JSON.parse( key )
				return back.call( this , val , key , dict )
			} , context )
		}

		[Symbol.iterator]() {
			const iterator = super[ Symbol.iterator ]()
			
			return {
				[Symbol.iterator]() {
					return this
				},
				next() {
					const iteration = iterator.next()

					if( !iteration.done ) {
						const key = iteration.value[0]
						if( typeof key === 'string' ) iteration.value[0] = JSON.parse( key )
					}

					return iteration
				}
			}
		}

	}

}
