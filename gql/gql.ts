namespace $ {

	/**
	 * Описание одной GraphQL-операции — чистые данные.
	 * Поля `in` и `out` несут только тип; runtime-placeholder.
	 * Codegen `.gql` файла кладёт операции как flat const в `namespace $`.
	 */
	export type $mol_gql_op< In, Out > = {
		readonly query : string,
		readonly in : In,
		readonly out : Out,
	}

	/**
	 * Типизированный GraphQL-клиент — функция: принимает операцию (+ vars если есть)
	 * и возвращает out. Сигнатура — overloaded по форме `in`:
	 *   - `in extends undefined` → второй аргумент необязателен
	 *   - иначе → vars обязательны
	 */
	export type $mol_gql_client = {
		< Out >( op : $mol_gql_op< undefined, Out > ) : Out
		< In, Out >( op : $mol_gql_op< In, Out >, vars : In ) : Out
	}

	/**
	 * Factory типизированного GraphQL-клиента.
	 *
	 * Пример (в `api/api.ts`):
	 *   export const $bog_lk_gql = $mol_gql_fetch( 'https://api.example.com/graphql' )
	 *
	 * Использование (в view):
	 *   const data = this.$.$bog_lk_gql( $bog_lk_api_countries_list_countries )
	 *   const data = this.$.$bog_lk_gql( $bog_lk_api_country_by_code, { code: 'AD' } )
	 *
	 * Возвращённая функция замкнута на endpoint+init, так что view-код не знает
	 * о транспорте. Если нужен другой транспорт (сокеты/RPC) — напиши свою factory
	 * с такой же сигнатурой; операции переиспользуются как есть.
	 */
	export function $mol_gql_fetch( endpoint : string, init? : RequestInit ) : $mol_gql_client {

		const headers_base : Record< string, string > = { 'content-type': 'application/json' }
		if( init?.headers ) Object.assign( headers_base, init.headers as Record< string, string > )

		return function $mol_gql_call( op : $mol_gql_op< any, any >, vars? : unknown ) {

			const res = $mol_fetch.json( endpoint, {
				...init,
				method: 'POST',
				headers: headers_base,
				body: JSON.stringify({ query: op.query, variables: vars }),
			}) as { data? : unknown, errors? : readonly { message : string }[] }

			if( res.errors?.length ) throw new Error( res.errors.map( e => e.message ).join( '\n' ) )

			return res.data
		} as $mol_gql_client
	}

}
