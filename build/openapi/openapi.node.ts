namespace $ {

	const HttpMethods = [ 'get', 'post', 'put', 'patch', 'delete', 'head', 'options' ] as const
	type HttpMethod = typeof HttpMethods[ number ]

	const ParamLocation = {
		Path : 'path',
		Query : 'query',
	} as const

	const JsonMime = 'application/json'

	const OpenapiFileRegex = /\.openapi\.(yaml|yml|json)$/
	const OpenapiJsonFileRegex = /\.openapi\.json$/

	// openapi-typescript иногда печатает декларацию `$defs` для JSON-Schema 2020-12 совместимости.
	// `$defs` парсится ts-dep-сканером как ссылка на пакет `/defs` — фейковая зависимость.
	// Удаляем безопасную пустую декларацию (Record<string,never>).
	const FakeDefsLine = /^[ \t]*export\s+type\s+\$\w+\s*=\s*Record\s*<\s*string\s*,\s*never\s*>\s*;?\s*$/gm

	type Parameter = {
		name : string,
		in : string,
	}

	type Operation = {
		operationId? : string,
		parameters? : Parameter[],
		requestBody? : unknown,
		responses? : Record< string, unknown >,
	}

	type PathItem = Partial< Record< HttpMethod, Operation > >

	type Spec = {
		paths? : Record< string, PathItem >,
	}

	export namespace $mol_build_openapi {

		/**
		 * Принимает уже распарсенную OpenAPI-спеку и текст типов из openapi-typescript,
		 * возвращает готовый namespace+class TypeScript-код.
		 */
		export function compile(
			input : {
				spec : Spec,
				types_text : string,
				class_name : string,
			},
		) : string {

			const types_block = indent_types( sanitize_types( input.types_text ) )
			const operations_block = render_operations( input.spec )

			return [
				`namespace $.${ input.class_name } {`,
				types_block,
				operations_block,
				'}',
				'',
			].filter( Boolean ).join( '\n' )
		}

		/**
		 * YAML или JSON в зависимости от расширения. JSON парсится встроенным,
		 * YAML — пакетом `yaml`.
		 */
		export function parse_spec( text : string, file_name : string ) : Spec {
			if( OpenapiJsonFileRegex.test( file_name ) ) return JSON.parse( text ) as Spec
			const yaml = $node.yaml as typeof import( 'yaml' )
			return yaml.parse( text ) as Spec
		}

		export function is_openapi_file( name : string ) {
			return OpenapiFileRegex.test( name )
		}

		export const render = {
			operations : render_operations,
			sanitize : sanitize_types,
		}

		/**
		 * Сериализация AST из openapi-typescript v7 (если вернулся не текст).
		 */
		export function ast_to_text( ast : readonly unknown[] ) : string {
			const ts = $node.typescript as typeof import( 'typescript' )
			const file = ts.createSourceFile( 'out.d.ts', '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS )
			const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
			return ast
				.map( node => printer.printNode( ts.EmitHint.Unspecified, node as Parameters< typeof printer.printNode >[ 1 ], file ) )
				.join( '\n' )
		}

		/**
		 * OpenAPI-файл не имеет inter-module зависимостей помимо helper'а.
		 */
		export function deps() : Record< string, number > {
			return { '/mol/openapi' : 0 }
		}

	}

	function sanitize_types( raw : string ) : string {
		return raw.replace( FakeDefsLine, '' )
	}

	function indent_types( text : string ) : string {
		return text.split( '\n' ).map( line => line ? '\t' + line : line ).join( '\n' )
	}

	function render_operations( spec : Spec ) : string {

		const paths = spec.paths ?? {}
		const op_ids = collect_operation_ids( paths )
		const seen_op_names = new Set< string >()

		const lines : string[] = []

		for( const route in paths ) {
			const item = paths[ route ]
			if( !item ) continue
			for( const method of HttpMethods ) {
				const op = item[ method ]
				if( !op ) continue
				lines.push( render_operation( route, method, op, op_ids, seen_op_names ) )
			}
		}

		return lines.join( '\n' )
	}

	function collect_operation_ids( paths : Record< string, PathItem > ) : Set< string > {
		const ids = new Set< string >()
		for( const route in paths ) {
			const item = paths[ route ]
			if( !item ) continue
			for( const method of HttpMethods ) {
				const op = item[ method ]
				if( op?.operationId ) ids.add( op.operationId )
			}
		}
		return ids
	}

	function render_operation(
		route : string,
		method : HttpMethod,
		op : Operation,
		op_ids : Set< string >,
		seen : Set< string >,
	) : string {

		const op_name = unique_operation_name( op, method, route, seen )
		const op_ref = op.operationId && op_ids.has( op.operationId )
			? `operations[ ${ JSON.stringify( op.operationId ) } ]`
			: null

		const success_code = first_success_code( op )

		const result_type = ( op_ref && success_code )
			? `NonNullable< ${ op_ref }[ 'responses' ][ ${ success_code } ] extends { content : { '${ JsonMime }' : infer R } } ? R : unknown >`
			: 'unknown'

		const path_params = ( op.parameters ?? [] ).filter( p => p.in === ParamLocation.Path )
		const query_params = ( op.parameters ?? [] ).filter( p => p.in === ParamLocation.Query )
		const has_body = !!op.requestBody

		const params_type = path_params.length
			? ( op_ref
				? `${ op_ref }[ 'parameters' ][ 'path' ]`
				: `{ ${ path_params.map( p => `${ JSON.stringify( p.name ) } : string | number` ).join( ', ' ) } }`
			)
			: 'undefined'
		const params_runtime = path_params.length ? '{}' : 'undefined'

		const query_type = query_params.length
			? ( op_ref
				? `${ op_ref }[ 'parameters' ][ 'query' ]`
				: `Record< string, string | number | boolean | undefined >`
			)
			: 'undefined'
		const query_runtime = query_params.length ? '{}' : 'undefined'

		const body_type = has_body
			? ( op_ref
				? `( ${ op_ref }[ 'requestBody' ] extends { content : { '${ JsonMime }' : infer B } } ? B : unknown )`
				: 'unknown'
			)
			: 'undefined'
		const body_runtime = has_body ? '{}' : 'undefined'

		return multiline(
			`\texport const ${ op_name } = {`,
			`\t\tmethod: ${ JSON.stringify( method.toUpperCase() ) },`,
			`\t\troute: ${ JSON.stringify( route ) },`,
			`\t\tparams: ${ params_runtime } as ${ params_type },`,
			`\t\tquery: ${ query_runtime } as ${ query_type },`,
			`\t\tbody: ${ body_runtime } as ${ body_type },`,
			`\t\tresult: {} as ${ result_type },`,
			`\t} satisfies $mol_openapi_operation< ${ params_type }, ${ query_type }, ${ body_type }, ${ result_type } >`,
		)
	}

	function unique_operation_name(
		op : Operation,
		method : HttpMethod,
		route : string,
		seen : Set< string >,
	) : string {
		const base = op.operationId
			?? ( method + '_' + route ).replace( /[^a-zA-Z0-9]+/g, '_' ).replace( /^_+|_+$/g, '' )
		let unique = base
		let i = 2
		while( seen.has( unique ) ) unique = `${ base }_${ i++ }`
		seen.add( unique )
		return unique
	}

	function first_success_code( op : Operation ) : string | null {
		const codes = Object.keys( op.responses ?? {} ).filter( c => /^2\d\d$/.test( c ) ).sort()
		return codes[ 0 ] ?? null
	}

	function multiline( ...lines : readonly string[] ) : string {
		return lines.join( '\n' )
	}

}
