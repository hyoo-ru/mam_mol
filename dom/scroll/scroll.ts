namespace $ {
	export function $mol_dom_scroll({
		container,
		item,
		behavior,
		block
	}: {
		container: HTMLElement
		item: HTMLElement
		behavior?: ScrollBehavior
		block?: ScrollLogicalPosition
	}) {
		const containerRight = container.offsetLeft + container.offsetWidth

		let shift = item.offsetWidth // end

		if (block === 'start') shift = 0
		if (block === 'center') shift = item.offsetWidth / 2

		if ( block === 'nearest' && item.offsetLeft <= containerRight) return

		container.scroll({
			left: item.offsetLeft + shift - containerRight,
			behavior,
		})
	}
}
