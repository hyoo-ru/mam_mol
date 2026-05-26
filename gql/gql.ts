namespace $ {

	/**
	 * Описание одной GraphQL-операции — чистые данные.
	 * Поля `in` и `out` несут тип; runtime-значение для no-vars кейса = undefined,
	 * для with-vars = {} (placeholder, не используется при exec).
	 *
	 * Codegen `.gql` файла кладёт операции flat в `namespace $` без какой-либо
	 * привязки к `$mol_gql` — диспетчер автоматически их находит по форме через
	 * mapped type `$mol_gql_dispatch`.
	 */
	export type $mol_gql_op< In, Out > = {
		readonly query : string,
		readonly in : In,
		readonly out : Out,
	}

	/**
	 * Автоматическая типизация операций как методов: для каждого ключа `$`-namespace
	 * проверяем форму `{query, in, out}` и преобразуем в `(vars: In) => Out`.
	 * Не-операции отбрасываются (становятся `never`).
	 */
	type $mol_gql_dispatch< Obj > = {
		[ K in keyof Obj ] : Obj[ K ] extends $mol_gql_op< infer In, infer Out >
			? ( [ In ] extends [ undefined ] ? () => Out : ( vars : In ) => Out )
			: never
	}

	/**
	 * GraphQL клиент. Запросы лежат в `$` как pure data; здесь только транспорт.
	 *
	 * Использование:
	 *   $.$mol_gql._.$bog_lk_api_countries_list_countries()
	 *   $.$mol_gql._.$bog_lk_api_countries_country_by_code({ code: 'AD' })
	 *
	 * Override endpoint на уровне app — subclass + ambient:
	 *   class my_gql extends $mol_gql { static override api_root() { return '/gql' } }
	 *   static override $ = $mol_ambient({ $mol_gql: my_gql })
	 */
	export class $mol_gql extends $mol_object {

		static api_root() { return '' as string }

		static fetchInit() { return {} as RequestInit }

		static exec< In, Out >( op : $mol_gql_op< In, Out >, vars : In ) : Out {

			const init = this.fetchInit()
			const headers : Record< string, string > = { 'content-type': 'application/json' }
			if( init.headers ) Object.assign( headers, init.headers as Record< string, string > )

			const res = this.$.$mol_fetch.json( this.api_root(), {
				...init,
				method: 'POST',
				headers,
				body: JSON.stringify({ query: op.query, variables: vars }),
			}) as { data? : Out, errors? : readonly { message : string }[] }

			if( res.errors?.length ) throw new Error( res.errors.map( e => e.message ).join( '\n' ) )

			return res.data as Out
		}

		/**
		 * Proxy-вью на все операции `$`-namespace, типизированный через mapped type.
		 * Каждое обращение `_.<op>(vars)` ищет соответствующий const в `this.$`
		 * и пускает его через exec.
		 */
		static get _() : $mol_gql_dispatch< typeof $ > {
			const self = this
			return new Proxy( {} as $mol_gql_dispatch< typeof $ >, {
				get( _target, key ) {
					if( typeof key === 'symbol' ) return undefined
					const op = ( self.$ as any )[ key ]
					if( op && typeof op === 'object' && typeof op.query === 'string' ) {
						return ( vars : unknown ) => self.exec( op, vars )
					}
					return undefined
				}
			} )
		}

	}

}
