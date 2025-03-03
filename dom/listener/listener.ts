namespace $ {


	type Source<EventType> = {
		addEventListener(name: string, handler: (event: EventType) => unknown, passive?: any ): unknown
		removeEventListener(name: string, handler: (event: EventType) => unknown, passive?: any ): unknown
	}

	export class $mol_dom_listener<EventType extends Event> extends $mol_object {

		constructor(
			protected node : Source<EventType>,
			protected event : string ,
			protected handler : (event: EventType) => unknown ,
			protected config : boolean | { passive : boolean } = { passive : true }
		) {
			super()
			this.node.addEventListener( this.event , this.handler , this.config )
		}

		destructor() {
			this.node.removeEventListener( this.event , this.handler , this.config )
			super.destructor()
		}

	}

}
