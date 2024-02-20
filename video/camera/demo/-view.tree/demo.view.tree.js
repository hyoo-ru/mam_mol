	($.$mol_video_camera_demo) = class $mol_video_camera_demo extends ($.$mol_example_large) {
		Player(){
			const obj = new this.$.$mol_video_camera();
			(obj.torch) = () => ((this.torch()));
			(obj.brightness) = () => ((this.brightness()));
			(obj.sharpness) = () => ((this.sharpness()));
			(obj.contrast) = () => ((this.contrast()));
			(obj.saturation) = () => ((this.saturation()));
			(obj.temperature) = () => ((this.temperature()));
			return obj;
		}
		View(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([(this.Player())]);
			return obj;
		}
		torch(next){
			if(next !== undefined) return next;
			return false;
		}
		Torch_icon(){
			const obj = new this.$.$mol_icon_flashlight();
			return obj;
		}
		Torch(){
			const obj = new this.$.$mol_check_icon();
			(obj.checked) = (next) => ((this.torch(next)));
			(obj.Icon) = () => ((this.Torch_icon()));
			return obj;
		}
		Torch_labeler(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Torch");
			(obj.content) = () => ([(this.Torch())]);
			return obj;
		}
		brightness(next){
			if(next !== undefined) return next;
			return 128;
		}
		Brightness(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.brightness(next)));
			(obj.precision_change) = () => (8);
			return obj;
		}
		Brightness_labeler(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Brightness");
			(obj.content) = () => ([(this.Brightness())]);
			return obj;
		}
		sharpness(next){
			if(next !== undefined) return next;
			return 3;
		}
		Sharpness(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.sharpness(next)));
			return obj;
		}
		Sharpness_labeler(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Sharpness");
			(obj.content) = () => ([(this.Sharpness())]);
			return obj;
		}
		contrast(next){
			if(next !== undefined) return next;
			return 32;
		}
		Contrast(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.contrast(next)));
			(obj.precision_change) = () => (4);
			return obj;
		}
		Contrast_labeler(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Contrast");
			(obj.content) = () => ([(this.Contrast())]);
			return obj;
		}
		saturation(next){
			if(next !== undefined) return next;
			return 64;
		}
		Saturation(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.saturation(next)));
			(obj.precision_change) = () => (8);
			return obj;
		}
		Saturation_labeler(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Saturation");
			(obj.content) = () => ([(this.Saturation())]);
			return obj;
		}
		temperature(next){
			if(next !== undefined) return next;
			return 4000;
		}
		Temperature(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.temperature(next)));
			(obj.precision_change) = () => (100);
			return obj;
		}
		Temperature_labeler(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Temperature");
			(obj.content) = () => ([(this.Temperature())]);
			return obj;
		}
		Controls(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ([
				(this.Torch_labeler()), 
				(this.Brightness_labeler()), 
				(this.Sharpness_labeler()), 
				(this.Contrast_labeler()), 
				(this.Saturation_labeler()), 
				(this.Temperature_labeler())
			]);
			return obj;
		}
		Scroll(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.View()), (this.Controls())]);
			return obj;
		}
		title(){
			return "Reactive video camera";
		}
		sub(){
			return [(this.Scroll())];
		}
		tags(){
			return ["capture"];
		}
		aspects(){
			return ["Media/Video"];
		}
	};
	($mol_mem(($.$mol_video_camera_demo.prototype), "Player"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "View"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "torch"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Torch_icon"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Torch"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Torch_labeler"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "brightness"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Brightness"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Brightness_labeler"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "sharpness"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Sharpness"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Sharpness_labeler"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "contrast"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Contrast"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Contrast_labeler"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "saturation"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Saturation"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Saturation_labeler"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "temperature"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Temperature"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Temperature_labeler"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Controls"));
	($mol_mem(($.$mol_video_camera_demo.prototype), "Scroll"));

//# sourceMappingURL=demo.view.tree.js.map