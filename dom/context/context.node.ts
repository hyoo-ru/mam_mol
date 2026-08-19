namespace $ {
	
	$.$mol_dom_context = new $node.jsdom.JSDOM( '' , { url : `http://${ process.env.DOMAIN || 'localhost' }/` } ).window as any
	
}
