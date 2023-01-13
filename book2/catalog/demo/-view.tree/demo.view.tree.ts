namespace $ {
	export class $mol_book2_catalog_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \Catalog of pages
		 * ```
		 */
		title() {
			return "Catalog of pages"
		}
		
		/**
		 * ```tree
		 * Spread_content $mol_row sub / <= Filler
		 * ```
		 */
		@ $mol_mem
		Spread_content() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Filler()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * sub / <= Calatog
		 * ```
		 */
		sub() {
			return [
				this.Calatog()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_page
		 * 	\app
		 * 	\page
		 * 	\book
		 * 	\menu
		 * 	\navigation
		 * 	\transition
		 * 	\multipage
		 * ```
		 */
		tags() {
			return [
				"$mol_page",
				"app",
				"page",
				"book",
				"menu",
				"navigation",
				"transition",
				"multipage"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Filler $mol_filler
		 * ```
		 */
		@ $mol_mem
		Filler() {
			const obj = new this.$.$mol_filler()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Add_icon $mol_icon_plus
		 * ```
		 */
		@ $mol_mem
		Add_icon() {
			const obj = new this.$.$mol_icon_plus()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Add $mol_button_minor sub / <= Add_icon
		 * ```
		 */
		@ $mol_mem
		Add() {
			const obj = new this.$.$mol_button_minor()
			
			obj.sub = () => [
				this.Add_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Cats $mol_page
		 * 	title \🐱 Cats
		 * 	tools / <= Spread_close
		 * 	body / <= Spread_content
		 * ```
		 */
		@ $mol_mem
		Cats() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐱 Cats"
			obj.tools = () => [
				this.Spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Spread_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Dogs $mol_page
		 * 	title \🐶 Dogs
		 * 	tools / <= Spread_close
		 * 	body / <= Spread_content
		 * ```
		 */
		@ $mol_mem
		Dogs() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐶 Dogs"
			obj.tools = () => [
				this.Spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Spread_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Horses $mol_page
		 * 	title \🐴 Horses
		 * 	tools / <= Spread_close
		 * 	body / <= Spread_content
		 * ```
		 */
		@ $mol_mem
		Horses() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐴 Horses"
			obj.tools = () => [
				this.Spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Spread_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Racoons $mol_page
		 * 	title \🦝 Racoons
		 * 	tools / <= Spread_close
		 * 	body / <= Spread_content
		 * ```
		 */
		@ $mol_mem
		Racoons() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🦝 Racoons"
			obj.tools = () => [
				this.Spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Spread_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Pigs $mol_page
		 * 	title \🐷 Pigs 
		 * 	tools / <= Spread_close
		 * 	body / <= Spread_content
		 * ```
		 */
		@ $mol_mem
		Pigs() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐷 Pigs "
			obj.tools = () => [
				this.Spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Spread_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Rabbits $mol_page
		 * 	title \🐰 Rabbits
		 * 	tools / <= Spread_close
		 * 	body / <= Spread_content
		 * ```
		 */
		@ $mol_mem
		Rabbits() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐰 Rabbits"
			obj.tools = () => [
				this.Spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Spread_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Wolfs $mol_page
		 * 	title \🐺 Wolfs
		 * 	tools / <= Spread_close
		 * 	body / <= Spread_content
		 * ```
		 */
		@ $mol_mem
		Wolfs() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐺 Wolfs"
			obj.tools = () => [
				this.Spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Spread_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Mice $mol_page
		 * 	title \🐭 Mice
		 * 	tools / <= Spread_close
		 * 	body / <= Spread_content
		 * ```
		 */
		@ $mol_mem
		Mice() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐭 Mice"
			obj.tools = () => [
				this.Spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Spread_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Ants $mol_page
		 * 	title \🐜 Ants
		 * 	tools / <= Spread_close
		 * 	body / <= Spread_content
		 * ```
		 */
		@ $mol_mem
		Ants() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐜 Ants"
			obj.tools = () => [
				this.Spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Spread_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Bugs $mol_page
		 * 	title \🐛 Bugs
		 * 	tools / <= Spread_close
		 * 	body / <= Spread_content
		 * ```
		 */
		@ $mol_mem
		Bugs() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐛 Bugs"
			obj.tools = () => [
				this.Spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Spread_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Spread_close
		 * ```
		 */
		Spread_close() {
			return this.Calatog().Spread_close()
		}
		
		/**
		 * ```tree
		 * Calatog $mol_book2_catalog
		 * 	param \mol_book2_catalog_demo
		 * 	menu_title \Animals
		 * 	Spread_close => Spread_close
		 * 	menu_tools / <= Add
		 * 	spreads *
		 * 		cats <= Cats
		 * 		dogs <= Dogs
		 * 		horses <= Horses
		 * 		racoons <= Racoons
		 * 		pigs <= Pigs
		 * 		rabbits <= Rabbits
		 * 		wolfs <= Wolfs
		 * 		mice <= Mice
		 * 		ants <= Ants
		 * 		bugs <= Bugs
		 * ```
		 */
		@ $mol_mem
		Calatog() {
			const obj = new this.$.$mol_book2_catalog()
			
			obj.param = () => "mol_book2_catalog_demo"
			obj.menu_title = () => "Animals"
			obj.menu_tools = () => [
				this.Add()
			] as readonly any[]
			obj.spreads = () => ({
				cats: this.Cats(),
				dogs: this.Dogs(),
				horses: this.Horses(),
				racoons: this.Racoons(),
				pigs: this.Pigs(),
				rabbits: this.Rabbits(),
				wolfs: this.Wolfs(),
				mice: this.Mice(),
				ants: this.Ants(),
				bugs: this.Bugs()
			})
			
			return obj
		}
	}
	
}

