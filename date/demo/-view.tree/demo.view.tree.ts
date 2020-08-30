namespace $ {
	export class $mol_date_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * sub / <= View $mol_view sub /
		 * 	<= Date $mol_date value_moment?val <=> date?val $mol_time_moment
		 * 	<= Formatted $mol_view sub / <= formatted \
		 * ```
		 */
		sub() {
			return [
				this.View()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * View $mol_view sub /
		 * 	<= Date $mol_date value_moment?val <=> date?val $mol_time_moment
		 * 	<= Formatted $mol_view sub / <= formatted \
		 * ```
		 */
		@ $mol_mem
		View() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.Date(),
				this.Formatted()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Date $mol_date value_moment?val <=> date?val $mol_time_moment
		 * ```
		 */
		@ $mol_mem
		Date() {
			const obj = new this.$.$mol_date()

			obj.value_moment = (val?: any) => this.date(val)

			return obj
		}

		/**
		 * ```tree
		 * date?val $mol_time_moment
		 * ```
		 */
		@ $mol_mem
		date(val?: any) {
			if ( val !== undefined ) return val
			const obj = new this.$.$mol_time_moment()

			return obj
		}

		/**
		 * ```tree
		 * Formatted $mol_view sub / <= formatted \
		 * ```
		 */
		@ $mol_mem
		Formatted() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.formatted()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * formatted \
		 * ```
		 */
		formatted() {
			return ""
		}
	}

}
