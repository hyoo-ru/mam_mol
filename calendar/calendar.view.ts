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
			let start_day = this.start_draw_day()
			for( let col = 0; col < 7; ++col ){
				day.push( this.Cell( start_day.shift({ day : (col + 7 * row)}).toString("YYYY-MM-DD") ) )
			}
			return day
		}

		cell(cells : string){
			return cells.slice(8,10)
		}

		other(cells : string){
			let month = cells.slice(5,7)
			let this_month = this.first_day().toString("MM")
			
			return this_month != month ? true : false
		}

		weekend(cells : string){
			let day = new $mol_time_moment(cells).weekday
			return  day == 0 ? true : day == 6 ? true : false
		}

	 }

}
