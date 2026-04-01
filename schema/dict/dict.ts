namespace $ {
	export function $mol_schema_dict<
		Key extends typeof $mol_schema_any & { default: PropertyKey },
		Val extends typeof $mol_schema_any,
	>( Key: Key, Val: Val ) {
		
		return class $mol_schema_dict_ extends $mol_schema_any {
			
			static Key = Key
			static Val = Val
			
			static toString(): string {
				if( this !== $mol_schema_dict_ ) return super.toString()
				return '$mol_schema_dict<' + $mol_key( Key ) + ',' + $mol_key( Key ) + '>'
			}
			
			static guard< Value >( value: Value ) {
				
				if( Object.getPrototypeOf( Object.getPrototypeOf( value ) ) ) {
					return $mol_fail( new TypeError( 'Non dictionary', { cause: { value, schema: this } } ) )
				}
				
				for( const key in value ) {
					
					try {
						Key.guard( key )
					} catch( error ) {
						return $mol_fail( new TypeError( 'Wrong key', { cause: { key, error, value, schema: this } } ) )
					}
					
					try {
						Val.guard( ( value as any )[ key ] )
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
					if( !Key.check( key ) ) continue
					res[ key ] = Val.cast( ( value as any )[ key ] )
				}
				
				return res as typeof this.default
			}
			
			static default = {} as Record< Key['default'], Val['default'] > 
			
		}
		
	}
}
