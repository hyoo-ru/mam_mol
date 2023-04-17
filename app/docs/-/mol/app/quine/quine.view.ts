namespace $.$$ {
	
	export class $mol_app_quine extends $.$mol_app_quine {
		
		content() {
			const paths = this.paths()
			
			const sources = paths.map( path => {
				return $mol_file.relative( path ).text().toString()
			} )
			
			const content = sources.map( ( source , index )=> {
				const header = `# ${ paths[ index ].replace( /.*\// , '' ) }\n`
				const code = '```\n' + source.replace( /\n+$/ , '' ) + '\n```\n'
				return `${ header }\n${ code }`
			} ).join( '\n' )
			
			return content
		}
		
	}
	
}
