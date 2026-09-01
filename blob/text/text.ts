namespace $ {

	export function $mol_blob_text( blob: $mol_blob ) {
		return new Promise< string >( ( done, fail )=> {
			const reader = new FileReader
			reader.onerror = fail
			reader.onload = event => done( event.target!.result as string )
			reader.readAsText( blob )
		} )
	}

}
