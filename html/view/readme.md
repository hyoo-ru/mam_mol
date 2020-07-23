# $mol_html_view

Safe virtualized view of raw HTML.

## Usage example

```view.tree
<= Message $mol_html_view
	html <= message \<i>empty message</i>
```

## Properties

**`html() : string`**

Raw HTML. Unknown tags will be transparent ignored.

**`xss_uri() : string`** 

Link to xss logger service. Don't use `javascript:` like protocols.
