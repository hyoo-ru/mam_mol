namespace $ {

	/**
	 * Reactive memoizing solo property decorator from [mol_wire](../wire/README.md)
	 * @example
	 * '@' $mol_mem
	 * name(next?: string) {
	 * 	return next ?? 'default'
	 * }
	 * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
	 */
	export let $mol_mem = $mol_wire_solo

	/**
	 * Reactive memoizing multiplexed property decorator [mol_wire](../wire/README.md)
	 * @example
	 * '@' $mol_mem_key
	 * name(id: number, next?: string) {
	 *  return next ?? 'default'
	 * }
	 * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
	 */
	export let $mol_mem_key = $mol_wire_plex
}
