/** @jsx $mol_jsx */
namespace $ {
	
	export async function $mol_dom_capture_svg( root: Element ) {
		
		function restyle( el: HTMLElement, styles: CSSStyleDeclaration ) {
			const def = $mol_dom.getComputedStyle( el )
			for( let i = 0; i < styles.length; ++i ) {
				const prop = styles[ i ]
				if( styles[ prop as any ] === def[ prop as any ] ) continue
				el.style[ prop as any ] = styles[ prop as any ]
			}
		}
		
		function clone( el: Element ) {
			
			const re = el.cloneNode() as HTMLElement
			// if( el === root ) document.body.appendChild( re )
			
			if( el instanceof HTMLImageElement && !/^(data|blob):/.test( el.src ) ) {
				
				const canvas = <canvas width={ el.naturalWidth } height={ el.naturalHeight } ></canvas> as HTMLCanvasElement
				const context = canvas.getContext( '2d' )!
				context.drawImage( el, 0, 0 )
				
				try {
					;( re as HTMLImageElement ).src = canvas.toDataURL() // external urls don't works
				} catch( error ) {
					$mol_fail_log( error ) // CORS don't supported
				}
				
			}
			
			if( re instanceof HTMLInputElement ) {
				re.setAttribute( 'value', ( el as HTMLInputElement ).value )
				if( ( el as HTMLInputElement ).checked ) re.setAttribute( 'checked', '' )
			}

			if( re instanceof HTMLTextAreaElement ) {
				re.setAttribute( 'value', ( el as HTMLTextAreaElement ).value )
			}

			const styles = $mol_dom_context.getComputedStyle( el as HTMLElement )
			restyle( re, styles )

			const before = $mol_dom_context.getComputedStyle( el as HTMLElement, ':before' )
			if( before.content[0] === '"' ) {
				const kid = <span>{ JSON.parse( before.content ) }</span>
				restyle( kid, before )
				re.appendChild( kid )
			}
			
			for( const kid of el.childNodes ) {
				const dup = ( kid.nodeType === kid.ELEMENT_NODE )
					? clone( kid as Element )
					: kid.cloneNode()
				re.appendChild( dup )
			}
			
			const after = $mol_dom_context.getComputedStyle( el as HTMLElement, ':after' )
			if( after.content[0] === '"' ) {
				const kid = <span>{ JSON.parse( after.content ) }</span>
				restyle( kid, after )
				re.appendChild( kid )
			}
			
			// if( el === root ) document.body.removeChild( re )
			
			return re
		}

		const { width, height } = root.getBoundingClientRect()
		
		const dup = clone( root )
		dup.style.margin = '0'
		
		return <svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox={ `0 0 ${ width } ${ height }` }
				width={ String( width ) }
				height={ String( height ) }
			>
			<foreignObject
				xmlns="http://www.w3.org/2000/svg"
				width={ String( width ) }
				height={ String( height ) }
			>
				{ dup }
			</foreignObject>
		</svg>
		
	}
	
	export async function $mol_dom_capture_image( el: Element ) {
		
		const xml = $mol_dom_serialize( await $mol_dom_capture_svg( el ) )
		const uri = 'data:image/svg+xml,' + encodeURIComponent( xml )
		
		const image = <img src={ uri } /> as HTMLImageElement
		await wait_load( image )
	
		return image
	}
	
	export async function $mol_dom_capture_canvas( el: Element ) {
		
		const image = await $mol_dom_capture_image( el )
		
		const canvas = <canvas width={ image.width } height={ image.height } ></canvas> as HTMLCanvasElement
		const context = canvas.getContext( '2d' )!
		
		context.drawImage( image, 0, 0 )

		return canvas
	}

	function wait_load( el: {
		onload: null | ( ( value: any )=> any ),
		onerror: null | ( ( error: Event )=> any ),
	} ) {
		return new Promise< typeof el >( ( done, fail )=> {
			el.onload = ()=> done( el )
			el.onerror = fail
		} )
	}
	
}
