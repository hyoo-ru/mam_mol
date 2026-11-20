namespace $ {
	
	export var $mol_syntax2_md_flow = new $mol_syntax2({
		'quote' : /^((?:(?:[>"] )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/ ,
		'spoiler' : /^((?:(?:[\?] )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/ ,
		'header' : /^([#=]+)(\s+)(.*?)$([\n\r]*)/ ,
		'list' :  /^((?:(?: ?([*+-])|(?:\d+[\.\)])+) +(?:[^]*?)$(?:\r?\n?)(?:  (?:[^]*?)$(?:\r?\n?))*)+)((?:\r?\n)*)/ ,
		'code' : /^(```)([\w.-]*)[\r\n]+([^]*?)^(```)$([\n\r]*)/ ,
		'code-indent' : /^((?:(?: |\t)(?:[^]*?)$\r?\n?)+)([\n\r]*)/ ,
		'table' : /((?:^\|.+?$\r?\n?)+)([\n\r]*)/ ,
		'grid' : /((?:^ *! .*?$\r?\n?)+)([\n\r]*)/ ,
		'cut' : /^--+$((?:\r?\n)*)/ ,
		'block' : /^(.*?)$((?:\r?\n)*)/ ,
	})
	
	export var $mol_syntax2_md_line = new $mol_syntax2({
		'strong' : /\*\*(.+?)\*\*/ ,
		'emphasis' : /\*(?!\s)(.+?)\*|\/\/(?!\s)(.+?)\/\// ,
		'code' : /```(.+?)```|;;(.+?);;|`(.+?)`/ ,
		'insert' : /\+\+(.+?)\+\+/ ,
		'delete' : /~~(.+?)~~|--(.+?)--/ ,
		// 'remark' : /(\()(.+?)(\))/ ,
		// 'quote' : /(")(.+?)(")/ ,
		'embed' : /""(?:(.*?)\\)?(.*?)""/ ,
		'link' : /\\\\(?:(.*?)\\)?(.*?)\\\\/ ,
		'image-link' : /!\[([^\[\]]*?)\]\((.*?)\)/ ,
		'text-link' : /\[(.*?(?:\[[^\[\]]*?\][^\[\]]*?)*)\]\((.*?)\)/ ,
		'text-link-http' : /\b(https?:\/\/[^\s,.;:!?")]+(?:[,.;:!?")][^\s,.;:!?")]+)+)/ ,
	})
	
	/** Lookbehind is a syntax error for Safari before 16.4, so it's compiled at runtime and never matches there. */
	export function $mol_syntax2_md_lookbehind( source : string ) {
		try {
			return new RegExp( source )
		} catch {
			return /(?!)/
		}
	}
	
	export const $mol_syntax2_md_code = new $mol_syntax2({
		'code-indent' : /\t+/ ,
		'code-docs' : /\/\/\/.*?$/ ,
		'code-comment-block' : /(?:\/\*[^]*?\*\/|\/\+[^]*?\+\/|<![^]*?>)/ ,
		'code-link' : /(?:\w+:\/\/|#)\S+?(?=\s|\\\\|""|$)/ ,
		'code-comment-inline' : $mol_syntax2_md_lookbehind( String.raw`\/\/.*?(?:$|\/\/)|- \\(?!\\).*|(?<=^| )#!? .*` ) ,
		'code-string' : /(?:".*?"|'.*?'|`.*?`| ?\\\\.+?\\\\|\/.+?\/[dygimsu]*(?!\p{Letter})|[ \t]*\\[^\n]*)/u ,
		'code-number' : /[+-]?(?:\d*\.)?\d+(\uFE0F.|\w*)/ ,
		'code-call' : /\.?\w+(?=\()/ ,
		'code-sexpr' : /\((\w+ )/ ,
		'code-field' : $mol_syntax2_md_lookbehind( String.raw`(?:(?<=\.|::|->)[a-z][\w-]*|(?<=[, \t] |\t)[\w-]+\??:(?!\/\/|:))` ) ,
		'code-keyword' : $mol_syntax2_md_lookbehind( String.raw`(?<=^|\t|[ )(}{=] )((throw|readonly|unknown|keyof|typeof|never|from|class|struct|interface|type|function|extends|implements|module|namespace|import|export|include|require|var|val|let|const|for|do|while|until|in|out|of|new|if|then|else|switch|case|return|async|await|yield|try|catch|break|continue|get|set|public|private|protected|void|int|float|ref)( |$|;))+` ) ,
		'code-global' : /[$]+\w*|\b[A-Z][a-z0-9]+[A-Z]\w*/ ,
		'code-word' : /\w+/ ,
		'code-decorator' : $mol_syntax2_md_lookbehind( String.raw`(?<=^|  |\t)@\s*\S+` ) ,
		'code-tag' : /<\/?[\w-]+\/?>?|&\w+;/ ,
		'code-punctuation' : /[\-\[\]\{\}\(\)<=>~!\?@#%&\*_\+\\\/\|;:\.,\^]+?/ ,
	})
	
}
