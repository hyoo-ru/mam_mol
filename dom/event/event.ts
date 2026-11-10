namespace $ {
	export class $mol_dom_event<EventType extends Event> extends $mol_object {
		
		@ $mol_action
		static wrap<EventType extends Event>(event: EventType) {
			return new this(event)
		}
		
		constructor(
			readonly native: EventType
		) { super() }
		
		@ $mol_action
		prevented(next?: boolean) {
			if (next) this.native.preventDefault()
			return this.native.defaultPrevented
		}
		
		@ $mol_action
		transfer() {
			const transfer = this.native instanceof ClipboardEvent ? this.native.clipboardData
				: this.native instanceof DragEvent ? this.native.dataTransfer
				: null
			return transfer && $mol_dom_transfer.wrap( transfer )
		}
		
	}
}
