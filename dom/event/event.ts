namespace $ {
	export class $mol_dom_event<EventType extends Event> extends $mol_object {
		constructor(readonly native: EventType) { super() }

		@ $mol_action
		prevented(next?: boolean) {
			if (next) this.native.preventDefault()
			return this.native.defaultPrevented
		}

		@ $mol_action
		static wrap<EventType extends Event>(event: EventType) {
			return new this.$.$mol_dom_event(event)
		}
	}
}
