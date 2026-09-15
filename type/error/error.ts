namespace $ {

	/** Returns error type, that don't match to normal value. */
	export type $mol_type_error< Message , Info = {} > = Message & { $mol_type_error : Info }

}
