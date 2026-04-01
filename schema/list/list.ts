namespace $ {
	export function $mol_schema_list< Item extends typeof $mol_schema_any >( Item: Item ) {
		return class $mol_schema_list_ extends $mol_schema_any {
			
			static Item = Item
			
			static toString(): string {
				if( this !== $mol_schema_list_ ) return super.toString()
				return '$mol_schema_list<' + $mol_key(Item) + '>'
			}	
			
			static guard< Value >( value: Value ) {
				
				if( !Array.isArray( value ) ) return $mol_fail( new TypeError( 'Non array', { cause: { value, schema: this } } ) )
				
				for( const [ index, item ] of super.guard( value ).entries() ) {
					try {
						Item.guard( item )
					} catch( error ) {
						return $mol_fail( new TypeError( 'Wrong item', { cause: { index, error, value, schema: this } } ) )
					}
				}
				
				return value as Value & typeof this.default
			}
			
			static cast( value: unknown ) {
				if( !Array.isArray( value ) ) return this.default
				return value.map( item => Item.cast( item ) ) as typeof this.default
			}
			
			static default = [] as readonly( typeof Item.default )[]
			
		}
	}
}
