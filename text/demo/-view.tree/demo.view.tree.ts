namespace $ {
	export class $mol_text_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \Markdown visualization example
		 * ```
		 */
		title() {
			return "Markdown visualization example"
		}
		
		/**
		 * ```tree
		 * sub / <= Book
		 * ```
		 */
		sub() {
			return [
				this.Book()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\text
		 * 	\markdown
		 * ```
		 */
		tags() {
			return [
				"text",
				"markdown"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget
		 * ```
		 */
		aspects() {
			return [
				"Widget"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * search? \
		 * ```
		 */
		@ $mol_mem
		search(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Search $mol_search_jumper
		 * 	query? <=> search?
		 * 	Root <= View
		 * ```
		 */
		@ $mol_mem
		Search() {
			const obj = new this.$.$mol_search_jumper()
			
			obj.query = (next?: any) => this.search(next)
			obj.Root = () => this.View()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Edit_icon $mol_icon_pencil
		 * ```
		 */
		@ $mol_mem
		Edit_icon() {
			const obj = new this.$.$mol_icon_pencil()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Edit $mol_link
		 * 	arg * edit \
		 * 	sub / <= Edit_icon
		 * ```
		 */
		@ $mol_mem
		Edit() {
			const obj = new this.$.$mol_link()
			
			obj.arg = () => ({
				edit: ""
			})
			obj.sub = () => [
				this.Edit_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * View $mol_text
		 * 	text <= text
		 * 	highlight <= search
		 * ```
		 */
		@ $mol_mem
		View() {
			const obj = new this.$.$mol_text()
			
			obj.text = () => this.text()
			obj.highlight = () => this.search()
			
			return obj
		}
		
		/**
		 * ```tree
		 * View_page $mol_page
		 * 	title \Output
		 * 	tools /
		 * 		<= Search
		 * 		<= Edit
		 * 	body / <= View
		 * ```
		 */
		@ $mol_mem
		View_page() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "Output"
			obj.tools = () => [
				this.Search(),
				this.Edit()
			] as readonly any[]
			obj.body = () => [
				this.View()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Close_icon $mol_icon_cross
		 * ```
		 */
		@ $mol_mem
		Close_icon() {
			const obj = new this.$.$mol_icon_cross()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Close $mol_link
		 * 	arg * edit null
		 * 	sub / <= Close_icon
		 * ```
		 */
		@ $mol_mem
		Close() {
			const obj = new this.$.$mol_link()
			
			obj.arg = () => ({
				edit: null as any
			})
			obj.sub = () => [
				this.Close_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * text? \
		 * 	\# Header level 1
		 * 	\## Header level 2
		 * 	\### Header level 3
		 * 	\#### Header level 4
		 * 	\##### Header level 5
		 * 	\###### Header level 6
		 * 	\
		 * 	\# List
		 * 	\
		 * 	\- first item
		 * 	\  1. first of first item
		 * 	\  2. second of first item
		 * 	\  > quote as item
		 * 	\  > > quote in quote
		 * 	\  > + list inside quote
		 * 	\- second item
		 * 	\
		 * 	\# Inline Formatting
		 * 	\
		 * 	\- Some **strong text**
		 * 	\- Some *emphasis text*
		 * 	\- Some ~~deleted text~~
		 * 	\- Some `short_code("foo")` & ```long_code(`${bar}`)```
		 * 	\- Some "quoted text"
		 * 	\
		 * 	\# Hyper Link
		 * 	\
		 * 	\* Some [link *with* title](http://example.org).
		 * 	\* Auto http link: http://mol.hyoo.ru, (http://mol.hyoo.ru), http://mol.hyoo.ru.
		 * 	\* Some [*unsafe* link](somescript:document.cookie).
		 * 	\
		 * 	\# Embedding
		 * 	\
		 * 	\## Image
		 * 	\![](https://mol.hyoo.ru/mol/logo/logo.svg)
		 * 	\
		 * 	\## Video
		 * 	\![](https://www.youtube.com/embed/XNt7DEkisKg)
		 * 	\
		 * 	\## Site
		 * 	\![](https://life.hyoo.ru)
		 * 	\
		 * 	\## Inline
		 * 	\
		 * 	\- Badge: [![Deploy](https://github.com/hyoo-ru/mam_mol/actions/workflows/deploy.yml/badge.svg)](https://github.com/hyoo-ru/mam_mol/actions/workflows/deploy.yml)
		 * 	\- Broken images: ![*Alternative* text](https://example.org/404.png) ![](https://example.org/404.svg)
		 * 	\- Unsafe images: ![*Alternative* text](somescript:document.cookie) ![](somescript:document.cookie)
		 * 	\
		 * 	\# Preformatted Code
		 * 	\
		 * 	\```js
		 * 	\class SomeCode {
		 * 	\	with_prolog: true
		 * 	\}
		 * 	\```
		 * 	\
		 * 	\	class SomeCode {
		 * 	\		with_indents: true
		 * 	\	}
		 * 	\
		 * 	\# Table
		 * 	\
		 * 	\|           | ~~Column~~ 1 | ~~Column~~ 2 | ~~Column~~ 3
		 * 	\|-----------|--------------|--------------|-------------
		 * 	\| ~~Row~~ 1 | ~~Cell~~ 1x1 | ~~Cell~~ 2x1 | ~~Cell~~ 3x1
		 * 	\| ~~Row~~ 2 | ~~Cell~~ 1x2 | ~~Cell~~ 2x2 | ~~Cell~~ 3x2
		 * 	\| ~~Row~~ 3 | ~~Cell~~ 1x3 | ~~Cell~~ 2x3 | ~~Cell~~ 3x3
		 * 	\| ~~Row~~ 4 | ~~Cell~~ 1x4 | ~~Cell~~ 2x4 | ~~Cell~~ 3x4
		 * 	\| ~~Row~~ 5 | ~~Cell~~ 1x5 | ~~Cell~~ 2x5 | ~~Cell~~ 3x5
		 * 	\| ~~Row~~ 6 | ~~Cell~~ 1x6 | ~~Cell~~ 2x6 | ~~Cell~~ 3x6
		 * 	\| ~~Row~~ 7 | ~~Cell~~ 1x7 | ~~Cell~~ 2x7 | ~~Cell~~ 3x7
		 * 	\| ~~Row~~ 8 | ~~Cell~~ 1x8 | ~~Cell~~ 2x8 | ~~Cell~~ 3x8
		 * 	\| ~~Row~~ 9 | ~~Cell~~ 1x9 | ~~Cell~~ 2x9 | ~~Cell~~ 3x9
		 * 	\
		 * ```
		 */
		@ $mol_mem
		text(next?: any) {
			if ( next !== undefined ) return next as never
			return "# Header level 1\n## Header level 2\n### Header level 3\n#### Header level 4\n##### Header level 5\n###### Header level 6\n\n# List\n\n- first item\n  1. first of first item\n  2. second of first item\n  > quote as item\n  > > quote in quote\n  > + list inside quote\n- second item\n\n# Inline Formatting\n\n- Some **strong text**\n- Some *emphasis text*\n- Some ~~deleted text~~\n- Some `short_code(\"foo\")` & ```long_code(`${bar}`)```\n- Some \"quoted text\"\n\n# Hyper Link\n\n* Some [link *with* title](http://example.org).\n* Auto http link: http://mol.hyoo.ru, (http://mol.hyoo.ru), http://mol.hyoo.ru.\n* Some [*unsafe* link](somescript:document.cookie).\n\n# Embedding\n\n## Image\n![](https://mol.hyoo.ru/mol/logo/logo.svg)\n\n## Video\n![](https://www.youtube.com/embed/XNt7DEkisKg)\n\n## Site\n![](https://life.hyoo.ru)\n\n## Inline\n\n- Badge: [![Deploy](https://github.com/hyoo-ru/mam_mol/actions/workflows/deploy.yml/badge.svg)](https://github.com/hyoo-ru/mam_mol/actions/workflows/deploy.yml)\n- Broken images: ![*Alternative* text](https://example.org/404.png) ![](https://example.org/404.svg)\n- Unsafe images: ![*Alternative* text](somescript:document.cookie) ![](somescript:document.cookie)\n\n# Preformatted Code\n\n```js\nclass SomeCode {\n\twith_prolog: true\n}\n```\n\n\tclass SomeCode {\n\t\twith_indents: true\n\t}\n\n# Table\n\n|           | ~~Column~~ 1 | ~~Column~~ 2 | ~~Column~~ 3\n|-----------|--------------|--------------|-------------\n| ~~Row~~ 1 | ~~Cell~~ 1x1 | ~~Cell~~ 2x1 | ~~Cell~~ 3x1\n| ~~Row~~ 2 | ~~Cell~~ 1x2 | ~~Cell~~ 2x2 | ~~Cell~~ 3x2\n| ~~Row~~ 3 | ~~Cell~~ 1x3 | ~~Cell~~ 2x3 | ~~Cell~~ 3x3\n| ~~Row~~ 4 | ~~Cell~~ 1x4 | ~~Cell~~ 2x4 | ~~Cell~~ 3x4\n| ~~Row~~ 5 | ~~Cell~~ 1x5 | ~~Cell~~ 2x5 | ~~Cell~~ 3x5\n| ~~Row~~ 6 | ~~Cell~~ 1x6 | ~~Cell~~ 2x6 | ~~Cell~~ 3x6\n| ~~Row~~ 7 | ~~Cell~~ 1x7 | ~~Cell~~ 2x7 | ~~Cell~~ 3x7\n| ~~Row~~ 8 | ~~Cell~~ 1x8 | ~~Cell~~ 2x8 | ~~Cell~~ 3x8\n| ~~Row~~ 9 | ~~Cell~~ 1x9 | ~~Cell~~ 2x9 | ~~Cell~~ 3x9\n"
		}
		
		/**
		 * ```tree
		 * Code $mol_textarea value? <=> text?
		 * ```
		 */
		@ $mol_mem
		Code() {
			const obj = new this.$.$mol_textarea()
			
			obj.value = (next?: any) => this.text(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Code_page $mol_page
		 * 	title \Input
		 * 	tools / <= Close
		 * 	body / <= Code
		 * ```
		 */
		@ $mol_mem
		Code_page() {
			const obj = new this.$.$mol_page()
			
			obj.title = () => "Input"
			obj.tools = () => [
				this.Close()
			] as readonly any[]
			obj.body = () => [
				this.Code()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * pages /
		 * 	<= View_page
		 * 	<= Code_page
		 * ```
		 */
		pages() {
			return [
				this.View_page(),
				this.Code_page()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Book $mol_book2
		 * 	Placeholder null
		 * 	pages <= pages
		 * ```
		 */
		@ $mol_mem
		Book() {
			const obj = new this.$.$mol_book2()
			
			obj.Placeholder = () => null as any
			obj.pages = () => this.pages()
			
			return obj
		}
	}
	
}

