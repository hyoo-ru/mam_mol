namespace $ {

	/**
	 * Property which tracked in current story.
	 * Use $mol_story_tell to enable tracking.
	 */
	export function $mol_story_hero<
		Field extends string ,
		Prop extends ( next?: any )=> any ,
	>(
		proto: { [ key in Field ]: Prop } ,
		field: Field ,
		descr: TypedPropertyDescriptor< Prop >
	) {

		const orig = descr!.value!
		
		descr!.value = function(
			this: typeof proto,
			next: ReturnType< Prop >,
		) {
			
			let prev = orig.call( this ) as ReturnType< Prop >
			if( prev === undefined ) prev = null as unknown as ReturnType< Prop >

			const res = orig.call( this , next ) as ReturnType< Prop >
			if( next === undefined ) return res

			if( !Object.is( res , prev ) ) {
				$mol_story_current?.stage(
					new $mol_story_step_prop( this , field , prev ),
					new $mol_story_step_prop( this , field , res ),
				)
			}
			
			return res
			
		} as Prop

		return descr
	}

}
