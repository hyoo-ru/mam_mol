namespace $ {

	export class $mol_promise_blocker<Value> extends Promise<Value> {
		static [Symbol.toStringTag] = 'mol_promise_blocker'

		static make<Result>() {
			return $mol_promise<Result>($mol_promise_blocker)
		}
	}

}
