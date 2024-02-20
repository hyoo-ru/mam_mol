	($.$mol_html_view) = class $mol_html_view extends ($.$mol_list) {
		heading_level(id){
			return 1;
		}
		content(id){
			return [];
		}
		link_uri(id){
			return "";
		}
		image_uri(id){
			return "";
		}
		highlight(){
			return "";
		}
		text(id){
			return "";
		}
		html(){
			return "";
		}
		dom(){
			return null;
		}
		safe_link(id){
			return "";
		}
		xss_uri(){
			return "https://en.wikipedia.org/wiki/XSS#";
		}
		Heading(id){
			const obj = new this.$.$mol_html_view_heading();
			(obj.level) = () => ((this.heading_level(id)));
			(obj.sub) = () => ((this.content(id)));
			return obj;
		}
		Paragraph(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ((this.content(id)));
			return obj;
		}
		List(id){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.content(id)));
			return obj;
		}
		Quote(id){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.content(id)));
			return obj;
		}
		Strong(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ((this.content(id)));
			return obj;
		}
		Emphasis(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ((this.content(id)));
			return obj;
		}
		Deleted(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ((this.content(id)));
			return obj;
		}
		Inserted(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ((this.content(id)));
			return obj;
		}
		Code(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ((this.content(id)));
			return obj;
		}
		Link(id){
			const obj = new this.$.$mol_link_iconed();
			(obj.uri) = () => ((this.link_uri(id)));
			(obj.content) = () => ((this.content(id)));
			return obj;
		}
		Image(id){
			const obj = new this.$.$mol_image();
			(obj.uri) = () => ((this.image_uri(id)));
			return obj;
		}
		Break(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([]);
			return obj;
		}
		Text(id){
			const obj = new this.$.$mol_dimmer();
			(obj.needle) = () => ((this.highlight()));
			(obj.haystack) = () => ((this.text(id)));
			return obj;
		}
	};
	($mol_mem_key(($.$mol_html_view.prototype), "Heading"));
	($mol_mem_key(($.$mol_html_view.prototype), "Paragraph"));
	($mol_mem_key(($.$mol_html_view.prototype), "List"));
	($mol_mem_key(($.$mol_html_view.prototype), "Quote"));
	($mol_mem_key(($.$mol_html_view.prototype), "Strong"));
	($mol_mem_key(($.$mol_html_view.prototype), "Emphasis"));
	($mol_mem_key(($.$mol_html_view.prototype), "Deleted"));
	($mol_mem_key(($.$mol_html_view.prototype), "Inserted"));
	($mol_mem_key(($.$mol_html_view.prototype), "Code"));
	($mol_mem_key(($.$mol_html_view.prototype), "Link"));
	($mol_mem_key(($.$mol_html_view.prototype), "Image"));
	($mol_mem_key(($.$mol_html_view.prototype), "Break"));
	($mol_mem_key(($.$mol_html_view.prototype), "Text"));
	($.$mol_html_view_heading) = class $mol_html_view_heading extends ($.$mol_paragraph) {
		level(){
			return 1;
		}
		attr(){
			return {...(super.attr()), "mol_html_view_heading": (this.level())};
		}
	};

//# sourceMappingURL=view.view.tree.js.map