namespace $.$$ {
	export class $mol_file_demo extends $.$mol_file_demo {
		@ $mol_mem
		root() {
			if (! this.actual_url().match(/^https?:\/\/.+/)) return null
			return this.$.$mol_file.absolute(this.actual_url())
		}

		@ $mol_mem
		override file_list() {
			return this.root()?.sub().map(file => this.File(file.path())) ?? []
		}

		@ $mol_mem
		override refresh(e?: Event) {
			this.actual_url(this.webdav_url())
		}

		file_name(path: string) {
			return this.$.$mol_file.absolute(path).relate()
		}
		file_type(path: string) {
			return this.$.$mol_file.absolute(path).type()
		}
	}
}
