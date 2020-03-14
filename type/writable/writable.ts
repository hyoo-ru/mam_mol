namespace $ {
	export type $mol_type_writable<T> = { -readonly [P in keyof T]: T[P] };
}
