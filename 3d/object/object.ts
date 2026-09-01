namespace $ {
	
	export class $mol_3d_object extends $mol_object {
		
		@ $mol_memo.method
		shape() {
			return $mol_3d_shape.make({})
		}
		
		@ $mol_memo.method
		texture() {
			return $mol_3d_image.make({})
		}
		
		@ $mol_memo.method
		transform() {
			return $mol_3d_mat4.identity()
		}
		
	}
	
}
