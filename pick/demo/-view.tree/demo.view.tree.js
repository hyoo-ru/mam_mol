	($.$mol_pick_demo) = class $mol_pick_demo extends ($.$mol_example_small) {
		title(){
			return "Simple and complex popups";
		}
		sub(){
			return [(this.Info_pop()), (this.Options_pop())];
		}
		tags(){
			return [
				"pick", 
				"popup", 
				"info", 
				"menu", 
				"icon", 
				"container", 
				"confirm", 
				"modal"
			];
		}
		aspects(){
			return ["Widget/Float", "Widget/Control/Button/Picker"];
		}
		info_content_text(){
			return "## Info Pop-up\n**Markdown text content**";
		}
		Info_content(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.info_content_text()));
			return obj;
		}
		Info_pop(){
			const obj = new this.$.$mol_pick();
			(obj.title) = () => ("Info");
			(obj.bubble_content) = () => ([(this.Info_content())]);
			return obj;
		}
		Options_trigger_icon(){
			const obj = new this.$.$mol_icon_menu();
			return obj;
		}
		Menu_item_copy(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ("Copy");
			(obj.text) = () => ("Hello, World!");
			return obj;
		}
		Menu_item_download_blob(){
			const obj = new this.$.$mol_blob();
			return obj;
		}
		Menu_item_download(){
			const obj = new this.$.$mol_button_download();
			(obj.title) = () => ("Download");
			(obj.blob) = () => ((this.Menu_item_download_blob()));
			(obj.file_name) = () => ("demo.bin");
			return obj;
		}
		menu_item_delete_icon(){
			const obj = new this.$.$mol_icon_trash_can_outline();
			return obj;
		}
		menu_item_delete_label(){
			return "Delete";
		}
		delete_confirm(next){
			if(next !== undefined) return next;
			return null;
		}
		Delete_confirm(){
			const obj = new this.$.$mol_button_major();
			(obj.title) = () => ("Confirm");
			(obj.click) = (next) => ((this.delete_confirm(next)));
			return obj;
		}
		Menu_item_delete(){
			const obj = new this.$.$mol_pick();
			(obj.align) = () => ("center");
			(obj.trigger_content) = () => ([(this.menu_item_delete_icon()), (this.menu_item_delete_label())]);
			(obj.bubble_content) = () => ([(this.Delete_confirm())]);
			return obj;
		}
		Options_content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this.Menu_item_copy()), 
				(this.Menu_item_download()), 
				(this.Menu_item_delete())
			]);
			return obj;
		}
		Options_pop(){
			const obj = new this.$.$mol_pick();
			(obj.hint) = () => ("Click to show options menu");
			(obj.trigger_content) = () => ([(this.Options_trigger_icon())]);
			(obj.bubble_content) = () => ([(this.Options_content())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_pick_demo.prototype), "Info_content"));
	($mol_mem(($.$mol_pick_demo.prototype), "Info_pop"));
	($mol_mem(($.$mol_pick_demo.prototype), "Options_trigger_icon"));
	($mol_mem(($.$mol_pick_demo.prototype), "Menu_item_copy"));
	($mol_mem(($.$mol_pick_demo.prototype), "Menu_item_download_blob"));
	($mol_mem(($.$mol_pick_demo.prototype), "Menu_item_download"));
	($mol_mem(($.$mol_pick_demo.prototype), "menu_item_delete_icon"));
	($mol_mem(($.$mol_pick_demo.prototype), "delete_confirm"));
	($mol_mem(($.$mol_pick_demo.prototype), "Delete_confirm"));
	($mol_mem(($.$mol_pick_demo.prototype), "Menu_item_delete"));
	($mol_mem(($.$mol_pick_demo.prototype), "Options_content"));
	($mol_mem(($.$mol_pick_demo.prototype), "Options_pop"));

//# sourceMappingURL=demo.view.tree.js.map