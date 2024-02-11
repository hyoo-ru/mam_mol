	($.$mol_paginator) = class $mol_paginator extends ($.$mol_bar) {
		sub(){
			return [
				(this.Backward()), 
				(this.Value()), 
				(this.Forward())
			];
		}
		backward_hint(){
			return (this.$.$mol_locale.text("$mol_paginator_backward_hint"));
		}
		backward(next){
			if(next !== undefined) return next;
			return null;
		}
		Backward_icon(){
			const obj = new this.$.$mol_icon_chevron_left();
			return obj;
		}
		Backward(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.backward_hint()));
			(obj.click) = (next) => ((this.backward(next)));
			(obj.sub) = () => ([(this.Backward_icon())]);
			return obj;
		}
		value(next){
			if(next !== undefined) return next;
			return 0;
		}
		Value(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.value())]);
			return obj;
		}
		forward_hint(){
			return (this.$.$mol_locale.text("$mol_paginator_forward_hint"));
		}
		forward(next){
			if(next !== undefined) return next;
			return null;
		}
		Forward_icon(){
			const obj = new this.$.$mol_icon_chevron_right();
			return obj;
		}
		Forward(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.forward_hint()));
			(obj.click) = (next) => ((this.forward(next)));
			(obj.sub) = () => ([(this.Forward_icon())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_paginator.prototype), "backward"));
	($mol_mem(($.$mol_paginator.prototype), "Backward_icon"));
	($mol_mem(($.$mol_paginator.prototype), "Backward"));
	($mol_mem(($.$mol_paginator.prototype), "value"));
	($mol_mem(($.$mol_paginator.prototype), "Value"));
	($mol_mem(($.$mol_paginator.prototype), "forward"));
	($mol_mem(($.$mol_paginator.prototype), "Forward_icon"));
	($mol_mem(($.$mol_paginator.prototype), "Forward"));

//# sourceMappingURL=paginator.view.tree.js.map