namespace $ {
	
	export class $mol_wasm_instance extends $mol_object2 {

		native : WebAssembly.Instance

		constructor(
			readonly module : WebAssembly.Module,
			readonly imports? : Record<string, Record<string, WebAssembly.ImportValue>>
		) {
			super()
			this.native = new WebAssembly.Instance( module , imports )
		}

		memory( offset : number , length : number ) {
			const memory = this.native['exports'].memory as WebAssembly.Memory
			return new Uint8Array( memory.buffer , offset , length )
		}

		string( offset : number , length : number , encoding = 'utf-8' ) {
			return new TextDecoder( encoding ).decode( this.memory( offset , length ) )
		}
		
		get( name : string ) {
			return this.native.exports[ name ]
		}
	  
	}

}
