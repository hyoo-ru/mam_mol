namespace $ {
	
	export const $mol_rapidapi_keys = [
		'ac9e15b3ffmsh0ca1100d872cde4p10d0a6jsn6d36584cc6c9',
		'35a6c33051mshcaec4228121469fp1309e2jsn59eaba641870',
		'2yNSyKBbKsmshVi1ObCaUKWbgTdhp128lDAjsnLwyPk8ZqxN52',
	]
	
	export function $mol_rapidapi(
		this: $,
		name: string,
		path: string,
		query: Record< string, string >,
		body?: any,
	): any {
		
		const url = new URL(
			'?' + new URLSearchParams( query ),
			`https://${name}.p.rapidapi.com/${path}`,
		).toString()
		
		const headers = {
			'x-rapidapi-key': $mol_array_lottery_sync( $mol_rapidapi_keys ),
			'Content-Type': body instanceof URLSearchParams ? 'application/x-www-form-urlencoded' : 'application/json'
		}
		
		const method = body ? 'POST' : 'GET'
		if( body && !( body instanceof  URLSearchParams ) ) body = JSON.stringify( body )
		
		return this.$mol_fetch.json( url, { method, headers, body } )
	
	}

}
