namespace $ {
	export class $mol_row_demo_form extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Some controls in one row with equal paddings and wrapping support
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_row_demo_form_title' )
		}

		/**
		 * ```tree
		 * sub / <= Row
		 * ```
		 */
		sub() {
			return [
				this.Row()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * name_hint @ \Jack Sparrow
		 * ```
		 */
		name_hint() {
			return this.$.$mol_locale.text( '$mol_row_demo_form_name_hint' )
		}

		/**
		 * ```tree
		 * name?val \
		 * ```
		 */
		@ $mol_mem
		name(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * suggest1 @ \Jack Sparrow
		 * ```
		 */
		suggest1() {
			return this.$.$mol_locale.text( '$mol_row_demo_form_suggest1' )
		}

		/**
		 * ```tree
		 * suggest2 @ \Bruce Wayne
		 * ```
		 */
		suggest2() {
			return this.$.$mol_locale.text( '$mol_row_demo_form_suggest2' )
		}

		/**
		 * ```tree
		 * Name $mol_search
		 * 	hint <= name_hint
		 * 	query?val <=> name?val
		 * 	suggests /
		 * 		<= suggest1
		 * 		<= suggest2
		 * ```
		 */
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_search()

			obj.hint = () => this.name_hint()
			obj.query = (val?: any) => this.name(val)
			obj.suggests = () => [
				this.suggest1(),
				this.suggest2()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * count_hint @ \Count
		 * ```
		 */
		count_hint() {
			return this.$.$mol_locale.text( '$mol_row_demo_form_count_hint' )
		}

		/**
		 * ```tree
		 * count?val null
		 * ```
		 */
		@ $mol_mem
		count(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * Count $mol_number
		 * 	hint <= count_hint
		 * 	value?val <=> count?val
		 * ```
		 */
		@ $mol_mem
		Count() {
			const obj = new this.$.$mol_number()

			obj.hint = () => this.count_hint()
			obj.value = (val?: any) => this.count(val)

			return obj
		}

		/**
		 * ```tree
		 * progress 0.33
		 * ```
		 */
		progress() {
			return 0.33
		}

		/**
		 * ```tree
		 * Progress $mol_portion portion <= progress
		 * ```
		 */
		@ $mol_mem
		Progress() {
			const obj = new this.$.$mol_portion()

			obj.portion = () => this.progress()

			return obj
		}

		/**
		 * ```tree
		 * publish_label @ \Shared
		 * ```
		 */
		publish_label() {
			return this.$.$mol_locale.text( '$mol_row_demo_form_publish_label' )
		}

		/**
		 * ```tree
		 * publish?val false
		 * ```
		 */
		@ $mol_mem
		publish(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * Publish $mol_check_box
		 * 	title <= publish_label
		 * 	checked?val <=> publish?val
		 * ```
		 */
		@ $mol_mem
		Publish() {
			const obj = new this.$.$mol_check_box()

			obj.title = () => this.publish_label()
			obj.checked = (val?: any) => this.publish(val)

			return obj
		}

		/**
		 * ```tree
		 * drop_title @ \Drop
		 * ```
		 */
		drop_title() {
			return this.$.$mol_locale.text( '$mol_row_demo_form_drop_title' )
		}

		/**
		 * ```tree
		 * Drop $mol_button_minor title <= drop_title
		 * ```
		 */
		@ $mol_mem
		Drop() {
			const obj = new this.$.$mol_button_minor()

			obj.title = () => this.drop_title()

			return obj
		}

		/**
		 * ```tree
		 * Row $mol_row sub /
		 * 	<= Name
		 * 	<= Count
		 * 	<= Progress
		 * 	<= Publish
		 * 	<= Drop
		 * ```
		 */
		@ $mol_mem
		Row() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.Name(),
				this.Count(),
				this.Progress(),
				this.Publish(),
				this.Drop()
			] as readonly any[]

			return obj
		}
	}

}
