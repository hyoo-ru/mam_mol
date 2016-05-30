module $.$mol {
	
	interface $mol_perf_item {
		id : number
		label : string
	}
	
	export class $mol_perf_runner extends $mol_view {
		
		tagName() { return 'button' }
		
		eventNames() { return super.eventNames().concat( 'click' ) }
		
		event( name : string , ...diff : Event[] ) {
			switch( name ) {
				case 'click' : return this.clicks( event )
			}
			return super.event( name , ...diff )
		}
		
		clicks( ...diff : Event[] ) {}
		
	}
	
	export class $mol_perf_row extends $mol_view {
		
		childs() { return [].concat( this.bar() ) }
		
		@ $mol_prop()
		bar() { return new $mol_view().setup( obj => {
			obj.childs = () => [].concat( this.label() )
		} ) }
		
		data() { return { id : 0 , label : '' } }
		
		label() { return this.data().label }
		
		@ $mol_prop()
		selected( ...diff : boolean[] ) { return ( diff[0] === void 0 ) ? false : diff[0] }
		
		eventNames() {
			return super.eventNames().concat( 'click' )
		}
		
		event( name : string , ...diff : Event[] ) {
			switch( name ) {
				case 'click' : return this.toggles( event )
			}
			return super.event( name , ...diff )
		}
		
		toggles( ...diff : Event[] ) {
			this.selected( !this.selected() )
		}
		
		attrNames() {
			return super.eventNames().concat( 'mol_perf_row_selected' )
		}
		
		attr( name : string ) {
			switch( name ) {
				case 'mol_perf_row_selected' : return String( this.selected() )
			}
			return super.attr( name )
		}
		
	}

	export class $mol_perf extends $mol_view {
		
		childs() { return [].concat( this.header() , this.rower() ) }
		
		@ $mol_prop()
		header() { return new $mol_view().setup( obj => {
			obj.childs = () => [].concat( this.titler() , this.runner() )
		} ) }
		
		@ $mol_prop()
		titler() { return new $mol_view().setup( obj => {
			obj.tagName = () => 'h2'
			obj.childs = () => [].concat( '$mol' )
		} ) }
		
		@ $mol_prop()
		runner() { return new $mol_perf_runner().setup( obj => {
			obj.childs = () => [].concat( this.runnerLabel() )
			obj.clicks = ( ...diff ) => this.runs( ...diff )
		} ) }
		
		@ $mol_prop()
		runnerLabel( ...diff : string[] ) { return diff[0] || 'Run' }
		
		runs( ...diff : Event[] ) {
			var data = window['_buildData']()
			
			var date = Date.now()
			
			this.data( data )
			this.selectedItem( null )
			
			setTimeout( () => this.runnerLabel( (Date.now() - date) + " ms" ) )
 		}
		
		@ $mol_prop()
		rower() { return new $mol_view().setup( obj => {
			obj.childs = () => [].concat( this.rows() )
		} ) }
		
		@ $mol_prop()
		rows() { return this.data().map( ( _ , id ) => this.row( id ) ) }
		
		@ $mol_prop()
		row( id : number ) { return new $mol_perf_row().setup( obj => {
			obj.data = () => this.data()[ id ]
			obj.selected = ( ...diff : boolean[] ) => {
				if( diff[0] !== void 0 ) this.selectedItem( diff[0] === void 0 ? null : id )
				return this.selectedItem() === id
			}
		} ) }
		
		@ $mol_prop()
		data( ...diff : $mol_perf_item[][] ) { return diff[0] || [] }
		
		@ $mol_prop()
		selectedItem( ...diff : number[] ) { return ( diff[0] === void 0 ) ? null : diff[0] }
		
	}
}
