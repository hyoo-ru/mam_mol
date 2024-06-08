namespace $ {

	export function $mol_tree2_from_json( json: any, span = $mol_span.unknown ): $mol_tree2 {

		if( typeof json === 'boolean' || typeof json === 'number' || json === null ) {
			return new $mol_tree2( String( json ) , '' , [] , span )
		}
		
		if( typeof json === 'string' ) {
			return $mol_tree2.data( json , [], span )
		}

		if( typeof json.toJSON === 'function' ) {
			return $mol_tree2_from_json( json.toJSON() )
		}

		if( Array.isArray( json ) ) {
			const sub = json.map( json => $mol_tree2_from_json( json , span ) )
			return new $mol_tree2( '/' , '', sub, span )
		}
		
		if( ArrayBuffer.isView( json ) ) {
			const buf = new Uint8Array( json.buffer, json.byteOffset, json.byteLength )
			return $mol_tree2.data( String.fromCharCode( ... buf ) , [], span )
		}
			
		if( json instanceof Date ) {
			return new $mol_tree2( '', json.toISOString() , [] , span )
		}

		if( json.toString !== Object.prototype.toString ) {
			return $mol_tree2.data( json.toString() , [], span )
		}

		if( json instanceof Error ) {
			const { name , message , stack } = json
			json = { ... json, name, message, stack }
		}

		const sub = [] as $mol_tree2[]
		
		for( var key in json ) {

			const val = json[ key ]

			if( val === undefined ) continue

			const subsub = $mol_tree2_from_json( val, span )
			
			if( /^[^\n\t\\ ]+$/.test( key ) ) {
				sub.push( new $mol_tree2( key, '', [ subsub ], span ) )
			} else {
				sub.push( $mol_tree2.data( key, [ subsub ], span ) )
			}
			
		}
		
		return new $mol_tree2( '*' , '', sub , span )
			
	}

}
