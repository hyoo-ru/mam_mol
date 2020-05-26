namespace $ {
	
	export var $mol_syntax2_md_flow = new $mol_syntax2({
		'quote' : /^((?:(?:> )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/ ,
		'header' : /^(#+)(\s*)(.*?)$([\n\r]*)/ ,
		'list' :  /^((?:(?:\s?[*+-]|\d+\.)\s+(?:[^]*?)$(?:\r?\n?))+)((?:\r?\n)*)/ ,
		'code' : /^(```\s*)(\w*)[\r\n]+([^]*?)^(```)$([\n\r]*)/ ,
		'code-indent' : /^((?:(?:  |\t)(?:[^]*?)$([\n\r]*))+)/ ,
		'table' : /((?:^\|.+?$\r?\n)+)([\n\r]*)/ ,
		'block' : /^(.*?(?:\r?\n.+?)*)$((?:\r?\n)*)/ ,
	})
	
	export var $mol_syntax2_md_line = new $mol_syntax2({
		'strong' : /\*\*(.+?)\*\*/ ,
		'emphasis' : /\*(?!\s)(.+?)\*/ ,
		'code3' : /```(.+?)```/ ,
		'code' : /`(.+?)`/ ,
		'strike' : /~~(.+?)~~/ ,
		'text-link' : /\[(.*?(?:\[.*?\].*?)*)\]\((.*?)\)/ ,
		'image-link' : /!\[([^\[\]]*?)\]\((.*?)\)/ ,
	})
	
	export const $mol_syntax2_md_code = new $mol_syntax2({
		'code-docs' : /\/\/\/.*?$/ ,
		'code-comment-block' : /(?:\/\*[^]*?\*\/|\/\+[^]*?\+\/|<![^]*?>)/ ,
		'code-link' : /\w+:\/\/\S*/ ,
		'code-comment-inline' : /\/\/.*?$/ ,
		'code-string' : /(?:".*?"|'.*?'|`.*?`|\/.+?\/[gmi]*\b|(?:^|[ \t])\\[^\n]*\n)/ ,
		'code-number' : /[+-]?(?:\d*\.)?\d+\w*/ ,
		'code-call' : /\.?\w+(?=\()/ ,
		'code-field' : /(?:\.\w+|[\w-]+\??\s*:(?!\/\/))/ ,
		'code-keyword' : /\b(throw|readonly|unknown|keyof|typeof|never|from|class|interface|type|function|extends|implements|module|namespace|import|export|include|require|var|let|const|for|do|while|until|in|of|new|if|then|else|switch|case|this|return|async|await|try|catch|break|continue|get|set|public|private|protected|string|boolean|number|null|undefined|true|false|void)\b/ ,
		'code-global' : /[$]\w*|\b[A-Z]\w*/ ,
		'code-decorator' : /@\s*\S+/ ,
		'code-tag' : /<\/?[\w-]+\/?>?|&\w+;/ ,
		'code-punctuation' : /[\-\[\]\{\}\(\)<=>`~!\?@#\$%&\*_\+\\\/\|'";:\.,\^]/ ,
	})
	
}
