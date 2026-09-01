namespace $ {
	
	export class $mol_3d_shape extends $mol_object {
		
		@ $mol_memo.method
		geometry() {
			return new Float32Array
		}
		
		size() {
			return this.geometry().length / 3
		}
		
		@ $mol_memo.method
		skin() {
			return new Float32Array( this.size() * 2 )
		}
		
	}
	
	export class $mol_3d_shape_triangle extends $mol_3d_shape {
		
		@ $mol_memo.method
		geometry() {
			return new Float32Array([
				-1, -1, 0,
				+1, -1, 0,
				+0, +1, 0,
			])
		}
		
		@ $mol_memo.method
		skin() {
			return new Float32Array([
				0.0, 1,
				1.0, 1,
				0.5, 0,
			])
		}
		
	}
	
	export class $mol_3d_shape_square extends $mol_3d_shape {
		
		@ $mol_memo.method
		geometry() {
			return new Float32Array([
				-1, -1, 0,
				+1, -1, 0,
				-1, +1, 0,
				+1, +1, 0,
			])
		}
		
		@ $mol_memo.method
		skin() {
			return new Float32Array([
				0, 1,
				1, 1,
				0, 0,
				1, 0,
			])
		}
		
	}
	
}