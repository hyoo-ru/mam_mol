namespace $ {

	type wire_patch_stat = {
		count: number
		started: number
		first_stack?: string
		last_stack?: string
	}
	
	type wire_patch_pending_stat = {
		promise: Promise< unknown >
		started: number
		timer: ReturnType< typeof setTimeout >
		stack: string
	}

	const wire_patch_stats = new WeakMap< $mol_wire_fiber< any, any, any >, wire_patch_stat >()
	const wire_patch_pending = new WeakMap< $mol_wire_fiber< any, any, any >, wire_patch_pending_stat >()

	function wire_patch_number( name: string, fallback: number ) {
		const global_value = ( globalThis as any )[ name ]
		if( Number.isFinite( global_value ) ) return Number( global_value )

		try {
			const local = globalThis.localStorage?.getItem( name )
			if( local !== null && Number.isFinite( Number( local ) ) ) return Number( local )
		} catch {}

		try {
			const session = globalThis.sessionStorage?.getItem( name )
			if( session !== null && Number.isFinite( Number( session ) ) ) return Number( session )
		} catch {}

		return fallback
	}

	function wire_patch_stack() {
		return new Error().stack ?? ''
	}

	function wire_patch_args( fiber: $mol_wire_fiber< any, any, any > ) {
		try {
			return JSON.stringify( fiber.args )
		} catch( error ) {
			return `[unserializable args: ${ error instanceof Error ? error.message : String( error ) }]`
		}
	}

	function wire_patch_pub_list( fiber: $mol_wire_fiber< any, any, any > ) {
		try {
			return fiber.pub_list.map( pub => String( pub ) )
		} catch( error ) {
			return [ `[unavailable pubs: ${ error instanceof Error ? error.message : String( error ) }]` ]
		}
	}

	function wire_patch_error(
		fiber: $mol_wire_fiber< any, any, any >,
		stat: wire_patch_stat,
		now: number,
		limit: number,
		window_ms: number,
	) {
		const error = new Error(
			[
				'$mol_wire unstable fiber: rerun limit exceeded',
				`fiber: ${ fiber }`,
				`task: ${ fiber.task?.name || '(anonymous)' }`,
				`host: ${ String( fiber.host ?? '' ) }`,
				`args: ${ wire_patch_args( fiber ) }`,
				`reruns: ${ stat.count }/${ limit } in ${ Math.round( now - stat.started ) }ms, window ${ window_ms }ms`,
				`cursor: ${ ( fiber as any ).cursor }`,
				`cache: ${ $mol_promise_like( fiber.cache ) ? 'Promise' : fiber.cache instanceof Error ? fiber.cache.message : typeof fiber.cache }`,
				`pubs: ${ wire_patch_pub_list( fiber ).join( ', ' ) }`,
				'first suspicious stack:',
				stat.first_stack ?? '',
				'last stack:',
				stat.last_stack ?? '',
			].join( '\n' ),
		)
		Object.defineProperty( error, 'fiber', { value: fiber, enumerable: false } )
		Object.defineProperty( error, 'fiber_stat', { value: stat, enumerable: false } )
		return error
	}
	
	function wire_patch_pending_warn(
		fiber: $mol_wire_fiber< any, any, any >,
		stat: wire_patch_pending_stat,
		now: number,
		limit_ms: number,
	) {
		const message = [
			'$mol_wire pending promise: wait limit exceeded',
			`fiber: ${ fiber }`,
			`task: ${ fiber.task?.name || '(anonymous)' }`,
			`host: ${ String( fiber.host ?? '' ) }`,
			`args: ${ wire_patch_args( fiber ) }`,
			`wait: ${ Math.round( now - stat.started ) }/${ limit_ms }ms`,
			`cursor: ${ ( fiber as any ).cursor }`,
			`pubs: ${ wire_patch_pub_list( fiber ).join( ', ' ) }`,
			'promise stack:',
			( stat.promise as any ).stack ?? stat.stack,
			'waiter stack:',
			stat.stack,
		].join( '\n' )
		
		console.warn( message )
	}
	
	function wire_patch_pending_watch(
		fiber: $mol_wire_fiber< any, any, any >,
		promise: Promise< unknown >,
	) {
		const limit_ms = wire_patch_number( 'wire_patch_pending_ms', 35000 )
		if( limit_ms <= 0 ) return
		
		const prev = wire_patch_pending.get( fiber )
		if( prev?.promise === promise ) return
		if( prev ) clearTimeout( prev.timer )
		
		const stat: wire_patch_pending_stat = {
			promise,
			started: Date.now(),
			stack: wire_patch_stack(),
			timer: setTimeout( ()=> {
				if( fiber.cache !== promise ) return
				wire_patch_pending_warn( fiber, stat, Date.now(), limit_ms )
			}, limit_ms ),
		}
		
		wire_patch_pending.set( fiber, stat )
	}
	
	function wire_patch_pending_clear( fiber: $mol_wire_fiber< any, any, any > ) {
		const prev = wire_patch_pending.get( fiber )
		if( !prev ) return
		clearTimeout( prev.timer )
		wire_patch_pending.delete( fiber )
	}

	function wire_patch() {
		const proto = $mol_wire_fiber.prototype as any
		if( proto.wire_patch_installed ) return
		proto.wire_patch_installed = true

		const fresh_orig = proto.fresh
		
		const watch_result = (
			fiber: $mol_wire_fiber< any, any, any >,
			result: unknown,
		) => {
			if( $mol_promise_like( fiber.cache ) ) {
				wire_patch_pending_watch( fiber, fiber.cache as Promise< unknown > )
			} else {
				wire_patch_pending_clear( fiber )
			}
			return result
		}

		proto.fresh = function(
			this: $mol_wire_fiber< any, any, any >,
			... args: any[]
		) {
			const cursor = ( this as any ).cursor
			if( cursor === $mol_wire_cursor.fresh ) return watch_result( this, fresh_orig.apply( this, args ) )
			if( cursor === $mol_wire_cursor.final ) return watch_result( this, fresh_orig.apply( this, args ) )

			const limit = wire_patch_number( 'wire_patch_rerun_limit', 1000 )
			const window_ms = wire_patch_number( 'wire_patch_rerun_window_ms', 1000 )
			const now = Date.now()

			let stat = wire_patch_stats.get( this )
			if( !stat || now - stat.started > window_ms ) {
				stat = {
					count: 0,
					started: now,
				}
				wire_patch_stats.set( this, stat )
			}

			stat.count += 1

			if( stat.count === Math.max( 1, Math.floor( limit / 2 ) ) ) {
				stat.first_stack = wire_patch_stack()
			}

			if( stat.count > limit ) {
				stat.last_stack = wire_patch_stack()
				if( !stat.first_stack ) stat.first_stack = stat.last_stack
				throw wire_patch_error( this, stat, now, limit, window_ms )
			}

			return watch_result( this, fresh_orig.apply( this, args ) )
		}
	}

	wire_patch()

}
