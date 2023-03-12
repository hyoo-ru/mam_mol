namespace $.$$ {
	export class $mol_tag_tree_demo extends $.$mol_tag_tree_demo {

		item_title( path_id: string ) {
			return path_id.substring(path_id.lastIndexOf('/') + 1)
		}
		
	}
}
