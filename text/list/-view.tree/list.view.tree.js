	($.$mol_text_list) = class $mol_text_list extends ($.$mol_text) {
		auto_scroll(){
			return null;
		}
		attr(){
			return {...(super.attr()), "mol_text_list_type": (this.type())};
		}
		Paragraph(id){
			const obj = new this.$.$mol_text_list_item();
			(obj.index) = () => ((this.item_index(id)));
			(obj.sub) = () => ((this.block_content(id)));
			return obj;
		}
		type(){
			return "";
		}
	};
	($mol_mem_key(($.$mol_text_list.prototype), "Paragraph"));
	($.$mol_text_list_item) = class $mol_text_list_item extends ($.$mol_paragraph) {
		attr(){
			return {...(super.attr()), "mol_text_list_item_index": (this.index())};
		}
		index(){
			return 0;
		}
	};

//# sourceMappingURL=list.view.tree.js.map