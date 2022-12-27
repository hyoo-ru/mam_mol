namespace $ {
	export type $mol_blob = Blob
	export let $mol_blob = ( $node.buffer?.Blob ?? $mol_dom_context.Blob ) as any as typeof Blob

	export function $mol_blob_text( blob: $mol_blob ) {
		return new Promise< string >( ( done, fail )=> {
			const reader = new FileReader
			reader.onerror = fail
			reader.onload = event => done( event.target!.result as string )
			reader.readAsText( blob )
		} )
	}

	export async function $mol_blob_json( blob: $mol_blob ) {
		const json = await $mol_blob_text( blob )
		return JSON.parse(json)
	}
}
