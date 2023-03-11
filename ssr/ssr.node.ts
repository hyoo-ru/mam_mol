namespace $ {

	function removeQueryParam( parameters: string[] = [], url: string ) {
		try {
			let urlParts = url.split( '?' )
			let params = new URLSearchParams( urlParts[ 1 ] )
			parameters.forEach( param => {
				params.delete( param )
			} )
			return urlParts[ 0 ] + '?' + params.toString()
		} catch( err ) {
			console.log( err )
			return url
		}
	}

	export function $mol_ssr() {
		const puppeteer = $node[ 'puppeteer' ]

		async function ssr( url: string ) {
			const browser = await puppeteer.launch( { headless: true } )
			const page = await browser.newPage()
			await page.goto( url, { waitUntil: 'networkidle0' } )
			const html = await page.content() // serialized HTML of page DOM.
			await browser.close()
			return html
		}

		const express = $node[ "express" ]
		const app = express()
		const port = 3000
		app.use( async function( req: any, res: any, next: any ) {
			if( req.query._escaped_fragment_ ) {
				const url = removeQueryParam( [ "_escaped_fragment_" ], req.url )
				res.send( await ssr( `http://localhost:${ port }/${ url }` ) )
				res.end()
				return
			}
			next()
		} )
		app.use( express.static( __dirname ) )
		app.listen( port, () => {
			console.log( `Example app listening on port ${ port }` )
		} )
	}

}
