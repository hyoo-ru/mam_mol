namespace $ {
	export class $mol_check_group_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Group of checkboxes
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_check_group_demo_title' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= All $mol_check_group
		 * 		title \SPECIAL
		 * 		checks /
		 * 			<= Strength
		 * 			<= Perception
		 * 			<= Endurance
		 * 			<= Charisma
		 * 			<= Intelligence
		 * 			<= Agility
		 * 			<= Luck
		 * 	<= Partial $mol_list rows /
		 * 		<= Strength $mol_check_box
		 * 			title <= strength_title \Strength
		 * 			checked?val <=> strength?val false
		 * 		<= Perception $mol_check_box
		 * 			title <= perception_title \Perception
		 * 			checked?val <=> perception?val true
		 * 		<= Endurance $mol_check_box
		 * 			title <= endurance_title \Endurance
		 * 			checked?val <=> endurance?val false
		 * 		<= Charisma $mol_check_box
		 * 			title <= charisma_title \Charisma
		 * 			checked?val <=> charisma?val false
		 * 		<= Intelligence $mol_check_box
		 * 			title <= intelligence_title \Intelligence
		 * 			checked?val <=> intelligence?val true
		 * 		<= Agility $mol_check_box
		 * 			title <= agility_title \Agility
		 * 			checked?val <=> agility?val true
		 * 		<= Luck $mol_check_box
		 * 			title <= luck_title \Luck
		 * 			checked?val <=> luck?val true
		 * ```
		 */
		sub() {
			return [
				this.All(),
				this.Partial()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * All $mol_check_group
		 * 	title \SPECIAL
		 * 	checks /
		 * 		<= Strength
		 * 		<= Perception
		 * 		<= Endurance
		 * 		<= Charisma
		 * 		<= Intelligence
		 * 		<= Agility
		 * 		<= Luck
		 * ```
		 */
		@ $mol_mem
		All() {
			const obj = new this.$.$mol_check_group()

			obj.title = () => "SPECIAL"
			obj.checks = () => [
				this.Strength(),
				this.Perception(),
				this.Endurance(),
				this.Charisma(),
				this.Intelligence(),
				this.Agility(),
				this.Luck()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Partial $mol_list rows /
		 * 	<= Strength $mol_check_box
		 * 		title <= strength_title \Strength
		 * 		checked?val <=> strength?val false
		 * 	<= Perception $mol_check_box
		 * 		title <= perception_title \Perception
		 * 		checked?val <=> perception?val true
		 * 	<= Endurance $mol_check_box
		 * 		title <= endurance_title \Endurance
		 * 		checked?val <=> endurance?val false
		 * 	<= Charisma $mol_check_box
		 * 		title <= charisma_title \Charisma
		 * 		checked?val <=> charisma?val false
		 * 	<= Intelligence $mol_check_box
		 * 		title <= intelligence_title \Intelligence
		 * 		checked?val <=> intelligence?val true
		 * 	<= Agility $mol_check_box
		 * 		title <= agility_title \Agility
		 * 		checked?val <=> agility?val true
		 * 	<= Luck $mol_check_box
		 * 		title <= luck_title \Luck
		 * 		checked?val <=> luck?val true
		 * ```
		 */
		@ $mol_mem
		Partial() {
			const obj = new this.$.$mol_list()

			obj.rows = () => [
				this.Strength(),
				this.Perception(),
				this.Endurance(),
				this.Charisma(),
				this.Intelligence(),
				this.Agility(),
				this.Luck()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Strength $mol_check_box
		 * 	title <= strength_title \Strength
		 * 	checked?val <=> strength?val false
		 * ```
		 */
		@ $mol_mem
		Strength() {
			const obj = new this.$.$mol_check_box()

			obj.title = () => this.strength_title()
			obj.checked = (val?: any) => this.strength(val)

			return obj
		}

		/**
		 * ```tree
		 * strength_title \Strength
		 * ```
		 */
		strength_title() {
			return "Strength"
		}

		/**
		 * ```tree
		 * strength?val false
		 * ```
		 */
		@ $mol_mem
		strength(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * Perception $mol_check_box
		 * 	title <= perception_title \Perception
		 * 	checked?val <=> perception?val true
		 * ```
		 */
		@ $mol_mem
		Perception() {
			const obj = new this.$.$mol_check_box()

			obj.title = () => this.perception_title()
			obj.checked = (val?: any) => this.perception(val)

			return obj
		}

		/**
		 * ```tree
		 * perception_title \Perception
		 * ```
		 */
		perception_title() {
			return "Perception"
		}

		/**
		 * ```tree
		 * perception?val true
		 * ```
		 */
		@ $mol_mem
		perception(val?: any) {
			if ( val !== undefined ) return val
			return true
		}

		/**
		 * ```tree
		 * Endurance $mol_check_box
		 * 	title <= endurance_title \Endurance
		 * 	checked?val <=> endurance?val false
		 * ```
		 */
		@ $mol_mem
		Endurance() {
			const obj = new this.$.$mol_check_box()

			obj.title = () => this.endurance_title()
			obj.checked = (val?: any) => this.endurance(val)

			return obj
		}

		/**
		 * ```tree
		 * endurance_title \Endurance
		 * ```
		 */
		endurance_title() {
			return "Endurance"
		}

		/**
		 * ```tree
		 * endurance?val false
		 * ```
		 */
		@ $mol_mem
		endurance(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * Charisma $mol_check_box
		 * 	title <= charisma_title \Charisma
		 * 	checked?val <=> charisma?val false
		 * ```
		 */
		@ $mol_mem
		Charisma() {
			const obj = new this.$.$mol_check_box()

			obj.title = () => this.charisma_title()
			obj.checked = (val?: any) => this.charisma(val)

			return obj
		}

		/**
		 * ```tree
		 * charisma_title \Charisma
		 * ```
		 */
		charisma_title() {
			return "Charisma"
		}

		/**
		 * ```tree
		 * charisma?val false
		 * ```
		 */
		@ $mol_mem
		charisma(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * Intelligence $mol_check_box
		 * 	title <= intelligence_title \Intelligence
		 * 	checked?val <=> intelligence?val true
		 * ```
		 */
		@ $mol_mem
		Intelligence() {
			const obj = new this.$.$mol_check_box()

			obj.title = () => this.intelligence_title()
			obj.checked = (val?: any) => this.intelligence(val)

			return obj
		}

		/**
		 * ```tree
		 * intelligence_title \Intelligence
		 * ```
		 */
		intelligence_title() {
			return "Intelligence"
		}

		/**
		 * ```tree
		 * intelligence?val true
		 * ```
		 */
		@ $mol_mem
		intelligence(val?: any) {
			if ( val !== undefined ) return val
			return true
		}

		/**
		 * ```tree
		 * Agility $mol_check_box
		 * 	title <= agility_title \Agility
		 * 	checked?val <=> agility?val true
		 * ```
		 */
		@ $mol_mem
		Agility() {
			const obj = new this.$.$mol_check_box()

			obj.title = () => this.agility_title()
			obj.checked = (val?: any) => this.agility(val)

			return obj
		}

		/**
		 * ```tree
		 * agility_title \Agility
		 * ```
		 */
		agility_title() {
			return "Agility"
		}

		/**
		 * ```tree
		 * agility?val true
		 * ```
		 */
		@ $mol_mem
		agility(val?: any) {
			if ( val !== undefined ) return val
			return true
		}

		/**
		 * ```tree
		 * Luck $mol_check_box
		 * 	title <= luck_title \Luck
		 * 	checked?val <=> luck?val true
		 * ```
		 */
		@ $mol_mem
		Luck() {
			const obj = new this.$.$mol_check_box()

			obj.title = () => this.luck_title()
			obj.checked = (val?: any) => this.luck(val)

			return obj
		}

		/**
		 * ```tree
		 * luck_title \Luck
		 * ```
		 */
		luck_title() {
			return "Luck"
		}

		/**
		 * ```tree
		 * luck?val true
		 * ```
		 */
		@ $mol_mem
		luck(val?: any) {
			if ( val !== undefined ) return val
			return true
		}
	}

}
