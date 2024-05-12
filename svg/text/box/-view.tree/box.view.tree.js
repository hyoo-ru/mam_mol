	($.$mol_svg_text_box) = class $mol_svg_text_box extends ($.$mol_svg_group) {
		box_width(){
			return "0.5rem";
		}
		box_height(){
			return "1rem";
		}
		box_pos_x(){
			return (this?.pos_x());
		}
		box_pos_y(){
			return "0";
		}
		Back(){
			const obj = new this.$.$mol_svg_rect();
			(obj.width) = () => ((this?.box_width()));
			(obj.height) = () => ((this?.box_height()));
			(obj.pos) = () => ([(this?.box_pos_x()), (this?.box_pos_y())]);
			return obj;
		}
		pos_x(){
			return "0";
		}
		pos_y(){
			return "100%";
		}
		align(){
			return "start";
		}
		text(){
			return "";
		}
		Text(){
			const obj = new this.$.$mol_svg_text();
			(obj.pos) = () => ([(this?.pos_x()), (this?.pos_y())]);
			(obj.align) = () => ((this?.align()));
			(obj.sub) = () => ([(this?.text())]);
			return obj;
		}
		font_size(){
			return 16;
		}
		width(){
			return 0;
		}
		sub(){
			return [(this?.Back()), (this?.Text())];
		}
	};
	($mol_mem(($.$mol_svg_text_box.prototype), "Back"));
	($mol_mem(($.$mol_svg_text_box.prototype), "Text"));

//# sourceMappingURL=box.view.tree.js.map