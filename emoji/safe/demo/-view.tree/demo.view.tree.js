	($.$mol_emoji_safe_demo) = class $mol_emoji_safe_demo extends ($.$mol_example_large) {
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
		Scroll(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Groups())]);
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
	($mol_mem_key(($.$mol_emoji_safe_demo.prototype), "Group_title"));
	($mol_mem_key(($.$mol_emoji_safe_demo.prototype), "Emoji"));
	($mol_mem_key(($.$mol_emoji_safe_demo.prototype), "Emojis"));
	($mol_mem_key(($.$mol_emoji_safe_demo.prototype), "Group"));
	($mol_mem(($.$mol_emoji_safe_demo.prototype), "Groups"));
	($mol_mem(($.$mol_emoji_safe_demo.prototype), "Scroll"));

//# sourceMappingURL=demo.view.tree.js.map