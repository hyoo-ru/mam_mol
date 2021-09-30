namespace $ {

	/**
	 * Ignore changes inside decorated action.
	 * Usefull inside $mol_story_tell.
	 */
	export class $mol_story_skip extends $mol_wrapper {

		static override wrap<
			This ,
			Args extends unknown[] ,
			Result
		>(
			task : ( this: This , ... args: Args )=> Result
		) {
			
			return function( this: This , ... args: Args ) {

				const current = $mol_story_current
				$mol_story_current = null

				try {
					return task.call( this , ... args )
				} finally {
					$mol_story_current = current
				}

			}

		}

	}

}
