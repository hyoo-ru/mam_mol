	($.$mol_vary_edit_demo) = class $mol_vary_edit_demo extends ($.$mol_example_small) {
		date(){
			const obj = new this.$.Date();
			return obj;
		}
		dom(){
			const obj = new this.$.Element();
			return obj;
		}
		set(){
			const obj = new this.$.Set([123, "foo"]);
			return obj;
		}
		map(){
			const obj = new this.$.Map([["foo", "bar"], [123, 456]]);
			return obj;
		}
		value(next){
			if(next !== undefined) return next;
			return {
				"Simple": {
					"Null": null, 
					"True": true, 
					"False": false
				}, 
				"Numbers": [123n, 12.34], 
				"Text": "foo", 
				"Objects": {"Date": (this.date()), "DOM": (this.dom())}, 
				"Collections": {"Set": (this.set()), "Map": (this.map())}
			};
		}
		Edit(){
			const obj = new this.$.$mol_vary_edit();
			(obj.value) = (next) => ((this.value(next)));
			return obj;
		}
		Dump(){
			const obj = new this.$.$mol_dump_value();
			(obj.value) = () => ((this.value()));
			return obj;
		}
		sub(){
			return [(this.Edit()), (this.Dump())];
		}
		tags(){
			return [
				"VaryPack", 
				"JSON", 
				"field"
			];
		}
		aspects(){
			return ["Widget/Control", "Type/Vary"];
		}
	};
	($mol_mem(($.$mol_vary_edit_demo.prototype), "date"));
	($mol_mem(($.$mol_vary_edit_demo.prototype), "dom"));
	($mol_mem(($.$mol_vary_edit_demo.prototype), "set"));
	($mol_mem(($.$mol_vary_edit_demo.prototype), "map"));
	($mol_mem(($.$mol_vary_edit_demo.prototype), "value"));
	($mol_mem(($.$mol_vary_edit_demo.prototype), "Edit"));
	($mol_mem(($.$mol_vary_edit_demo.prototype), "Dump"));

//# sourceMappingURL=demo.view.tree.js.map