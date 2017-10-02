namespace $.$mol {

	 export class $mol_calendar_demo_moment extends $.$mol_calendar_demo_moment {

		today( val? : $mol_time_moment) {
			return new $mol_time_moment( val == undefined ? undefined : new $mol_time_moment( val ) )
		}

		// date(){
		// 	return new $mol_time_moment().toString("MM")
		// }

		// current_month(){
		// 	return this.value_moment().merge({ month : 0 })
		// }

		// current_day(){
		// 	return this.date_moment().day
		// }

		// weekend(week_days : string){
		// 	let day = new $mol_time_moment(week_days).weekday
		// 	return  day == 5 || day == 6 ? true : false
		// }

		// today(week_days : string){
		// 	let date = new $mol_time_moment()
		// 	let is_date = new $mol_time_moment(week_days)
		// 	return ( date.month == is_date.month ) && (date.day == is_date.day) ? true : false
		// }

	 }

}
