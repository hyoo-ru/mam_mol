namespace $.$$ {
	
	export class $mol_embed_pdf extends $.$mol_embed_pdf {
		
		@ $mol_mem
		document( doc? : any , force? : $mol_atom_force ) : any {
			var loadingTask = $lib_pdfjs.getDocument( this.uri() ).promise
			.then( ( doc : any )=> this.document( doc , $mol_atom_force_cache ) )
			.catch( ( error : Error )=> this.document( error , $mol_atom_force_cache ) )
			
			throw new $mol_atom_wait( `Loading PDF document: ${ this.uri() }` )
		}
		
		@ $mol_mem_key
		page( index : number , page? : any , force? : $mol_atom_force ) : any {
			this.document().getPage( index + 1 )
			.then( ( page : any )=> this.page( index , page , $mol_atom_force_cache ) )
			.catch( ( error : Error )=> this.page( index , error , $mol_atom_force_cache ) )
			
			throw new $mol_atom_wait( `Rendering PDF page=${ index }` )
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
		paint( next? : any , force? : $mol_atom_force ) : any {
			this.page().render({
				canvasContext : ( this.dom_node() as HTMLCanvasElement ).getContext( '2d' ) ,
				viewport : this.viewport() ,
		    })
			.then( ()=> this.paint( null , $mol_atom_force_cache ) )
			.catch( ( error : any )=> this.paint( error , $mol_atom_force_cache ) )
			
			throw new $mol_atom_wait( 'Painting...' )
		}
		
		render() {
			super.render()
			this.paint()
		}

	}
	
}
