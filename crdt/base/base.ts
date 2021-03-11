namespace $ {
	
	const concurrency = 100_000
	
	export class $mol_crdt_base {
		
		protected readonly actor: number
		
		constructor(
			actor?: number,
		) {
			
			this.actor = actor
				? actor % concurrency
				: Math.floor( concurrency * Math.random() )
		
		}
		
		version_increase( stamp: number ) {
			return ( Math.floor( Math.abs( stamp ) / concurrency ) + 1 ) * concurrency + this.actor
		}
		
	}
	
}
