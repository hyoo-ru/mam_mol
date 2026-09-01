namespace $ {

	/**
	 * Current story instance which track changes
	 * of trackable props inside tracking actions.
	 */
	export let $mol_story_current: $mol_story | null = null

	/**
	 * Track changes of trackable props ($mol_story_hero)
	 * inside tracking actions ($mol_story_tell).
	 */
	export class $mol_story extends $mol_object2 {

		/** Steps for rollback all uncommited steps **/
		prev = [] as $mol_story_step[]
		
		/** All applied but uncommited steps **/
		next = [] as $mol_story_step[]
		
		/** Applied changessets. Can be rollbacked. **/
		past = [] as $mol_story_twist[]

		/** Rollbacked changessets. Can be reapplied. **/
		future = [] as $mol_story_twist[]

		/** Enforce full clear. **/
		clear() {

			this.past.length = 0
			this.prev.length = 0
			this.next.length = 0
			this.future.length = 0

			if( this.commit_timer ) {
				this.commit_timer.destructor()
				this.commit_timer = undefined
			}

		}

		/** Add new applied but uncommited steps. **/
		stage(
			prev: $mol_story_step,
			next: $mol_story_step,
		) {

			this.prev.push( prev )
			this.next.push( next )

			this.commit_later()
		}

		commit_delay = 500
		commit_timer?: $mol_after_timeout
		commit_later() {

			if( this.commit_timer ) {
				this.commit_timer.destructor()
			}
			
			this.commit_timer = new this.$.$mol_after_timeout(
				this.commit_delay,
				this.commit.bind( this ),
			)

		}
		
		/** Commit uncommited steps as new twist. **/
		commit() {

			if( this.draft_deep > 0 ) return
			
			this.commit_timer = undefined
			
			if( this.next.length === 0 ) return

			const twist = new $mol_story_twist(
				this.prev.splice(0).reverse(),
				this.next.splice(0),
			)

			this.past.push( twist )
		}

		/** Rollbacks all uncommited steps. **/
		reset() {

			this.prev.reverse()
			
			for( const change of this.prev ) change.go()

			this.next.length = 0
			this.prev.length = 0

		}

		/** Undo last twist. **/
		backward() {

			if( this.prev.length > 0 ) return this.reset()

			if( this.past.length === 0 ) return

			let twist = this.past.pop()!
			this.future.push( twist )

			twist.backward()
		}

		/** Redo last rollbacked twist. **/
		forward() {

			if( this.future.length === 0 ) return

			let twist = this.future.pop()!
			this.past.push( twist )
			
			twist.forward()
		}
		
		draft_deep = 0

		/**
		 * Starts transactions.
		 * All commits are ignored untill transaction end.
		 **/
		draft_open() {
			if( this.draft_deep === 0 ) this.commit()
			this.draft_deep ++
		}

		/**
		 * Rollback all changes from transaction begin.
		 **/
		draft_fire() {
			if( this.draft_deep === 0 ) return
			this.draft_deep --
			if( this.draft_deep === 0 ) this.reset()
		}

		/**
		 * Commit all steps inside transaction as new twist.
		 **/
		draft_close() {
			if( this.draft_deep === 0 ) $mol_fail( new Error( `Draft isn't opened` ) )
			this.draft_deep --
			if( this.draft_deep === 0 ) this.commit()
		}

	}

}
