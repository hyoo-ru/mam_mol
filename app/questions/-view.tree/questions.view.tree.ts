namespace $ { export class $mol_app_questions extends $mol_book2 {

	/**
	 *  ```
	 *  plugins / <= Themme
	 *  ```
	 **/
	plugins() {
		return [this.Themme()] as readonly any[]
	}

	/**
	 *  ```
	 *  Themme $mol_theme_auto
	 *  ```
	 **/
	@ $mol_mem
	Themme() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_theme_auto(  ) )
	}

	/**
	 *  ```
	 *  Menu $mol_page
	 *  	title <= title_default
	 *  	minimal_width 400
	 *  	tools / <= Source_link
	 *  	body / <= Menu_links
	 *  ```
	 **/
	@ $mol_mem
	Menu() {
		return (( obj )=>{
			obj.title = () => this.title_default()
			obj.minimal_width = () => 400
			obj.tools = () => [this.Source_link()] as readonly any[]
			obj.body = () => [this.Menu_links()] as readonly any[]
			return obj
		})( new this.$.$mol_page(  ) )
	}

	/**
	 *  ```
	 *  title_default @ \Questions
	 *  ```
	 **/
	title_default() {
		return this.$.$mol_locale.text( "$mol_app_questions_title_default" )
	}

	/**
	 *  ```
	 *  Source_link $mol_link_source uri \https://github.com/eigenmethod/mol/tree/master/app/questions
	 *  ```
	 **/
	@ $mol_mem
	Source_link() {
		return (( obj )=>{
			obj.uri = () => "https://github.com/eigenmethod/mol/tree/master/app/questions"
			return obj
		})( new this.$.$mol_link_source(  ) )
	}

	/**
	 *  ```
	 *  Menu_links $mol_list rows <= menu_rows
	 *  ```
	 **/
	@ $mol_mem
	Menu_links() {
		return (( obj )=>{
			obj.rows = () => this.menu_rows()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  menu_rows /
	 *  ```
	 **/
	menu_rows() {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  Details!id $mol_page
	 *  	minimal_width 600
	 *  	title <= question_title!id
	 *  	tools /
	 *  		<= Details_permalink!id
	 *  		<= Details_close!id
	 *  	body /
	 *  		<= Details_descr!id
	 *  		<= Answers!id
	 *  ```
	 **/
	@ $mol_mem_key
	Details( id : any ) {
		return (( obj )=>{
			obj.minimal_width = () => 600
			obj.title = () => this.question_title(id)
			obj.tools = () => [this.Details_permalink(id) , this.Details_close(id)] as readonly any[]
			obj.body = () => [this.Details_descr(id) , this.Answers(id)] as readonly any[]
			return obj
		})( new this.$.$mol_page(  ) )
	}

	/**
	 *  ```
	 *  question_title!id \
	 *  ```
	 **/
	question_title( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Details_permalink!id $mol_link
	 *  	uri <= question_permalink!id
	 *  	sub / <= Details_permalink_icon!id
	 *  ```
	 **/
	@ $mol_mem_key
	Details_permalink( id : any ) {
		return (( obj )=>{
			obj.uri = () => this.question_permalink(id)
			obj.sub = () => [this.Details_permalink_icon(id)] as readonly any[]
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  question_permalink!id \
	 *  ```
	 **/
	question_permalink( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Details_permalink_icon!id $mol_icon_external
	 *  ```
	 **/
	@ $mol_mem_key
	Details_permalink_icon( id : any ) {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_external(  ) )
	}

	/**
	 *  ```
	 *  Details_close!id $mol_link
	 *  	sub / <= Details_close_icon!id
	 *  	arg * question null
	 *  ```
	 **/
	@ $mol_mem_key
	Details_close( id : any ) {
		return (( obj )=>{
			obj.sub = () => [this.Details_close_icon(id)] as readonly any[]
			obj.arg = () => ({
			"question" :  null as any ,
		})
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Details_close_icon!id $mol_icon_cross
	 *  ```
	 **/
	@ $mol_mem_key
	Details_close_icon( id : any ) {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_cross(  ) )
	}

	/**
	 *  ```
	 *  Details_descr!id $mol_text text <= question_descr!id
	 *  ```
	 **/
	@ $mol_mem_key
	Details_descr( id : any ) {
		return (( obj )=>{
			obj.text = () => this.question_descr(id)
			return obj
		})( new this.$.$mol_text(  ) )
	}

	/**
	 *  ```
	 *  question_descr!id \
	 *  ```
	 **/
	question_descr( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Answers!id $mol_list rows <= answers!id
	 *  ```
	 **/
	@ $mol_mem_key
	Answers( id : any ) {
		return (( obj )=>{
			obj.rows = () => this.answers(id)
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  answers!id /
	 *  ```
	 **/
	answers( id : any ) {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  Answer!id $mol_text text <= question_answer!id
	 *  ```
	 **/
	@ $mol_mem_key
	Answer( id : any ) {
		return (( obj )=>{
			obj.text = () => this.question_answer(id)
			return obj
		})( new this.$.$mol_text(  ) )
	}

	/**
	 *  ```
	 *  question_answer!id \
	 *  ```
	 **/
	question_answer( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Question_link!index $mol_link
	 *  	minimal_height 64
	 *  	arg <= question_arg_by_index!index
	 *  	sub /
	 *  		<= Question_title!index
	 *  		<= Question_tags!index
	 *  ```
	 **/
	@ $mol_mem_key
	Question_link( index : any ) {
		return (( obj )=>{
			obj.minimal_height = () => 64
			obj.arg = () => this.question_arg_by_index(index)
			obj.sub = () => [this.Question_title(index) , this.Question_tags(index)] as readonly any[]
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  question_arg_by_index!index *
	 *  ```
	 **/
	question_arg_by_index( index : any ) {
		return ({
		})
	}

	/**
	 *  ```
	 *  Question_title!index $mol_view sub / <= question_title_by_index!index
	 *  ```
	 **/
	@ $mol_mem_key
	Question_title( index : any ) {
		return (( obj )=>{
			obj.sub = () => [this.question_title_by_index(index)] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  question_title_by_index!index \
	 *  ```
	 **/
	question_title_by_index( index : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Question_tags!index $mol_view sub <= question_tags_by_index!index
	 *  ```
	 **/
	@ $mol_mem_key
	Question_tags( index : any ) {
		return (( obj )=>{
			obj.sub = () => this.question_tags_by_index(index)
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  question_tags_by_index!index /
	 *  ```
	 **/
	question_tags_by_index( index : any ) {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  Tag!id $mol_view sub / <= tag_name!id
	 *  ```
	 **/
	@ $mol_mem_key
	Tag( id : any ) {
		return (( obj )=>{
			obj.sub = () => [this.tag_name(id)] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  tag_name!id \
	 *  ```
	 **/
	tag_name( id : any ) {
		return " "
	}

} }
