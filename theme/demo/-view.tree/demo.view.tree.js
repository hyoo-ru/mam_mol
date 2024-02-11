	($.$mol_theme_demo) = class $mol_theme_demo extends ($.$mol_example_large) {
		style(){
			return {"--mol_theme_hue": (this.hue_deg()), "--mol_theme_hue_spread": (this.hue_spread_deg())};
		}
		sub(){
			return [(this.Config()), (this.Scroll())];
		}
		tags(){
			return ["theme", "skin"];
		}
		aspects(){
			return ["Type/Color"];
		}
		hue_deg(){
			return "";
		}
		hue_spread_deg(){
			return "";
		}
		hue(next){
			if(next !== undefined) return next;
			return 210;
		}
		Hue(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.hue(next)));
			(obj.precision_change) = () => (15);
			return obj;
		}
		Hue_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Hue");
			(obj.Content) = () => ((this.Hue()));
			return obj;
		}
		hue_spread(next){
			if(next !== undefined) return next;
			return 90;
		}
		Hue_spread(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.hue_spread(next)));
			(obj.precision_change) = () => (15);
			return obj;
		}
		Hue_spread_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Hue spread");
			(obj.Content) = () => ((this.Hue_spread()));
			return obj;
		}
		Config(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this.Hue_field()), (this.Hue_spread_field())]);
			return obj;
		}
		Base(){
			const obj = new this.$.$mol_theme_demo_case();
			(obj.theme) = () => ("$mol_theme_base");
			return obj;
		}
		Accent(){
			const obj = new this.$.$mol_theme_demo_case();
			(obj.theme) = () => ("$mol_theme_accent");
			return obj;
		}
		Current(){
			const obj = new this.$.$mol_theme_demo_case();
			(obj.theme) = () => ("$mol_theme_current");
			return obj;
		}
		Special(){
			const obj = new this.$.$mol_theme_demo_case();
			(obj.theme) = () => ("$mol_theme_special");
			return obj;
		}
		Cases(){
			const obj = new this.$.$mol_theme_demo_case();
			(obj.title) = () => ("Current light");
			(obj.inner) = () => ([
				(this.Base()), 
				(this.Accent()), 
				(this.Current()), 
				(this.Special())
			]);
			return obj;
		}
		Scroll(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Cases())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_theme_demo.prototype), "hue"));
	($mol_mem(($.$mol_theme_demo.prototype), "Hue"));
	($mol_mem(($.$mol_theme_demo.prototype), "Hue_field"));
	($mol_mem(($.$mol_theme_demo.prototype), "hue_spread"));
	($mol_mem(($.$mol_theme_demo.prototype), "Hue_spread"));
	($mol_mem(($.$mol_theme_demo.prototype), "Hue_spread_field"));
	($mol_mem(($.$mol_theme_demo.prototype), "Config"));
	($mol_mem(($.$mol_theme_demo.prototype), "Base"));
	($mol_mem(($.$mol_theme_demo.prototype), "Accent"));
	($mol_mem(($.$mol_theme_demo.prototype), "Current"));
	($mol_mem(($.$mol_theme_demo.prototype), "Special"));
	($mol_mem(($.$mol_theme_demo.prototype), "Cases"));
	($mol_mem(($.$mol_theme_demo.prototype), "Scroll"));
	($.$mol_theme_demo_case) = class $mol_theme_demo_case extends ($.$mol_view) {
		title(){
			return (this.theme());
		}
		sub(){
			return [(this.Self()), ...(this.inner())];
		}
		inner(){
			return [];
		}
		theme(){
			return "";
		}
		Card2_text(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ((this.title()));
			return obj;
		}
		Card2(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this.Card2_text())]);
			return obj;
		}
		Card1_text(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ("\t$mol_theme.card");
			return obj;
		}
		Card1(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this.Card2()), (this.Card1_text())]);
			return obj;
		}
		Back(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ("$mol_theme.back");
			return obj;
		}
		Line(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ("$mol_theme.line");
			return obj;
		}
		Text(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ("$mol_theme.text");
			return obj;
		}
		Field(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ("$mol_theme.field");
			return obj;
		}
		Shade(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ("$mol_theme.shade");
			return obj;
		}
		Focus(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ("$mol_theme.focus");
			return obj;
		}
		Control(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ("$mol_theme.control");
			return obj;
		}
		Hover(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ("$mol_theme.hover");
			return obj;
		}
		Current(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ("$mol_theme.curent");
			return obj;
		}
		Special(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ("$mol_theme.special");
			return obj;
		}
		Self(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this.Card1()), 
				(this.Back()), 
				(this.Line()), 
				(this.Text()), 
				(this.Field()), 
				(this.Shade()), 
				(this.Focus()), 
				(this.Control()), 
				(this.Hover()), 
				(this.Current()), 
				(this.Special())
			]);
			return obj;
		}
	};
	($mol_mem(($.$mol_theme_demo_case.prototype), "Card2_text"));
	($mol_mem(($.$mol_theme_demo_case.prototype), "Card2"));
	($mol_mem(($.$mol_theme_demo_case.prototype), "Card1_text"));
	($mol_mem(($.$mol_theme_demo_case.prototype), "Card1"));
	($mol_mem(($.$mol_theme_demo_case.prototype), "Back"));
	($mol_mem(($.$mol_theme_demo_case.prototype), "Line"));
	($mol_mem(($.$mol_theme_demo_case.prototype), "Text"));
	($mol_mem(($.$mol_theme_demo_case.prototype), "Field"));
	($mol_mem(($.$mol_theme_demo_case.prototype), "Shade"));
	($mol_mem(($.$mol_theme_demo_case.prototype), "Focus"));
	($mol_mem(($.$mol_theme_demo_case.prototype), "Control"));
	($mol_mem(($.$mol_theme_demo_case.prototype), "Hover"));
	($mol_mem(($.$mol_theme_demo_case.prototype), "Current"));
	($mol_mem(($.$mol_theme_demo_case.prototype), "Special"));
	($mol_mem(($.$mol_theme_demo_case.prototype), "Self"));

//# sourceMappingURL=demo.view.tree.js.map