namespace $ {
	
	export type $mol_wire_trace_options = {
		enabled?: boolean
		label?: string
		filter?: string | RegExp
		events?: readonly string[]
		limit?: number
	}
	
	let $mol_wire_trace_opts: $mol_wire_trace_options = {
		enabled: false,
		label: 'wire',
	}
	
	let $mol_wire_trace_count = 0
	
	export function $mol_wire_trace_config( next?: $mol_wire_trace_options | boolean ) {
		if( next === undefined ) return $mol_wire_trace_opts
		if( typeof next === 'boolean' ) {
			$mol_wire_trace_opts = {
				... $mol_wire_trace_opts,
				enabled: next,
			}
		} else {
			$mol_wire_trace_opts = {
				... $mol_wire_trace_opts,
				... next,
			}
		}
		$mol_wire_trace_count = 0
		return $mol_wire_trace_opts
	}
	
	export function $mol_wire_trace_active( event: string, id?: string ) {
		const opts = $mol_wire_trace_opts
		if( !opts.enabled ) return false
		if( opts.limit != null && $mol_wire_trace_count >= opts.limit ) return false
		if( opts.events && !opts.events.includes( event ) ) return false
		if( opts.filter ) {
			const text = id ?? ''
			if( typeof opts.filter === 'string' ) {
				if( !text.includes( opts.filter ) ) return false
			} else {
				if( !opts.filter.test( text ) ) return false
			}
		}
		return true
	}
	
	export function $mol_wire_trace(
		event: string,
		id?: string,
		data?: Record< string, any >,
	) {
		if( !$mol_wire_trace_active( event, id ) ) return
		++ $mol_wire_trace_count
		const opts = $mol_wire_trace_opts
		console.log( JSON.stringify({
			type: 'wire',
			label: opts.label ?? 'wire',
			event,
			time: Date.now(),
			id,
			... data,
		}) )
	}
	
}
