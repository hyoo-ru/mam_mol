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
		 * Articles_content $mol_row sub / \Articles content
		 * ```
		 */
		@ $mol_mem
		Articles_content() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				"Articles content"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Articles $mol_page
		 * 	title \Articles
		 * 	body / <= Articles_content
		 * ```
		 */
		@ $mol_mem
		Articles() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "Articles"
			obj.body = () => [
				this.Articles_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Images_content $mol_row sub / \Images content
		 * ```
		 */
		@ $mol_mem
		Images_content() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				"Images content"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Images $mol_page
		 * 	title \Images
		 * 	body / <= Images_content
		 * ```
		 */
		@ $mol_mem
		Images() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "Images"
			obj.body = () => [
				this.Images_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Maps_content $mol_row sub / \Maps content
		 * ```
		 */
		@ $mol_mem
		Maps_content() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				"Maps content"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Maps $mol_page
		 * 	title \Maps
		 * 	body / <= Maps_content
		 * ```
		 */
		@ $mol_mem
		Maps() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "Maps"
			obj.body = () => [
				this.Maps_content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Calatog $mol_book2_catalog
		 * 	param \mol_book2_catalog_demo
		 * 	menu_title \Sections
		 * 	spreads *
		 * 		articles <= Articles
		 * 		images <= Images
		 * 		maps <= Maps
		 * ```
		 */
		@ $mol_mem
		Calatog() {
			const obj = new this.$.$mol_book2_catalog()
			
			obj.param = () => "mol_book2_catalog_demo"
			obj.menu_title = () => "Sections"
			obj.spreads = () => ({
				articles: this.Articles(),
				images: this.Images(),
				maps: this.Maps()
			})
			
			return obj
		}
	}
	
}

