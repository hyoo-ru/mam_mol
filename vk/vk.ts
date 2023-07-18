namespace $ {
	
	export class $mol_vk extends $mol_object2 {
		
		static init() {
			this.send( 'VKWebAppInit' )
		}
		
		static send( handler: string, params: Record< string, any > = {} ) {
			
			const glob = $mol_dom_context as any
			
			glob.AndroidBridge?.[ handler ]( JSON.stringify( params ) )
			glob.webkit.messageHandlers?.[ handler ].postMessage( params )
			glob.ReactNativeWebView?.postMessage({ handler, params })
			glob.parent.postMessage({ handler, params, type: 'vk-connect' }, '*')
			
		}
		
	}
	
	setTimeout( ()=> $mol_vk.init() )
	
}