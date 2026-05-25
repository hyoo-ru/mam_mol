namespace $ {

	const minimal_spec = {
		paths: {
			'/pets': {
				get: {
					operationId: 'listPets',
					parameters: [
						{ name: 'limit', in: 'query' },
					],
					responses: {
						'200': { description: 'ok', content: { 'application/json': { schema: {} } } },
					},
				},
			},
			'/pets/{id}': {
				get: {
					operationId: 'getPet',
					parameters: [
						{ name: 'id', in: 'path', required: true },
					],
					responses: {
						'200': { description: 'ok', content: { 'application/json': { schema: {} } } },
					},
				},
				post: {
					operationId: 'updatePet',
					parameters: [
						{ name: 'id', in: 'path', required: true },
					],
					requestBody: { content: { 'application/json': { schema: {} } } },
					responses: {
						'201': { description: 'created' },
					},
				},
			},
		},
	}

	$mol_test({

		'every path×method becomes export const with method/route/params/query/body/result'() {
			const out = $mol_build_openapi.compile({
				spec: minimal_spec,
				types_text: '',
				class_name: '\x24x',
			})
			$mol_assert_equal( out.startsWith( 'namespace \x24.\x24x' ), true )
			$mol_assert_equal( /export const listPets = \{/.test( out ), true )
			$mol_assert_equal( /export const getPet = \{/.test( out ), true )
			$mol_assert_equal( /export const updatePet = \{/.test( out ), true )
			$mol_assert_equal( /method: "GET"/.test( out ), true )
			$mol_assert_equal( /method: "POST"/.test( out ), true )
		},

		'path params typed via operations[opId][parameters][path] when there are any'() {
			const out = $mol_build_openapi.compile({
				spec: minimal_spec,
				types_text: '',
				class_name: '\x24x',
			})
			$mol_assert_equal( out.includes( `operations[ "getPet" ][ 'parameters' ][ 'path' ]` ), true )
		},

		'result typed via operations[opId][responses][200][application/json] infer'() {
			const out = $mol_build_openapi.compile({
				spec: minimal_spec,
				types_text: '',
				class_name: '\x24x',
			})
			$mol_assert_equal( out.includes( `operations[ "listPets" ][ 'responses' ][ 200 ]` ), true )
			$mol_assert_equal( out.includes( `infer R` ), true )
		},

		'success code falls back to `default` when no 2xx response declared'() {
			const spec = {
				paths: {
					'/x': {
						get: {
							operationId: 'xGet',
							responses: {
								'default': { description: 'any', content: { 'application/json': { schema: {} } } },
							},
						},
					},
				},
			}
			const out = $mol_build_openapi.compile({
				spec,
				types_text: '',
				class_name: '\x24x',
			})
			$mol_assert_equal( out.includes( `operations[ "xGet" ][ 'responses' ][ 'default' ]` ), true )
		},

		'success code falls back to 201 when no 2xx earlier'() {
			const out = $mol_build_openapi.compile({
				spec: minimal_spec,
				types_text: '',
				class_name: '\x24x',
			})
			$mol_assert_equal( out.includes( `operations[ "updatePet" ][ 'responses' ][ 201 ]` ), true )
		},

		'body typed via operations[opId][requestBody] infer'() {
			const out = $mol_build_openapi.compile({
				spec: minimal_spec,
				types_text: '',
				class_name: '\x24x',
			})
			$mol_assert_equal( /body: \{\} as \( operations\[ "updatePet" \]\[ 'requestBody' \]/.test( out ), true )
		},

		'no path params → params typed as undefined'() {
			const out = $mol_build_openapi.compile({
				spec: minimal_spec,
				types_text: '',
				class_name: '\x24x',
			})
			$mol_assert_equal( /export const listPets = \{[\s\S]*?params: undefined as undefined/.test( out ), true )
		},

		'operation satisfies $mol_openapi_operation generic'() {
			const out = $mol_build_openapi.compile({
				spec: minimal_spec,
				types_text: '',
				class_name: '\x24x',
			})
			$mol_assert_equal( out.includes( 'satisfies \x24mol_openapi_operation<' ), true )
		},

		'\x24defs declaration from openapi-typescript is stripped to avoid fake /defs dep'() {
			const types_text = [
				'export type webhooks = Record<string, never>;',
				'export type \x24defs = Record<string, never>;',
				'export interface paths { }',
			].join( '\n' )
			const out = $mol_build_openapi.compile({
				spec: { paths: {} },
				types_text,
				class_name: '\x24x',
			})
			$mol_assert_equal( out.includes( '\x24defs' ), false )
			$mol_assert_equal( out.includes( 'webhooks' ), true )
			$mol_assert_equal( out.includes( 'paths' ), true )
		},

		'unique operation name when operationId absent (derived from method_route)'() {
			const spec = {
				paths: {
					'/a': { get: { responses: { '200': { content: { 'application/json': {} } } } } },
					'/a/b': { get: { responses: { '200': { content: { 'application/json': {} } } } } },
				},
			}
			const out = $mol_build_openapi.compile({
				spec,
				types_text: '',
				class_name: '\x24x',
			})
			$mol_assert_equal( /export const get_a = \{/.test( out ), true )
			$mol_assert_equal( /export const get_a_b = \{/.test( out ), true )
		},

		'is_openapi_file recognizes yaml/yml/json'() {
			$mol_assert_equal( $mol_build_openapi.is_openapi_file( 'api.openapi.yaml' ), true )
			$mol_assert_equal( $mol_build_openapi.is_openapi_file( 'api.openapi.yml' ), true )
			$mol_assert_equal( $mol_build_openapi.is_openapi_file( 'api.openapi.json' ), true )
			$mol_assert_equal( $mol_build_openapi.is_openapi_file( 'api.yaml' ), false )
			$mol_assert_equal( $mol_build_openapi.is_openapi_file( 'openapi.json' ), false )
		},

	})

}
