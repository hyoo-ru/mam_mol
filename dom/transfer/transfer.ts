namespace $ {
	export class $mol_dom_transfer extends $mol_object {
		
		@ $mol_action
		static wrap( native: DataTransfer ) {
			return new this( native )
		}
		
		constructor(
			readonly native: DataTransfer
		) { super() }
		
		get( type: string ) {
			return this.native.getData( type )
		}
		
		@ $mol_action
		files() {
			return $mol_wire_sync( this.native.files )
		}
		
	}
}
