namespace $.$mol {

	export interface $mol_app_bench_list_mol_data {
		sample : string
		items : {
			id : number
			title : string
			content : string
		}[]
	}

	export class $mol_app_bench_list_mol extends $.$mol_app_bench_list_mol {
		
		@ $mol_mem()
		static data( next? : $mol_app_bench_list_mol_data , force? : $mol_atom_force ) : $mol_app_bench_list_mol_data {
			window.addEventListener( 'message' , event => {
				if( event.data[0] !== 'set data' ) return
				this.data( event.data[1] , $mol_atom_force )
			} )
			return { sample : '' , items : [] }
		}
		
		sample() {
			return $mol_app_bench_list_mol.data().sample
		}
		
		items() {
			return $mol_app_bench_list_mol.data().items
		}
		
		@ $mol_mem()
		rowers() { return this.items().map( ( row , id ) => this.rower( id ) ) }
		
		@ $mol_mem_key()
		rowerTitle( id : number ) {
			return this.items()[ id ].title
		}
		
		@ $mol_mem_key()
		rowerContent( id : number ) {
			return this.items()[ id ].content
		}
		
		rowerSelected( id : number , next? : boolean ) {
			if( next !== void 0 ) this.selectedId( next ? id : null )
			return this.selectedId() === id
		}
		
		@ $mol_mem()
		selectedId( next? : number ) {
			this.items()
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
