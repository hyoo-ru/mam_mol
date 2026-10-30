namespace $ {

	export class $mol_wire_rs extends $mol_object2 {

		wasm : $mol_wasm_instance

		constructor(
			buffer : Uint8Array< ArrayBuffer >,
			imports : Record< string , Record< string , WebAssembly.ImportValue > > = {},
		) {
			super()
			this.wasm = new $mol_wasm_module( buffer ).instance( {
				... imports,
				mol_wire: {
					schedule_sync: ()=> queueMicrotask( ()=> this.call( 'mol_wire_sync' ) ),
					log_text: ( ptr : number , len : number )=> console.log( this.wasm.string( ptr , len ) ),
				},
			} )
		}

		call( name : string , ... args : number[] ) {
			return ( this.wasm.get( name ) as ( ... args : number[] )=> number )( ... args )
		}

		alive() {
			return this.call( 'mol_wire_alive' )
		}

		text( value : string ) {
			const bytes = new TextEncoder().encode( value )
			const ptr = this.call( 'mol_wire_alloc' , bytes.length )
			this.wasm.memory( ptr , bytes.length ).set( bytes )
			return [ ptr , bytes.length ] as const
		}

		string( ptr : number , len : number ) {
			return this.wasm.string( ptr , len )
		}

	}

}
