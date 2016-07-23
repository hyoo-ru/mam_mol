module $.$mol {

	interface $mol_perf_render_item {
		id : number
		label : string
	}

	export class $mol_perf_render extends $.$mol_perf_render {
		
		@ $mol_prop()
		runnerLabel( ...diff : string[] ) { return diff[0] || 'Run' }
		
		eventRun( ...diff : Event[] ) {
			var data = window['_buildData']()
			
			var date = Date.now()
			
			this.data( data )
			this.selectedItem( null )
			
			setTimeout( () => this.runnerLabel( (Date.now() - date) + " ms" ) )
 		}
		
		@ $mol_prop()
		rows() { return this.data().map( ( _ , id ) => this.row( id ) ) }
		
		@ $mol_prop()
		row( id : number ) { return new $mol_perf_render_row().setup( obj => {
			obj.data = () => this.data()[ id ]
			obj.selected = ( ...diff : boolean[] ) => {
				if( diff[0] !== void 0 ) this.selectedItem( diff[0] === void 0 ? null : id )
				return this.selectedItem() === id
			}
		} ) }
		
		@ $mol_prop()
		data( ...diff : $mol_perf_render_item[][] ) { return diff[0] || [] }
		
		@ $mol_prop()
		selectedItem( ...diff : number[] ) { return ( diff[0] === void 0 ) ? null : diff[0] }
		
	}

	export class $mol_perf_render_row extends $.$mol_perf_render_row {

		data() { return { id : 0 , label : '' } }

		label() { return this.data().label }
		
		eventToggle( ...diff : Event[] ) {
			this.selected( !this.selected() )
		}

	}

}
