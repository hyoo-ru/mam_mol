module $.$mol {
	export class $mol_lister extends $.$mol_lister {
		
		rowsVisible() {
			var count = Math.ceil( ( this.scrollTop() + screen.height ) / this.rowHeightMin() )
			return this.rows().slice( 0 , count )
		}
		
		gap() {
			var all = this.rows().length
			var visible = this.rowsVisible().length
			return ( all - visible ) * this.rowHeightMin()
		}
		
	}
}

module $.$mol {
	export class $mol_lister_gapper extends $.$mol_lister_gapper {

		heightStyle() {
			return this.size() + 'px'
		}

	}
}
