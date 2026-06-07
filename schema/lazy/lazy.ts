namespace $ {
	
	export function $mol_schema_lazy< Value >( Schema: ()=> any ) { //: typeof $mol_schema_any & { default: Value } {
		// return $mol_delegate( $mol_schema_any, Schema )
		return class $mol_schema_lazy_ extends $mol_schema_any {
			
			static Schema = $mol_memo.func( Schema )
			
			static guard< Val >( value: Val ): Val & Value {
				return this.Schema().guard( value )
			}
			
			static cast< Val >( value: Val ): Value {
				return this.Schema().cast( value )
			}
			
			static get default(): Value {
				return this.Schema().default
			}
			
		}
	}
	
}
