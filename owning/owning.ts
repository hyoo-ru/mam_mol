namespace $ {

	export const $mol_owning_map = new WeakMap< any , any >()

	export function $mol_owning_allow< Having >(
		having : Having ,
	) : having is Having & { destructor() : void } {
		if( !having ) return false
		if( typeof having !== 'object' ) return false
		if(!( 'destructor' in having )) return false
		return true
	}

	export function $mol_owning_get< Owner , Having >( having : Having ) {
		if( !$mol_owning_allow( having ) ) return
		return $mol_owning_map.get( having )
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
		if( !$mol_owning_allow( having ) ) return
		if( $mol_owning_map.get( having ) === owner ) return
		$mol_owning_map.set( having , owner )
	}

}
