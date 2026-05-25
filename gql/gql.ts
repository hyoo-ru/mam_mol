namespace $ {

	/**
	 * Описание одной GraphQL-операции — чистое значение, без зашитого транспорта.
	 * Сгенерированный кодгеном `.gql`-файла набор таких объектов лежит в namespace
	 * с типами схемы. Поля `variables` и `result` несут только тип (runtime — `{}` или
	 * `undefined`); реальные значения приходят при вызове `$mol_gql.fetch`.
	 */
	export type $mol_gql_operation< Variables = unknown, Result = unknown > = {
		readonly query : string,
		readonly variables : Variables,
		readonly result : Result,
	}

	/**
	 * Helper для дефолтного кейса — POST на эндпоинт с JSON-body.
	 * Если нужен другой транспорт (сокет, RPC, live-queries) — пиши свой helper
	 * над тем же объектом операции.
	 *
	 * `{{placeholder}}` в query можно подменить до вызова через
	 * `{ ...op, query: op.query.replace('{{filter}}', dynamic) }`.
	 */
	export class $mol_gql extends $mol_object {

		@ $mol_action
		static fetch< Variables, Result >(
			endpoint : string,
			op : $mol_gql_operation< Variables, Result >,
			variables : Variables,
			init? : RequestInit,
		) : Result {

			const headers : Record< string, string > = { 'content-type': 'application/json' }
			if( init?.headers ) Object.assign( headers, init.headers as Record< string, string > )

			const res = this.$.$mol_fetch.json( endpoint, {
				...init,
				method: 'POST',
				headers,
				body: JSON.stringify({ query: op.query, variables }),
			}) as { data? : Result, errors? : readonly { message : string }[] }

			if( res.errors?.length ) throw new Error( res.errors.map( e => e.message ).join( '\n' ) )

			return res.data as Result
		}

	}

}
