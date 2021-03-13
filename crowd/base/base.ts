namespace $ {
	
	const concurrency = 1000
	
	export class $mol_crowd_base {
		
		readonly actor: number
		public version_max = 0
		
		constructor(
			actor?: number,
		) {
			
			this.actor = actor
				? actor % concurrency
				: Math.floor( concurrency * Math.random() )
		
		}
		
		version_feed( version: number ) {
			if( this.version_max > version ) return
			this.version_max = version
		}
		
		version_gen() {
			return this.version_max = ( Math.floor( this.version_max / concurrency ) + 1 ) * concurrency + this.actor
		}
		
	}
	
}
