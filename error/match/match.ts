namespace $ {
	const seen = new WeakSet<Error>()

	export function $mol_error_match< Instance >(
		host: unknown,
		is: (e: unknown) => e is Instance
	): Instance | null {
		
		if( is(host) ) return host
		if ( ! ( host instanceof Error ) ) return null
		if (seen.has(host)) return null

		seen.add(host)

		let sub

		if ( host instanceof AggregateError ) {
			for( const e of host.errors ) {
				sub = $mol_error_match(e, is)
				if (sub) break
			}
		}

		if ( ! sub && ! ( host instanceof $mol_error_mix ) && Array.isArray(host.cause) ) {
			for( const e of host.cause ) {
				sub = $mol_error_match(e, is)
				if (sub) break
			}
		}

		if (! sub) sub = $mol_error_match(host.cause, is)

		seen.delete(host)

		return sub
	}

	export function $mol_error_match_all< Instance >(
		host: unknown,
		is: (e: unknown) => e is Instance
	) {

		const finded: Instance[] = []

		$mol_error_match(host, (e): e is Instance => {
			if (is( e )) finded.push(e as Instance)
			return false
		})

		return finded
	}

}
