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
	 * Mapped type-диспетчер: ищет в Obj все ключи со shape OpenAPI-операции и
	 * преобразует в callable с правильной сигнатурой input'а:
	 *   - нет path params + нет query + нет body → `() => Out`
	 *   - есть path params → `(input: { params, query?, body? }) => Out` (input обязателен)
	 *   - только query/body → `(input?: { query?, body? }) => Out`
	 */
	type $mol_openapi_dispatch< Obj > = {
		[ K in keyof Obj ] : Obj[ K ] extends $mol_openapi_op< infer P, infer Q, infer B, infer R >
			? ( [ P ] extends [ undefined ]
				? ( [ Q ] extends [ undefined ]
					? ( [ B ] extends [ undefined ]
						? () => R
						: ( input : { body : B } ) => R
					)
					: ( input? : { query? : Q, body? : B } ) => R
				)
				: ( input : { params : P, query? : Q, body? : B } ) => R
			)
			: never
	}

	export class $mol_openapi extends $mol_object {

		static api_root() { return '' as string }

		static fetchInit() { return {} as RequestInit }

		static exec< P, Q, B, R >(
			op : $mol_openapi_op< P, Q, B, R >,
			input? : { params? : P, query? : Q, body? : B },
		) : R {

			// trailing `/` в endpoint + leading `/` в route → одиночный.
			let url = this.api_root().replace( /\/+$/, '' ) + op.route

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

			const init = this.fetchInit()
			const headers : Record< string, string > = {}
			if( init.headers ) Object.assign( headers, init.headers as Record< string, string > )
			const body = input?.body
			if( body !== undefined ) headers[ 'content-type' ] ??= 'application/json'

			return this.$.$mol_fetch.json( url, {
				...init,
				method: op.method,
				headers,
				body: body === undefined ? undefined : JSON.stringify( body ),
			}) as R
		}

		static get _() : $mol_openapi_dispatch< typeof $ > {
			const self = this
			return new Proxy( {} as $mol_openapi_dispatch< typeof $ >, {
				get( _target, key ) {
					if( typeof key === 'symbol' ) return undefined
					const op = ( self.$ as any )[ key ]
					if(
						op
						&& typeof op === 'object'
						&& typeof op.method === 'string'
						&& typeof op.route === 'string'
					) {
						return ( input : unknown ) => self.exec( op, input as any )
					}
					return undefined
				}
			} )
		}

	}

}
