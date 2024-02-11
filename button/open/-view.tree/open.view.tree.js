	($.$mol_button_open) = class $mol_button_open extends ($.$mol_button_minor) {
		sub(){
			return [(this.Icon()), (this.Native())];
		}
		Icon(){
			const obj = new this.$.$mol_icon_upload();
			return obj;
		}
		files(next){
			if(next !== undefined) return next;
			return [];
		}
		accept(){
			return "";
		}
		multiple(){
			return true;
		}
		Native(){
			const obj = new this.$.$mol_button_open_native();
			(obj.files) = (next) => ((this.files(next)));
			(obj.accept) = () => ((this.accept()));
			(obj.multiple) = () => ((this.multiple()));
			return obj;
		}
	};
	($mol_mem(($.$mol_button_open.prototype), "Icon"));
	($mol_mem(($.$mol_button_open.prototype), "files"));
	($mol_mem(($.$mol_button_open.prototype), "Native"));
	($.$mol_button_open_native) = class $mol_button_open_native extends ($.$mol_view) {
		dom_name(){
			return "input";
		}
		files(next){
			if(next !== undefined) return next;
			return [];
		}
		attr(){
			return {
				"type": "file", 
				"accept": (this.accept()), 
				"multiple": (this.multiple())
			};
		}
		event(){
			return {"change": (next) => (this.picked(next))};
		}
		accept(){
			return "";
		}
		multiple(){
			return true;
		}
		picked(next){
			if(next !== undefined) return next;
			return null;
		}
	};
	($mol_mem(($.$mol_button_open_native.prototype), "files"));
	($mol_mem(($.$mol_button_open_native.prototype), "picked"));

//# sourceMappingURL=open.view.tree.js.map