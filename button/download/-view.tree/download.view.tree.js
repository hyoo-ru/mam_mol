	($.$mol_button_download) = class $mol_button_download extends ($.$mol_button_minor) {
		blob(){
			return null;
		}
		uri(){
			return "";
		}
		file_name(){
			return "blob.bin";
		}
		sub(){
			return [(this.Icon()), (this.title())];
		}
		Icon(){
			const obj = new this.$.$mol_icon_download();
			return obj;
		}
		title(){
			return "";
		}
	};
	($mol_mem(($.$mol_button_download.prototype), "Icon"));

//# sourceMappingURL=download.view.tree.js.map