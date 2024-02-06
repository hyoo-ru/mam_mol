/** @jsx $mol_jsx */
namespace $ {
	
	export class $mol_rest_resource_fs extends $mol_rest_resource {
		
		@ $mol_memo.method
		_root() { return $mol_file.relative( __dirname ) }
		
		GET( msg: $mol_rest_message ) {
			
			const root = this._root()
			const file = root.resolve( msg.uri().pathname )
			if( !file.exists() ) return msg.reply( null, { code: 404 } )
			
			switch( file.type() ) {
				
				case 'file': {
					
					return msg.reply( file.buffer(), {
						type: $mol_file_extensions[ file.ext().replace( /^.*\./, '' ) ],
					} )
					
				}
				
				case 'dir': {
					
					const index = file.resolve( './index.html' )
					if( index.exists() ) return msg.reply( index.buffer(), { type: 'text/html' } )
					
					const resources = Object.getOwnPropertyNames( Object.getPrototypeOf( this ) )
				
					return msg.reply( <body>
						
						<style>{`
							body { background: black; font: 1rem/1.5rem monospace }
							a { color: royalblue; text-decoration: none }
							a:hover { color: skyblue }
						`}</style>
						
						{ resources.map( res => {
							if( res === 'constructor' ) return null
							const uri = root.resolve( res )
							return <a href={ uri.relate( file ) + '/' }>/{res}/<br/></a>
						} ) }
						
						{ file.sub().map( kid => {
							const uri = kid.name() + ( kid.type() === 'dir' ? '/' : '' )
							return <a href={uri}>{uri}<br/></a>
						} ) }
						
					</body> )
					
				}
				
			}
			
		}
		
	}
	
}
