namespace $ {

	export class $mol_dom_listener extends $mol_object {

		constructor(
			public _node : any ,
			public _event : string ,
			public _handler : ( event : Event )=> any ,
			public _config : boolean|{ passive : boolean } = { passive : true }
		) {
			super()
			this._node.addEventListener( this._event , this._handler , this._config )
		}

		destructor() {
			this._node.removeEventListener( this._event , this._handler , this._config )
			super.destructor()
		}

	}

}
