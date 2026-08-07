namespace $ {

	$mol_test({

		'schema-only file: types in subnamespace, no ops, no augmentation'() {
			const out = $mol_build_gql.compile({
				source: 'type User { id: ID! name: String }',
				external: [],
				class_name: '\x24test_api',
				is_schema_only: true,
			})
			$mol_assert_equal( out.includes( 'namespace \x24.\x24test_api' ), true )
			$mol_assert_equal( out.includes( 'interface User' ), true )
			$mol_assert_equal( /export const /.test( out ), false )
			$mol_assert_equal( /\x24mol_gql/.test( out ), false )
		},

		'operations file: flat const in namespace \x24 with prefix from class_name, no $mol_gql ref'() {
			const out = $mol_build_gql.compile({
				source: 'query Foo { hi }',
				external: [],
				class_name: '\x24test_api',
				is_schema_only: false,
			})
			$mol_assert_equal( /export const \x24test_api_foo = \{/.test( out ), true )
			$mol_assert_equal( /query: "query Foo \{ hi \}"/.test( out ), true )
			// zero deps: ни одного упоминания $mol_gql в сгенерированном файле
			$mol_assert_equal( /\x24mol_gql/.test( out ), false )
		},

		'PascalCase op name converts to snake_case in const and method name'() {
			const out = $mol_build_gql.compile({
				source: 'query CountryByCode { hi }',
				external: [],
				class_name: '\x24test',
				is_schema_only: false,
			})
			$mol_assert_equal( /\x24test_country_by_code/.test( out ), true )
		},

		'in/out fields on op const (not variables/result)'() {
			const out = $mol_build_gql.compile({
				source: 'query Foo { hi }',
				external: [],
				class_name: '\x24test',
				is_schema_only: false,
			})
			$mol_assert_equal( /in: undefined as undefined/.test( out ), true )
			$mol_assert_equal( /out: \{\} as unknown/.test( out ), true )
			$mol_assert_equal( /variables: /.test( out ), false )
			$mol_assert_equal( /result: /.test( out ), false )
		},

		'inline schema-defs in ops file dedup with external ones (own wins)'() {
			const own = 'type Country { code: ID! } query G { countries { code } }'
			const external = 'type Country { code: ID! name: String! }'
			const out = $mol_build_gql.compile({
				source: own,
				external: [ external ],
				class_name: '\x24test',
				is_schema_only: false,
			})
			const matches = out.match( /interface Country/g ) ?? []
			$mol_assert_equal( matches.length, 1 )
			$mol_assert_equal( /readonly "name"/.test( out ), false )
		},

		'builtin scalars resolve to TS primitives, not GraphQL names'() {
			const out = $mol_build_gql.compile({
				source: 'type T { id: ID! n: Int! s: String! b: Boolean! f: Float! }',
				external: [],
				class_name: '\x24x',
				is_schema_only: true,
			})
			$mol_assert_equal( out.includes( '"id" : string' ), true )
			$mol_assert_equal( out.includes( '"n" : number' ), true )
			$mol_assert_equal( out.includes( '"s" : string' ), true )
			$mol_assert_equal( out.includes( '"b" : boolean' ), true )
			$mol_assert_equal( out.includes( '"f" : number' ), true )
			$mol_assert_equal( /export type ID =/.test( out ), false )
		},

		'NonNull vs nullable: optional marker and "| null" union'() {
			const out = $mol_build_gql.compile({
				source: 'type T { req: String! opt: String }',
				external: [],
				class_name: '\x24x',
				is_schema_only: true,
			})
			$mol_assert_equal( /"req" : string\b/.test( out ), true )
			$mol_assert_equal( /"opt"\? : string \| null/.test( out ), true )
		},

		'list inner nullability follows inner NonNull marker'() {
			const out = $mol_build_gql.compile({
				source: 'type T { strict: [String!]! loose: [String!] mixed: [String] }',
				external: [],
				class_name: '\x24x',
				is_schema_only: true,
			})
			$mol_assert_equal( /"strict" : readonly \( string \)\[\]/.test( out ), true )
			$mol_assert_equal( /"loose"\? : readonly \( string \)\[\] \| null/.test( out ), true )
			$mol_assert_equal( /"mixed"\? : readonly \( string \| null \)\[\] \| null/.test( out ), true )
		},

		'enum becomes union of string literals'() {
			const out = $mol_build_gql.compile({
				source: 'enum Role { admin member guest }',
				external: [],
				class_name: '\x24x',
				is_schema_only: true,
			})
			$mol_assert_equal( out.includes( 'export type Role = "admin" | "member" | "guest"' ), true )
		},

		'operation `out` typed via Query root when present in schema'() {
			const out = $mol_build_gql.compile({
				source: 'type Query { foo: String } query GetFoo { foo }',
				external: [],
				class_name: '\x24x',
				is_schema_only: false,
			})
			$mol_assert_equal( /out: \{\} as \x24x\.Query/.test( out ), true )
		},

		'operation `out` is unknown when no root type in schema'() {
			const out = $mol_build_gql.compile({
				source: 'query Anon { hi }',
				external: [],
				class_name: '\x24x',
				is_schema_only: false,
			})
			$mol_assert_equal( /out: \{\} as unknown/.test( out ), true )
		},

		'variable definitions become typed `in` slot'() {
			const out = $mol_build_gql.compile({
				source: 'query Foo(\x24id: ID!) { foo(id: \x24id) }',
				external: [],
				class_name: '\x24x',
				is_schema_only: false,
			})
			$mol_assert_equal( /in: \{\} as \{ id : string \}/.test( out ), true )
		},

		'parse error returns wrapped namespace, does not throw'() {
			const out = $mol_build_gql.compile({
				source: 'type Broken {',
				external: [],
				class_name: '\x24x',
				is_schema_only: true,
			})
			$mol_assert_equal( out.startsWith( 'namespace \x24' ), true )
			$mol_assert_equal( out.includes( 'parse error' ), true )
		},

		'is_schema_file recognizes .schema.gql and .schema.graphql'() {
			$mol_assert_equal( $mol_build_gql.is_schema_file( 'api.schema.gql' ), true )
			$mol_assert_equal( $mol_build_gql.is_schema_file( 'api.schema.graphql' ), true )
			$mol_assert_equal( $mol_build_gql.is_schema_file( 'api.gql' ), false )
			$mol_assert_equal( $mol_build_gql.is_schema_file( 'schema.txt' ), false )
		},

	})

}
