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
		 * Content $mol_filler
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_filler()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Empty $mol_status
		 * ```
		 */
		@ $mol_mem
		Empty() {
			const obj = new this.$.$mol_status()
			
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
		 * Pizza $mol_page
		 * 	title \🍕 Pizzas
		 * 	tools / <= Foods_spread_close
		 * 	body / <= Empty
		 * ```
		 */
		@ $mol_mem
		Pizza() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🍕 Pizzas"
			obj.tools = () => [
				this.Foods_spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Empty()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Hot_dogs $mol_page
		 * 	title \🌭 Hot Dogs
		 * 	tools / <= Foods_spread_close
		 * 	body / <= Empty
		 * ```
		 */
		@ $mol_mem
		Hot_dogs() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🌭 Hot Dogs"
			obj.tools = () => [
				this.Foods_spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Empty()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Fries $mol_page
		 * 	title \🍟 Fries
		 * 	tools / <= Foods_spread_close
		 * 	body / <= Empty
		 * ```
		 */
		@ $mol_mem
		Fries() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🍟 Fries"
			obj.tools = () => [
				this.Foods_spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Empty()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Foods_spread_close
		 * ```
		 */
		Foods_spread_close() {
			return this.Foods().Spread_close()
		}
		
		/**
		 * ```tree
		 * Foods $mol_book2_catalog
		 * 	param \mol_book2_catalog_demo_foods
		 * 	menu_title \Foods
		 * 	menu_tools / <= Spread_close
		 * 	Spread_close => Foods_spread_close
		 * 	spreads *
		 * 		pizza <= Pizza
		 * 		hot_dogs <= Hot_dogs
		 * 		fries <= Fries
		 * ```
		 */
		@ $mol_mem
		Foods() {
			const obj = new this.$.$mol_book2_catalog()
			
			obj.param = () => "mol_book2_catalog_demo_foods"
			obj.menu_title = () => "Foods"
			obj.menu_tools = () => [
				this.Spread_close()
			] as readonly any[]
			obj.spreads = () => ({
				pizza: this.Pizza(),
				hot_dogs: this.Hot_dogs(),
				fries: this.Fries()
			})
			
			return obj
		}
		
		/**
		 * ```tree
		 * Cats $mol_page
		 * 	title \🐱 Cats
		 * 	tools / <= Animals_spread_close
		 * 	body / <= Content
		 * ```
		 */
		@ $mol_mem
		Cats() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐱 Cats"
			obj.tools = () => [
				this.Animals_spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Dogs $mol_page
		 * 	title \🐶 Dogs
		 * 	tools / <= Animals_spread_close
		 * 	body / <= Content
		 * ```
		 */
		@ $mol_mem
		Dogs() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐶 Dogs"
			obj.tools = () => [
				this.Animals_spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Horses $mol_page
		 * 	title \🐴 Horses
		 * 	tools / <= Animals_spread_close
		 * 	body / <= Content
		 * ```
		 */
		@ $mol_mem
		Horses() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐴 Horses"
			obj.tools = () => [
				this.Animals_spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Racoons $mol_page
		 * 	title \🦝 Racoons
		 * 	tools / <= Animals_spread_close
		 * 	body / <= Content
		 * ```
		 */
		@ $mol_mem
		Racoons() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🦝 Racoons"
			obj.tools = () => [
				this.Animals_spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Pigs $mol_page
		 * 	title \🐷 Pigs 
		 * 	tools / <= Animals_spread_close
		 * 	body / <= Content
		 * ```
		 */
		@ $mol_mem
		Pigs() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐷 Pigs "
			obj.tools = () => [
				this.Animals_spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Rabbits $mol_page
		 * 	title \🐰 Rabbits
		 * 	tools / <= Animals_spread_close
		 * 	body / <= Content
		 * ```
		 */
		@ $mol_mem
		Rabbits() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐰 Rabbits"
			obj.tools = () => [
				this.Animals_spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Wolfs $mol_page
		 * 	title \🐺 Wolfs
		 * 	tools / <= Animals_spread_close
		 * 	body / <= Content
		 * ```
		 */
		@ $mol_mem
		Wolfs() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐺 Wolfs"
			obj.tools = () => [
				this.Animals_spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Mice $mol_page
		 * 	title \🐭 Mice
		 * 	tools / <= Animals_spread_close
		 * 	body / <= Content
		 * ```
		 */
		@ $mol_mem
		Mice() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐭 Mice"
			obj.tools = () => [
				this.Animals_spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Ants $mol_page
		 * 	title \🐜 Ants
		 * 	tools / <= Animals_spread_close
		 * 	body / <= Content
		 * ```
		 */
		@ $mol_mem
		Ants() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐜 Ants"
			obj.tools = () => [
				this.Animals_spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Bugs $mol_page
		 * 	title \🐛 Bugs
		 * 	tools / <= Animals_spread_close
		 * 	body / <= Content
		 * ```
		 */
		@ $mol_mem
		Bugs() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "🐛 Bugs"
			obj.tools = () => [
				this.Animals_spread_close()
			] as readonly any[]
			obj.body = () => [
				this.Content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Animals_spread_close
		 * ```
		 */
		Animals_spread_close() {
			return this.Animals().Spread_close()
		}
		
		/**
		 * ```tree
		 * Animals $mol_book2_catalog
		 * 	param \mol_book2_catalog_demo_animals
		 * 	menu_title \Animals
		 * 	menu_tools / <= Spread_close
		 * 	Spread_close => Animals_spread_close
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
		Animals() {
			const obj = new this.$.$mol_book2_catalog()
			
			obj.param = () => "mol_book2_catalog_demo_animals"
			obj.menu_title = () => "Animals"
			obj.menu_tools = () => [
				this.Spread_close()
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
		 * 	menu_title \Catalog
		 * 	Spread_close => Spread_close
		 * 	spreads *
		 * 		foods <= Foods
		 * 		animals <= Animals
		 * ```
		 */
		@ $mol_mem
		Calatog() {
			const obj = new this.$.$mol_book2_catalog()
			
			obj.param = () => "mol_book2_catalog_demo"
			obj.menu_title = () => "Catalog"
			obj.spreads = () => ({
				foods: this.Foods(),
				animals: this.Animals()
			})
			
			return obj
		}
	}
	
}

