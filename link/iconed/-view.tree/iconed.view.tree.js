	($.$mol_link_iconed) = class $mol_link_iconed extends ($.$mol_link) {
		sub(){
			return [(this.Icon())];
		}
		content(){
			return [(this.title())];
		}
		host(){
			return "";
		}
		icon(){
			return "";
		}
		Icon(){
			const obj = new this.$.$mol_image();
			(obj.uri) = () => ((this.icon()));
			(obj.title) = () => ("");
			return obj;
		}
		title(){
			return (this.uri());
		}
	};
	($mol_mem(($.$mol_link_iconed.prototype), "Icon"));

//# sourceMappingURL=iconed.view.tree.js.map