	($.$mol_html_view_demo) = class $mol_html_view_demo extends ($.$mol_example) {
		title(){
			return "View raw HTML";
		}
		sub(){
			return [(this.Html())];
		}
		tags(){
			return ["html", "render"];
		}
		aspects(){
			return ["Widget", "Type/HTML"];
		}
		Html(){
			const obj = new this.$.$mol_html_view();
			(obj.html) = () => (" <h1>HTML Example</h1>\n <h2>Headings</h2>\n \t<h3>Level 3</h3>\n \t<h4>Level 4</h4>\n \t<h5>Level 5</h5>\n \t<h6>Level 6</h6>\n <h2>Inline elements</h2>\n <p>\n \t<strong>strong</strong>,\n \t<em>emphasis</em>,\n \t<ins>inserted</ins>,\n \t<del>deleted</del>,\n \t<br />\n \t<b>bold</b>,\n \t<i>italic</i>,\n \t<u>underlined</u>,\n \t<s>strikethrough</s>,\n \t<br />\n \t<code>code</code>,\n \t<a href=\"#\">safe link</a>,\n \t<a href=\"javascript:alert(1)\">unsafe link</a>,\n \tnormal text.\n </p>\n <h2>Media elements</h2>\n <p>\n \t<img src=\"https://mol.hyoo.ru/mol/logo/logo.svg\" />\n </p>\n <h2>Block elements</h2>\n <blockquote><p>Block quotation</p></blockquote>\n <pre><code>Block code</code></pre>");
			return obj;
		}
	};
	($mol_mem(($.$mol_html_view_demo.prototype), "Html"));

//# sourceMappingURL=demo.view.tree.js.map