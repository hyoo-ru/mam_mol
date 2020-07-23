# $mol_html_view

Safe virtualized view of raw HTML.

## [Online demo](http://mol.js.org/#demo=mol_html_view_demo)

## Usage example

```view.tree
<= Message $mol_html_view
	html <= message \<i>empty message</i>
```

## Properties

**`html() : string`**

Raw HTML. Unknown tags are transparently ignored.

**`xss_uri() : string`** 

Link to xss logger service. Don't use `javascript:` like protocols.
