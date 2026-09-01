	($.$mol_row_demo_form) = class $mol_row_demo_form extends ($.$mol_example) {
		name_hint(){
			return "Jack Sparrow";
		}
		name(next){
			if(next !== undefined) return next;
			return "";
		}
		suggest1(){
			return "Jack Sparrow";
		}
		suggest2(){
			return "Bruce Wayne";
		}
		Name(){
			const obj = new this.$.$mol_search();
			(obj.hint) = () => ((this.name_hint()));
			(obj.query) = (next) => ((this.name(next)));
			(obj.suggests) = () => ([(this.suggest1()), (this.suggest2())]);
			return obj;
		}
		count_hint(){
			return "Count";
		}
		count(next){
			if(next !== undefined) return next;
			return null;
		}
		Count(){
			const obj = new this.$.$mol_number();
			(obj.hint) = () => ((this.count_hint()));
			(obj.value) = (next) => ((this.count(next)));
			return obj;
		}
		progress(){
			return 0.33;
		}
		Progress(){
			const obj = new this.$.$mol_portion();
			(obj.portion) = () => ((this.progress()));
			return obj;
		}
		publish_label(){
			return "Shared";
		}
		publish(next){
			if(next !== undefined) return next;
			return false;
		}
		Publish(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ((this.publish_label()));
			(obj.checked) = (next) => ((this.publish(next)));
			return obj;
		}
		drop_title(){
			return "Drop";
		}
		Drop(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this.drop_title()));
			return obj;
		}
		Row(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([
				(this.Name()), 
				(this.Count()), 
				(this.Progress()), 
				(this.Publish()), 
				(this.Drop())
			]);
			return obj;
		}
		title(){
			return "Some controls in one row with equal paddings and wrapping support";
		}
		sub(){
			return [(this.Row())];
		}
		tags(){
			return [
				"row", 
				"container", 
				"flex"
			];
		}
		aspects(){
			return ["Widget/Layout"];
		}
	};
	($mol_mem(($.$mol_row_demo_form.prototype), "name"));
	($mol_mem(($.$mol_row_demo_form.prototype), "Name"));
	($mol_mem(($.$mol_row_demo_form.prototype), "count"));
	($mol_mem(($.$mol_row_demo_form.prototype), "Count"));
	($mol_mem(($.$mol_row_demo_form.prototype), "Progress"));
	($mol_mem(($.$mol_row_demo_form.prototype), "publish"));
	($mol_mem(($.$mol_row_demo_form.prototype), "Publish"));
	($mol_mem(($.$mol_row_demo_form.prototype), "Drop"));
	($mol_mem(($.$mol_row_demo_form.prototype), "Row"));

//# sourceMappingURL=form.view.tree.js.map