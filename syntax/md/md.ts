module $ {
	
	export var $mol_syntax_md_flow = new $mol_syntax({
		'header' : /^(#+)(\s*)(.*?)$(\n?)/ ,
		'code' : /^(```)(\w*)\n([^]*?)^(```)$(\n?)/ ,
		'block' : /^(.*?)$(\n?)/ ,
	})
	
	export var $mol_syntax_md_line = new $mol_syntax({
		'strong' : /\*\*(.+?)\*\*/ ,
		'emphasis' : /\*(.+?)\*/ ,
		'code' : /`(.+?)`/ ,
		'text-link' : /\[(.*?)\]\((.*?)\)/ ,
		'image-link' : /!\[(.*?)\]\((.*?)\)/ ,
	})
	
}
