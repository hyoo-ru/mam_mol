namespace $.$$ {
	
	function title_gen() {
		const A = [ "pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy" ]
		const C = [ "red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange" ]
		const N = [ "table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard" ]
		return `${ $mol_array_lottery(A) } ${ $mol_array_lottery(C) } ${ $mol_array_lottery(N) }`
	}
	
	export class $mol_perf_jsfb extends $.$mol_perf_jsfb {
		
		counter = 0
		
		@ $mol_mem
		ids( next = [] as number[] ) {
			return next
		}
		
		@ $mol_mem
		rows() {
			return this.ids().map( id => this.Row( id ) )
		}
		
		@ $mol_mem
		selected( next = 0 ) {
			const prev = $mol_wire_probe( ()=> this.selected() ) ?? 0
			if( prev ) this.row_selected( prev, false )
			return next
		}
		
		row_id( id: number ) {
			return String( id )
		}
		
		@ $mol_mem_key
		row_selected( id: number, next?: boolean ) {
			if( next ) this.selected( id )
			return next ?? false
		}
		
		row_drop( id: number ) {
			this.ids( this.ids().filter( i => i !== id ) )
			if( this.selected() === id ) this.selected( 0 )
		}
		
		create_1K() {
			this.ids( Array.from( { length: 1000 }, (_,i) => ++ this.counter ) )
		}
		
		create_10K() {
			this.ids( Array.from( { length: 10000 }, (_,i) => ++ this.counter ) )
		}
		
		append_1K() {
			this.ids([
				... this.ids(),
				... Array.from( { length: 1000 }, (_,i) => ++ this.counter ),
			])
		}
		
		update_10() {
			const ids = this.ids()
			for( let i = 0; i < ids.length; i += 10 ) {
				this.row_title( ids[i], this.row_title( ids[i] ) + " !!!"  )
			}
		}
		
		clear() {
			this.ids([])
			this.selected(0)
		}
		
		swap() {
			
			const ids = this.ids()
			if( ids.length < 999 ) return
			
			this.ids([ ids[0], ids[998], ... ids.slice( 2, 998 ), ids[1], ... ids.slice(999) )
			
		}
		
		@ $mol_mem
		auto() {
			this.row_selected( this.selected() )
		}
		
	}
	
	export class $mol_perf_jsfb_row extends $.$mol_perf_jsfb_row {
		
		@ $mol_mem
		title( next?: string ) {
			$mol_wire_solid()
			return next ?? title_gen()
		}
		
	}

}
