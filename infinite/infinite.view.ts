namespace $.$$ {

	export class $mol_infinite extends $.$mol_infinite {

		@ $mol_mem
		row_ids() {

			let ids : readonly $mol_view[] = $mol_atom2_value( ()=> this.row_ids() ) ?? []

			if( ids.length === 0 ) ids = this.after( undefined )
			if( ids.length === 0 ) return []
			
			const rect = this.view_rect()
			if( !rect ) return ids

			const window_height = $mol_window.size().height

			if( rect.bottom < window_height * 3 ) {
				ids = [ ... ids , ... this.after( ids[ ids.length - 1 ] ) ]
			}

			return ids

		}
		
		@ $mol_mem
		rows() {
			return this.row_ids().map( id => this.Row( id ) )
		}
		
	}

}
