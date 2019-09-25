namespace $ {
	
	export class $mol_wasm_instance extends $mol_object2 {

		native : WebAssembly.Instance

		constructor(
			readonly module : WebAssembly.Module
		) {
			super()
			this.native = new WebAssembly.Instance( module )
		}

		memory( offset : number , size : number ) {
			return new Uint8Array( this.native['exports'].memory.buffer , offset , size )
		}

		string( offset : number , length : number , encoding = 'utf-8' ) {
			return new TextDecoder( encoding ).decode( this.memory( offset , length ) )
		}
		
		get( name : string ) {
			return this.native.exports[ name ]
		}
	  
	}

}
