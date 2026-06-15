	($.$mol_date) = class $mol_date extends ($.$mol_pick) {
		enabled(){
			return true;
		}
		today_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Today_icon(){
			const obj = new this.$.$mol_icon_calendar_today();
			return obj;
		}
		Today(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_date_Today_hint")));
			(obj.enabled) = () => ((this.enabled()));
			(obj.click) = (next) => ((this.today_click(next)));
			(obj.sub) = () => ([(this.Today_icon())]);
			return obj;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		value_changed(next){
			return (this.Input().value_changed(next));
		}
		input_mask(id){
			return "";
		}
		Input(){
			const obj = new this.$.$mol_format();
			(obj.value) = (next) => ((this.value(next)));
			(obj.mask) = (id) => ((this.input_mask(id)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		clear(next){
			if(next !== undefined) return next;
			return null;
		}
		Clear_icon(){
			const obj = new this.$.$mol_icon_trash_can_outline();
			return obj;
		}
		Clear(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_date_Clear_hint")));
			(obj.enabled) = () => ((this.enabled()));
			(obj.click) = (next) => ((this.clear(next)));
			(obj.sub) = () => ([(this.Clear_icon())]);
			return obj;
		}
		input_content(){
			return [
				(this.Today()), 
				(this.Input()), 
				(this.Clear())
			];
		}
		Input_row(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.input_content()));
			return obj;
		}
		month_moment(){
			return (this.value_moment());
		}
		day_selected(id){
			return false;
		}
		day_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Calendar_title(){
			return (this.Calendar().Title());
		}
		year_prev_hint(){
			return (this.$.$mol_locale.text("$mol_date_year_prev_hint"));
		}
		year_prev(next){
			if(next !== undefined) return next;
			return null;
		}
		Year_prev_icon(){
			const obj = new this.$.$mol_icon_chevron_double_left();
			return obj;
		}
		Year_prev(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.year_prev_hint()));
			(obj.click) = (next) => ((this.year_prev(next)));
			(obj.sub) = () => ([(this.Year_prev_icon())]);
			return obj;
		}
		month_prev_hint(){
			return (this.$.$mol_locale.text("$mol_date_month_prev_hint"));
		}
		prev_hint(){
			return (this.month_prev_hint());
		}
		month_prev(next){
			if(next !== undefined) return next;
			return null;
		}
		prev(next){
			return (this.month_prev(next));
		}
		Month_prev_icon(){
			const obj = new this.$.$mol_icon_chevron_left();
			return obj;
		}
		Prev_icon(){
			return (this.Month_prev_icon());
		}
		Month_prev(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.prev_hint()));
			(obj.click) = (next) => ((this.prev(next)));
			(obj.sub) = () => ([(this.Prev_icon())]);
			return obj;
		}
		Prev(){
			return (this.Month_prev());
		}
		month_next_hint(){
			return (this.$.$mol_locale.text("$mol_date_month_next_hint"));
		}
		next_hint(){
			return (this.month_next_hint());
		}
		month_next(next){
			if(next !== undefined) return next;
			return null;
		}
		next(next){
			return (this.month_next(next));
		}
		Month_next_icon(){
			const obj = new this.$.$mol_icon_chevron_right();
			return obj;
		}
		Next_icon(){
			return (this.Month_next_icon());
		}
		Month_next(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.next_hint()));
			(obj.click) = (next) => ((this.next(next)));
			(obj.sub) = () => ([(this.Next_icon())]);
			return obj;
		}
		Next(){
			return (this.Month_next());
		}
		year_next_hint(){
			return (this.$.$mol_locale.text("$mol_date_year_next_hint"));
		}
		year_next(next){
			if(next !== undefined) return next;
			return null;
		}
		Year_next_icon(){
			const obj = new this.$.$mol_icon_chevron_double_right();
			return obj;
		}
		Year_next(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.year_next_hint()));
			(obj.click) = (next) => ((this.year_next(next)));
			(obj.sub) = () => ([(this.Year_next_icon())]);
			return obj;
		}
		Calendar_tools(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Year_prev()), 
				(this.Prev()), 
				(this.Calendar_title()), 
				(this.Next()), 
				(this.Year_next())
			]);
			return obj;
		}
		Calendar(){
			const obj = new this.$.$mol_date_calendar();
			(obj.enabled) = () => ((this.enabled()));
			(obj.month_moment) = () => ((this.month_moment()));
			(obj.day_selected) = (id) => ((this.day_selected(id)));
			(obj.day_click) = (id, next) => ((this.day_click(id, next)));
			(obj.head) = () => ([(this.Calendar_tools())]);
			return obj;
		}
		Icon(){
			const obj = new this.$.$mol_icon_calendar();
			return obj;
		}
		bubble_content(){
			return [(this.Input_row()), (this.Calendar())];
		}
		value_number(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		value_moment(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
	};
	($mol_mem(($.$mol_date.prototype), "today_click"));
	($mol_mem(($.$mol_date.prototype), "Today_icon"));
	($mol_mem(($.$mol_date.prototype), "Today"));
	($mol_mem(($.$mol_date.prototype), "value"));
	($mol_mem(($.$mol_date.prototype), "Input"));
	($mol_mem(($.$mol_date.prototype), "clear"));
	($mol_mem(($.$mol_date.prototype), "Clear_icon"));
	($mol_mem(($.$mol_date.prototype), "Clear"));
	($mol_mem(($.$mol_date.prototype), "Input_row"));
	($mol_mem_key(($.$mol_date.prototype), "day_click"));
	($mol_mem(($.$mol_date.prototype), "year_prev"));
	($mol_mem(($.$mol_date.prototype), "Year_prev_icon"));
	($mol_mem(($.$mol_date.prototype), "Year_prev"));
	($mol_mem(($.$mol_date.prototype), "month_prev"));
	($mol_mem(($.$mol_date.prototype), "Month_prev_icon"));
	($mol_mem(($.$mol_date.prototype), "Month_prev"));
	($mol_mem(($.$mol_date.prototype), "month_next"));
	($mol_mem(($.$mol_date.prototype), "Month_next_icon"));
	($mol_mem(($.$mol_date.prototype), "Month_next"));
	($mol_mem(($.$mol_date.prototype), "year_next"));
	($mol_mem(($.$mol_date.prototype), "Year_next_icon"));
	($mol_mem(($.$mol_date.prototype), "Year_next"));
	($mol_mem(($.$mol_date.prototype), "Calendar_tools"));
	($mol_mem(($.$mol_date.prototype), "Calendar"));
	($mol_mem(($.$mol_date.prototype), "Icon"));
	($mol_mem(($.$mol_date.prototype), "value_number"));
	($mol_mem(($.$mol_date.prototype), "value_moment"));
	($.$mol_date_calendar) = class $mol_date_calendar extends ($.$mol_calendar) {
		day_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		enabled(){
			return true;
		}
		Day_button(id){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this.day_text(id)));
			(obj.event_click) = (next) => ((this.day_click(id, next)));
			(obj.minimal_height) = () => (24);
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		day_content(id){
			return [(this.Day_button(id))];
		}
	};
	($mol_mem_key(($.$mol_date_calendar.prototype), "day_click"));
	($mol_mem_key(($.$mol_date_calendar.prototype), "Day_button"));

//# sourceMappingURL=date.view.tree.js.map