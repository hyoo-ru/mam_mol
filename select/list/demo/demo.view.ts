namespace $.$$ {
	export class $mol_select_list_demo extends $.$mol_select_list_demo {
		@ $mol_mem
		override suggestions() {
			this.$.$mol_wait_timeout(500)
			this.filter_pattern()
			return super.suggestions()
		}

		override option_title(id: string) {
			if (! id) return ''
			return this.suggestions()[id]
		}
	}
}
