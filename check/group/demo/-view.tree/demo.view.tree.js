	($.$mol_check_group_demo) = class $mol_check_group_demo extends ($.$mol_example_small) {
		All(){
			const obj = new this.$.$mol_check_group();
			(obj.title) = () => ("SPECIAL");
			(obj.checks) = () => ([
				(this.Strength()), 
				(this.Perception()), 
				(this.Endurance()), 
				(this.Charisma()), 
				(this.Intelligence()), 
				(this.Agility()), 
				(this.Luck())
			]);
			return obj;
		}
		strength_title(){
			return "Strength";
		}
		strength(next){
			if(next !== undefined) return next;
			return false;
		}
		Strength(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ((this.strength_title()));
			(obj.checked) = (next) => ((this.strength(next)));
			return obj;
		}
		perception_title(){
			return "Perception";
		}
		perception(next){
			if(next !== undefined) return next;
			return true;
		}
		Perception(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ((this.perception_title()));
			(obj.checked) = (next) => ((this.perception(next)));
			return obj;
		}
		endurance_title(){
			return "Endurance";
		}
		endurance(next){
			if(next !== undefined) return next;
			return false;
		}
		Endurance(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ((this.endurance_title()));
			(obj.checked) = (next) => ((this.endurance(next)));
			return obj;
		}
		charisma_title(){
			return "Charisma";
		}
		charisma(next){
			if(next !== undefined) return next;
			return false;
		}
		Charisma(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ((this.charisma_title()));
			(obj.checked) = (next) => ((this.charisma(next)));
			return obj;
		}
		intelligence_title(){
			return "Intelligence";
		}
		intelligence(next){
			if(next !== undefined) return next;
			return true;
		}
		Intelligence(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ((this.intelligence_title()));
			(obj.checked) = (next) => ((this.intelligence(next)));
			return obj;
		}
		agility_title(){
			return "Agility";
		}
		agility(next){
			if(next !== undefined) return next;
			return true;
		}
		Agility(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ((this.agility_title()));
			(obj.checked) = (next) => ((this.agility(next)));
			return obj;
		}
		luck_title(){
			return "Luck";
		}
		luck(next){
			if(next !== undefined) return next;
			return true;
		}
		Luck(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ((this.luck_title()));
			(obj.checked) = (next) => ((this.luck(next)));
			return obj;
		}
		Partial(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this.Strength()), 
				(this.Perception()), 
				(this.Endurance()), 
				(this.Charisma()), 
				(this.Intelligence()), 
				(this.Agility()), 
				(this.Luck())
			]);
			return obj;
		}
		Demo_items(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this.All()), (this.Partial())]);
			return obj;
		}
		title(){
			return "Group of checkboxes";
		}
		sub(){
			return [(this.Demo_items())];
		}
		tags(){
			return ["multi", "group"];
		}
		aspects(){
			return ["Widget/Control/Button"];
		}
	};
	($mol_mem(($.$mol_check_group_demo.prototype), "All"));
	($mol_mem(($.$mol_check_group_demo.prototype), "strength"));
	($mol_mem(($.$mol_check_group_demo.prototype), "Strength"));
	($mol_mem(($.$mol_check_group_demo.prototype), "perception"));
	($mol_mem(($.$mol_check_group_demo.prototype), "Perception"));
	($mol_mem(($.$mol_check_group_demo.prototype), "endurance"));
	($mol_mem(($.$mol_check_group_demo.prototype), "Endurance"));
	($mol_mem(($.$mol_check_group_demo.prototype), "charisma"));
	($mol_mem(($.$mol_check_group_demo.prototype), "Charisma"));
	($mol_mem(($.$mol_check_group_demo.prototype), "intelligence"));
	($mol_mem(($.$mol_check_group_demo.prototype), "Intelligence"));
	($mol_mem(($.$mol_check_group_demo.prototype), "agility"));
	($mol_mem(($.$mol_check_group_demo.prototype), "Agility"));
	($mol_mem(($.$mol_check_group_demo.prototype), "luck"));
	($mol_mem(($.$mol_check_group_demo.prototype), "Luck"));
	($mol_mem(($.$mol_check_group_demo.prototype), "Partial"));
	($mol_mem(($.$mol_check_group_demo.prototype), "Demo_items"));

//# sourceMappingURL=demo.view.tree.js.map