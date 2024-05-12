	($.$mol_link_demo) = class $mol_link_demo extends ($.$mol_example_small) {
		this_label(){
			return "This page";
		}
		This(){
			const obj = new this.$.$mol_link();
			(obj.sub) = () => ([(this?.this_label())]);
			return obj;
		}
		red_label(){
			return "Red";
		}
		Red(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"color": "red"});
			(obj.sub) = () => ([(this?.red_label())]);
			return obj;
		}
		green_label(){
			return "Green";
		}
		Green(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"color": "green"});
			(obj.sub) = () => ([(this?.green_label())]);
			return obj;
		}
		blue_label(){
			return "Blue";
		}
		Blue(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"color": "blue"});
			(obj.sub) = () => ([(this?.blue_label())]);
			return obj;
		}
		external_hint(){
			return "external link";
		}
		External(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ("http://example.org");
			(obj.title) = () => ("example.org");
			(obj.hint) = () => ((this?.external_hint()));
			return obj;
		}
		object_uri(){
			return "";
		}
		Download_icon(){
			const obj = new this.$.$mol_icon_download();
			return obj;
		}
		download_label(){
			return "Download";
		}
		Download(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ((this?.object_uri()));
			(obj.file_name) = () => ("file.csv");
			(obj.sub) = () => ([(this?.Download_icon()), (this?.download_label())]);
			return obj;
		}
		Demo_items(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this?.This()), 
				(this?.Red()), 
				(this?.Green()), 
				(this?.Blue()), 
				(this?.External()), 
				(this?.Download())
			]);
			return obj;
		}
		title(){
			return "Some hyperlinks";
		}
		sub(){
			return [(this?.Demo_items())];
		}
		tags(){
			return [
				"$mol_icon", 
				"file", 
				"download", 
				"link", 
				"icon", 
				"navigation", 
				"router", 
				"url"
			];
		}
		aspects(){
			return ["Navigation", "Widget/Button"];
		}
	};
	($mol_mem(($.$mol_link_demo.prototype), "This"));
	($mol_mem(($.$mol_link_demo.prototype), "Red"));
	($mol_mem(($.$mol_link_demo.prototype), "Green"));
	($mol_mem(($.$mol_link_demo.prototype), "Blue"));
	($mol_mem(($.$mol_link_demo.prototype), "External"));
	($mol_mem(($.$mol_link_demo.prototype), "Download_icon"));
	($mol_mem(($.$mol_link_demo.prototype), "Download"));
	($mol_mem(($.$mol_link_demo.prototype), "Demo_items"));

//# sourceMappingURL=demo.view.tree.js.map