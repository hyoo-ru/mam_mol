namespace $ {

	export function $mol_dom_event_prevented(
		event: Event
	) {
		const faberized = $mol_wire_sync(event)
		if (faberized.defaultPrevented) return true
		faberized.preventDefault()
		return false
	}
}
