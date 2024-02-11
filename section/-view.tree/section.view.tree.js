	($.$mol_section) = class $mol_section extends ($.$mol_list) {
		level(){
			return 1;
		}
		rows(){
			return [(this.Head()), (this.Content())];
		}
		title_dom_name(){
			return "h1";
		}
		Title(){
			const obj = new this.$.$mol_paragraph();
			(obj.dom_name) = () => ((this.title_dom_name()));
			(obj.title) = () => ((this.title()));
			return obj;
		}
		tools(){
			return [];
		}
		Tools(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.tools()));
			return obj;
		}
		head(){
			return [(this.Title()), (this.Tools())];
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.head()));
			return obj;
		}
		content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.content()));
			return obj;
		}
	};
	($mol_mem(($.$mol_section.prototype), "Title"));
	($mol_mem(($.$mol_section.prototype), "Tools"));
	($mol_mem(($.$mol_section.prototype), "Head"));
	($mol_mem(($.$mol_section.prototype), "Content"));

//# sourceMappingURL=section.view.tree.js.map