namespace $ {
	
	export var $mol_syntax_md_flow = new $mol_syntax({
		'quote' : /^((?:(?:> )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/ ,
		'header' : /^(#+)(\s*)(.*?)$([\n\r]*)/ ,
		'list' :  /^((?:(?:\s?[*+-]|\d+\.)\s+(?:[^]*?)$(?:\r?\n?))+)((?:\r?\n)*)/ ,
		'code' : /^(```\s*)(\w*)[\r\n]+([^]*?)^(```)$([\n\r]*)/ ,
		'code-indent' : /^((?:(?:  |\t)(?:[^]*?)$([\n\r]*))+)/ ,
		'table' : /((?:^\|.+?$\r?\n)+)([\n\r]*)/ ,
		'block' : /^(.*?(?:\r?\n.+?)*)$((?:\r?\n)*)/ ,
	})
	
	export var $mol_syntax_md_line = new $mol_syntax({
		'strong' : /\*\*(.+?)\*\*/ ,
		'emphasis' : /\*(?!\s)(.+?)\*/ ,
		'code3' : /```(.+?)```/ ,
		'code' : /`(.+?)`/ ,
		'strike' : /~~(.+?)~~/ ,
		'text-link' : /\[(.*?(?:\[.*?\].*?)*)\]\((.*?)\)/ ,
		'image-link' : /!\[([^\[\]]*?)\]\((.*?)\)/ ,
	})
	
	export const $mol_syntax_md_code = new $mol_syntax({
		'code-docs' : /\/\/\/.*?$/ ,
		'code-comment-block' : /(?:\/\*[^]*?\*\/|\/\+[^]*?\+\/|<![^]*?>)/ ,
		'code-link' : /\w+:\/\/\S*/ ,
		'code-comment-inline' : /(?:\/\/|# |-- ).*?$/ ,
		'code-string' : /(?:".*?"|'.*?'|`.*?`|\/.+?\/[gmi]*|(?:^|[ \t])\\[^\n]*\n)/ ,
		'code-number' : /[+-]?(?:\d*\.)?\d+\w*/ ,
		'code-call' : /\.?\w+(?=\()/ ,
		'code-field' : /(?:\.\w+|[\w-]+\??\s*:(?!\/\/))/ ,
		'code-keyword' : /\b(class|interface|type|function|extends|implements|module|namespace|import|export|include|require|var|let|const|for|do|while|until|in|out|inout|of|new|if|then|else|switch|case|this|return|async|await|try|catch|break|continue|get|set|public|private|protected|string|boolean|number|null|undefined|true|false|void)\b/ ,
		'code-global' : /[$]\w*/ ,
		'code-decorator' : /@\s*\S+/ ,
		'code-tag' : /<\/?[\w-]+\/?>?/ ,
		'code-punctuation' : /[\-\[\]\{\}\(\)<=>`~!\?@#\$%&\*_\+\\\/\|'";:\.,\^]/ ,
	})
	
}
