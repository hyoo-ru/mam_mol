	($.$mol_text_demo) = class $mol_text_demo extends ($.$mol_example_large) {
		search(next){
			if(next !== undefined) return next;
			return "";
		}
		Search(){
			const obj = new this.$.$mol_search_jumper();
			(obj.query) = (next) => ((this.search(next)));
			(obj.Root) = () => ((this.View()));
			return obj;
		}
		Edit_icon(){
			const obj = new this.$.$mol_icon_pencil();
			return obj;
		}
		Edit(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"edit": ""});
			(obj.sub) = () => ([(this.Edit_icon())]);
			return obj;
		}
		View(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.text()));
			(obj.highlight) = () => ((this.search()));
			return obj;
		}
		View_page(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("Output");
			(obj.tools) = () => ([(this.Search()), (this.Edit())]);
			(obj.body) = () => ([(this.View())]);
			return obj;
		}
		Close_icon(){
			const obj = new this.$.$mol_icon_cross();
			return obj;
		}
		Close(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"edit": null});
			(obj.sub) = () => ([(this.Close_icon())]);
			return obj;
		}
		text(next){
			if(next !== undefined) return next;
			return "# Header level 1\n## Header level 2\n### Header level 3\n#### Header level 4\n##### Header level 5\n###### Header level 6\n\n# List\n\n- first item\n  1. first of first item\n  2. second of first item\n  > quote as item\n  > > quote in quote\n  > + list inside quote\n- second item\n\n# Inline Formatting\n\n- Some **strong text**\n- Some *emphasis text*\n- Some ~~deleted text~~\n- Some `short_code(\"foo\")` & ```long_code(`${bar}`)```\n- Some \"quoted text\"\n\n# Hyper Link\n\n* Some [link *with* title](http://example.org).\n* Auto http link: http://mol.hyoo.ru, (http://mol.hyoo.ru), http://mol.hyoo.ru.\n* Some [*unsafe* link](somescript:document.cookie).\n\n# Embedding\n\n## Image\n![](https://mol.hyoo.ru/mol/logo/logo.svg)\n\n## Video\n![](https://www.youtube.com/embed/XNt7DEkisKg)\n\n## Site\n![](https://life.hyoo.ru)\n\n## Inline\n\n- Badge: [![Deploy](https://github.com/hyoo-ru/mam_mol/actions/workflows/deploy.yml/badge.svg)](https://github.com/hyoo-ru/mam_mol/actions/workflows/deploy.yml)\n- Broken images: ![*Alternative* text](https://example.org/404.png) ![](https://example.org/404.svg)\n- Unsafe images: ![*Alternative* text](somescript:document.cookie) ![](somescript:document.cookie)\n\n# Preformatted Code\n\n```js\nclass SomeCode {\n\twith_prolog: true\n}\n```\n\n\tclass SomeCode {\n\t\twith_indents: true\n\t}\n\n# Table\n\n|           | ~~Column~~ 1 | ~~Column~~ 2 | ~~Column~~ 3\n|-----------|--------------|--------------|-------------\n| ~~Row~~ 1 | ~~Cell~~ 1x1 | ~~Cell~~ 2x1 | ~~Cell~~ 3x1\n| ~~Row~~ 2 | ~~Cell~~ 1x2 | ~~Cell~~ 2x2 | ~~Cell~~ 3x2\n| ~~Row~~ 3 | ~~Cell~~ 1x3 | ~~Cell~~ 2x3 | ~~Cell~~ 3x3\n| ~~Row~~ 4 | ~~Cell~~ 1x4 | ~~Cell~~ 2x4 | ~~Cell~~ 3x4\n| ~~Row~~ 5 | ~~Cell~~ 1x5 | ~~Cell~~ 2x5 | ~~Cell~~ 3x5\n| ~~Row~~ 6 | ~~Cell~~ 1x6 | ~~Cell~~ 2x6 | ~~Cell~~ 3x6\n| ~~Row~~ 7 | ~~Cell~~ 1x7 | ~~Cell~~ 2x7 | ~~Cell~~ 3x7\n| ~~Row~~ 8 | ~~Cell~~ 1x8 | ~~Cell~~ 2x8 | ~~Cell~~ 3x8\n| ~~Row~~ 9 | ~~Cell~~ 1x9 | ~~Cell~~ 2x9 | ~~Cell~~ 3x9\n";
		}
		Code(){
			const obj = new this.$.$mol_textarea();
			(obj.value) = (next) => ((this.text(next)));
			return obj;
		}
		Code_page(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("Input");
			(obj.tools) = () => ([(this.Close())]);
			(obj.body) = () => ([(this.Code())]);
			return obj;
		}
		pages(){
			return [(this.View_page()), (this.Code_page())];
		}
		Book(){
			const obj = new this.$.$mol_book2();
			(obj.Placeholder) = () => (null);
			(obj.pages) = () => ((this.pages()));
			return obj;
		}
		title(){
			return "Markdown visualization example";
		}
		sub(){
			return [(this.Book())];
		}
		tags(){
			return ["markdown", "marked"];
		}
		aspects(){
			return ["Widget/Text", "Type/String"];
		}
	};
	($mol_mem(($.$mol_text_demo.prototype), "search"));
	($mol_mem(($.$mol_text_demo.prototype), "Search"));
	($mol_mem(($.$mol_text_demo.prototype), "Edit_icon"));
	($mol_mem(($.$mol_text_demo.prototype), "Edit"));
	($mol_mem(($.$mol_text_demo.prototype), "View"));
	($mol_mem(($.$mol_text_demo.prototype), "View_page"));
	($mol_mem(($.$mol_text_demo.prototype), "Close_icon"));
	($mol_mem(($.$mol_text_demo.prototype), "Close"));
	($mol_mem(($.$mol_text_demo.prototype), "text"));
	($mol_mem(($.$mol_text_demo.prototype), "Code"));
	($mol_mem(($.$mol_text_demo.prototype), "Code_page"));
	($mol_mem(($.$mol_text_demo.prototype), "Book"));

//# sourceMappingURL=demo.view.tree.js.map