namespace $ {

	export let $mol_tree2_wasm_to_bytes = $mol_data_pipe(
		$mol_tree2_wasm_to_bin ,
		$mol_tree2_bin_to_bytes ,
	)

}
