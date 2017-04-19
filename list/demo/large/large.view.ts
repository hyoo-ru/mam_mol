
namespace $.$mol {
	export class $mol_list_demo_large extends $.$mol_list_demo_large {

		rows() {
			var next : $mol_view[] = []
			for( var id = 0 ; id < 1000 ; ++id ) {
				next.push( this.Row( id ) )
			}
			return next
		}

		row_text( id : number ) {
			return `Row #${ id + 1 }`
		}

	}
}
