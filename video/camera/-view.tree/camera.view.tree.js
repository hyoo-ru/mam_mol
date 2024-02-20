	($.$mol_video_camera) = class $mol_video_camera extends ($.$mol_video_player) {
		transform(){
			return "";
		}
		facing(){
			return "user";
		}
		aspect(){
			return 1;
		}
		size(){
			return 720;
		}
		width(){
			return (this.size());
		}
		height(){
			return (this.size());
		}
		brightness(){
			return 128;
		}
		sharpness(){
			return 2;
		}
		contrast(){
			return 32;
		}
		saturation(){
			return 64;
		}
		temperature(){
			return 4000;
		}
		torch(){
			return false;
		}
		controls(){
			return false;
		}
		style(){
			return {"transform": (this.transform())};
		}
		video_constraints(){
			return {
				"facingMode": (this.facing()), 
				"aspectRatio": (this.aspect()), 
				"width": {"ideal": (this.width())}, 
				"height": {"ideal": (this.height())}
			};
		}
		video_settings(){
			return {
				"brightness": (this.brightness()), 
				"sharpness": (this.sharpness()), 
				"contrast": (this.contrast()), 
				"saturation": (this.saturation()), 
				"advanced": [{"colorTemperature": (this.temperature())}, {"torch": (this.torch())}]
			};
		}
	};

//# sourceMappingURL=camera.view.tree.js.map