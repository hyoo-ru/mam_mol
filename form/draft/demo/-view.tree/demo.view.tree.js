	($.$mol_form_draft_demo_article) = class $mol_form_draft_demo_article extends ($.$mol_object2) {
		title(next){
			if(next !== undefined) return next;
			return "";
		}
		type(next){
			if(next !== undefined) return next;
			return "";
		}
		adult(next){
			if(next !== undefined) return next;
			return false;
		}
		content(next){
			if(next !== undefined) return next;
			return "";
		}
		friends(next){
			if(next !== undefined) return next;
			return [];
		}
		hobbies(next){
			if(next !== undefined) return next;
			return {};
		}
	};
	($mol_mem(($.$mol_form_draft_demo_article.prototype), "title"));
	($mol_mem(($.$mol_form_draft_demo_article.prototype), "type"));
	($mol_mem(($.$mol_form_draft_demo_article.prototype), "adult"));
	($mol_mem(($.$mol_form_draft_demo_article.prototype), "content"));
	($mol_mem(($.$mol_form_draft_demo_article.prototype), "friends"));
	($mol_mem(($.$mol_form_draft_demo_article.prototype), "hobbies"));
	($.$mol_form_draft_demo) = class $mol_form_draft_demo extends ($.$mol_example) {
		model(){
			const obj = new this.$.$mol_form_draft_demo_article();
			return obj;
		}
		publish(next){
			return (this.Form().submit(next));
		}
		publish_allowed(){
			return (this.Form().submit_allowed());
		}
		value_str(id, next){
			return (this.Form().value_str(id, next));
		}
		list_string(id, next){
			return (this.Form().list_string(id, next));
		}
		dictionary_bool(id, next){
			return (this.Form().dictionary_bool(id, next));
		}
		changed(){
			return (this.Form().changed());
		}
		reset(next){
			return (this.Form().reset(next));
		}
		Title(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("How I spent the summer..");
			(obj.value) = (next) => ((this.value_str("title", next)));
			return obj;
		}
		Title_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Title");
			(obj.bids) = () => ([(this.bid_swearing("title")), (this.bid_short("title"))]);
			(obj.Content) = () => ((this.Title()));
			return obj;
		}
		Type(){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this.value_str("type", next)));
			(obj.options) = () => ({
				"article": "Article", 
				"news": "News", 
				"question": "Question"
			});
			return obj;
		}
		Type_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Type");
			(obj.bids) = () => ([(this.bid_required("type"))]);
			(obj.Content) = () => ((this.Type()));
			return obj;
		}
		Adult(){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this.value_str("adult", next)));
			(obj.options) = () => ({"false": "No", "true": "Yes"});
			return obj;
		}
		Adult_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Adult only");
			(obj.Content) = () => ((this.Adult()));
			return obj;
		}
		Content(){
			const obj = new this.$.$mol_textarea();
			(obj.hint) = () => ("Long long story..");
			(obj.value) = (next) => ((this.value_str("content", next)));
			return obj;
		}
		Content_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Content");
			(obj.bids) = () => ([(this.bid_swearing("content")), (this.bid_long("content"))]);
			(obj.Content) = () => ((this.Content()));
			return obj;
		}
		Hobbies(){
			const obj = new this.$.$mol_check_list();
			(obj.dictionary) = (next) => ((this.dictionary_bool("hobbies", next)));
			(obj.options) = () => ({
				"programming": "Programming", 
				"bikinkg": "Biking", 
				"fishing": "Fishing"
			});
			return obj;
		}
		Hobbies_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Hobbies");
			(obj.Content) = () => ((this.Hobbies()));
			return obj;
		}
		Friends(){
			const obj = new this.$.$mol_select_list();
			(obj.dictionary) = () => ({
				"jocker": "Jocker", 
				"harley": "Harley Quinn", 
				"penguin": "Penguin", 
				"riddler": "Riddler", 
				"bane": "Bane", 
				"freeze": "Mister Freeze", 
				"clay": "Clayface", 
				"mask": "Black Mask"
			});
			(obj.value) = (next) => ((this.list_string("friends", next)));
			return obj;
		}
		Friends_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Friends");
			(obj.Content) = () => ((this.Friends()));
			return obj;
		}
		Config(){
			const obj = new this.$.$mol_form_group();
			(obj.sub) = () => ([(this.Adult_field()), (this.Type_field())]);
			return obj;
		}
		form_body(){
			return [
				(this.Title_field()), 
				(this.Config()), 
				(this.Content_field()), 
				(this.Friends_field())
			];
		}
		Form(){
			const obj = new this.$.$mol_form_draft();
			(obj.model) = () => ((this.model()));
			(obj.form_fields) = () => ([
				(this.Title_field()), 
				(this.Type_field()), 
				(this.Adult_field()), 
				(this.Content_field()), 
				(this.Hobbies_field()), 
				(this.Friends_field())
			]);
			(obj.body) = () => ((this.form_body()));
			return obj;
		}
		title(){
			return "Article draft form demo";
		}
		bid_required(id){
			return "Required";
		}
		bid_swearing(id){
			return "No swearing";
		}
		bid_short(id){
			return "> 5 letters";
		}
		bid_long(id){
			return "> 100 letters";
		}
		sub(){
			return [(this.Form())];
		}
		tags(){
			return [
				"$mol_form_field", 
				"$mol_button", 
				"$mol_string", 
				"$mol_switch", 
				"form", 
				"bids", 
				"validation", 
				"field"
			];
		}
		aspects(){
			return ["Widget/Form"];
		}
	};
	($mol_mem(($.$mol_form_draft_demo.prototype), "model"));
	($mol_mem(($.$mol_form_draft_demo.prototype), "Title"));
	($mol_mem(($.$mol_form_draft_demo.prototype), "Title_field"));
	($mol_mem(($.$mol_form_draft_demo.prototype), "Type"));
	($mol_mem(($.$mol_form_draft_demo.prototype), "Type_field"));
	($mol_mem(($.$mol_form_draft_demo.prototype), "Adult"));
	($mol_mem(($.$mol_form_draft_demo.prototype), "Adult_field"));
	($mol_mem(($.$mol_form_draft_demo.prototype), "Content"));
	($mol_mem(($.$mol_form_draft_demo.prototype), "Content_field"));
	($mol_mem(($.$mol_form_draft_demo.prototype), "Hobbies"));
	($mol_mem(($.$mol_form_draft_demo.prototype), "Hobbies_field"));
	($mol_mem(($.$mol_form_draft_demo.prototype), "Friends"));
	($mol_mem(($.$mol_form_draft_demo.prototype), "Friends_field"));
	($mol_mem(($.$mol_form_draft_demo.prototype), "Config"));
	($mol_mem(($.$mol_form_draft_demo.prototype), "Form"));

//# sourceMappingURL=demo.view.tree.js.map