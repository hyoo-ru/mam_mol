namespace $ {
	export class $mol_text_demo extends $mol_example_small {
		
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
		 * sub / <= Text
		 * ```
		 */
		sub() {
			return [
				this.Text()
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
		 * Text $mol_text text \
		 * 	\# Header level 1
		 * 	\## Header level 2
		 * 	\### Header level 3
		 * 	\#### Header level 4
		 * 	\##### Header level 5
		 * 	\
		 * 	\# List
		 * 	\
		 * 	\- first item
		 * 	\  1. first of first item
		 * 	\  2. second of first item
		 * 	\  > quote as item
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
		 * 	\![](https://mol.hyoo.ru)
		 * 	\
		 * 	\## Inline
		 * 	\
		 * 	\- Badge: [![Deploy](https://github.com/hyoo-ru/mam_mol/actions/workflows/deploy.yml/badge.svg)](https://github.com/hyoo-ru/mam_mol/actions/workflows/deploy.yml)
		 * 	\- Broken images: ![*Alternative* text](https://example.org/404), ![](https://example.org/404)
		 * 	\- Unsafe images: ![*Alternative* text](somescript:document.cookie), ![](somescript:document.cookie)
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
		Text() {
			const obj = new this.$.$mol_text()
			
			obj.text = () => "# Header level 1\n## Header level 2\n### Header level 3\n#### Header level 4\n##### Header level 5\n\n# List\n\n- first item\n  1. first of first item\n  2. second of first item\n  > quote as item\n  > + list inside quote\n- second item\n\n# Inline Formatting\n\n- Some **strong text**\n- Some *emphasis text*\n- Some ~~deleted text~~\n- Some `short_code(\"foo\")` & ```long_code(`${bar}`)```\n- Some \"quoted text\"\n\n# Hyper Link\n\n* Some [link *with* title](http://example.org).\n* Auto http link: http://mol.hyoo.ru, (http://mol.hyoo.ru), http://mol.hyoo.ru.\n* Some [*unsafe* link](somescript:document.cookie).\n\n# Embedding\n\n## Image\n![](https://mol.hyoo.ru/mol/logo/logo.svg)\n\n## Video\n![](https://www.youtube.com/embed/XNt7DEkisKg)\n\n## Site\n![](https://mol.hyoo.ru)\n\n## Inline\n\n- Badge: [![Deploy](https://github.com/hyoo-ru/mam_mol/actions/workflows/deploy.yml/badge.svg)](https://github.com/hyoo-ru/mam_mol/actions/workflows/deploy.yml)\n- Broken images: ![*Alternative* text](https://example.org/404), ![](https://example.org/404)\n- Unsafe images: ![*Alternative* text](somescript:document.cookie), ![](somescript:document.cookie)\n\n# Preformatted Code\n\n```js\nclass SomeCode {\n\twith_prolog: true\n}\n```\n\n\tclass SomeCode {\n\t\twith_indents: true\n\t}\n\n# Table\n\n|           | ~~Column~~ 1 | ~~Column~~ 2 | ~~Column~~ 3\n|-----------|--------------|--------------|-------------\n| ~~Row~~ 1 | ~~Cell~~ 1x1 | ~~Cell~~ 2x1 | ~~Cell~~ 3x1\n| ~~Row~~ 2 | ~~Cell~~ 1x2 | ~~Cell~~ 2x2 | ~~Cell~~ 3x2\n| ~~Row~~ 3 | ~~Cell~~ 1x3 | ~~Cell~~ 2x3 | ~~Cell~~ 3x3\n| ~~Row~~ 4 | ~~Cell~~ 1x4 | ~~Cell~~ 2x4 | ~~Cell~~ 3x4\n| ~~Row~~ 5 | ~~Cell~~ 1x5 | ~~Cell~~ 2x5 | ~~Cell~~ 3x5\n| ~~Row~~ 6 | ~~Cell~~ 1x6 | ~~Cell~~ 2x6 | ~~Cell~~ 3x6\n| ~~Row~~ 7 | ~~Cell~~ 1x7 | ~~Cell~~ 2x7 | ~~Cell~~ 3x7\n| ~~Row~~ 8 | ~~Cell~~ 1x8 | ~~Cell~~ 2x8 | ~~Cell~~ 3x8\n| ~~Row~~ 9 | ~~Cell~~ 1x9 | ~~Cell~~ 2x9 | ~~Cell~~ 3x9\n"
			
			return obj
		}
	}
	
}

