namespace $ {
	export const $mol_syntax2_python_code = new $mol_syntax2({
		'code-comment-inline' : /#.*/ ,
		'code-string' : /(?:".*?"|'.*?'| ?\\\\.+?\\\\|\/.+?\/[dygimsu]*(?!\p{Letter})|[ \t]*\\[^\n]*)/u ,
		'code-number' : /[+-]?(?:\d*\.)?\d+\w*/ ,
		'code-call' : /\w+ *(?=\()/ ,
		'code-keyword': /\b(False|await|else|import|pass|None|break|except|in|raise|True|class|finally|is|return|and|continue|for|lambda|try|as|def|from|nonlocal|while|assert|del|global|not|with|async|elif|if|or|yield)\b/,
		'code-decorator' : /@\w+/ ,
	})
}
