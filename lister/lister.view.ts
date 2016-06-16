module $.$mol {
	export class $mol_lister extends $.$mol_lister {
		
		rowsVisible() {
			var count = Math.ceil( ( this.scrollTop() + screen.height ) / this.rowHeightMin() )
			return this.rows().slice( 0 , count )
		}
		
		gap() {
			var all = $mol_range( this.rows() ).count()
			var visible = $mol_range( this.rowsVisible() ).count()
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
