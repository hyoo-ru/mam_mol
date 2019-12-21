namespace $.$$ {

	export class $mol_infinite extends $.$mol_infinite {

		@ $mol_mem
		rows() {

			let rows : readonly $mol_view[] = $mol_atom2_value( ()=> this.rows() ) ?? []

			if( rows.length === 0 ) rows = this.after( undefined )
			if( rows.length === 0 ) return []
			
			const rect = this.view_rect()
			if( !rect ) return rows

			const window_height = $mol_window.size().height

			if( rect.bottom < window_height * 3 ) {
				rows = [ ... rows , ... this.after( rows[ rows.length - 1 ] ) ]
			}

			return rows

		}
		
	}

}
