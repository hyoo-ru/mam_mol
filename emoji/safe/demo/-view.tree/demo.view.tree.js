	($.$mol_emoji_safe_demo) = class $mol_emoji_safe_demo extends ($.$mol_example_large) {
		filter(next){
			if(next !== undefined) return next;
			return "";
		}
		Filter(){
			const obj = new this.$.$mol_search();
			(obj.query) = (next) => ((this.filter(next)));
			return obj;
		}
		Tools(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this.Filter())]);
			return obj;
		}
		group_title(id){
			return "";
		}
		group_emoji_text(id){
			return "";
		}
		Group_title(id){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ((this.group_title(id)));
			(obj.text) = () => ((this.group_emoji_text(id)));
			(obj.Icon) = () => (null);
			return obj;
		}
		emoji_hint(id){
			return "";
		}
		emoji(id){
			return "";
		}
		Emoji(id){
			const obj = new this.$.$mol_button_copy();
			(obj.hint) = () => ((this.emoji_hint(id)));
			(obj.title) = () => ((this.emoji(id)));
			(obj.Icon) = () => (null);
			return obj;
		}
		emojis(id){
			return [(this.Emoji("0"))];
		}
		Emojis(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.emojis(id)));
			return obj;
		}
		Group(id){
			const obj = new this.$.$mol_section();
			(obj.Title) = () => ((this.Group_title(id)));
			(obj.content) = () => ([(this.Emojis(id))]);
			return obj;
		}
		groups(){
			return [(this.Group("0"))];
		}
		Groups(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.groups()));
			return obj;
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this.Tools()), (this.Groups())]);
			return obj;
		}
		Scroll(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Content())]);
			return obj;
		}
		title(){
			return "All safe to use emojis";
		}
		sub(){
			return [(this.Scroll())];
		}
		tags(){
			return ["emoji"];
		}
		aspects(){
			return ["Media"];
		}
	};
	($mol_mem(($.$mol_emoji_safe_demo.prototype), "filter"));
	($mol_mem(($.$mol_emoji_safe_demo.prototype), "Filter"));
	($mol_mem(($.$mol_emoji_safe_demo.prototype), "Tools"));
	($mol_mem_key(($.$mol_emoji_safe_demo.prototype), "Group_title"));
	($mol_mem_key(($.$mol_emoji_safe_demo.prototype), "Emoji"));
	($mol_mem_key(($.$mol_emoji_safe_demo.prototype), "Emojis"));
	($mol_mem_key(($.$mol_emoji_safe_demo.prototype), "Group"));
	($mol_mem(($.$mol_emoji_safe_demo.prototype), "Groups"));
	($mol_mem(($.$mol_emoji_safe_demo.prototype), "Content"));
	($mol_mem(($.$mol_emoji_safe_demo.prototype), "Scroll"));

//# sourceMappingURL=demo.view.tree.js.map