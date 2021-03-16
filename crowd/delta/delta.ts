namespace $ {
	
	/** Atomic primitive values that can be stored in CROWD stores */
	export type $mol_crowd_delta_value = string | number | boolean | null

	/** Makes CROWD Delta or State */
	export function $mol_crowd_delta(
		values: $mol_crowd_delta_value[],
		stamps: number[],
	) {
		return { values, stamps }
	}
	
}
