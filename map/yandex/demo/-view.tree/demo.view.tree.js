	($.$mol_map_yandex_demo) = class $mol_map_yandex_demo extends ($.$mol_example_large) {
		place_title(){
			return "";
		}
		place_addres(){
			return "Saint-Petersburg";
		}
		place_content(){
			return "It is Russia's second-largest city after Moscow";
		}
		Place(){
			const obj = new this.$.$mol_map_yandex_mark();
			(obj.title) = () => ((this.place_title()));
			(obj.address) = () => ((this.place_addres()));
			(obj.content) = () => ((this.place_content()));
			return obj;
		}
		Map(){
			const obj = new this.$.$mol_map_yandex();
			(obj.objects) = () => ([(this.Place())]);
			return obj;
		}
		title(){
			return "Simple Yandex Maps wrapper";
		}
		sub(){
			return [(this.Map())];
		}
		aspects(){
			return ["Integration", "Widget/Map"];
		}
	};
	($mol_mem(($.$mol_map_yandex_demo.prototype), "Place"));
	($mol_mem(($.$mol_map_yandex_demo.prototype), "Map"));

//# sourceMappingURL=demo.view.tree.js.map