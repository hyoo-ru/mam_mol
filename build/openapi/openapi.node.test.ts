namespace $ {

	const minimal_spec = {
		paths: {
			'/pets': {
				get: {
					operationId: 'listPets',
					parameters: [ { name: 'limit', in: 'query' } ],
					responses: {
						'200': { description: 'ok', content: { 'application/json': { schema: {} } } },
					},
				},
			},
			'/pets/{id}': {
				get: {
					operationId: 'getPet',
					parameters: [ { name: 'id', in: 'path', required: true } ],
					responses: {
						'200': { description: 'ok', content: { 'application/json': { schema: {} } } },
					},
				},
				post: {
					operationId: 'updatePet',
					parameters: [ { name: 'id', in: 'path', required: true } ],
					requestBody: { content: { 'application/json': { schema: {} } } },
					responses: { '201': { description: 'created' } },
				},
			},
		},
	}

	$mol_test({

		'flat const per op in namespace \x24 with prefix and snake_case name'() {
			const out = $mol_build_openapi.compile({
				spec: minimal_spec,
				types_text: '',
				class_name: '\x24x',
			})
			$mol_assert_equal( /export const \x24x_list_pets = \{/.test( out ), true )
			$mol_assert_equal( /export const \x24x_get_pet = \{/.test( out ), true )
			$mol_assert_equal( /export const \x24x_update_pet = \{/.test( out ), true )
			$mol_assert_equal( /method: "GET"/.test( out ), true )
			$mol_assert_equal( /method: "POST"/.test( out ), true )
		},

		'path params typed via \x24x.operations[opId][parameters][path]'() {
			const out = $mol_build_openapi.compile({
				spec: minimal_spec,
				types_text: '',
				class_name: '\x24x',
			})
			$mol_assert_equal( out.includes( `\x24x.operations[ "getPet" ][ 'parameters' ][ 'path' ]` ), true )
		},

		'result inferred from response 200 application/json'() {
			const out = $mol_build_openapi.compile({
				spec: minimal_spec,
				types_text: '',
				class_name: '\x24x',
			})
			$mol_assert_equal( out.includes( `\x24x.operations[ "listPets" ][ 'responses' ][ 200 ]` ), true )
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
			$mol_assert_equal( out.includes( `\x24x.operations[ "xGet" ][ 'responses' ][ 'default' ]` ), true )
		},

		'generated file has zero references to \x24mol_openapi'() {
			const out = $mol_build_openapi.compile({
				spec: minimal_spec,
				types_text: '',
				class_name: '\x24x',
			})
			$mol_assert_equal( /\x24mol_openapi/.test( out ), false )
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

		'unique op name when operationId absent (derived from method_route)'() {
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
			$mol_assert_equal( /export const \x24x_get_a = \{/.test( out ), true )
			$mol_assert_equal( /export const \x24x_get_a_b = \{/.test( out ), true )
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
