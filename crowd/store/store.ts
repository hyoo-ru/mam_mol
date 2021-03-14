namespace $ {
	
	export abstract class $mol_crowd_store< Data extends readonly unknown[] > {
		
		constructor(
			protected stamper = new $mol_crowd_stamper,
		) { }
		
		abstract toJSON( version_min?: number ): Data
		
		abstract merge( data: Data ): this
		
		fork( actor: number ): this {
			const Fork = this.constructor as new( stamper: $mol_crowd_stamper )=> this
			const fork = new Fork( this.stamper.fork( actor ) ) as this
			fork.merge( this.toJSON() )
			return fork
		}
		
	}
	
}
