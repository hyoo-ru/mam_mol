	($.$mol_toolbar_demo) = class $mol_toolbar_demo extends ($.$mol_example_small) {
		search_hint(){
			return "Search...";
		}
		Search(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.search_hint()));
			return obj;
		}
		replace_hint(){
			return "Replace...";
		}
		Replace(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.replace_hint()));
			return obj;
		}
		approve_label(){
			return "Approve";
		}
		Approve(){
			const obj = new this.$.$mol_button_major();
			(obj.title) = () => ((this.approve_label()));
			return obj;
		}
		decline_label(){
			return "Decline";
		}
		Decline(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this.decline_label()));
			return obj;
		}
		Copy_icon(){
			const obj = new this.$.$mol_icon_content_copy();
			return obj;
		}
		Copy(){
			const obj = new this.$.$mol_button_minor();
			(obj.sub) = () => ([(this.Copy_icon())]);
			return obj;
		}
		Cut_icon(){
			const obj = new this.$.$mol_icon_content_cut();
			return obj;
		}
		Cut(){
			const obj = new this.$.$mol_button_minor();
			(obj.sub) = () => ([(this.Cut_icon())]);
			return obj;
		}
		Paste_icon(){
			const obj = new this.$.$mol_icon_content_paste();
			return obj;
		}
		Paste(){
			const obj = new this.$.$mol_button_minor();
			(obj.sub) = () => ([(this.Paste_icon())]);
			return obj;
		}
		Delete_icon(){
			const obj = new this.$.$mol_icon_delete();
			return obj;
		}
		Delete(){
			const obj = new this.$.$mol_button_minor();
			(obj.sub) = () => ([(this.Delete_icon())]);
			return obj;
		}
		Toolbar(){
			const obj = new this.$.$mol_toolbar();
			(obj.items) = () => ([
				(this.Search()), 
				(this.Replace()), 
				(this.Approve()), 
				(this.Decline()), 
				(this.Copy()), 
				(this.Cut()), 
				(this.Paste()), 
				(this.Delete())
			]);
			return obj;
		}
		title(){
			return "Foldable toolbar demo";
		}
		sub(){
			return [(this.Toolbar())];
		}
		aspects(){
			return ["Widget/Layout"];
		}
	};
	($mol_mem(($.$mol_toolbar_demo.prototype), "Search"));
	($mol_mem(($.$mol_toolbar_demo.prototype), "Replace"));
	($mol_mem(($.$mol_toolbar_demo.prototype), "Approve"));
	($mol_mem(($.$mol_toolbar_demo.prototype), "Decline"));
	($mol_mem(($.$mol_toolbar_demo.prototype), "Copy_icon"));
	($mol_mem(($.$mol_toolbar_demo.prototype), "Copy"));
	($mol_mem(($.$mol_toolbar_demo.prototype), "Cut_icon"));
	($mol_mem(($.$mol_toolbar_demo.prototype), "Cut"));
	($mol_mem(($.$mol_toolbar_demo.prototype), "Paste_icon"));
	($mol_mem(($.$mol_toolbar_demo.prototype), "Paste"));
	($mol_mem(($.$mol_toolbar_demo.prototype), "Delete_icon"));
	($mol_mem(($.$mol_toolbar_demo.prototype), "Delete"));
	($mol_mem(($.$mol_toolbar_demo.prototype), "Toolbar"));

//# sourceMappingURL=demo.view.tree.js.map