namespace $ {
	export class $mol_chat extends $mol_list {

		/**
		 * ```tree
		 * rows /
		 * 	<= posts
		 * 	<= Add_status
		 * 	<= Add
		 * ```
		 */
		rows() {
			return [
				this.posts(),
				this.Add_status(),
				this.Add()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Post!index $mol_message
		 * 	name <= post_user_name!index
		 * 	moment <= post_updated!index
		 * 	avatar_link <= post_user_link!index
		 * 	avatar <= post_user_ava!index
		 * 	text <= post_body!index
		 * ```
		 */
		@ $mol_mem_key
		Post(index: any) {
			const obj = new this.$.$mol_message()

			obj.name = () => this.post_user_name(index)
			obj.moment = () => this.post_updated(index)
			obj.avatar_link = () => this.post_user_link(index)
			obj.avatar = () => this.post_user_ava(index)
			obj.text = () => this.post_body(index)

			return obj
		}

		/**
		 * ```tree
		 * repository $mol_github_repository
		 * ```
		 */
		@ $mol_mem
		repository() {
			const obj = new this.$.$mol_github_repository()

			return obj
		}

		/**
		 * ```tree
		 * repository_name \
		 * ```
		 */
		repository_name() {
			return ""
		}

		/**
		 * ```tree
		 * link \
		 * ```
		 */
		link() {
			return ""
		}

		/**
		 * ```tree
		 * seed \
		 * ```
		 */
		seed() {
			return ""
		}

		/**
		 * ```tree
		 * teaser \
		 * ```
		 */
		teaser() {
			return ""
		}

		/**
		 * ```tree
		 * issue $mol_github_issue
		 * ```
		 */
		@ $mol_mem
		issue() {
			const obj = new this.$.$mol_github_issue()

			return obj
		}

		/**
		 * ```tree
		 * posts /
		 * ```
		 */
		posts() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * adding?next null
		 * ```
		 */
		@ $mol_mem
		adding(next?: any) {
			if ( next !== undefined ) return next
			return null as any
		}

		/**
		 * ```tree
		 * Add_status $mol_status status <= adding?next
		 * ```
		 */
		@ $mol_mem
		Add_status() {
			const obj = new this.$.$mol_status()

			obj.status = () => this.adding()

			return obj
		}

		/**
		 * ```tree
		 * add_hint @ \New message...
		 * ```
		 */
		add_hint() {
			return this.$.$mol_locale.text( '$mol_chat_add_hint' )
		}

		/**
		 * ```tree
		 * add_body?val \
		 * ```
		 */
		@ $mol_mem
		add_body(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * Add_body $mol_string
		 * 	hint <= add_hint
		 * 	value?val <=> add_body?val
		 * ```
		 */
		@ $mol_mem
		Add_body() {
			const obj = new this.$.$mol_string()

			obj.hint = () => this.add_hint()
			obj.value = (val?: any) => this.add_body(val)

			return obj
		}

		/**
		 * ```tree
		 * add_submit_enabled false
		 * ```
		 */
		add_submit_enabled() {
			return false
		}

		/**
		 * ```tree
		 * add_submit_label @ \Post
		 * ```
		 */
		add_submit_label() {
			return this.$.$mol_locale.text( '$mol_chat_add_submit_label' )
		}

		/**
		 * ```tree
		 * add?event null
		 * ```
		 */
		@ $mol_mem
		add(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * Add_submit $mol_button_major
		 * 	enabled <= add_submit_enabled
		 * 	title <= add_submit_label
		 * 	event_click?event <=> add?event
		 * ```
		 */
		@ $mol_mem
		Add_submit() {
			const obj = new this.$.$mol_button_major()

			obj.enabled = () => this.add_submit_enabled()
			obj.title = () => this.add_submit_label()
			obj.event_click = (event?: any) => this.add(event)

			return obj
		}

		/**
		 * ```tree
		 * Add $mol_bar sub /
		 * 	<= Add_body
		 * 	<= Add_submit
		 * ```
		 */
		@ $mol_mem
		Add() {
			const obj = new this.$.$mol_bar()

			obj.sub = () => [
				this.Add_body(),
				this.Add_submit()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * post_user_name!index \
		 * ```
		 */
		post_user_name(index: any) {
			return ""
		}

		/**
		 * ```tree
		 * post_updated!index $mol_time_moment
		 * ```
		 */
		@ $mol_mem_key
		post_updated(index: any) {
			const obj = new this.$.$mol_time_moment()

			return obj
		}

		/**
		 * ```tree
		 * post_user_link!index \
		 * ```
		 */
		post_user_link(index: any) {
			return ""
		}

		/**
		 * ```tree
		 * post_user_ava!index \
		 * ```
		 */
		post_user_ava(index: any) {
			return ""
		}

		/**
		 * ```tree
		 * post_body!index \
		 * ```
		 */
		post_body(index: any) {
			return ""
		}
	}

}
