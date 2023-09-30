namespace $.$$ {
	
	export class $mol_form_draft_demo extends $.$mol_form_draft_demo {
		
		@ $mol_mem
		form_body() {
			return [
				this.Title_field(),
				this.Config(),
				this.Hobbies_field(),
				... this.value_str( 'type' ) ? [ this.Content_field() ] : [],
				this.Friends_field(),
			]
		}
		
		@ $mol_mem_key
		bid_required( field: string ) {
			return this.value_str( field ) ? '' : super.bid_required( field )
		}
		
		@ $mol_mem_key
		bid_short( field: string ) {
			return this.value_str( field ).length > 5 ? '' : super.bid_short( field )
		}
		
		@ $mol_mem_key
		bid_long( field: string ) {
			return this.value_str( field ).length > 100 ? '' : super.bid_long( field )
		}
		
		@ $mol_mem_key
		bid_swearing( field: string ) {
			return /\bfuck/.test( this.value_str( field ) ) ?  super.bid_swearing( field ) : ''
		}
		
		@ $mol_mem
		result( next = '' ) {
			this.changed()
			return next
		}
		
		@ $mol_action
		publish() {
			super.publish()
			this.result( this.message_done() )
		}

		@ $mol_mem
		override friends_suggestions() {
			this.$.$mol_wait_timeout(500)
			this.friends_filter_pattern()
			return super.friends_suggestions()
		}

		override friends_option_title(id: string) {
			if (! id) return ''
			return this.friends_suggestions()[id]
		}
		
	}
}
