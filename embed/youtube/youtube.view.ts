namespace $.$$ {
	export class $mol_embed_youtube extends $.$mol_embed_youtube {
		
		@ $mol_mem
		video_embed() {
			return `https://www.youtube.com/embed/${ encodeURIComponent( this.video_id() ) }?autoplay=1&loop=1`
		}
		
		@ $mol_mem
		video_id() {
			return this.uri().match( /^https\:\/\/www\.youtube\.com\/(?:embed\/|shorts\/|watch\?v=)([^\/&?#]+)/ )?.[1]
				?? this.uri().match( /^https\:\/\/youtu\.be\/([^\/&?#]+)/ )?.[1]
				?? 'about:blank'
		}
		
		@ $mol_mem
		video_preview() {
			return `https://i.ytimg.com/vi/${ this.video_id() }/sddefault.jpg`
		}
		
		@ $mol_mem
		sub() {
			return this.active()
				? [ this.Frame() ]
				: [ this.Image(), this.Hint() ]
		}
		
	}
}
