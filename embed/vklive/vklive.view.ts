namespace $.$$ {
	export class $mol_embed_vklive extends $.$mol_embed_vklive {
		
		@ $mol_mem
		video_embed() {
			return `https://live.vkvideo.ru/app/embed/${ this.channel_id() }/${ this.video_id() }`
		}
		
		@ $mol_mem
		channel_id() {
			return this.uri().match( /^https:\/\/live\.vkvideo\.ru\/([^\/&?#]+)/ )?.[1] ?? ''
		}
		
		@ $mol_mem
		video_id() {
			return this.uri().match( /^https:\/\/live\.vkvideo\.ru\/[^\/&?#]+\/record\/([^\/&?#]+)/ )?.[1] ?? ''
		}
		
		@ $mol_mem
		video_preview() {
			return `https://images.live.vkvideo.ru/public_video_stream/record/${ this.video_id() }/preview`
		}
		
	}
}
