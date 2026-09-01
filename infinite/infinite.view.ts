namespace $.$$ {

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_infinite_demo
	 */
	export class $mol_infinite extends $.$mol_infinite {

		@ $mol_mem_key
		before_load( anchor: any ) {
			
			const more = this.before( anchor )
			
			new $mol_after_tick( ()=> {
				
				let ids = this.row_ids()
				const index = Math.max( 0, ids.indexOf( anchor ) )
				
				const unique = new Set([
					... ids.slice( 0, index ),
					... more,
					... ids.slice( index ),
				])
				
				this.row_ids([ ... unique ])
				
			} )
			
		}
		
		@ $mol_mem_key
		after_load( anchor: any ) {
			
			const more = this.after( anchor )
			
			new $mol_after_tick( ()=> {
				
				let ids = this.row_ids()
				const index = ( ids.indexOf( anchor ) + 1 ) || ids.length
				
				const unique = new Set([
					... ids.slice( 0, index ),
					... more,
					... ids.slice( index ),
				])
				
				this.row_ids([ ... unique ])
				
			} )
			
		}
		
		@ $mol_mem
		rows() {
			
			const ids = this.row_ids()
			
			return [
				this.Before( ids.at(0) ?? null ),
				... ids.map( id => this.Row( id ) ),
				this.After( ids.at(-1) ?? null ),
			]
			
		}
		
	}

}
