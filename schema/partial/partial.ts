namespace $ {
	export function $mol_schema_partial< Fields extends Record< string, typeof $mol_schema_any > >( Fields: Fields ) {
		
		const partial = {} as any
		for( const field in Fields ) partial[ field ] = $mol_schema_maybe( Fields[ field ] )
		
		return class $mol_schema_partial_ extends $mol_schema_record( partial ) {
			
			static Fields = Fields
			
			static toString(): string {
				if( this !== $mol_schema_partial_ ) return super.toString()
				return '$mol_schema_partial<' + $mol_key( Fields ) + '>'
			}	
			
		}
		
	}
}
