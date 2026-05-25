namespace $ {

	$mol_test({

		'schema-only file: namespace with types, no operations'() {
			const out = $mol_build_gql.compile({
				source: 'type User { id: ID! name: String }',
				external: [],
				class_name: '\x24test_api',
				is_schema_only: true,
			})
			$mol_assert_ok( out.startsWith( 'namespace \x24.\x24test_api' ) )
			$mol_assert_ok( out.includes( 'interface User' ) )
			$mol_assert_ok( !/export const /.test( out ) )
		},

		'operations file: each query/mutation becomes export const with query/variables/result'() {
			const out = $mol_build_gql.compile({
				source: 'query Foo { hi }',
				external: [],
				class_name: '\x24test_api',
				is_schema_only: false,
			})
			$mol_assert_ok( out.startsWith( 'namespace \x24.\x24test_api' ) )
			$mol_assert_ok( /export const Foo = \{/.test( out ) )
			$mol_assert_ok( /query: "query Foo \{ hi \}"/.test( out ) )
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
			$mol_assert_ok( !/readonly "name"/.test( out ) )
		},

		'builtin scalars resolve to TS primitives, not GraphQL names'() {
			const out = $mol_build_gql.compile({
				source: 'type T { id: ID! n: Int! s: String! b: Boolean! f: Float! }',
				external: [],
				class_name: '\x24x',
				is_schema_only: true,
			})
			$mol_assert_ok( out.includes( '"id" : string' ) )
			$mol_assert_ok( out.includes( '"n" : number' ) )
			$mol_assert_ok( out.includes( '"s" : string' ) )
			$mol_assert_ok( out.includes( '"b" : boolean' ) )
			$mol_assert_ok( out.includes( '"f" : number' ) )
			$mol_assert_ok( !/export type ID =/.test( out ) )
		},

		'NonNull vs nullable: optional marker and "| null" union'() {
			const out = $mol_build_gql.compile({
				source: 'type T { req: String! opt: String }',
				external: [],
				class_name: '\x24x',
				is_schema_only: true,
			})
			$mol_assert_ok( /"req" : string\b/.test( out ) )
			$mol_assert_ok( /"opt"\? : string \| null/.test( out ) )
		},

		'enum becomes union of string literals'() {
			const out = $mol_build_gql.compile({
				source: 'enum Role { admin member guest }',
				external: [],
				class_name: '\x24x',
				is_schema_only: true,
			})
			$mol_assert_ok( out.includes( 'export type Role = "admin" | "member" | "guest"' ) )
		},

		'operation result typed via Query root when present in schema'() {
			const out = $mol_build_gql.compile({
				source: 'type Query { foo: String } query GetFoo { foo }',
				external: [],
				class_name: '\x24x',
				is_schema_only: false,
			})
			$mol_assert_ok( /result: \{\} as Query/.test( out ) )
		},

		'operation result is unknown when no root type in schema'() {
			const out = $mol_build_gql.compile({
				source: 'query Anon { hi }',
				external: [],
				class_name: '\x24x',
				is_schema_only: false,
			})
			$mol_assert_ok( /result: \{\} as unknown/.test( out ) )
		},

		'variable definitions become typed variables field on operation const'() {
			const out = $mol_build_gql.compile({
				source: 'query Foo(\x24id: ID!) { foo(id: \x24id) }',
				external: [],
				class_name: '\x24x',
				is_schema_only: false,
			})
			$mol_assert_ok( /variables: \{\} as \{ id : string \}/.test( out ) )
		},

		'operation without variables: variables typed as undefined'() {
			const out = $mol_build_gql.compile({
				source: 'query NoVars { foo }',
				external: [],
				class_name: '\x24x',
				is_schema_only: false,
			})
			$mol_assert_ok( /variables: undefined as undefined/.test( out ) )
		},

		'operation satisfies $mol_gql_operation generic'() {
			const out = $mol_build_gql.compile({
				source: 'query Foo { hi }',
				external: [],
				class_name: '\x24x',
				is_schema_only: false,
			})
			$mol_assert_ok( out.includes( 'satisfies \x24mol_gql_operation<' ) )
		},

		'parse error returns wrapped namespace, does not throw'() {
			const out = $mol_build_gql.compile({
				source: 'type Broken {',
				external: [],
				class_name: '\x24x',
				is_schema_only: true,
			})
			$mol_assert_ok( out.startsWith( 'namespace \x24' ) )
			$mol_assert_ok( out.includes( 'parse error' ) )
		},

		'is_schema_file recognizes .schema.gql and .schema.graphql'() {
			$mol_assert_equal( $mol_build_gql.is_schema_file( 'api.schema.gql' ), true )
			$mol_assert_equal( $mol_build_gql.is_schema_file( 'api.schema.graphql' ), true )
			$mol_assert_equal( $mol_build_gql.is_schema_file( 'api.gql' ), false )
			$mol_assert_equal( $mol_build_gql.is_schema_file( 'schema.txt' ), false )
		},

	})

}
