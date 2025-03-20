namespace $ {

	export const $mol_dom_event_prevented = $mol_wire_sync( function $mol_dom_event_prevented(
		event: Event
	) {
		if (event.defaultPrevented) return true
		event.preventDefault()
		return false
	} )
}
