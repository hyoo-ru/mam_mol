namespace $.$$ {

	export class $mol_app_questions extends $.$mol_app_questions {
		
		pages() {
			const question = this.question_cur_id()
			return [
				this.Menu() ,
				... question ? [ this.Details( question ) ] : [] ,
			]
		}
		
		Placeholder() {
			return this.question_cur_id() ? null : super.Placeholder()
		}
		
		menu_rows() {
			const res = [] as any
			const count = Math.min( 10000 , this.questions_count() )
			for( let i = 0 ; i < count ; ++i ) {
				res.push( this.Question_link( i ) )
			}
			return res
		}
		
		question_cur_id() {
			return Number( $mol_state_arg.value( 'question' ) )
		}
		
		question_tags_by_index( index : number ) {
			return this.question_short( index ).tags.map( ( name , i ) => this.Tag({ row : index , tag : i }) )
		}
		
		tag_name( id : { row : number , tag : string } ) {
			return this.question_short( id.row ).tags[ id.tag ]
		}
		
		question_title_by_index( index : number ) {
			return $mol_html_decode( this.question_short( index ).title )
		}
		
		question_arg_by_index( index : number ) {
			return {
				question : this.question_short( index ).question_id
			}
		}
		
		question_title( id : number ) {
			return $mol_html_decode( this.question_full( id ).title )
		}
		
		question_descr( id : number ) {
			return $mol_html_decode( this.question_full( id ).body_markdown )
		}
		
		question_permalink( id : number ) {
			return this.question_full( id ).link
		}
		
		question_short( index : number ) {
			let page_size = this.data_page_size()
			let page = Math.floor( index / page_size )
			return this.questions_data( page ).items[ index % page_size ]
		}
		
		questions_count() {
			let uri = `http://api.stackexchange.com/2.2/questions?site=stackoverflow&filter=total`
			return $mol_http.resource( uri ).json<{ total : number }>().total
		}
		
		questions_data( page : number ) {
			const uri = `http://api.stackexchange.com/2.2/questions?order=desc&sort=creation&site=stackoverflow&pagesize=${ this.data_page_size() }&page=${ page + 1 }`
			type Item = {
				title : string
				creation_date : number
				question_id : number
				tags : string[]
				owner : {
					display_name : string
				}
			}
			return $mol_http.resource( uri ).json<{ items : Item[] }>()
		}
		
		data_page_size() {
			return 100
		}
		
		question_full( id : number ) {
			const uri = `http://api.stackexchange.com/2.2/questions/${ id }?site=stackoverflow&filter=!9YdnSJ*_T`
			type Item = {
				title : string
				body_markdown : string
				link : string
			}
			return $mol_http.resource( uri ).json<{ items : Item[] }>().items[0]
		}
		
		question_answers( id : number ) {
			const uri = `http://api.stackexchange.com/2.2/questions/${ id }/answers?order=desc&sort=votes&site=stackoverflow&filter=!-*f(6sFKn6ub`
			type Item = {
				score : number
				body_markdown : string
				share_link : string
			}
			return $mol_http.resource( uri ).json<{ items : Item[] }>().items
		}
		
		answers( id : number ) {
			return this.question_answers( id ).map( ( answer , index )=> this.Answer({ question : id , answer : index }) )
		}
		
		question_answer( id : { question : number , answer : number } ) {
			return this.question_answers( id.question )[ id.answer ].body_markdown
		}
		
	}
	
}
