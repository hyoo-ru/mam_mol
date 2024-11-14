	($.$mol_code) = class $mol_code extends ($.$mol_view) {
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		format(){
			return "";
		}
		hint(){
			return (this.format());
		}
		Manual(){
			const obj = new this.$.$mol_search();
			(obj.query) = (next) => ((this.value(next)));
			(obj.hint) = () => ((this.hint()));
			return obj;
		}
		event_scan(next){
			if(next !== undefined) return next;
			return null;
		}
		scan_label(){
			return (this.$.$mol_locale.text("$mol_code_scan_label"));
		}
		Scan(){
			const obj = new this.$.$mol_button();
			(obj.event_click) = (next) => ((this.event_scan(next)));
			(obj.sub) = () => ([(this.scan_label())]);
			return obj;
		}
		sub(){
			return [(this.Manual()), (this.Scan())];
		}
	};
	($mol_mem(($.$mol_code.prototype), "value"));
	($mol_mem(($.$mol_code.prototype), "Manual"));
	($mol_mem(($.$mol_code.prototype), "event_scan"));
	($mol_mem(($.$mol_code.prototype), "Scan"));

//# sourceMappingURL=code.view.tree.js.map