	($.$mol_calendar) = class $mol_calendar extends ($.$mol_list) {
		title(){
			return "";
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (24);
			(obj.sub) = () => ([(this?.title())]);
			return obj;
		}
		head(){
			return [(this?.Title())];
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this?.head()));
			return obj;
		}
		weekdays(){
			return [];
		}
		Weekdays(){
			const obj = new this.$.$mol_hor();
			(obj.sub) = () => ((this?.weekdays()));
			return obj;
		}
		weekend(id){
			return false;
		}
		weekday(id){
			return "";
		}
		week_days(id){
			return [];
		}
		day_ghost(id){
			return false;
		}
		day_holiday(id){
			return false;
		}
		day_selected(id){
			return false;
		}
		day_today(id){
			return false;
		}
		day_theme(id){
			return null;
		}
		day_text(id){
			return "";
		}
		day_content(id){
			return [(this?.day_text(id))];
		}
		sub(){
			return [(this?.Head()), (this?.Weekdays())];
		}
		weeks(){
			return [];
		}
		weeks_count(){
			return 6;
		}
		Weekday(id){
			const obj = new this.$.$mol_calendar_day();
			(obj.holiday) = () => ((this?.weekend(id)));
			(obj.sub) = () => ([(this?.weekday(id))]);
			return obj;
		}
		Week(id){
			const obj = new this.$.$mol_hor();
			(obj.sub) = () => ((this?.week_days(id)));
			return obj;
		}
		Day(id){
			const obj = new this.$.$mol_calendar_day();
			(obj.ghost) = () => ((this?.day_ghost(id)));
			(obj.holiday) = () => ((this?.day_holiday(id)));
			(obj.selected) = () => ((this?.day_selected(id)));
			(obj.today) = () => ((this?.day_today(id)));
			(obj.theme) = () => ((this?.day_theme(id)));
			(obj.sub) = () => ((this?.day_content(id)));
			return obj;
		}
		month_string(){
			return "";
		}
		month_moment(){
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
	};
	($mol_mem(($.$mol_calendar.prototype), "Title"));
	($mol_mem(($.$mol_calendar.prototype), "Head"));
	($mol_mem(($.$mol_calendar.prototype), "Weekdays"));
	($mol_mem_key(($.$mol_calendar.prototype), "Weekday"));
	($mol_mem_key(($.$mol_calendar.prototype), "Week"));
	($mol_mem_key(($.$mol_calendar.prototype), "Day"));
	($mol_mem(($.$mol_calendar.prototype), "month_moment"));
	($.$mol_calendar_day) = class $mol_calendar_day extends ($.$mol_view) {
		holiday(){
			return false;
		}
		ghost(){
			return false;
		}
		selected(){
			return false;
		}
		today(){
			return false;
		}
		theme(){
			return null;
		}
		minimal_height(){
			return 24;
		}
		minimal_width(){
			return 36;
		}
		attr(){
			return {
				"mol_calendar_holiday": (this?.holiday()), 
				"mol_calendar_ghost": (this?.ghost()), 
				"mol_calendar_selected": (this?.selected()), 
				"mol_calendar_today": (this?.today()), 
				"mol_theme": (this?.theme())
			};
		}
	};

//# sourceMappingURL=calendar.view.tree.js.map