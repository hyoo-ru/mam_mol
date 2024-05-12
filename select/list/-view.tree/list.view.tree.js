	($.$mol_select_list) = class $mol_select_list extends ($.$mol_view) {
		Badges(){
			return [];
		}
		badge_title(id){
			return "badge";
		}
		remove(id, next){
			if(next !== undefined) return next;
			return null;
		}
		badge_hint(){
			return (this.$.$mol_locale.text("$mol_select_list_badge_hint"));
		}
		enabled(){
			return true;
		}
		drop_enabled(){
			return (this?.enabled());
		}
		event_select(id, next){
			if(next !== undefined) return next;
			return null;
		}
		align_hor(){
			return "right";
		}
		options(){
			return [];
		}
		options_pickable(){
			return (this?.options());
		}
		pick(next){
			if(next !== undefined) return next;
			return "";
		}
		option_title(id){
			return "";
		}
		pick_enabled(){
			return (this?.enabled());
		}
		pick_hint(){
			return (this.$.$mol_locale.text("$mol_select_list_pick_hint"));
		}
		filter_pattern(next){
			return (this?.Pick()?.filter_pattern(next));
		}
		Pick_icon(){
			const obj = new this.$.$mol_icon_plus();
			return obj;
		}
		Pick(){
			const obj = new this.$.$mol_select();
			(obj.event_select) = (id, next) => ((this?.event_select(id, next)));
			(obj.align_hor) = () => ((this?.align_hor()));
			(obj.options) = () => ((this?.options_pickable()));
			(obj.value) = (next) => ((this?.pick(next)));
			(obj.option_label) = (id) => ((this?.option_title(id)));
			(obj.trigger_enabled) = () => ((this?.pick_enabled()));
			(obj.hint) = () => ((this?.pick_hint()));
			(obj.Trigger_icon) = () => ((this?.Pick_icon()));
			return obj;
		}
		value(next){
			if(next !== undefined) return next;
			return [];
		}
		dictionary(){
			return {};
		}
		badges_list(){
			return (this?.Badges());
		}
		Badge(id){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this?.badge_title(id)));
			(obj.click) = (next) => ((this?.remove(id, next)));
			(obj.hint) = () => ((this?.badge_hint()));
			(obj.enabled) = () => ((this?.drop_enabled()));
			return obj;
		}
		sub(){
			return [(this?.Pick()), ...(this.badges_list())];
		}
	};
	($mol_mem_key(($.$mol_select_list.prototype), "remove"));
	($mol_mem_key(($.$mol_select_list.prototype), "event_select"));
	($mol_mem(($.$mol_select_list.prototype), "pick"));
	($mol_mem(($.$mol_select_list.prototype), "Pick_icon"));
	($mol_mem(($.$mol_select_list.prototype), "Pick"));
	($mol_mem(($.$mol_select_list.prototype), "value"));
	($mol_mem_key(($.$mol_select_list.prototype), "Badge"));

//# sourceMappingURL=list.view.tree.js.map