namespace $ {

	export type $mol_file_type = 'file' | 'dir' | 'link'

	export interface $mol_file_stat {
		type: $mol_file_type
		size: number
		atime: Date
		mtime: Date
		ctime: Date
	}

	export class $mol_file_error extends $mol_error_mix<{ code: 'not found' | null }> {}

	export class $mol_file extends $mol_file_base {}

}
