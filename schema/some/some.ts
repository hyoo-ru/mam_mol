namespace $ {

	function* merge<T>(generators: Generator<T>[]) {
		for (const g of generators)
			yield* g
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
			
			static override *issues_lazy<
				This extends typeof $mol_schema_any,
				Value
			>(
				this: This,
				value: Value,
				path: $mol_schema_issue_path = [],
			) {
				const issues = []
				for (const Variant of Variants) {
					const iter = Variant.issues_lazy(value, path)
					const first = iter.next()
					if (first.done) return
					issues.push((function* () {
						yield first.value
						yield* iter
					})())
				}
				yield { message: 'Wrong variant', path, issues: merge(issues) }
			}
			
			static cast< This extends typeof $mol_schema_any >( this: This, value: unknown ): This['default'] {
				try {
					return this.guard( value )
				} catch ( error ) {
					return Variants[0].cast( value )
				}
			}
			
			static default = Variants[0].default as Variants[number]['default']
			
		}
		
	} )
}
