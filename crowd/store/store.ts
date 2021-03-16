namespace $ {
	
	export abstract class $mol_crowd_store {
		
		constructor(
			public stamper = new $mol_crowd_stamper,
		) { }
		
		abstract toJSON( version_min?: number ): ReturnType< typeof $mol_crowd_delta >
		
		delta( base: this ) {
			return this.toJSON( base.stamper.version_max )
		}
		
		abstract apply( delta: ReturnType< typeof $mol_crowd_delta > ): this
		
		fork( actor: number ): this {
			const Fork = this.constructor as new( stamper: $mol_crowd_stamper )=> this
			const fork = new Fork( this.stamper.fork( actor ) ) as this
			fork.apply( this.toJSON() )
			return fork
		}
		
	}
	
}
