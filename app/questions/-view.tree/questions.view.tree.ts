namespace $ {
	export class $mol_app_questions extends $mol_book2 {

		/**
		 * ```tree
		 * plugins / <= Themme $mol_theme_auto
		 * ```
		 */
		plugins() {
			return [
				this.Themme()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Themme $mol_theme_auto
		 * ```
		 */
		@ $mol_mem
		Themme() {
			const obj = new this.$.$mol_theme_auto()

			return obj
		}


		/**
		 * ```tree
		 * Menu $mol_page
		 * 	title <= title_default @ \Questions
		 * 	minimal_width 400
		 * 	tools / <= Source_link $mol_link_source uri \https://github.com/eigenmethod/mol/tree/master/app/questions
		 * 	body / <= Menu_links $mol_list rows <= menu_rows /
		 * ```
		 */
		@ $mol_mem
		Menu() {
			const obj = new this.$.$mol_page()

			obj.title = () => this.title_default()
			obj.minimal_width = () => 400
			obj.tools = () => [
				this.Source_link()
			] as readonly any[]
			obj.body = () => [
				this.Menu_links()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * title_default @ \Questions
		 * ```
		 */
		title_default() {
			return this.$.$mol_locale.text( '$mol_app_questions_title_default' )
		}

		/**
		 * ```tree
		 * Source_link $mol_link_source uri \https://github.com/eigenmethod/mol/tree/master/app/questions
		 * ```
		 */
		@ $mol_mem
		Source_link() {
			const obj = new this.$.$mol_link_source()

			obj.uri = () => "https://github.com/eigenmethod/mol/tree/master/app/questions"

			return obj
		}

		/**
		 * ```tree
		 * Menu_links $mol_list rows <= menu_rows /
		 * ```
		 */
		@ $mol_mem
		Menu_links() {
			const obj = new this.$.$mol_list()

			obj.rows = () => this.menu_rows()

			return obj
		}

		/**
		 * ```tree
		 * menu_rows /
		 * ```
		 */
		menu_rows() {
			return [

			] as readonly any[]
		}


		/**
		 * ```tree
		 * Details!id $mol_page
		 * 	minimal_width 600
		 * 	title <= question_title!id \
		 * 	tools /
		 * 		<= Details_permalink!id $mol_link
		 * 			uri <= question_permalink!id \
		 * 			sub / <= Details_permalink_icon!id $mol_icon_external
		 * 		<= Details_close!id $mol_link
		 * 			sub / <= Details_close_icon!id $mol_icon_cross
		 * 			arg * question null
		 * 	body /
		 * 		<= Details_descr!id $mol_text text <= question_descr!id \
		 * 		<= Answers!id $mol_list rows <= answers!id /
		 * ```
		 */
		@ $mol_mem_key
		Details(id: any) {
			const obj = new this.$.$mol_page()

			obj.minimal_width = () => 600
			obj.title = () => this.question_title(id)
			obj.tools = () => [
				this.Details_permalink(id),
				this.Details_close(id)
			] as readonly any[]
			obj.body = () => [
				this.Details_descr(id),
				this.Answers(id)
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * question_title!id \
		 * ```
		 */
		question_title(id: any) {
			return ""
		}

		/**
		 * ```tree
		 * Details_permalink!id $mol_link
		 * 	uri <= question_permalink!id \
		 * 	sub / <= Details_permalink_icon!id $mol_icon_external
		 * ```
		 */
		@ $mol_mem_key
		Details_permalink(id: any) {
			const obj = new this.$.$mol_link()

			obj.uri = () => this.question_permalink(id)
			obj.sub = () => [
				this.Details_permalink_icon(id)
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * question_permalink!id \
		 * ```
		 */
		question_permalink(id: any) {
			return ""
		}

		/**
		 * ```tree
		 * Details_permalink_icon!id $mol_icon_external
		 * ```
		 */
		@ $mol_mem_key
		Details_permalink_icon(id: any) {
			const obj = new this.$.$mol_icon_external()

			return obj
		}

		/**
		 * ```tree
		 * Details_close!id $mol_link
		 * 	sub / <= Details_close_icon!id $mol_icon_cross
		 * 	arg * question null
		 * ```
		 */
		@ $mol_mem_key
		Details_close(id: any) {
			const obj = new this.$.$mol_link()

			obj.sub = () => [
				this.Details_close_icon(id)
			] as readonly any[]
			obj.arg = () => ({
				question: null as any
			})

			return obj
		}

		/**
		 * ```tree
		 * Details_close_icon!id $mol_icon_cross
		 * ```
		 */
		@ $mol_mem_key
		Details_close_icon(id: any) {
			const obj = new this.$.$mol_icon_cross()

			return obj
		}

		/**
		 * ```tree
		 * Details_descr!id $mol_text text <= question_descr!id \
		 * ```
		 */
		@ $mol_mem_key
		Details_descr(id: any) {
			const obj = new this.$.$mol_text()

			obj.text = () => this.question_descr(id)

			return obj
		}

		/**
		 * ```tree
		 * question_descr!id \
		 * ```
		 */
		question_descr(id: any) {
			return ""
		}

		/**
		 * ```tree
		 * Answers!id $mol_list rows <= answers!id /
		 * ```
		 */
		@ $mol_mem_key
		Answers(id: any) {
			const obj = new this.$.$mol_list()

			obj.rows = () => this.answers(id)

			return obj
		}

		/**
		 * ```tree
		 * answers!id /
		 * ```
		 */
		answers(id: any) {
			return [

			] as readonly any[]
		}


		/**
		 * ```tree
		 * Answer!id $mol_text text <= question_answer!id \
		 * ```
		 */
		@ $mol_mem_key
		Answer(id: any) {
			const obj = new this.$.$mol_text()

			obj.text = () => this.question_answer(id)

			return obj
		}

		/**
		 * ```tree
		 * question_answer!id \
		 * ```
		 */
		question_answer(id: any) {
			return ""
		}


		/**
		 * ```tree
		 * Question_link!index $mol_link
		 * 	minimal_height 64
		 * 	arg <= question_arg_by_index!index *
		 * 	sub /
		 * 		<= Question_title!index $mol_view sub / <= question_title_by_index!index \
		 * 		<= Question_tags!index $mol_view sub <= question_tags_by_index!index /
		 * ```
		 */
		@ $mol_mem_key
		Question_link(index: any) {
			const obj = new this.$.$mol_link()

			obj.minimal_height = () => 64
			obj.arg = () => this.question_arg_by_index(index)
			obj.sub = () => [
				this.Question_title(index),
				this.Question_tags(index)
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * question_arg_by_index!index *
		 * ```
		 */
		question_arg_by_index(index: any) {
			return {

			}
		}

		/**
		 * ```tree
		 * Question_title!index $mol_view sub / <= question_title_by_index!index \
		 * ```
		 */
		@ $mol_mem_key
		Question_title(index: any) {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.question_title_by_index(index)
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * question_title_by_index!index \
		 * ```
		 */
		question_title_by_index(index: any) {
			return ""
		}

		/**
		 * ```tree
		 * Question_tags!index $mol_view sub <= question_tags_by_index!index /
		 * ```
		 */
		@ $mol_mem_key
		Question_tags(index: any) {
			const obj = new this.$.$mol_view()

			obj.sub = () => this.question_tags_by_index(index)

			return obj
		}

		/**
		 * ```tree
		 * question_tags_by_index!index /
		 * ```
		 */
		question_tags_by_index(index: any) {
			return [

			] as readonly any[]
		}


		/**
		 * ```tree
		 * Tag!id $mol_view sub / <= tag_name!id \
		 * ```
		 */
		@ $mol_mem_key
		Tag(id: any) {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.tag_name(id)
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * tag_name!id \
		 * ```
		 */
		tag_name(id: any) {
			return " "
		}
	}

}
