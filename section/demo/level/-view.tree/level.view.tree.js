	($.$mol_section_demo_level) = class $mol_section_demo_level extends ($.$mol_example_small) {
		Section1_text(){
			const obj = new this.$.$mol_filler();
			(obj.min_symbols) = () => (250);
			return obj;
		}
		Section2_text(){
			const obj = new this.$.$mol_filler();
			(obj.min_symbols) = () => (250);
			return obj;
		}
		Section3_text(){
			const obj = new this.$.$mol_filler();
			(obj.min_symbols) = () => (250);
			return obj;
		}
		Section4_text(){
			const obj = new this.$.$mol_filler();
			(obj.min_symbols) = () => (250);
			return obj;
		}
		Section5_text(){
			const obj = new this.$.$mol_filler();
			(obj.min_symbols) = () => (250);
			return obj;
		}
		Section6_text(){
			const obj = new this.$.$mol_filler();
			(obj.min_symbols) = () => (250);
			return obj;
		}
		Section7_text(){
			const obj = new this.$.$mol_filler();
			(obj.min_symbols) = () => (250);
			return obj;
		}
		title(){
			return "Section with header";
		}
		sub(){
			return [(this.Section1())];
		}
		Section1(){
			const obj = new this.$.$mol_section();
			(obj.level) = () => (1);
			(obj.title) = () => ("Level 1");
			(obj.content) = () => ([(this.Section1_text()), (this.Section2())]);
			return obj;
		}
		Section2(){
			const obj = new this.$.$mol_section();
			(obj.level) = () => (2);
			(obj.title) = () => ("Level 2");
			(obj.content) = () => ([(this.Section2_text()), (this.Section3())]);
			return obj;
		}
		Section3(){
			const obj = new this.$.$mol_section();
			(obj.level) = () => (3);
			(obj.title) = () => ("Level 3");
			(obj.content) = () => ([(this.Section3_text()), (this.Section4())]);
			return obj;
		}
		Section4(){
			const obj = new this.$.$mol_section();
			(obj.level) = () => (4);
			(obj.title) = () => ("Level 4");
			(obj.content) = () => ([(this.Section4_text()), (this.Section5())]);
			return obj;
		}
		Section5(){
			const obj = new this.$.$mol_section();
			(obj.level) = () => (5);
			(obj.title) = () => ("Level 5");
			(obj.content) = () => ([(this.Section5_text()), (this.Section6())]);
			return obj;
		}
		Section6(){
			const obj = new this.$.$mol_section();
			(obj.level) = () => (6);
			(obj.title) = () => ("Level 6");
			(obj.content) = () => ([(this.Section6_text()), (this.Section7())]);
			return obj;
		}
		Section7(){
			const obj = new this.$.$mol_section();
			(obj.level) = () => (7);
			(obj.title) = () => ("Level 7");
			(obj.content) = () => ([(this.Section7_text())]);
			return obj;
		}
		tags(){
			return [
				"header", 
				"level", 
				"h1"
			];
		}
		aspects(){
			return ["Widget/Layout"];
		}
	};
	($mol_mem(($.$mol_section_demo_level.prototype), "Section1_text"));
	($mol_mem(($.$mol_section_demo_level.prototype), "Section2_text"));
	($mol_mem(($.$mol_section_demo_level.prototype), "Section3_text"));
	($mol_mem(($.$mol_section_demo_level.prototype), "Section4_text"));
	($mol_mem(($.$mol_section_demo_level.prototype), "Section5_text"));
	($mol_mem(($.$mol_section_demo_level.prototype), "Section6_text"));
	($mol_mem(($.$mol_section_demo_level.prototype), "Section7_text"));
	($mol_mem(($.$mol_section_demo_level.prototype), "Section1"));
	($mol_mem(($.$mol_section_demo_level.prototype), "Section2"));
	($mol_mem(($.$mol_section_demo_level.prototype), "Section3"));
	($mol_mem(($.$mol_section_demo_level.prototype), "Section4"));
	($mol_mem(($.$mol_section_demo_level.prototype), "Section5"));
	($mol_mem(($.$mol_section_demo_level.prototype), "Section6"));
	($mol_mem(($.$mol_section_demo_level.prototype), "Section7"));

//# sourceMappingURL=level.view.tree.js.map