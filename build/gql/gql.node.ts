namespace $ {

	// AST node kinds из пакета graphql (`graphql/language/kinds`).
	const Kind = {
		Operation : 'OperationDefinition',
		Fragment : 'FragmentDefinition',
		Object : 'ObjectTypeDefinition',
		Interface : 'InterfaceTypeDefinition',
		Input : 'InputObjectTypeDefinition',
		Scalar : 'ScalarTypeDefinition',
		Enum : 'EnumTypeDefinition',
		Union : 'UnionTypeDefinition',
		NonNull : 'NonNullType',
		List : 'ListType',
		Named : 'NamedType',
	} as const

	// Имена корневых типов в GraphQL-схеме. Если operation типа `query` — её результат
	// типизируется через namespace-member с этим именем.
	const Roots = {
		query : 'Query',
		mutation : 'Mutation',
		subscription : 'Subscription',
	} as const

	// GraphQL spec scalars → TS-типы.
	const BuiltinScalars : Readonly< Record< string, string > > = {
		Int : 'number',
		Float : 'number',
		String : 'string',
		ID : 'string',
		Boolean : 'boolean',
	}

	// Часто встречающиеся не-стандартные scalars. Маппинг — best effort,
	// пользователь может переопределить дополнив свой `.schema.gql`.
	const KnownScalars : Readonly< Record< string, string > > = {
		DateTime : 'string',
		Date : 'string',
		Time : 'string',
		JSON : 'unknown',
		UUID : 'string',
		BigInt : 'string',
		Decimal : 'string',
	}

	const SchemaFileRegex = /\.schema\.(gql|graphql)$/

	type GraphqlLib = typeof import( 'graphql' )
	type DocumentNode = ReturnType< GraphqlLib[ 'parse' ] >
	type DefinitionNode = DocumentNode[ 'definitions' ][ number ]
	type TypeNode = {
		kind : string
		type? : TypeNode
		name? : { value : string }
	}

	export namespace $mol_build_gql {

		/**
		 * Принимает текст одного .gql/.graphql файла и тексты всех внешних *.schema.gql
		 * найденных выше по дереву, возвращает готовый namespace+class TypeScript-код
		 * для последующей компиляции внутри основного бандла.
		 */
		export function compile(
			input : {
				source : string,
				external : readonly string[],
				class_name : string,
				is_schema_only : boolean,
			},
		) : string {

			const gql = $node.graphql as GraphqlLib

			let own_doc : DocumentNode
			const external_docs : DocumentNode[] = []
			try {
				own_doc = gql.parse( input.source )
				for( const text of input.external ) external_docs.push( gql.parse( text ) )
			} catch( error ) {
				const message = ( error as Error ).message.replace( /\*\//g, '* /' )
				return multiline(
					'namespace $ {',
					`\t/* $mol_build gql parse error: ${ message } */`,
					'}',
					'',
				)
			}

			const schema_defs = collect_schema_defs( own_doc, external_docs )
			const root_types = collect_root_types( schema_defs )
			const operations = input.is_schema_only
				? []
				: ( own_doc.definitions as DefinitionNode[] ).filter( def => def.kind === Kind.Operation )

			const types_code = render_types( schema_defs )
			const op_prefix = input.class_name
			const operations_code = render_operations( operations, root_types, op_prefix, input.source )

			const types_block = types_code
				? multiline( `namespace $.${ input.class_name } {`, types_code, '}' )
				: ''

			const ops_block = operations_code
				? multiline( 'namespace $ {', operations_code, '}' )
				: ''

			return [ types_block, ops_block ].filter( Boolean ).join( '\n\n' ) + '\n'
		}

		export function is_schema_file( name : string ) {
			return SchemaFileRegex.test( name )
		}

		/**
		 * Внешний доступ для render-функций — нужно для тестирования и для случая когда
		 * вызвавший хочет получить только TS-типы из distinct схемы.
		 */
		export const render = {
			types : render_types,
			operations : render_operations,
			type_ref : render_type_ref,
			type_nullable : render_type_nullable,
		}

		/**
		 * Operation-файл может ссылаться на типы из внешней схемы лежащей в одном
		 * из родительских модулей (`*.schema.gql`). Собираем тексты всех найденных
		 * выше по дереву до корня.
		 */
		export function collect_external_schemas(
			file : $mol_file,
			root : $mol_file,
		) : string[] {

			const result : string[] = []
			const root_depth = root.path().split( '/' ).length
			let dir = file.parent()

			while( dir.path().split( '/' ).length >= root_depth ) {
				for( const sub of dir.sub() ) {
					if( sub === file ) continue
					if( sub.type() !== 'file' ) continue
					if( !SchemaFileRegex.test( sub.name() ) ) continue
					result.push( sub.text() )
				}
				if( dir === root ) break
				dir = dir.parent()
			}

			return result
		}

		/**
		 * Зависимости gql/graphql файла для графа модулей: $mol_fetch плюс ссылки на
		 * родительские модули где может лежать `*.schema.gql` (для operation-файла).
		 */
		export function deps( source : $mol_file, root : $mol_file ) : Record< string, number > {

			const result : Record< string, number > = { '/mol/gql' : 0 }
			if( SchemaFileRegex.test( source.name() ) ) return result

			const root_depth = root.path().split( '/' ).length
			let dir = source.parent()

			while( dir.path().split( '/' ).length >= root_depth ) {
				for( const sub of dir.sub() ) {
					if( sub === source ) continue
					if( sub.type() !== 'file' ) continue
					if( !SchemaFileRegex.test( sub.name() ) ) continue
					result[ '/' + sub.parent().relate( root ) ] = 0
				}
				if( dir === root ) break
				dir = dir.parent()
			}

			return result
		}

	}

	/**
	 * Дедуп по имени: что объявлено в самом файле — приоритетнее внешней схемы.
	 * Это даёт юзеру override-механизм inline в operations-файле.
	 */
	function collect_schema_defs(
		own_doc : DocumentNode,
		external_docs : DocumentNode[],
	) : DefinitionNode[] {

		const seen = new Set< string >()
		const result : DefinitionNode[] = []

		add_defs( own_doc.definitions as DefinitionNode[], seen, result )
		for( const doc of external_docs ) add_defs( doc.definitions as DefinitionNode[], seen, result )

		return result
	}

	function add_defs(
		defs : DefinitionNode[],
		seen : Set< string >,
		result : DefinitionNode[],
	) {
		for( const def of defs ) {
			if( def.kind === Kind.Operation ) continue
			if( def.kind === Kind.Fragment ) continue
			const name = ( def as { name? : { value : string } } ).name?.value
			if( !name || seen.has( name ) ) continue
			seen.add( name )
			result.push( def )
		}
	}

	function collect_root_types( defs : DefinitionNode[] ) : Set< string > {
		const roots = new Set< string >()
		const root_names = new Set< string >( Object.values( Roots ) )
		for( const def of defs ) {
			if( def.kind !== Kind.Object ) continue
			const name = ( def as { name? : { value : string } } ).name?.value
			if( name && root_names.has( name ) ) roots.add( name )
		}
		return roots
	}

	function render_type_ref( node : TypeNode, scope : string ) : string {
		if( node.kind === Kind.NonNull ) return render_type_ref( node.type!, scope )
		// Inner-of-list nullability определяется самим inner-узлом (NonNull или нет),
		// а не оборачивается принудительно — `[String!]` → `readonly string[]`,
		// `[String]` → `readonly ( string | null )[]`.
		if( node.kind === Kind.List ) return `readonly ( ${ render_type_nullable( node.type!, scope ) } )[]`
		if( node.kind === Kind.Named ) {
			const name = node.name!.value
			const builtin = BuiltinScalars[ name ]
			if( builtin ) return builtin
			return scope ? `${ scope }.${ name }` : name
		}
		return 'unknown'
	}

	function render_type_nullable( node : TypeNode, scope : string ) : string {
		if( node.kind === Kind.NonNull ) return render_type_ref( node.type!, scope )
		return `${ render_type_ref( node, scope ) } | null`
	}

	function render_types( defs : DefinitionNode[] ) : string {

		const lines : string[] = []

		for( const def of defs ) {

			const name = ( def as { name? : { value : string } } ).name?.value
			if( !name ) continue

			if( def.kind === Kind.Scalar ) {
				if( BuiltinScalars[ name ] ) continue
				lines.push( `\texport type ${ name } = ${ KnownScalars[ name ] ?? 'string' }` )
				continue
			}

			if( def.kind === Kind.Enum ) {
				const values = ( ( def as any ).values as { name : { value : string } }[] )
					.map( v => JSON.stringify( v.name.value ) )
					.join( ' | ' )
				lines.push( `\texport type ${ name } = ${ values || 'never' }` )
				continue
			}

			if( def.kind === Kind.Object || def.kind === Kind.Interface || def.kind === Kind.Input ) {
				const fields = ( ( ( def as any ).fields ?? [] ) as Array< {
					name : { value : string },
					type : TypeNode,
				} > ).map( field => {
					const nullable = field.type.kind !== Kind.NonNull
					const key = JSON.stringify( field.name.value )
					const optional = nullable ? '?' : ''
					return `\t\treadonly ${ key }${ optional } : ${ render_type_nullable( field.type, '' ) }`
				} ).join( '\n' )
				lines.push( `\texport interface ${ name } {\n${ fields }\n\t}` )
				continue
			}

			if( def.kind === Kind.Union ) {
				const members = ( ( def as any ).types as { name : { value : string } }[] )
					.map( t => t.name.value )
					.join( ' | ' )
				lines.push( `\texport type ${ name } = ${ members || 'never' }` )
				continue
			}
		}

		return lines.join( '\n' )
	}

	type OpNode = {
		operation : keyof typeof Roots,
		name? : { value : string },
		loc? : { start : number, end : number },
		variableDefinitions? : Array< {
			variable : { name : { value : string } },
			type : TypeNode,
		} >,
	}

	function render_operations(
		operations : DefinitionNode[],
		root_types : Set< string >,
		prefix : string,
		source : string,
	) : string {

		const rendered = ( operations as OpNode[] )
			.map( op => render_operation( op, root_types, prefix, source ) )
			.filter( ( m ) : m is string => m !== null )

		return rendered.join( '\n' )
	}

	/**
	 * Каждая операция — отдельная flat const в namespace `$` с префиксом из пути файла:
	 *   `$bog_lk_api_countries_list_countries = { query, in, out }`.
	 *
	 * Types-only поля: `in` (variables) и `out` (result). Runtime — placeholder
	 * (undefined / {}). Реальные значения передаются при вызове через $mol_gql.
	 *
	 * Result типизируется как **полный** root-тип (Query/Mutation/Subscription),
	 * а не как reconstruction из selection set — намеренный design trade-off.
	 */
	function render_operation(
		op : OpNode,
		root_types : Set< string >,
		prefix : string,
		source : string,
	) : string | null {

		const op_name = op.name?.value
		if( !op_name ) return null

		const full_name = `${ prefix }_${ camel_to_snake( op_name ) }`
		const vars = op.variableDefinitions ?? []

		const vars_type = render_vars_type( vars )
		const vars_runtime = vars.length ? '{}' : 'undefined'

		const root_name = Roots[ op.operation ]
		const result_type = root_types.has( root_name ) ? `${ prefix }.${ root_name }` : 'unknown'

		const op_src = source.substring( op.loc!.start, op.loc!.end )

		return multiline(
			`\texport const ${ full_name } = {`,
			`\t\tquery: ${ JSON.stringify( op_src ) },`,
			`\t\tin: ${ vars_runtime } as ${ vars_type },`,
			`\t\tout: {} as ${ result_type },`,
			`\t}`,
		)
	}

	function render_vars_type( vars : OpNode[ 'variableDefinitions' ] & object ) : string {
		if( !vars.length ) return 'undefined'
		const fields = vars.map( v => {
			const nullable = v.type.kind !== Kind.NonNull
			return `${ v.variable.name.value }${ nullable ? '?' : '' } : ${ render_type_nullable( v.type, '' ) }`
		} ).join( ', ' )
		return `{ ${ fields } }`
	}

	function camel_to_snake( s : string ) : string {
		return s.replace( /([a-z0-9])([A-Z])/g, '$1_$2' ).toLowerCase()
	}

	function multiline( ...lines : readonly string[] ) : string {
		return lines.join( '\n' )
	}

}
