namespace $ {

	function* merge<T>( iterable: Iterable<T>[] ) {
		for( const i of iterable )
			yield* i
	}

	export let $mol_schema_some = $mol_memo_key.func( function $mol_schema_some<
		Variants extends readonly( typeof $mol_schema_any )[]
	>( Variants: Variants ) {
		
		return class $mol_schema_some_ extends $mol_schema_any {
			
			static Variants = Variants
			
			static toString(): string {
				if( this !== $mol_schema_some_ ) return super.toString()
				return '$mol_schema_some<' + $mol_key(Variants) + '>'
			}	
			
			static *issues_lazy< This extends typeof $mol_schema_any, Value >(
				this: This,
				value: Value,
				path: $mol_schema_issue_path = [],
			): $mol_schema_issues<Value> {
				const issues = []
				const errors = []
				for( const Variant of Variants ) try {
					const iter = Variant.issues_lazy( value, path )
					const first = iter.next()
					if( first.done ) return
					issues.push((function* () {
						yield first.value
						yield* iter
					})())
				} catch( error ) {
					if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
					else errors.push( error )
				}
				if( errors.length === 0 )
					yield { message: 'Wrong variant', path, issues: merge( issues ), value, schema: this }
				else {
					const cause = {
						path, value, schema: this,
						issues: issues.map( i => Array.from( i, $mol_schema_issue_eager ) ),
					}
					if( errors.length === 1 ) $mol_fail( new Error( "Wrong schema", { cause: { error: errors[0], ...cause } } ) )
					else $mol_fail( new AggregateError( errors, 'Wrong schemas', { cause } ) )
				}
			}
			
			static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
				if( this.issues_lazy( value ).next().done ) return value
				return Variants[0].cast( value )
			}
			
			static default = Variants[0].default as Variants[number]['default']
			
		}
		
	} )
}
