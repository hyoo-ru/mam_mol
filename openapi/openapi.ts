namespace $ {

	export type $mol_openapi_op< Params, Query, Body, Out > = {
		readonly method : string,
		readonly route : string,
		readonly params : Params,
		readonly query : Query,
		readonly body : Body,
		readonly out : Out,
	}

	/**
	 * Типизированный OpenAPI-клиент — функция. Overloaded сигнатуры по форме входа:
	 *   - all params/query/body = undefined → 1 аргумент (op)
	 *   - есть path params → 2-й аргумент `input` обязателен
	 *   - только optional → `input` опционален
	 */
	export type $mol_openapi_client = {
		< Q, B, R >( op : $mol_openapi_op< undefined, Q, B, R >, input? : { query? : Q, body? : B } ) : R
		< P, Q, B, R >( op : $mol_openapi_op< P, Q, B, R >, input : { params : P, query? : Q, body? : B } ) : R
	}

	/**
	 * Factory типизированного REST/OpenAPI клиента.
	 *
	 *   export const $bog_lk_petstore = $mol_openapi_fetch(
	 *       'https://petstore3.swagger.io/api/v3',
	 *       { headers: { 'api_key': 'special-key' } },
	 *   )
	 *
	 *   this.$.$bog_lk_petstore( $bog_lk_api_petstore_get_pet_by_id, { params: { petId: 1 } } )
	 */
	export function $mol_openapi_fetch( endpoint : string, init? : RequestInit ) : $mol_openapi_client {

		const root = endpoint.replace( /\/+$/, '' )

		return function $mol_openapi_call(
			op : $mol_openapi_op< any, any, any, any >,
			input? : { params? : unknown, query? : unknown, body? : unknown },
		) : unknown {

			let url = root + op.route

			const params = input?.params as Record< string, unknown > | undefined
			if( params ) {
				for( const key in params ) {
					url = url.replace( '{' + key + '}', encodeURIComponent( String( params[ key ] ) ) )
				}
			}

			const query = input?.query as Record< string, unknown > | undefined
			if( query ) {
				const qs = new URLSearchParams()
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

			return $mol_fetch.json( url, {
				...init,
				method: op.method,
				headers,
				body: body === undefined ? undefined : JSON.stringify( body ),
			})
		} as $mol_openapi_client
	}

}
