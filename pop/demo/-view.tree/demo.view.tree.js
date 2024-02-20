	($.$mol_pop_demo) = class $mol_pop_demo extends ($.$mol_example) {
		show_title(){
			return "Showed";
		}
		pop_showed_check_hint(){
			return "$mol_pop showed";
		}
		pop_showed(next){
			if(next !== undefined) return next;
			return true;
		}
		Show_check(){
			const obj = new this.$.$mol_check_box();
			(obj.hint) = () => ((this.pop_showed_check_hint()));
			(obj.checked) = (next) => ((this.pop_showed(next)));
			return obj;
		}
		Showed(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this.show_title()));
			(obj.content) = () => ([(this.Show_check())]);
			return obj;
		}
		align_title(){
			return "Align";
		}
		pop_align(next){
			if(next !== undefined) return next;
			return "bottom_right";
		}
		aligins(){
			return {
				"left_top": "left_top", 
				"left_center": "left_center", 
				"left_bottom": "left_bottom", 
				"right_top": "right_top", 
				"right_center": "right_center", 
				"right_bottom": "right_bottom", 
				"center": "center", 
				"top_left": "top_left", 
				"top_center": "top_center", 
				"top_right": "top_right", 
				"bottom_left": "bottom_left", 
				"bottom_center": "bottom_center", 
				"bottom_right": "bottom_right"
			};
		}
		Align_select(){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this.pop_align(next)));
			(obj.options) = () => ((this.aligins()));
			return obj;
		}
		Align(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ((this.align_title()));
			(obj.content) = () => ([(this.Align_select())]);
			return obj;
		}
		Manage(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this.Showed()), (this.Align())]);
			return obj;
		}
		anchor_button_icon(){
			const obj = new this.$.$mol_icon_anchor();
			return obj;
		}
		anchor_button_title(){
			return "Anchor";
		}
		Pop_anchor(){
			const obj = new this.$.$mol_button_major();
			(obj.sub) = () => ([(this.anchor_button_icon()), (this.anchor_button_title())]);
			return obj;
		}
		bubble_hint(){
			return "This is\nbubble_content";
		}
		Content(){
			const obj = new this.$.$mol_row();
			(obj.minimal_width) = () => (150);
			(obj.sub) = () => ([(this.bubble_hint())]);
			return obj;
		}
		Pop(){
			const obj = new this.$.$mol_pop();
			(obj.Anchor) = () => ((this.Pop_anchor()));
			(obj.showed) = () => ((this.pop_showed()));
			(obj.align) = () => ((this.pop_align()));
			(obj.bubble_content) = () => ([(this.Content())]);
			return obj;
		}
		Pop_area(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Pop())]);
			return obj;
		}
		title(){
			return "Pop up block with various alignment";
		}
		sub(){
			return [(this.Manage()), (this.Pop_area())];
		}
		tags(){
			return [
				"popup", 
				"menu", 
				"align", 
				"container", 
				"modal"
			];
		}
		aspects(){
			return ["Widget/Float"];
		}
	};
	($mol_mem(($.$mol_pop_demo.prototype), "pop_showed"));
	($mol_mem(($.$mol_pop_demo.prototype), "Show_check"));
	($mol_mem(($.$mol_pop_demo.prototype), "Showed"));
	($mol_mem(($.$mol_pop_demo.prototype), "pop_align"));
	($mol_mem(($.$mol_pop_demo.prototype), "Align_select"));
	($mol_mem(($.$mol_pop_demo.prototype), "Align"));
	($mol_mem(($.$mol_pop_demo.prototype), "Manage"));
	($mol_mem(($.$mol_pop_demo.prototype), "anchor_button_icon"));
	($mol_mem(($.$mol_pop_demo.prototype), "Pop_anchor"));
	($mol_mem(($.$mol_pop_demo.prototype), "Content"));
	($mol_mem(($.$mol_pop_demo.prototype), "Pop"));
	($mol_mem(($.$mol_pop_demo.prototype), "Pop_area"));

//# sourceMappingURL=demo.view.tree.js.map