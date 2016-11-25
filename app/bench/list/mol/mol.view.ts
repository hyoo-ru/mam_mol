namespace $.$mol {

	export interface $mol_app_bench_list_mol_row {
		id : number
		title : string
		content : string
	}

	export class $mol_app_bench_list_mol extends $.$mol_app_bench_list_mol {
		
		@ $mol_mem()
		static rows( next? : $mol_app_bench_list_mol_row[] , prev? : $mol_app_bench_list_mol_row[] ) : $mol_app_bench_list_mol_row[] {
			window.addEventListener( 'message' , event => {
				if( event.data[0] !== 'set data' ) return
				this.rows( void 0 , event.data[1] )
			} )
			return []
		}
		
		@ $mol_mem()
		rowers() { return $mol_app_bench_list_mol.rows().map( ( row , id ) => this.rower( id ) ) }
		
		@ $mol_mem()
		rowerTitle( id : number ) {
			return $mol_app_bench_list_mol.rows()[ id ].title
		}
		
		@ $mol_mem()
		rowerContent( id : number ) {
			return $mol_app_bench_list_mol.rows()[ id ].content
		}
		
		rowerSelected( id : number , next? : boolean ) {
			if( next !== void 0 ) this.selectedId( next ? id : null )
			return this.selectedId() === id
		}
		
		@ $mol_mem()
		selectedId( next? : number ) {
			$mol_app_bench_list_mol.rows()
			if( next === void 0 ) return null
			return next
		}
		
	}

	export class $mol_app_bench_list_mol_rower extends $.$mol_app_bench_list_mol_rower {

		eventToggle( next? : Event ) {
			this.selected( !this.selected() )
		}

	}

}
