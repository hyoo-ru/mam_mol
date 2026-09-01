	($.$mol_canvas) = class $mol_canvas extends ($.$mol_view) {
		width(){
			return 0;
		}
		height(){
			return 0;
		}
		dom_name(){
			return "canvas";
		}
		context(){
			const obj = new this.$.CanvasRenderingContext2D();
			return obj;
		}
		field(){
			return {
				...(super.field()), 
				"width": (this.width()), 
				"height": (this.height())
			};
		}
		paint(){
			return null;
		}
	};
	($mol_mem(($.$mol_canvas.prototype), "context"));

//# sourceMappingURL=canvas.view.tree.js.map