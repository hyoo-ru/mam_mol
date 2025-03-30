namespace $ {
	export function $mol_dom_scroll({
		container,
		item,
		behavior,
		block,
		vertical
	}: {
		container: HTMLElement
		item: HTMLElement
		behavior?: ScrollBehavior
		block?: ScrollLogicalPosition
		vertical?: boolean
	}) {
		const itemStart = vertical ? item.offsetTop : item.offsetLeft
		const itemSize = vertical ? item.offsetHeight : item.offsetWidth
		const containerStart = vertical
			? container.offsetTop + container.offsetHeight
			: container.offsetLeft + container.offsetWidth

		let shift = itemSize // end

		if (block === 'start') shift = 0
		if (block === 'center') shift = itemSize / 2

		if ( block === 'nearest' && itemStart <= containerStart) return

		container.scroll({
			left: itemStart + shift - containerStart,
			behavior,
		})
	}
}
