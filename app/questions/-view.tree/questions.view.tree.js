	($.$mol_app_questions) = class $mol_app_questions extends ($.$mol_book2) {
		Themme(){
			const obj = new this.$.$mol_theme_auto();
			return obj;
		}
		title_default(){
			return (this.$.$mol_locale.text("$mol_app_questions_title_default"));
		}
		Lights(){
			const obj = new this.$.$mol_lights_toggle();
			return obj;
		}
		Source_link(){
			const obj = new this.$.$mol_link_source();
			(obj.uri) = () => ("https://github.com/eigenmethod/mol/tree/master/app/questions");
			return obj;
		}
		menu_rows(){
			return [];
		}
		Menu_links(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.menu_rows()));
			return obj;
		}
		question_title(id){
			return "";
		}
		question_permalink(id){
			return "";
		}
		Details_permalink_icon(id){
			const obj = new this.$.$mol_icon_external();
			return obj;
		}
		Details_permalink(id){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ((this.question_permalink(id)));
			(obj.sub) = () => ([(this.Details_permalink_icon(id))]);
			return obj;
		}
		Details_close_icon(id){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		Details_close(id){
			const obj = new this.$.$mol_link();
			(obj.sub) = () => ([(this.Details_close_icon(id))]);
			(obj.arg) = () => ({"question": null});
			return obj;
		}
		question_descr(id){
			return "";
		}
		Details_descr(id){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.question_descr(id)));
			return obj;
		}
		answers(id){
			return [];
		}
		Answers(id){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.answers(id)));
			return obj;
		}
		question_answer(id){
			return "";
		}
		question_arg_by_index(id){
			return {};
		}
		question_title_by_index(id){
			return "";
		}
		Question_title(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.question_title_by_index(id))]);
			return obj;
		}
		question_tags_by_index(id){
			return [];
		}
		Question_tags(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.question_tags_by_index(id)));
			return obj;
		}
		tag_name(id){
			return " ";
		}
		plugins(){
			return [(this.Themme())];
		}
		Menu(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ((this.title_default()));
			(obj.tools) = () => ([(this.Lights()), (this.Source_link())]);
			(obj.body) = () => ([(this.Menu_links())]);
			return obj;
		}
		Details(id){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ((this.question_title(id)));
			(obj.tools) = () => ([(this.Details_permalink(id)), (this.Details_close(id))]);
			(obj.body) = () => ([(this.Details_descr(id)), (this.Answers(id))]);
			return obj;
		}
		Answer(id){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.question_answer(id)));
			return obj;
		}
		Question_link(id){
			const obj = new this.$.$mol_link();
			(obj.minimal_width) = () => (64);
			(obj.minimal_height) = () => (64);
			(obj.arg) = () => ((this.question_arg_by_index(id)));
			(obj.sub) = () => ([(this.Question_title(id)), (this.Question_tags(id))]);
			return obj;
		}
		Tag(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.tag_name(id))]);
			return obj;
		}
	};
	($mol_mem(($.$mol_app_questions.prototype), "Themme"));
	($mol_mem(($.$mol_app_questions.prototype), "Lights"));
	($mol_mem(($.$mol_app_questions.prototype), "Source_link"));
	($mol_mem(($.$mol_app_questions.prototype), "Menu_links"));
	($mol_mem_key(($.$mol_app_questions.prototype), "Details_permalink_icon"));
	($mol_mem_key(($.$mol_app_questions.prototype), "Details_permalink"));
	($mol_mem_key(($.$mol_app_questions.prototype), "Details_close_icon"));
	($mol_mem_key(($.$mol_app_questions.prototype), "Details_close"));
	($mol_mem_key(($.$mol_app_questions.prototype), "Details_descr"));
	($mol_mem_key(($.$mol_app_questions.prototype), "Answers"));
	($mol_mem_key(($.$mol_app_questions.prototype), "Question_title"));
	($mol_mem_key(($.$mol_app_questions.prototype), "Question_tags"));
	($mol_mem(($.$mol_app_questions.prototype), "Menu"));
	($mol_mem_key(($.$mol_app_questions.prototype), "Details"));
	($mol_mem_key(($.$mol_app_questions.prototype), "Answer"));
	($mol_mem_key(($.$mol_app_questions.prototype), "Question_link"));
	($mol_mem_key(($.$mol_app_questions.prototype), "Tag"));

//# sourceMappingURL=questions.view.tree.js.map