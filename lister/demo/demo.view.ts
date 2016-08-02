module $.$mol {
	export class $mol_lister_demo extends $.$mol_lister_demo {
		
		rows() {
			var next = []
			for( var id = 0 ; id < 256 ; ++id ) {
				next.push( this.rower( id ) )
			}
			return next
		}
		
		@ $mol_prop()
		rower( id : number ) {
			return new $mol_rower_demo().setup( obj => {
				obj.title = ()=> `Title #${id}`
			} )
		}
		
	}
}
