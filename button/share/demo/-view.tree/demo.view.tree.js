	($.$mol_button_share_demo) = class $mol_button_share_demo extends ($.$mol_example_small) {
		title(){
			return "Share button demo";
		}
		sub(){
			return [
				(this.Share_page()), 
				(this.Share_screenshot()), 
				(this.Share_hyoo())
			];
		}
		aspects(){
			return ["Widget/Control/Button"];
		}
		Share_page(){
			const obj = new this.$.$mol_button_share();
			(obj.title) = () => ((this.title()));
			(obj.hint) = () => ("Share this page with screenshot");
			return obj;
		}
		Share_screenshot(){
			const obj = new this.$.$mol_button_share();
			(obj.title) = () => ("Component screensht");
			(obj.hint) = () => ("Share screenshot of component");
			(obj.uri) = () => (null);
			(obj.capture) = () => ((this.Share_hyoo()));
			return obj;
		}
		Share_hyoo(){
			const obj = new this.$.$mol_button_share();
			(obj.title) = () => ("$hyoo");
			(obj.hint) = () => ("Share hyoo.ru");
			(obj.uri) = () => ("https://hyoo.ru");
			(obj.capture) = () => (null);
			return obj;
		}
	};
	($mol_mem(($.$mol_button_share_demo.prototype), "Share_page"));
	($mol_mem(($.$mol_button_share_demo.prototype), "Share_screenshot"));
	($mol_mem(($.$mol_button_share_demo.prototype), "Share_hyoo"));

//# sourceMappingURL=demo.view.tree.js.map