namespace $ {
	
	const concurrency = 1000
	
	/** Manages versions through connected CROWD stores */
	export class $mol_crowd_stamper {
		
		readonly actor: number
		
		constructor(
			actor?: number,
			public version_max = 0,
		) {
			
			this.actor = actor
				? actor % concurrency
				: Math.floor( concurrency * Math.random() )
		
		}
		
		actor_from( stamp: number ) {
			return Math.abs( stamp ) % concurrency
		}
		
		feed( version: number ) {
			if( this.version_max > version ) return
			this.version_max = version
		}
		
		genegate() {
			return this.version_max = ( Math.floor( this.version_max / concurrency ) + 1 ) * concurrency + this.actor
		}
		
		fork( actor: number ) {
			return new $mol_crowd_stamper( actor, this.version_max )
		}
		
	}
	
}
