namespace $ {

	export async function $mol_blob_json( blob: $mol_blob ) {
		const json = await $mol_blob_text( blob )
		return JSON.parse(json)
	}

}
