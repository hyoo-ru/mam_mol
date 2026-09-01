namespace $ {
	
	export class $mol_wasm_module extends $mol_object2 {

		native : WebAssembly.Module

		constructor(
			readonly buffer : Uint8Array< ArrayBuffer >
		) {
			super()
			this.native = new WebAssembly.Module( buffer )
		}

		instance<
			Imports extends {
				[ mod in string ]: {
					[ func in string ]: WebAssembly.ImportValue
				}
			}
		>( imports? : Imports ) {
			return new $mol_wasm_instance( this.native , imports )
		}

	}

}
