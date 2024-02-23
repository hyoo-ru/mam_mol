namespace $ {
	const recursion_protect = new WeakMap<Error, true>()

	export function $mol_error_match< Instance >(
		host: unknown,
		is: (e: unknown) => boolean
	): Instance | null {
		
		if( is(host) ) return host as Instance
		if ( ! ( host instanceof Error ) ) return null
		if (recursion_protect.get(host)) return null

		recursion_protect.set(host, true)

		let sub

		if ( host instanceof AggregateError ) {
			for( const e of host.errors ) {
				sub = $mol_error_match< Instance >(e, is)
				if (sub) break
			}
		}

		if ( ! sub && ! ( host instanceof $mol_error_mix ) && Array.isArray(host.cause) ) {
			for( const e of host.cause ) {
				sub = $mol_error_match< Instance >(e, is)
				if (sub) break
			}
		}

		if (! sub) sub = $mol_error_match< Instance >(host.cause, is)

		recursion_protect.delete(host)

		return sub
	}

	export function $mol_error_match_all< Instance >(
		host: unknown,
		is: (e: unknown) => boolean
	): readonly Instance[] {

		const finded: Instance[] = []

		$mol_error_match<Instance>(host, e => {
			if (is( e )) finded.push(e as Instance)
			return false
		})

		return finded
	}

}
