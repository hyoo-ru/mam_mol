namespace $ {
	export class $mol_browser extends $mol_object2 {
		
		@ $mol_mem
		static window() {
			
			$mol_wire_solid()
			
			const window = $mol_wire_sync( $node.puppeteer ).launch({
				headless: true,
				waitForInitialPage: false,
				defaultViewport: {
					width: 1024,
					height: 1e5,
				}
			})
			
			return $mol_wire_sync( window )
		}
		
		@ $mol_action
		static async strip_scripts( page: InstanceType< typeof $node.puppeteer.Page > ) {
			const scripts = await page.$$( 'script' )
			return Promise.all(
				scripts.map(
					script => script.evaluate(
						node => node.remove()
					)
				)
			)
		}
		
		@ $mol_wire_method
		static html( uri: string ) {
			
			const page = $mol_wire_sync( this.window().newPage() )
			
			try {
				
				page.goto( uri, { waitUntil: "networkidle0" } )
				
				// prevent rehydration
				this.strip_scripts( page.valueOf() as any ) 
				
				const html = page.content()
				page.close()
				return html
				
			} catch( error: unknown ) {
				
				if(!( error instanceof Promise )) page.close()
				$mol_fail_hidden( error )
				
			}

		}
		
	}
}
