namespace $.$$ {
	
	export class $mol_embed_pdf extends $.$mol_embed_pdf {
		
		@ $mol_mem
		document( doc? : any , force? : $mol_mem_force ) : any {
			return $mol_fiber_sync( ()=> $lib_pdfjs.getDocument( this.uri() ).promise as PromiseLike<any> )()
		}
		
		@ $mol_mem_key
		page( index : number , page? : any , force? : $mol_mem_force ) : any {
			return $mol_fiber_sync( ()=> this.document().getPage( index + 1 ) )()
		}
		
		pages() {
			return $mol_range_in({
				item : index => this.Page( index ) ,
				length : this.document().numPages ,
			}).valueOf() as any[]
		}
		
	}
	
	export class $mol_embed_pdf_page extends $.$mol_embed_pdf_page {
		
		viewport() {
			return this.page().getViewport( this.scale_over() )
		}
		
		zoom() {
			return this.scale() / this.scale_over()
		}
		
		width() {
			return Math.floor( this.viewport().width )
		}
		
		height() {
			return Math.floor( this.viewport().height )
		}
		
		minimal_width() {
			return this.width() * this.zoom()
		}
		
		minimal_height() {
			return this.height() * this.zoom()
		}
		
		@ $mol_mem
		paint( next? : any , force? : $mol_mem_force ) : any {
			this.page().render({
				canvasContext : ( this.dom_node() as HTMLCanvasElement ).getContext( '2d' ) ,
				viewport : this.viewport() ,
		    })
			.then( ()=> this.paint( null , $mol_mem_force_cache ) )
			.catch( ( error : any )=> this.paint( error , $mol_mem_force_cache ) )
			
			throw new $mol_atom_wait( 'Painting...' )
		}
		
		render() {
			super.render()
			this.paint()
		}

	}
	
}
