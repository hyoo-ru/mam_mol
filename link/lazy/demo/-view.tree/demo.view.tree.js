	($.$mol_link_lazy_demo) = class $mol_link_lazy_demo extends ($.$mol_example_small) {
		title(){
			return "Lazy generated link";
		}
		sub(){
			return [(this.Download())];
		}
		tags(){
			return [
				"icon", 
				"link", 
				"lazy", 
				"download"
			];
		}
		aspects(){
			return ["Widget/Button"];
		}
		uri_generated(){
			return "";
		}
		download_file(){
			return "generated.csv";
		}
		Download_icon(){
			const obj = new this.$.$mol_icon_download();
			return obj;
		}
		download_label(){
			return "Download";
		}
		Download(){
			const obj = new this.$.$mol_link_lazy();
			(obj.hint) = () => ((this.title()));
			(obj.uri_generated) = () => ((this.uri_generated()));
			(obj.file_name) = () => ((this.download_file()));
			(obj.sub) = () => ([(this.Download_icon()), (this.download_label())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_link_lazy_demo.prototype), "Download_icon"));
	($mol_mem(($.$mol_link_lazy_demo.prototype), "Download"));

//# sourceMappingURL=demo.view.tree.js.map