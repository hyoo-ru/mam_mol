namespace $ {
	export type $mol_blob = Blob
	export let $mol_blob = $mol_dom_context.Blob ?? $node.buffer.Blob
}
