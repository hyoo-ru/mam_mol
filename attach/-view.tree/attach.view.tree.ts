namespace $ {
	export class $mol_attach extends $mol_card {

		/**
		 * ```tree
		 * Content $mol_tiler items <= content
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_tiler()

			obj.items = () => this.content()

			return obj
		}

		/**
		 * ```tree
		 * items?val /$mol_view
		 * ```
		 */
		@ $mol_mem
		items(val?: any) {
			if ( val !== undefined ) return val
			return [

			] as readonly $mol_view[]
		}

		/**
		 * ```tree
		 * Add $mol_attach_add file_new?val <=> attach_new?val
		 * ```
		 */
		@ $mol_mem
		Add() {
			const obj = new this.$.$mol_attach_add()

			obj.file_new = (val?: any) => this.attach_new(val)

			return obj
		}

		/**
		 * ```tree
		 * Item!id $mol_attach_item title <= attach_title
		 * ```
		 */
		@ $mol_mem_key
		Item(id: any) {
			const obj = new this.$.$mol_attach_item()

			obj.title = () => this.attach_title()

			return obj
		}

		/**
		 * ```tree
		 * content /$mol_view
		 * ```
		 */
		content() {
			return [

			] as readonly $mol_view[]
		}

		/**
		 * ```tree
		 * attach_new?val \
		 * ```
		 */
		@ $mol_mem
		attach_new(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * attach_title \
		 * ```
		 */
		attach_title() {
			return ""
		}
	}

	export class $mol_attach_item extends $mol_link {

		/**
		 * ```tree
		 * url_thumb?val \
		 * ```
		 */
		@ $mol_mem
		url_thumb(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * uri?val <=> url_load?val
		 * ```
		 */
		uri(val?: any) {
			return this.url_load(val)
		}

		/**
		 * ```tree
		 * style *
		 * 	^
		 * 	backgroundImage <= style_bg
		 * ```
		 */
		style() {
			return {
				...super.style(),
				backgroundImage: this.style_bg()
			}
		}

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	download <= title
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				download: this.title()
			}
		}

		/**
		 * ```tree
		 * url_load?val \
		 * ```
		 */
		@ $mol_mem
		url_load(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * style_bg \
		 * ```
		 */
		style_bg() {
			return ""
		}

		/**
		 * ```tree
		 * title \
		 * ```
		 */
		title() {
			return ""
		}
	}

	export class $mol_attach_add extends $mol_button_minor {

		/**
		 * ```tree
		 * minimal_height 60
		 * ```
		 */
		minimal_height() {
			return 60
		}

		/**
		 * ```tree
		 * file_new?val \
		 * ```
		 */
		@ $mol_mem
		file_new(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Icon
		 * 	<= Input
		 * ```
		 */
		sub() {
			return [
				this.Icon(),
				this.Input()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Icon $mol_icon_attach
		 * ```
		 */
		@ $mol_mem
		Icon() {
			const obj = new this.$.$mol_icon_attach()

			return obj
		}

		/**
		 * ```tree
		 * event_capture?val null
		 * ```
		 */
		@ $mol_mem
		event_capture(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * event_picked?val null
		 * ```
		 */
		@ $mol_mem
		event_picked(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * Input $mol_attach_add_input
		 * 	event_capture?val <=> event_capture?val
		 * 	event_picked?val <=> event_picked?val
		 * ```
		 */
		@ $mol_mem
		Input() {
			const obj = new this.$.$mol_attach_add_input()

			obj.event_capture = (val?: any) => this.event_capture(val)
			obj.event_picked = (val?: any) => this.event_picked(val)

			return obj
		}
	}

	export class $mol_attach_add_input extends $mol_view {

		/**
		 * ```tree
		 * dom_name \input
		 * ```
		 */
		dom_name() {
			return "input"
		}

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	type <= type
		 * 	accept <= accept
		 * 	multiple <= multiple
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				type: this.type(),
				accept: this.accept(),
				multiple: this.multiple()
			}
		}

		/**
		 * ```tree
		 * event_click?val <=> event_capture?val
		 * ```
		 */
		event_click(val?: any) {
			return this.event_capture(val)
		}

		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	change?val <=> event_picked?val
		 * ```
		 */
		event() {
			return {
				...super.event(),
				change: (val?: any) => this.event_picked(val)
			}
		}

		/**
		 * ```tree
		 * type \file
		 * ```
		 */
		type() {
			return "file"
		}

		/**
		 * ```tree
		 * accept \image/*;capture=camera
		 * ```
		 */
		accept() {
			return "image/*;capture=camera"
		}

		/**
		 * ```tree
		 * multiple true
		 * ```
		 */
		multiple() {
			return true
		}

		/**
		 * ```tree
		 * event_capture?val null
		 * ```
		 */
		@ $mol_mem
		event_capture(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * event_picked?val null
		 * ```
		 */
		@ $mol_mem
		event_picked(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}
	}

}
