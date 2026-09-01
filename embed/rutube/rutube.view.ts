namespace $.$$ {
	export class $mol_embed_rutube extends $.$mol_embed_rutube {
		
		@ $mol_mem
		video_embed() {
			return `https://rutube.ru/play/embed/${ encodeURIComponent( this.video_id() ) }`
		}
		
		@ $mol_mem
		video_id() {
			return this.uri().match( /^https:\/\/rutube.ru\/video\/([^\/&?#]+)/ )?.[1] ?? 'about:blank'
		}
		
		@ $mol_mem
		video_preview() {
			return `https://rutube.ru/api/video/${ this.video_id() }/thumbnail/?redirect=1`
		}
		
	}
}
