module $ {
	
	export var $mol_syntax_md_flow = new $mol_syntax({
		'header' : /^(#+)(\s*)(.*?)$([\n\r]*)/ ,
		'list-item' : /^(\s?\*\s+)(.*?)$([\n\r]*)/ ,
		'code' : /^(```)(\w*)[\r\n]+([^]*?)^(```)$([\n\r]*)/ ,
		'block' : /^(.*?(?:\r?\n.+?)*)$((?:\r?\n)*)/ ,
	})
	
	export var $mol_syntax_md_line = new $mol_syntax({
		'strong' : /\*\*(.+?)\*\*/ ,
		'emphasis' : /\*(.+?)\*/ ,
		'code' : /`(.+?)`/ ,
		'text-link' : /\[(.*?(?:\[.*?\].*?)*)\]\((.*?)\)/ ,
		'image-link' : /!\[([^\[\]]*?)\]\((.*?)\)/ ,
	})
	
}
