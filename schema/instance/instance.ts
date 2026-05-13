namespace $ {
	export let $mol_schema_instance = $mol_memo_key.func( function $mol_schema_instance<
		Class extends new( ... args: Args )=> any,
		Args extends any[]
	>(
		Class: Class,
		... args: Args
	) {
		
		class $mol_schema_instance_ extends $mol_schema_any {
			
			static Class = Class
			
			static toString(): string {
				if( this !== $mol_schema_instance_ ) return super.toString()
				return '$mol_schema_instance<' + $$.$mol_func_name(Class) + '>'
			}
			
			static guard< Value >( value: Value ) {
				if( value != null && Object( value ) instanceof Class ) return value as Value & typeof this.default
				return $mol_fail( new TypeError( 'Wrong class', { cause: { value, schema: this } } ) )
			}
			
			static default: InstanceType< Class > = new Class( ... args )
			
		}
		
		return ( ( Class[ Symbol.hasInstance ] === $mol_schema_any[ Symbol.hasInstance ] )
			? Class
			: $mol_schema_instance_
		) as Class extends typeof $mol_schema_any ? Class : typeof $mol_schema_instance_
		
	} )
}
