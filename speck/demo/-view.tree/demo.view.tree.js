	($.$mol_speck_demo) = class $mol_speck_demo extends ($.$mol_example_small) {
		Link_speck(){
			const obj = new this.$.$mol_speck();
			(obj.value) = () => ("β");
			return obj;
		}
		Link_icon(){
			const obj = new this.$.$mol_icon_settings();
			return obj;
		}
		Link(){
			const obj = new this.$.$mol_link();
			(obj.sub) = () => ([(this.Link_speck()), (this.Link_icon())]);
			return obj;
		}
		string_speck(){
			return "New";
		}
		String_speck(){
			const obj = new this.$.$mol_speck();
			(obj.value) = () => ((this.string_speck()));
			return obj;
		}
		String_field(){
			const obj = new this.$.$mol_string();
			return obj;
		}
		String(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.String_speck()), (this.String_field())]);
			return obj;
		}
		notification_count(){
			return 8;
		}
		Button_speck(){
			const obj = new this.$.$mol_speck();
			(obj.value) = () => ((this.notification_count()));
			return obj;
		}
		Button_icon(){
			const obj = new this.$.$mol_icon_menu();
			return obj;
		}
		Button(){
			const obj = new this.$.$mol_button_minor();
			(obj.sub) = () => ([(this.Button_speck()), (this.Button_icon())]);
			return obj;
		}
		Message_speck(){
			const obj = new this.$.$mol_speck();
			return obj;
		}
		message_text(){
			return "Created";
		}
		Message(){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.Message_speck()), (this.message_text())]);
			return obj;
		}
		sub(){
			return [
				(this.Link()), 
				(this.String()), 
				(this.Button()), 
				(this.Message())
			];
		}
		tags(){
			return [
				"speck", 
				"highlight", 
				"badge"
			];
		}
		aspects(){
			return ["Widget"];
		}
	};
	($mol_mem(($.$mol_speck_demo.prototype), "Link_speck"));
	($mol_mem(($.$mol_speck_demo.prototype), "Link_icon"));
	($mol_mem(($.$mol_speck_demo.prototype), "Link"));
	($mol_mem(($.$mol_speck_demo.prototype), "String_speck"));
	($mol_mem(($.$mol_speck_demo.prototype), "String_field"));
	($mol_mem(($.$mol_speck_demo.prototype), "String"));
	($mol_mem(($.$mol_speck_demo.prototype), "Button_speck"));
	($mol_mem(($.$mol_speck_demo.prototype), "Button_icon"));
	($mol_mem(($.$mol_speck_demo.prototype), "Button"));
	($mol_mem(($.$mol_speck_demo.prototype), "Message_speck"));
	($mol_mem(($.$mol_speck_demo.prototype), "Message"));

//# sourceMappingURL=demo.view.tree.js.map