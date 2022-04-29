namespace $ {
	export class $mol_html_view_demo extends $mol_example {
		
		/**
		 * ```tree
		 * title \View raw HTML
		 * ```
		 */
		title() {
			return "View raw HTML"
		}
		
		/**
		 * ```tree
		 * sub / <= Html
		 * ```
		 */
		sub() {
			return [
				this.Html()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_scroll
		 * 	\html
		 * 	\render
		 * ```
		 */
		tags() {
			return [
				"$mol_scroll",
				"html",
				"render"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Html $mol_html_view html \
		 * 	\ <h1>HTML Example</h1>
		 * 	\ <h2>Headings</h2>
		 * 	\ 	<h3>Level 3</h3>
		 * 	\ 	<h4>Level 4</h4>
		 * 	\ 	<h5>Level 5</h5>
		 * 	\ 	<h6>Level 6</h6>
		 * 	\ <h2>Inline elements</h2>
		 * 	\ <p>
		 * 	\ 	<strong>strong</strong>,
		 * 	\ 	<em>emphasis</em>,
		 * 	\ 	<ins>inserted</ins>,
		 * 	\ 	<del>deleted</del>,
		 * 	\ 	<br />
		 * 	\ 	<b>bold</b>,
		 * 	\ 	<i>italic</i>,
		 * 	\ 	<u>underlined</u>,
		 * 	\ 	<s>strikethrough</s>,
		 * 	\ 	<br />
		 * 	\ 	<code>code</code>,
		 * 	\ 	<a href="#">safe link</a>,
		 * 	\ 	<a href="javascript:alert(1)">unsafe link</a>,
		 * 	\ 	normal text.
		 * 	\ </p>
		 * 	\ <h2>Media elements</h2>
		 * 	\ <p>
		 * 	\ 	<img src="https://mol.hyoo.ru/mol/logo/logo.svg" />
		 * 	\ </p>
		 * 	\ <h2>Block elements</h2>
		 * 	\ <blockquote><p>Block quotation</p></blockquote>
		 * 	\ <pre><code>Block code</code></pre>
		 * ```
		 */
		@ $mol_mem
		Html() {
			const obj = new this.$.$mol_html_view()
			
			obj.html = () => " <h1>HTML Example</h1>\n <h2>Headings</h2>\n \t<h3>Level 3</h3>\n \t<h4>Level 4</h4>\n \t<h5>Level 5</h5>\n \t<h6>Level 6</h6>\n <h2>Inline elements</h2>\n <p>\n \t<strong>strong</strong>,\n \t<em>emphasis</em>,\n \t<ins>inserted</ins>,\n \t<del>deleted</del>,\n \t<br />\n \t<b>bold</b>,\n \t<i>italic</i>,\n \t<u>underlined</u>,\n \t<s>strikethrough</s>,\n \t<br />\n \t<code>code</code>,\n \t<a href=\"#\">safe link</a>,\n \t<a href=\"javascript:alert(1)\">unsafe link</a>,\n \tnormal text.\n </p>\n <h2>Media elements</h2>\n <p>\n \t<img src=\"https://mol.hyoo.ru/mol/logo/logo.svg\" />\n </p>\n <h2>Block elements</h2>\n <blockquote><p>Block quotation</p></blockquote>\n <pre><code>Block code</code></pre>"
			
			return obj
		}
	}
	
}

