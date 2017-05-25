namespace $ {
	
	export var $mol_syntax_md_flow = new $mol_syntax({
		'quote' : /^(?:>\s+)(.*?)$([\n\r]*)/ ,
		'header' : /^(#+)(\s*)(.*?)$([\n\r]*)/ ,
		'list-item' : /^(\s?[*-]\s+)(.*?)$([\n\r]*)/ ,
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
	
	export const $mol_syntax_md_code = new $mol_syntax({
		'code-docs' : /\/\/\/.*?$/ ,
		'code-comment-inline' : /\/\/.*?$/ ,
		'code-comment-block' : /(?:\/\*[^]*?\*\/|\/\+[^]*?\+\/)/ ,
		'code-string' : /(?:".*?"|'.*?'|`.*?`|\/.*?\/[gmi]*)/ ,
		'code-number' : /[+-]?(?:\d*\.)?\d+\w*/ ,
		'code-keyword' : /\b(class|function|extends|implements|module|import|include|var|let|const|for|do|while|until|in|new|if|then|else|switch|case|this|return|async|await|try|catch)\b/ ,
		'code-call' : /\.?\w+(?=\()/ ,
		'code-field' : /(?:\.\w+|[\w-]+:)/ ,
		'code-global' : /[$]\w*/ ,
		'code-decorator' : /@.*?$/ ,
		'code-punctuation' : /-[\[\]{}()<=>`~!@#$%&*_+\\\/|'";:.,^]/ ,
	})
	
}
