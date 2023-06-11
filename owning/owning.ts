namespace $ {

	export const $mol_owning_map = new WeakMap< any , any >()

	export function $mol_owning_allow< Having >(
		having : Having ,
	) : having is Having & {
		destructor() : void
	} {
		try {
			if( !having ) return false
			if( typeof having !== 'object' ) return false
			if( having instanceof $mol_delegate ) return false
			if( typeof (having as any)['destructor'] !== 'function' ) return false
			return true
		} catch {
			return false
		}
	}

	export function $mol_owning_get< Having , Owner extends object >( having : Having , Owner? : { new() : Owner } ) : Owner | null {
	
		if( !$mol_owning_allow( having ) ) return null

		while( true ) {

			const owner = $mol_owning_map.get( having )
			if( !owner ) return owner
			if( !Owner ) return owner
			
			if( owner instanceof Owner ) return owner

			having = owner
		}

	}
	
	export function $mol_owning_check< Owner , Having >(
		owner : Owner ,
		having : Having ,
	) : having is Having & { destructor() : void } {
		if( !$mol_owning_allow( having ) ) return false
		if( $mol_owning_map.get( having ) !== owner ) return false
		return true
	}
	
	export function $mol_owning_catch< Owner , Having >(
		owner : Owner ,
		having : Having ,
	) {
		if( !$mol_owning_allow( having ) ) return false
		if( $mol_owning_map.get( having ) ) return false

		$mol_owning_map.set( having , owner )
		return true
	}

}
