namespace $.$mol {
	
 	export class $mol_calendar extends $.$mol_calendar {

		date_moment(){
			return new $mol_time_moment()
		}
		 
		month_first_day(){
			return this.date_moment().merge({ day : 0 })
		}

		month_last_day(){
			return this.month_first_day().shift({ month: + 1, day: - 1})
		}

		day_draw_from(){
			let first_wd = this.month_first_day().weekday
			return this.month_first_day().shift( { day : - first_wd } )
		}

		head(){
			const next : $mol_view[] = []
			for( let id = 0 ; id < 7 ; ++id ) {
				next.push( this.Head_day( id ) )
			}
			return next
		}

		head_day( id : number ){
			return this.day_draw_from().shift( { day : id } ).toString('WD')
		}

		sum_week_of_month(){
			let week_milisec = 604800 * 1000
			let sum = (this.month_last_day().valueOf() - this.day_draw_from().valueOf()) / ( week_milisec )
			return Math.ceil(sum)
		}

		days(){
			const week : $mol_view[] = []
			let count_week = this.sum_week_of_month()

			for( let row = 0; row < count_week; ++row ){
				week.push( this.Week( row ))
			}
			return week
		}

		week_days(row : number){
			const day : $mol_view[] = []
			let start_day = this.day_draw_from()
			let is_week = 7 * row
			for( let col = 0; col < 7; ++col ){
				day.push( this.Day( start_day.shift({ day : (col + is_week)}).toString("YYYY-MM-DD") ) )
			}
			return day
		}

		day(week_days : string){
			return new $mol_time_moment(week_days).toString("D")
		}

		weekend(week_days : string){
			let day = new $mol_time_moment(week_days).weekday
			return  day == 5 || day == 6 ? true : false
		}

		other_month(week_days : string){
			let other_month = new $mol_time_moment(week_days).toString("MM")
			let this_month = this.month_first_day().toString("MM")
			return this_month == other_month ? false : true
		}

	 }

}
