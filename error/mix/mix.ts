namespace $ {

	export class $mol_error_mix extends AggregateError {

		name = $$.$mol_func_name( this.constructor )
		
		constructor( message: string, ... errors: Error[] ) {
			super(
				errors,
				[ message, ... errors.map( e => e.message.replace( /^/gm, '  ' ) ) ].join( '\n' ),
			)
		}
		
		get cause() {
			return ( [] as any[] ).concat(
				... this.errors.map( e => e.cause ).filter( Boolean )
			)
		}
		
		toJSON() {
			return this.errors.map( e => e.message )
		}

		static recursion_protect = new WeakMap<Error, true>()

		static find< Instance >(
			host: unknown,
			is: (e: unknown) => boolean
		): Instance | null {
			
			if( is(host) ) return host as Instance
			if ( ! ( host instanceof Error ) ) return null
			if (this.recursion_protect.get(host)) return null

			this.recursion_protect.set(host, true)

			let sub

			if ( ! ( host instanceof $mol_error_mix ) && Array.isArray(host.cause) ) {
				for( const e of host.cause ) {
					sub = this.find< Instance >(e, is)
					if (sub) break
				}
			}

			if ( ! sub && host instanceof AggregateError ) {
				for( const e of host.errors ) {
					sub = this.find< Instance >(e, is)
					if (sub) break
				}
			}

			if (! sub) sub = this.find< Instance >(host.cause, is)

			this.recursion_protect.delete(host)

			return sub
		}

		static filter< Instance >(
			host: unknown,
			is: (e: unknown) => boolean
		): readonly Instance[] {

			const finded: Instance[] = []

			this.find<Instance>(host, e => {
				if (is( e )) finded.push(e as Instance)
				return false
			})

			return finded
		}

		filter< Instance >( is: (e: unknown) => boolean ) {
			return $mol_error_mix.filter<Instance>(this, is)
		}

		find< Instance >( is: (e: unknown) => boolean ) {
			return $mol_error_mix.find<Instance>(this, is)
		}

		pick<
			Instance extends Error,
			Class extends new (...args: any[]) => Instance
		>( Class: Class ) {
			return this.find<Instance>(e => e instanceof Class)
		}

		pick_all<
			Instance extends Error,
			Class extends new (...args: any[]) => Instance
		>( Class: Class ) {
			return this.filter<Instance>(e => e instanceof Class)
		}

	}

}
