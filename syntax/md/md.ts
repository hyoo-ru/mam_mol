namespace $ {
	
	export var $mol_syntax_md_flow = new $mol_syntax({
		'header' : /^(#+)(\s*)(.*?)$([\n\r]*)/ ,
		'list-item' : /^(\s?\*\s+)(.*?)$([\n\r]*)/ ,
		'code' : /^(```)(\w*)[\r\n]+([^]*?)^(```)$([\n\r]*)/ ,
		'code-indent' : /^((?:(?:  |\t)(?:[^]*?)$([\n\r]*))+)/ ,
		'table' : /((?:^\|.+?$\r?\n)+)([\n\r]*)/ ,
		'block' : /^(.*?(?:\r?\n.+?)*)$((?:\r?\n)*)/ ,
	})
	
	export var $mol_syntax_md_line = new $mol_syntax({
		'strong' : /\*\*(.+?)\*\*/ ,
		'emphasis' : /\*(.+?)\*/ ,
		'code3' : /```(.+?)```/ ,
		'code' : /`(.+?)`/ ,
		'strike' : /~~(.+?)~~/ ,
		'text-link' : /\[(.*?(?:\[.*?\].*?)*)\]\((.*?)\)/ ,
		'image-link' : /!\[([^\[\]]*?)\]\((.*?)\)/ ,
	})
	
}
