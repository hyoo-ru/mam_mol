	($.$mol_dump_value) = class $mol_dump_value extends ($.$mol_view) {
		simple(){
			return "";
		}
		Simple(){
			const obj = new this.$.$mol_text_code();
			(obj.text) = () => ((this.simple()));
			return obj;
		}
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		expandable(){
			return true;
		}
		expand_all(next){
			if(next !== undefined) return next;
			return null;
		}
		expand_title(){
			return "";
		}
		Expand_title(){
			const obj = new this.$.$mol_text_code();
			(obj.text) = () => ((this.expand_title()));
			return obj;
		}
		Expand_head(){
			const obj = new this.$.$mol_check_expand();
			(obj.minimal_height) = () => (24);
			(obj.minimal_width) = () => (24);
			(obj.expanded) = (next) => ((this.expanded(next)));
			(obj.expandable) = () => ((this.expandable()));
			(obj.clicks) = (next) => ((this.expand_all(next)));
			(obj.label) = () => ([(this.Expand_title())]);
			return obj;
		}
		preview_dom(){
			return null;
		}
		preview(){
			return null;
		}
		Preview_dom(){
			const obj = new this.$.$mol_view();
			(obj.dom_node) = () => ((this.preview_dom()));
			(obj.render) = () => ((this.preview()));
			return obj;
		}
		Preview(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Preview_dom())]);
			return obj;
		}
		row_values(id){
			return [];
		}
		prototypes(){
			return false;
		}
		Row(id){
			const obj = new this.$.$mol_dump_list();
			(obj.values) = () => ((this.row_values(id)));
			(obj.prototypes) = () => ((this.prototypes()));
			(obj.preview_show) = () => ((this.preview_show()));
			return obj;
		}
		expand_content(){
			return [(this.Preview()), (this.Row("0"))];
		}
		Expand(){
			const obj = new this.$.$mol_expander();
			(obj.expanded) = (next) => ((this.expanded(next)));
			(obj.Trigger) = () => ((this.Expand_head()));
			(obj.content) = () => ((this.expand_content()));
			return obj;
		}
		value(next){
			if(next !== undefined) return next;
			return null;
		}
		preview_show(next){
			if(next !== undefined) return next;
			return true;
		}
		sub(){
			return [(this.Simple()), (this.Expand())];
		}
	};
	($mol_mem(($.$mol_dump_value.prototype), "Simple"));
	($mol_mem(($.$mol_dump_value.prototype), "expanded"));
	($mol_mem(($.$mol_dump_value.prototype), "expand_all"));
	($mol_mem(($.$mol_dump_value.prototype), "Expand_title"));
	($mol_mem(($.$mol_dump_value.prototype), "Expand_head"));
	($mol_mem(($.$mol_dump_value.prototype), "Preview_dom"));
	($mol_mem(($.$mol_dump_value.prototype), "Preview"));
	($mol_mem_key(($.$mol_dump_value.prototype), "Row"));
	($mol_mem(($.$mol_dump_value.prototype), "Expand"));
	($mol_mem(($.$mol_dump_value.prototype), "value"));
	($mol_mem(($.$mol_dump_value.prototype), "preview_show"));

//# sourceMappingURL=value.view.tree.js.map