namespace $ {
	
	const pubs = new WeakMap< object, $mol_wire_pub >()
	
	export function $mol_wire_proxy_pub( id: string, target: object ) {
		let pub = pubs.get( target )
		if( !pub ) pubs.set( target, pub = new $mol_wire_pub( id ) )
		return pub
	}
	
	export function $mol_wire_proxy< Target >( id: string, target: Target ): Target {
		
		if( !target ) return target
		
		const type = typeof target
		if( type !== 'object' && type !== 'function' ) return target
		
		return new Proxy( target, {
			
			// Readers
			
			get( target, property ) {
				$mol_wire_proxy_pub( id, target ).promote()
				const suffix = '.' + ( typeof property === 'symbol' ? property.description : property )
				return $mol_wire_proxy( id + suffix , Reflect.get( target, property ) )
			},
			
			getOwnPropertyDescriptor( target, property ) {
				$mol_wire_proxy_pub( id, target ).promote()
				return Reflect.getOwnPropertyDescriptor( target, property )
			},
			
			ownKeys( target ) {
				$mol_wire_proxy_pub( id, target ).promote()
				return Reflect.ownKeys( target )
			},
			
			has( target, property ) {
				$mol_wire_proxy_pub( id, target ).promote()
				return Reflect.has( target, property )
			},
			
			getPrototypeOf( target ) {
				$mol_wire_proxy_pub( id, target ).promote()
				return $mol_wire_proxy( id, Reflect.getPrototypeOf( target ) )
			},
			
			isExtensible( target ) {
				$mol_wire_proxy_pub( id, target ).promote()
				return Reflect.isExtensible( target )
			},
			
			// Writers
			
			set( target, property, next ) {
				
				const pub = pubs.get( target )
				if( pub ) {
					
					const prev = Reflect.get( target, property )
					if( $mol_compare_deep( prev, next ) ) return true
					
					pub.emit()
				}
				
				return Reflect.set( target, property, next )
				
			},
			
			defineProperty( target, property, attributes ) {
				pubs.get( target )?.emit()
				return Reflect.defineProperty( target, property, attributes )
			},
			
			deleteProperty( target, property ) {
				pubs.get( target )?.emit()
				return Reflect.deleteProperty( target, property )
			},
			
			setPrototypeOf( target, proto ) {
				pubs.get( target )?.emit()
				return Reflect.setPrototypeOf( target, proto )
			},
			
			preventExtensions( target ) {
				pubs.get( target )?.emit()
				return Reflect.preventExtensions( target )
			},
			
		} )
		
	}
	
}
