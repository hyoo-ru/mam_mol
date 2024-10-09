namespace $ {
	
	/** @deprecated */
	export let $mol_dict_key = $mol_key

	/**
	 * Dictionary with extended keys support
	 */
	export class $mol_dict< Key , Value > extends Map< Key , Value > {

		get( key : Key ) {
			return super.get( $mol_key( key ) as any )
		}

		has( key : Key ) {
			return super.has( $mol_key( key ) as any )
		}

		set( key : Key , value : Value ) {
			return super.set( $mol_key( key ) as any , value )
		}

		delete( key : Key ) {
			return super.delete( $mol_key( key ) as any )
		}

		forEach( back : ( value : Value , key : Key , dict : Map< Key , Value > ) => void , context? : any ) {
			return super.forEach( ( val , key , dict )=> {
				if( typeof key === 'string' ) key = JSON.parse( key )
				return back.call( this , val , key , dict )
			} , context )
		}

		keys() {
			const iterator = super.keys()
			
			return {
				[Symbol.iterator]() {
					return this
				},
				next() {
					
					const iteration = iterator.next()
					if( iteration.done ) return iteration
					
					iteration.value = JSON.parse( iteration.value as any as string )
					return iteration
					
				}
			} as MapIterator<Key>
		}
		
		entries() {
			const iterator = super.entries()
			
			return {
				[Symbol.iterator]() {
					return this
				},
				next() {
					
					const iteration = iterator.next()
					if( iteration.done ) return iteration
					
					iteration.value = [ JSON.parse( iteration.value[0] as any as string ), iteration.value[1] ]
					// iteration.value[0] = JSON.parse( iteration.value[0] as any as string )
					return iteration
					
				}
			} as MapIterator<[Key, Value]>
		}
		
		[Symbol.iterator]() {
			return this.entries()
		}
		
	}

}
