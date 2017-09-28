namespace $.$mol {
	
	 export class $mol_calendar_demo extends $.$mol_calendar_demo {

		date(){
			return new $mol_time_moment().toString("MM")
		}

		today(week_days : string){
			let date = new $mol_time_moment()
			let is_date = new $mol_time_moment(week_days)		
			return ( date.month == is_date.month ) && (date.day == is_date.day) ? true : false
		}

	 }

}
