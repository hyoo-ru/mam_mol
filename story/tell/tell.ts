namespace $ {

	/**
	 * Tracks changes inside decorated action to current story.
	 * Use $mol_story_hero to mark trackable props.
	 */
	export class $mol_story_tell extends $mol_wrapper {

		static override wrap<
			This extends { $: $ } ,
			Args extends unknown[] ,
			Result
		>(
			task : ( this : This , ... args : Args )=> Result
		) {
			
			return function( this: This , ... args: Args ) {

				const current = $mol_story_current
				$mol_story_current = this.$.$mol_story_current

				try {
					return task.call( this , ... args )
				} finally {
					$mol_story_current = current
				}

			}

		}

	}

}
