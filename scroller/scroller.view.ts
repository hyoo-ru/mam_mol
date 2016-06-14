module $.$mol {
	export class $mol_scroller extends $.$mol_scroller {

		@ $mol_prop()
		scrollTop( ...diff : number[] ) {
			return this.local<number>( 'scrollTop()' , ...diff ) || 0
		}

		@ $mol_prop()
		scrollLeft( ...diff : number[] ) {
			return this.local<number>( 'scrollLeft()' , ...diff ) || 0
		}

		@ $mol_prop()
		scrolls( ...diff : Event[] ) {
			var el = ( diff[0].target as HTMLElement )
			this.scrollTop( el.scrollTop )
			this.scrollLeft( el.scrollLeft )
			diff[0].preventDefault()
		}

		// @ $jin2_grab
		// wheels() {
		// 	return this.prop<Event>(null, (event:MouseWheelEvent) => {
		// 		if (event.defaultPrevented) return
        //
		// 		var target = <HTMLElement> this.node().get()
        //
		// 		if (( target.scrollHeight > target.offsetHeight ) || ( target.scrollWidth > target.offsetWidth )) {
		// 			event.preventDefault()
        //
		// 			target.scrollTop -= event.wheelDeltaY
		// 			target.scrollLeft -= event.wheelDeltaX
		// 		}
		// 	})
		// }

	}
}
