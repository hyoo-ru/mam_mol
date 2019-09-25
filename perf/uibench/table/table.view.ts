namespace $.$$ {

	export class $mol_perf_uibench_table extends $.$mol_perf_uibench_table {

		state() {
			return { items : [] as any[] }
		}

		@ $mol_mem
		rows_count() {
			return this.state().items.length
		}
		
		rows() {
			const rows = []
			const count = this.rows_count()
			for( let i = 0 ; i < count ; ++i ) rows.push( this.Row( i ) )
			return rows
		}

		@ $mol_mem_key
		row_state( index : number ) {
			return this.state().items[ index ] || []
		}

	}

	export class $mol_perf_uibench_table_row extends $.$mol_perf_uibench_table_row {

		state() {
			return { props : [] as any[] , active : false , id : 0 }
		}
		
		head_text() {
			return '#' + this.id()
		}

		id() {
			return this.state().id
		}

		classes() {
			return super.classes() + ( this.state().active ? ' active' : '' )
		}
		
		@ $mol_mem
		cells_count() {
			return this.state().props.length
		}
		
		cells() {
			const rows = []
			const count = this.cells_count()
			for( let i = 0 ; i < count ; ++i ) rows.push( this.Cell( i ) )
			return rows
		}

		@ $mol_mem_key
		cell_state( index : number ) {
			return this.state().props[ index ]
		}

	}

	export class $mol_perf_uibench_table_cell extends $.$mol_perf_uibench_table_cell {

		click( next? : Event ) {
			console.log( 'Click' , this.text() )
			next.preventDefault()
			next.stopPropagation()
		}
		
	}

}
