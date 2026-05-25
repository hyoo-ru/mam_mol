namespace $ {

	/**
	 * Описание одной OpenAPI-операции — чистое значение. Поля `params`, `query`, `body`
	 * и `result` несут только тип (runtime — `{}` или `undefined`); реальные значения
	 * передаются при вызове `$mol_openapi.fetch`.
	 */
	export type $mol_openapi_operation<
		Params = unknown,
		Query = unknown,
		Body = unknown,
		Result = unknown,
	> = {
		readonly method : string,
		readonly route : string,
		readonly params : Params,
		readonly query : Query,
		readonly body : Body,
		readonly result : Result,
	}

	/**
	 * Helper для дефолтного кейса — REST поверх $mol_fetch.json:
	 * - `{name}` в route подставляются из `input.params`
	 * - `input.query` сериализуется через URLSearchParams
	 * - `input.body` JSON-сериализуется, content-type выставляется автоматически
	 *
	 * Non-OK ответы (4xx/5xx) пробрасываются как исключения из `$mol_fetch.json` —
	 * `@$mol_mem` view'а ловит их и показывает error-плашку. Свой error-handling
	 * пиши при необходимости в собственном helper'е.
	 */
	export class $mol_openapi extends $mol_object {

		@ $mol_action
		static fetch< Params, Query, Body, Result >(
			endpoint : string,
			op : $mol_openapi_operation< Params, Query, Body, Result >,
			input? : { params? : Params, query? : Query, body? : Body },
			init? : RequestInit,
		) : Result {

			// trailing `/` в endpoint + leading `/` в route → одиночный.
			let url = endpoint.replace( /\/+$/, '' ) + op.route

			if( input?.params ) {
				const params = input.params as Record< string, unknown >
				for( const key in params ) {
					url = url.replace( '{' + key + '}', encodeURIComponent( String( params[ key ] ) ) )
				}
			}

			if( input?.query ) {
				const qs = new URLSearchParams()
				const query = input.query as Record< string, unknown >
				for( const key in query ) {
					const value = query[ key ]
					if( value !== undefined ) qs.append( key, String( value ) )
				}
				const qstr = qs.toString()
				if( qstr ) url += ( url.includes( '?' ) ? '&' : '?' ) + qstr
			}

			const headers : Record< string, string > = {}
			if( init?.headers ) Object.assign( headers, init.headers as Record< string, string > )
			const body = input?.body
			if( body !== undefined ) headers[ 'content-type' ] ??= 'application/json'

			return this.$.$mol_fetch.json( url, {
				...init,
				method: op.method,
				headers,
				body: body === undefined ? undefined : JSON.stringify( body ),
			}) as Result
		}

	}

}
