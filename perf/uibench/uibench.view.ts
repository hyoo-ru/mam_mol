module $.$mol {

	export class $mol_perf_uibench extends $.$mol_perf_uibench {

		@ $mol_prop()
		state( ...diff : any[] ) {
			return diff[0] || {}
		}

		@ $mol_prop()
		stateTable() {
			return this.state().table
		}

		@ $mol_prop()
		stateAnim() {
			return this.state().anim
		}

		@ $mol_prop()
		stateTree() {
			return this.state().tree
		}

		@ $mol_prop()
		page() {
			switch( this.state().location ) {
				case 'table' : return this.table()
				case 'anim' : return this.anim()
				case 'tree' : return this.tree()
			}
			return null
		}

	}

	export class $mol_perf_uibench_table extends $.$mol_perf_uibench_table {

		@ $mol_prop()
		state( ...diff : any[] ) {
			return diff[0] || { items : [] }
		}
		
		@ $mol_prop()
		dict() {
			var dict : any = {}
			this.state().items.forEach( ( val : any )=> dict[ val.id ] = val )
			return dict
		}

		@ $mol_prop()
		rows() {
			return this.state().items.map( ( v : any )=> this.row( v.id ) )
		}

		@ $mol_prop()
		row( id : number ) {
			return new $mol_perf_uibench_table_row().setup( obj => {
				obj.state = ()=> this.dict()[ id ] || []
			} )
		}

	}

	export class $mol_perf_uibench_table_row extends $.$mol_perf_uibench_table_row {

		state() {
			return { props : <any[]>[] , active : false , id : 0 }
		}
		
		headerText() {
			return '#' + this.id()
		}

		id() {
			return this.state().id
		}

		active() {
			return false
		}

		className() {
			return super.className() + ( this.state().active ? ' active' : '' )
		}
		
		@ $mol_prop()
		cells() {
			return ( this.state().props || [] ).map( ( v : any , j : number )=> this.cell( j ) )
		}

		@ $mol_prop()
		cell( id : number ) {
			return new $mol_perf_uibench_table_cell().setup( obj => {
				obj.text = ()=> this.state().props[ id ]
			} )
		}
		
	}

	export class $mol_perf_uibench_table_cell extends $.$mol_perf_uibench_table_cell {

		eventClick( ...diff : Event[] ) {
			console.log( 'Click' , this.text() )
			diff[0].preventDefault()
			diff[0].stopPropagation()
		}
		
	}

	export class $mol_perf_uibench_anim extends $.$mol_perf_uibench_anim {
		
		state() {
			return { items : <any[]>[] }
		}
		
		items() {
			return this.state().items.map( ( v : any , i : number )=> this.item( i ) )
		}
		
		@ $mol_prop()
		item( i : number ) {
			return new $mol_perf_uibench_anim_box().setup( obj => {
				obj.state = ()=> this.state().items[ i ] || { id : '' , time : 0 }
			} )
		}
		
	}

	export class $mol_perf_uibench_anim_box extends $.$mol_perf_uibench_anim_box {

		state() {
			return { id : '' , time : 0 }
		}

		id() {
			return this.state().id
		}

		time() {
			return this.state().time
		}

		styleRadius() {
			return `${this.time() % 10}px`
		}

		styleColor() {
			return `rgba(0,0,0,${0.5 + ((this.time() % 10) / 10)})`
		}

	}

	export class $mol_perf_uibench_tree extends $.$mol_perf_uibench_tree {

		state() {
			return { root : <any>null }
		}

		stateRoot() {
			return this.state().root || { children : [] }
		}
		
	}

	export class $mol_perf_uibench_tree_branch extends $.$mol_perf_uibench_tree_branch {

		state() {
			return { children : <any[]>[] }
		}

		childs() {
			return ( this.state().children || [] ).map( ( child : any , i : number )=> {
				return child.container ? this.branch( i ) : this.leaf( i )
			} )
		}

		@ $mol_prop()
		branch( i : number ) {
			return new $mol_perf_uibench_tree_branch().setup( obj => {
				obj.state = ()=> this.state().children[ i ] || { children : [] }
			} )
		}

		@ $mol_prop()
		leaf( i : number ) {
			return new $mol_perf_uibench_tree_leaf().setup( obj => {
				obj.text = ()=> ( ( this.state().children || [] )[ i ] || {} ).id
			} )
		}

	}

}
