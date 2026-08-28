namespace $ {
	
	export function $mol_schema_lazy< Value >( Schema: ()=> any ) { //: typeof $mol_schema_any & { default: Value } {
		// return $mol_delegate( $mol_schema_any, Schema )
		return class $mol_schema_lazy_ extends $mol_schema_any {
			
			static Schema = $mol_memo.func( Schema )
			
			static override *issues_lazy< Val >(
				value: Val,
				path: $mol_schema_issue_path = [],
			) {
				yield* this.Schema().issues_lazy( value, path )
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
