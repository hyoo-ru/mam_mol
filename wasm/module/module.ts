namespace $ {
	
	export class $mol_wasm_module extends $mol_object2 {

		native : WebAssembly.Module

		constructor(
			readonly buffer : ArrayBuffer
		) {
			super()
			this.native = new WebAssembly.Module( buffer )
		}

		get instance() {
			return new $mol_wasm_instance( this.native )
		}

	}

}
