	($.$mol_fetch_demo) = class $mol_fetch_demo extends ($.$mol_example_small) {
		url(next){
			if(next !== undefined) return next;
			return "https://jsonplaceholder.typicode.com/users";
		}
		Url(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this?.url(next)));
			return obj;
		}
		fetch_data(next){
			if(next !== undefined) return next;
			return null;
		}
		Fetch(){
			const obj = new this.$.$mol_button_major();
			(obj.click) = (next) => ((this?.fetch_data()));
			return obj;
		}
		Request(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this?.Url()), (this?.Fetch())]);
			return obj;
		}
		data(next){
			if(next !== undefined) return next;
			return null;
		}
		Data(){
			const obj = new this.$.$mol_dump_value();
			(obj.value) = () => ((this?.data()));
			return obj;
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this?.Request()), (this?.Data())]);
			return obj;
		}
		title(){
			return "Simple spoiler";
		}
		sub(){
			return [(this?.Content())];
		}
		tags(){
			return [
				"fetch", 
				"load", 
				"api", 
				"response", 
				"request"
			];
		}
		aspects(){
			return ["Network/HTTP"];
		}
	};
	($mol_mem(($.$mol_fetch_demo.prototype), "url"));
	($mol_mem(($.$mol_fetch_demo.prototype), "Url"));
	($mol_mem(($.$mol_fetch_demo.prototype), "fetch_data"));
	($mol_mem(($.$mol_fetch_demo.prototype), "Fetch"));
	($mol_mem(($.$mol_fetch_demo.prototype), "Request"));
	($mol_mem(($.$mol_fetch_demo.prototype), "data"));
	($mol_mem(($.$mol_fetch_demo.prototype), "Data"));
	($mol_mem(($.$mol_fetch_demo.prototype), "Content"));

//# sourceMappingURL=demo.view.tree.js.map