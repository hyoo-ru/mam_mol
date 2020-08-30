namespace $ {
	export class $mol_plot_pane extends $mol_svg_root {

		/**
		 * ```tree
		 * aspect \none
		 * ```
		 */
		aspect() {
			return "none"
		}


		/**
		 * ```tree
		 * hue_base?val NaN
		 * ```
		 */
		@ $mol_mem
		hue_base(val?: any) {
			if ( val !== undefined ) return val
			return NaN
		}

		/**
		 * ```tree
		 * hue_shift?val 111
		 * ```
		 */
		@ $mol_mem
		hue_shift(val?: any) {
			if ( val !== undefined ) return val
			return 111
		}


		/**
		 * ```tree
		 * gap_hor 48
		 * ```
		 */
		gap_hor() {
			return 48
		}

		/**
		 * ```tree
		 * gap_vert 24
		 * ```
		 */
		gap_vert() {
			return 24
		}

		/**
		 * ```tree
		 * gap_left <= gap_hor
		 * ```
		 */
		gap_left() {
			return this.gap_hor()
		}

		/**
		 * ```tree
		 * gap_right <= gap_hor
		 * ```
		 */
		gap_right() {
			return this.gap_hor()
		}

		/**
		 * ```tree
		 * gap_top <= gap_vert
		 * ```
		 */
		gap_top() {
			return this.gap_vert()
		}

		/**
		 * ```tree
		 * gap_bottom <= gap_vert
		 * ```
		 */
		gap_bottom() {
			return this.gap_vert()
		}

		/**
		 * ```tree
		 * gap $mol_vector_2d /
		 * 	<= gap_x $mol_vector_range /
		 * 		<= gap_left
		 * 		<= gap_right
		 * 	<= gap_y $mol_vector_range /
		 * 		<= gap_bottom
		 * 		<= gap_top
		 * ```
		 */
		@ $mol_mem
		gap() {
			const obj = new this.$.$mol_vector_2d(
				this.gap_x(),
				this.gap_y()
			)

			return obj
		}

		/**
		 * ```tree
		 * gap_x $mol_vector_range /
		 * 	<= gap_left
		 * 	<= gap_right
		 * ```
		 */
		@ $mol_mem
		gap_x() {
			const obj = new this.$.$mol_vector_range(
				this.gap_left(),
				this.gap_right()
			)

			return obj
		}

		/**
		 * ```tree
		 * gap_y $mol_vector_range /
		 * 	<= gap_bottom
		 * 	<= gap_top
		 * ```
		 */
		@ $mol_mem
		gap_y() {
			const obj = new this.$.$mol_vector_range(
				this.gap_bottom(),
				this.gap_top()
			)

			return obj
		}


		/**
		 * ```tree
		 * shift_limit $mol_vector_2d /
		 * 	<= shift_limit_x $mol_vector_range /
		 * 		0
		 * 		0
		 * 	<= shift_limit_y $mol_vector_range /
		 * 		0
		 * 		0
		 * ```
		 */
		@ $mol_mem
		shift_limit() {
			const obj = new this.$.$mol_vector_2d(
				this.shift_limit_x(),
				this.shift_limit_y()
			)

			return obj
		}

		/**
		 * ```tree
		 * shift_limit_x $mol_vector_range /
		 * 	0
		 * 	0
		 * ```
		 */
		@ $mol_mem
		shift_limit_x() {
			const obj = new this.$.$mol_vector_range(
				0,
				0
			)

			return obj
		}

		/**
		 * ```tree
		 * shift_limit_y $mol_vector_range /
		 * 	0
		 * 	0
		 * ```
		 */
		@ $mol_mem
		shift_limit_y() {
			const obj = new this.$.$mol_vector_range(
				0,
				0
			)

			return obj
		}

		/**
		 * ```tree
		 * shift_default /number
		 * 	0
		 * 	0
		 * ```
		 */
		shift_default() {
			return [
				0,
				0
			] as readonly number[]
		}

		/**
		 * ```tree
		 * shift?val /number
		 * 	0
		 * 	0
		 * ```
		 */
		@ $mol_mem
		shift(val?: any) {
			if ( val !== undefined ) return val
			return [
				0,
				0
			] as readonly number[]
		}

		/**
		 * ```tree
		 * scale_limit $mol_vector_2d /
		 * 	<= scale_limit_x $mol_vector_range /
		 * 		0
		 * 		Infinity
		 * 	<= scale_limit_y $mol_vector_range /
		 * 		0
		 * 		Infinity
		 * ```
		 */
		@ $mol_mem
		scale_limit() {
			const obj = new this.$.$mol_vector_2d(
				this.scale_limit_x(),
				this.scale_limit_y()
			)

			return obj
		}

		/**
		 * ```tree
		 * scale_limit_x $mol_vector_range /
		 * 	0
		 * 	Infinity
		 * ```
		 */
		@ $mol_mem
		scale_limit_x() {
			const obj = new this.$.$mol_vector_range(
				0,
				Infinity
			)

			return obj
		}

		/**
		 * ```tree
		 * scale_limit_y $mol_vector_range /
		 * 	0
		 * 	Infinity
		 * ```
		 */
		@ $mol_mem
		scale_limit_y() {
			const obj = new this.$.$mol_vector_range(
				0,
				Infinity
			)

			return obj
		}

		/**
		 * ```tree
		 * scale_default /number
		 * 	0
		 * 	0
		 * ```
		 */
		scale_default() {
			return [
				0,
				0
			] as readonly number[]
		}

		/**
		 * ```tree
		 * scale?val /number
		 * 	1
		 * 	1
		 * ```
		 */
		@ $mol_mem
		scale(val?: any) {
			if ( val !== undefined ) return val
			return [
				1,
				1
			] as readonly number[]
		}

		/**
		 * ```tree
		 * scale_x?val 0
		 * ```
		 */
		@ $mol_mem
		scale_x(val?: any) {
			if ( val !== undefined ) return val
			return 0
		}

		/**
		 * ```tree
		 * scale_y?val 0
		 * ```
		 */
		@ $mol_mem
		scale_y(val?: any) {
			if ( val !== undefined ) return val
			return 0
		}

		/**
		 * ```tree
		 * size $mol_vector_2d /
		 * 	0
		 * 	0
		 * ```
		 */
		@ $mol_mem
		size() {
			const obj = new this.$.$mol_vector_2d(
				0,
				0
			)

			return obj
		}

		/**
		 * ```tree
		 * size_real $mol_vector_2d /
		 * 	1
		 * 	1
		 * ```
		 */
		@ $mol_mem
		size_real() {
			const obj = new this.$.$mol_vector_2d(
				1,
				1
			)

			return obj
		}

		/**
		 * ```tree
		 * dimensions_viewport $mol_vector_2d /
		 * 	<= dimensions_viewport_x $mol_vector_range /
		 * 		Infinity
		 * 		-Infinity
		 * 	<= dimensions_viewport_y $mol_vector_range /
		 * 		Infinity
		 * 		-Infinity
		 * ```
		 */
		@ $mol_mem
		dimensions_viewport() {
			const obj = new this.$.$mol_vector_2d(
				this.dimensions_viewport_x(),
				this.dimensions_viewport_y()
			)

			return obj
		}

		/**
		 * ```tree
		 * dimensions_viewport_x $mol_vector_range /
		 * 	Infinity
		 * 	-Infinity
		 * ```
		 */
		@ $mol_mem
		dimensions_viewport_x() {
			const obj = new this.$.$mol_vector_range(
				Infinity,
				-Infinity
			)

			return obj
		}

		/**
		 * ```tree
		 * dimensions_viewport_y $mol_vector_range /
		 * 	Infinity
		 * 	-Infinity
		 * ```
		 */
		@ $mol_mem
		dimensions_viewport_y() {
			const obj = new this.$.$mol_vector_range(
				Infinity,
				-Infinity
			)

			return obj
		}

		/**
		 * ```tree
		 * dimensions $mol_vector_2d /
		 * 	<= dimensions_x $mol_vector_range /
		 * 		Infinity
		 * 		-Infinity
		 * 	<= dimensions_y $mol_vector_range /
		 * 		Infinity
		 * 		-Infinity
		 * ```
		 */
		@ $mol_mem
		dimensions() {
			const obj = new this.$.$mol_vector_2d(
				this.dimensions_x(),
				this.dimensions_y()
			)

			return obj
		}

		/**
		 * ```tree
		 * dimensions_x $mol_vector_range /
		 * 	Infinity
		 * 	-Infinity
		 * ```
		 */
		@ $mol_mem
		dimensions_x() {
			const obj = new this.$.$mol_vector_range(
				Infinity,
				-Infinity
			)

			return obj
		}

		/**
		 * ```tree
		 * dimensions_y $mol_vector_range /
		 * 	Infinity
		 * 	-Infinity
		 * ```
		 */
		@ $mol_mem
		dimensions_y() {
			const obj = new this.$.$mol_vector_range(
				Infinity,
				-Infinity
			)

			return obj
		}


		/**
		 * ```tree
		 * sub <= graphs_sorted /$mol_svg
		 * ```
		 */
		sub() {
			return this.graphs_sorted()
		}

		/**
		 * ```tree
		 * graphs_sorted /$mol_svg
		 * ```
		 */
		graphs_sorted() {
			return [

			] as readonly $mol_svg[]
		}

		/**
		 * ```tree
		 * graphs_colored <= graphs_positioned <= graphs /$mol_plot_graph
		 * ```
		 */
		graphs_colored() {
			return this.graphs_positioned()
		}

		/**
		 * ```tree
		 * graphs_positioned <= graphs /$mol_plot_graph
		 * ```
		 */
		graphs_positioned() {
			return this.graphs()
		}

		/**
		 * ```tree
		 * graphs /$mol_plot_graph
		 * ```
		 */
		graphs() {
			return [

			] as readonly $mol_plot_graph[]
		}

		/**
		 * ```tree
		 * cursor_position?val $mol_vector_2d /
		 * 	NaN
		 * 	NaN
		 * ```
		 */
		@ $mol_mem
		cursor_position(val?: any) {
			if ( val !== undefined ) return val
			const obj = new this.$.$mol_vector_2d(
				NaN,
				NaN
			)

			return obj
		}


		/**
		 * ```tree
		 * plugins /
		 * 	^
		 * 	<= Meter $mol_meter
		 * 		width => width
		 * 		height => height
		 * 	<= Touch $mol_touch
		 * 		zoom?val <=> scale_x?val
		 * 		pan?val <=> shift?val
		 * 		pos?val <=> cursor_position?val
		 * ```
		 */
		plugins() {
			return [
				...super.plugins(),
				this.Meter(),
				this.Touch()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Meter $mol_meter
		 * 	width => width
		 * 	height => height
		 * ```
		 */
		@ $mol_mem
		Meter() {
			const obj = new this.$.$mol_meter()

			return obj
		}

		/**
		 * ```tree
		 * width
		 * ```
		 */
		width() {
			return this.Meter().width()
		}

		/**
		 * ```tree
		 * height
		 * ```
		 */
		height() {
			return this.Meter().height()
		}

		/**
		 * ```tree
		 * Touch $mol_touch
		 * 	zoom?val <=> scale_x?val
		 * 	pan?val <=> shift?val
		 * 	pos?val <=> cursor_position?val
		 * ```
		 */
		@ $mol_mem
		Touch() {
			const obj = new this.$.$mol_touch()

			obj.zoom = (val?: any) => this.scale_x(val)
			obj.pan = (val?: any) => this.shift(val)
			obj.pos = (val?: any) => this.cursor_position(val)

			return obj
		}

		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	dblclick?event <=> reset?event null
		 * ```
		 */
		event() {
			return {
				...super.event(),
				dblclick: (event?: any) => this.reset(event)
			}
		}

		/**
		 * ```tree
		 * reset?event null
		 * ```
		 */
		@ $mol_mem
		reset(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}
	}

}
