namespace $.$mol {
 	export class $mol_calendar extends $.$mol_calendar {
		first_day(){
			return new $mol_time_moment().merge({ day : 0 })
		}

		start_draw_day(){
			const usa_day = 1
			let first_wd = this.first_day().weekday
			let start_draw_day = this.first_day().shift( { day : - first_wd + usa_day } )
			
			return start_draw_day
		}

		head(){
			const next : $mol_view[] = []
			for( let id = 0 ; id < 7 ; ++id ) {
				next.push( this.Head_day( id ) )
			}
			return next
		}

		head_day( id : number ){
			return this.start_draw_day().shift( { day : id } ).toString('WD')
		}

		rows(){
			const week : $mol_view[] = []
			for( let row = 0; row < 6; ++row ){
				week.push( this.Row( row ))
			}
			return week
		}

		cells(row : number){
			const day : $mol_view[] = []
			for( let col = 0; col < 7; ++col ){
				day.push( this.Cell( {row, col} ) )
			}
			return day
		}

		cell(id: {row : number, col : number }){
			return this.start_draw_day().shift({day : (id.col + 7 * id.row)}).toString("D")
		}

		other(id: {row : number, col : number }){
			let month = this.start_draw_day().shift({day : (id.col + 7 * id.row)}).month
			let this_month = this.first_day().month
			
			return this_month != month ? true : false
		}

		weekend(id: {row : number, col : number }){
			let day = this.start_draw_day().shift({day : (id.col + 7 * id.row)}).weekday

			return  day == 0 ? true : day == 6 ? true : false
		}

	 }

}
