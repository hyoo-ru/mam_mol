module $.$mol {
	
	export class $mol_app_quine extends $.$mol_app_quine {
		
		content() {
			
			const paths = [
				'/mol/app/quine/quine.view.tree' ,
				'/mol/app/quine/quine.view.ts' ,
				'/mol/app/quine/quine.view.css' ,
				'/mol/app/quine/index.html' ,
			]
			
			const sources = paths.map( path => {
				return $mol_http_resource.item( path ).text()
			} )
			
			const content = sources.map( ( source , index )=> {
				const header = `# ${ paths[ index ] }\n`
				const code = '```\n' + source.replace( /\n+$/ , '' ) + '\n```\n'
				return `${ header }\n${ code }`
			} ).join( '\n' )
			
			return content
		}
		
	}
	
}
