namespace $ {
	export let $mol_schema_dict  =$mol_memo_key.func( function $mol_schema_dict< Pair extends [
		Key: typeof $mol_schema_any & { default: PropertyKey },
		Val: typeof $mol_schema_any,
	] >( Pair: Pair ) {
		
		return class $mol_schema_dict_ extends $mol_schema_any {
			
			static Pair = Pair
			
			static toString(): string {
				if( this !== $mol_schema_dict_ ) return super.toString()
				return '$mol_schema_dict<' + $mol_key( Pair ) + '>'
			}
			
			static guard< Value >( value: Value ) {
				
				if( Object.getPrototypeOf( Object.getPrototypeOf( value ) ) ) {
					return $mol_fail( new TypeError( 'Non dictionary', { cause: { value, schema: this } } ) )
				}
				
				for( const key in value ) {
					
					try {
						Pair[0].guard( key )
					} catch( error ) {
						return $mol_fail( new TypeError( 'Wrong key', { cause: { key, error, value, schema: this } } ) )
					}
					
					try {
						Pair[1].guard( ( value as any )[ key ] )
					} catch( error ) {
						return $mol_fail( new TypeError( 'Wrong val', { cause: { key, error, value, schema: this } } ) )
					}
					
				}
				
				return value as Value & typeof this.default
			}
			
			static cast( value: unknown ) {
				if( Object.getPrototypeOf( Object.getPrototypeOf( value ) ) ) return this.default
				
				const res = {} as any
				for( const key in value as any ) {
					if( !Pair[0].check( key ) ) continue
					res[ key ] = Pair[1].cast( ( value as any )[ key ] )
				}
				
				return res as typeof this.default
			}
			
			static default = {} as Record< Pair[0]['default'], Pair[1]['default'] > 
			
		}
		
	} )
}
