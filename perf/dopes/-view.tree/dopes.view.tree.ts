namespace $ {
	export class $mol_perf_dopes extends $mol_view {

		/**
		 * ```tree
		 * title \Dopes
		 * ```
		 */
		title() {
			return "Dopes"
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Speed $mol_view sub / <= speed \{speed} Dopes/s
		 * 	<= Start $mol_button_major
		 * 		title \@ Start
		 * 		click?event <=> start?event null
		 * 	<= Stop $mol_button_major
		 * 		title \@ Stop
		 * 		click?event <=> stop?event null
		 * 	<= Labels $mol_view sub <= labels /
		 * ```
		 */
		sub() {
			return [
				this.Speed(),
				this.Start(),
				this.Stop(),
				this.Labels()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Speed $mol_view sub / <= speed \{speed} Dopes/s
		 * ```
		 */
		@ $mol_mem
		Speed() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.speed()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * speed \{speed} Dopes/s
		 * ```
		 */
		speed() {
			return "{speed} Dopes/s"
		}

		/**
		 * ```tree
		 * Start $mol_button_major
		 * 	title \@ Start
		 * 	click?event <=> start?event null
		 * ```
		 */
		@ $mol_mem
		Start() {
			const obj = new this.$.$mol_button_major()

			obj.title = () => "@ Start"
			obj.click = (event?: any) => this.start(event)

			return obj
		}

		/**
		 * ```tree
		 * start?event null
		 * ```
		 */
		@ $mol_mem
		start(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * Stop $mol_button_major
		 * 	title \@ Stop
		 * 	click?event <=> stop?event null
		 * ```
		 */
		@ $mol_mem
		Stop() {
			const obj = new this.$.$mol_button_major()

			obj.title = () => "@ Stop"
			obj.click = (event?: any) => this.stop(event)

			return obj
		}

		/**
		 * ```tree
		 * stop?event null
		 * ```
		 */
		@ $mol_mem
		stop(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * Labels $mol_view sub <= labels /
		 * ```
		 */
		@ $mol_mem
		Labels() {
			const obj = new this.$.$mol_view()

			obj.sub = () => this.labels()

			return obj
		}

		/**
		 * ```tree
		 * labels /
		 * ```
		 */
		labels() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * Label!index $mol_view
		 * 	style *
		 * 		color <= label_color!index \
		 * 		transform <= label_transform!index \
		 * 	sub / \Dope
		 * ```
		 */
		@ $mol_mem_key
		Label(index: any) {
			const obj = new this.$.$mol_view()

			obj.style = () => ({
				color: this.label_color(index),
				transform: this.label_transform(index)
			})
			obj.sub = () => [
				"Dope"
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * label_color!index \
		 * ```
		 */
		label_color(index: any) {
			return ""
		}

		/**
		 * ```tree
		 * label_transform!index \
		 * ```
		 */
		label_transform(index: any) {
			return ""
		}
	}

}
