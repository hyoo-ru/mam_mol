namespace $.$mol {

	export class $mol_perf_uibench extends $.$mol_perf_uibench {

		@ $mol_mem()
		state( next? : any ) {
			return next || {}
		}

		@ $mol_mem()
		stateTable() {
			return this.state().table
		}

		@ $mol_mem()
		stateAnim() {
			return this.state().anim
		}

		@ $mol_mem()
		stateTree() {
			return this.state().tree
		}

		@ $mol_mem()
		page() : $mol_view {
			switch( this.state().location ) {
				case 'table' : return this.table()
				case 'anim' : return this.anim()
				case 'tree' : return this.tree()
			}
			return null
		}

	}

	export class $mol_perf_uibench_table extends $.$mol_perf_uibench_table {

		state() {
			return { items : <any[]>[] }
		}
		
		rows() {
			return this.state().items.map( ( v : any , i : number )=> this.rower( i ) )
		}

		@ $mol_mem_key()
		rower( id : number ) {
			return $mol_perf_uibench_table_row.make({
				state : ()=> this.state().items[ id ] || [] ,
			})
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

		className() {
			return super.className() + ( this.state().active ? ' active' : '' )
		}
		
		cells() {
			return ( this.state().props || [] ).map( ( v : any , j : number )=> this.cell( j ) )
		}

		@ $mol_mem_key()
		cell( id : number ) {
			return $mol_perf_uibench_table_cell.make({
				text : ()=> this.state().props[ id ] ,
			})
		}
		
	}

	export class $mol_perf_uibench_table_cell extends $.$mol_perf_uibench_table_cell {

		event_click( next? : Event ) {
			console.log( 'Click' , this.text() )
			next.preventDefault()
			next.stopPropagation()
		}
		
	}

	export class $mol_perf_uibench_anim extends $.$mol_perf_uibench_anim {
		
		state() {
			return { items : <any[]>[] }
		}
		
		items() {
			return this.state().items.map( ( v : any , i : number )=> this.item( i ) )
		}
		
		@ $mol_mem_key()
		item( i : number ) {
			return $mol_perf_uibench_anim_box.make({
				state : ()=> this.state().items[ i ] || { id : '' , time : 0 } ,
			})
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

		sub() {
			return ( this.state().children || [] ).map( ( child : any , i : number )=> {
				return child.container ? this.branch( i ) : this.leaf( i )
			} )
		}

		@ $mol_mem_key()
		branch( i : number ) {
			return $mol_perf_uibench_tree_branch.make({
				state : ()=> this.state().children[ i ] || { children : [] }
			})
		}

		@ $mol_mem_key()
		leaf( i : number ) {
			return $mol_perf_uibench_tree_leaf.make({
				text : ()=> ( ( this.state().children || [] )[ i ] || {} ).id
			})
		}

	}

}
