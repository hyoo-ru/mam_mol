namespace $ {
	export class $mol_check_group_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Group of checkboxes
		 * ```
		 */
		title() {
			return "Group of checkboxes"
		}
		
		/**
		 * ```tree
		 * sub / <= Demo_items
		 * ```
		 */
		sub() {
			return [
				this.Demo_items()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\multi
		 * 	\group
		 * ```
		 */
		tags() {
			return [
				"multi",
				"group"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Control/Button
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control/Button"
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
		 * strength_title \Strength
		 * ```
		 */
		strength_title() {
			return "Strength"
		}
		
		/**
		 * ```tree
		 * strength? false
		 * ```
		 */
		@ $mol_mem
		strength(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * Strength $mol_check_box
		 * 	title <= strength_title
		 * 	checked? <=> strength?
		 * ```
		 */
		@ $mol_mem
		Strength() {
			const obj = new this.$.$mol_check_box()
			
			obj.title = () => this.strength_title()
			obj.checked = (next?: any) => this.strength(next)
			
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
		 * perception? true
		 * ```
		 */
		@ $mol_mem
		perception(next?: any) {
			if ( next !== undefined ) return next as never
			return true
		}
		
		/**
		 * ```tree
		 * Perception $mol_check_box
		 * 	title <= perception_title
		 * 	checked? <=> perception?
		 * ```
		 */
		@ $mol_mem
		Perception() {
			const obj = new this.$.$mol_check_box()
			
			obj.title = () => this.perception_title()
			obj.checked = (next?: any) => this.perception(next)
			
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
		 * endurance? false
		 * ```
		 */
		@ $mol_mem
		endurance(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * Endurance $mol_check_box
		 * 	title <= endurance_title
		 * 	checked? <=> endurance?
		 * ```
		 */
		@ $mol_mem
		Endurance() {
			const obj = new this.$.$mol_check_box()
			
			obj.title = () => this.endurance_title()
			obj.checked = (next?: any) => this.endurance(next)
			
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
		 * charisma? false
		 * ```
		 */
		@ $mol_mem
		charisma(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * Charisma $mol_check_box
		 * 	title <= charisma_title
		 * 	checked? <=> charisma?
		 * ```
		 */
		@ $mol_mem
		Charisma() {
			const obj = new this.$.$mol_check_box()
			
			obj.title = () => this.charisma_title()
			obj.checked = (next?: any) => this.charisma(next)
			
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
		 * intelligence? true
		 * ```
		 */
		@ $mol_mem
		intelligence(next?: any) {
			if ( next !== undefined ) return next as never
			return true
		}
		
		/**
		 * ```tree
		 * Intelligence $mol_check_box
		 * 	title <= intelligence_title
		 * 	checked? <=> intelligence?
		 * ```
		 */
		@ $mol_mem
		Intelligence() {
			const obj = new this.$.$mol_check_box()
			
			obj.title = () => this.intelligence_title()
			obj.checked = (next?: any) => this.intelligence(next)
			
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
		 * agility? true
		 * ```
		 */
		@ $mol_mem
		agility(next?: any) {
			if ( next !== undefined ) return next as never
			return true
		}
		
		/**
		 * ```tree
		 * Agility $mol_check_box
		 * 	title <= agility_title
		 * 	checked? <=> agility?
		 * ```
		 */
		@ $mol_mem
		Agility() {
			const obj = new this.$.$mol_check_box()
			
			obj.title = () => this.agility_title()
			obj.checked = (next?: any) => this.agility(next)
			
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
		 * luck? true
		 * ```
		 */
		@ $mol_mem
		luck(next?: any) {
			if ( next !== undefined ) return next as never
			return true
		}
		
		/**
		 * ```tree
		 * Luck $mol_check_box
		 * 	title <= luck_title
		 * 	checked? <=> luck?
		 * ```
		 */
		@ $mol_mem
		Luck() {
			const obj = new this.$.$mol_check_box()
			
			obj.title = () => this.luck_title()
			obj.checked = (next?: any) => this.luck(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Partial $mol_list rows /
		 * 	<= Strength
		 * 	<= Perception
		 * 	<= Endurance
		 * 	<= Charisma
		 * 	<= Intelligence
		 * 	<= Agility
		 * 	<= Luck
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
		 * Demo_items $mol_list rows /
		 * 	<= All
		 * 	<= Partial
		 * ```
		 */
		@ $mol_mem
		Demo_items() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.All(),
				this.Partial()
			] as readonly any[]
			
			return obj
		}
	}
	
}

