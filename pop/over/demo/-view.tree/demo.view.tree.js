	($.$mol_pop_over_demo) = class $mol_pop_over_demo extends ($.$mol_example_small) {
		file_title(){
			return "File";
		}
		open_title(){
			return "Open";
		}
		Open(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this?.open_title()));
			return obj;
		}
		export_title(){
			return "Export";
		}
		Export(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this?.export_title()));
			return obj;
		}
		save_title(){
			return "Save";
		}
		Save(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this?.save_title()));
			return obj;
		}
		File_menu(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this?.Open()), 
				(this?.Export()), 
				(this?.Save())
			]);
			return obj;
		}
		File(){
			const obj = new this.$.$mol_pop_over();
			(obj.align) = () => ("bottom_right");
			(obj.Anchor) = () => ((this?.file_title()));
			(obj.bubble_content) = () => ([(this?.File_menu())]);
			return obj;
		}
		help_title(){
			return "About";
		}
		updates_title(){
			return "Updates";
		}
		Updates(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this?.updates_title()));
			return obj;
		}
		about_title(){
			return "About";
		}
		About(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this?.about_title()));
			return obj;
		}
		Help_menu(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this?.Updates()), (this?.About())]);
			return obj;
		}
		Help(){
			const obj = new this.$.$mol_pop_over();
			(obj.align) = () => ("bottom_right");
			(obj.Anchor) = () => ((this?.help_title()));
			(obj.bubble_content) = () => ([(this?.Help_menu())]);
			return obj;
		}
		Menu(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this?.File()), (this?.Help())]);
			return obj;
		}
		title(){
			return "Menu that opens on mouse over";
		}
		sub(){
			return [(this?.Menu())];
		}
		tags(){
			return [
				"popover", 
				"pop", 
				"menu", 
				"hover", 
				"tooltip"
			];
		}
		aspects(){
			return ["Widget/Float"];
		}
	};
	($mol_mem(($.$mol_pop_over_demo.prototype), "Open"));
	($mol_mem(($.$mol_pop_over_demo.prototype), "Export"));
	($mol_mem(($.$mol_pop_over_demo.prototype), "Save"));
	($mol_mem(($.$mol_pop_over_demo.prototype), "File_menu"));
	($mol_mem(($.$mol_pop_over_demo.prototype), "File"));
	($mol_mem(($.$mol_pop_over_demo.prototype), "Updates"));
	($mol_mem(($.$mol_pop_over_demo.prototype), "About"));
	($mol_mem(($.$mol_pop_over_demo.prototype), "Help_menu"));
	($mol_mem(($.$mol_pop_over_demo.prototype), "Help"));
	($mol_mem(($.$mol_pop_over_demo.prototype), "Menu"));

//# sourceMappingURL=demo.view.tree.js.map