namespace $ {

	/**
	 * Reactive memoizing solo property decorator from [$mol_wire](../wire/README.md)
	 * @example
	 * '@' $mol_mem
	 * name(next?: string) {
	 * 	return next ?? 'default'
	 * }
	 * this.name() // 'default'
	 * this.name('Guest') // 'Guest'
	 * this.name() // 'Guest'
	 *
	 * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
	 */
	export let $mol_mem = $mol_wire_solo

	/**
	 * Reactive memoizing multiplexed property decorator [$mol_wire](../wire/README.md)
	 * @example
	 * '@' $mol_mem_key
	 * name(id: number, next?: string) {
	 *  return next ?? 'default'
	 * }
	 * this.name(0) // 'default'
	 * this.name(0, 'Guest') // 'Guest'
	 * this.name(0) // 'Guest'
	 * this.name(1) // 'default'
	 * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
	 */
	export let $mol_mem_key = $mol_wire_plex
}
