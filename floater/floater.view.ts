module $.$mol {
	export class $mol_floater extends $.$mol_floater {
		
		shiftStyle() {
			const offset = this.context().$mol_scroller_scrollTop()
			return `${ offset }px`
		}
		
	}
}

