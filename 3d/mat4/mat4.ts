namespace $ {
	
	export class $mol_3d_mat4 extends Float32Array {
		
		@ $mol_memo.method
		static identity() {
			return new $mol_3d_mat4([
				1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1,
			])
		}
		
		static translation( [ x, y, z ]: Float32List ) {
			return new $mol_3d_mat4([
				1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				x, y, z, 1,
			])
		}
		
		static scaling( [ x, y, z ]: Float32List ) {
			return new $mol_3d_mat4([
				x, 0, 0, 0,
				0, y, 0, 0,
				0, 0, z, 0,
				0, 0, 0, 1,
			])
		}		
		
		static rotation( [ x, y, z ]: Float32List, angle: number ) {
		
			var length = Math.hypot( x, y, z )
			
			x /= length
			y /= length
			z /= length
			
			const xx = x ** 2
			const yy = y ** 2
			const zz = z ** 2
			
			var c = Math.cos( angle )
			var s = Math.sin( angle )
			const mc = 1 - c;
		
			return new $mol_3d_mat4([
				
				xx + ( 1 - xx ) * c,
				x * y * mc + z * s,
				x * z * mc - y * s,
				0,
				
				x * y * mc - z * s,
				yy + ( 1 - yy ) * c,
				y * z * mc + x * s,
				0,
				
				x * z * mc + y * s,
				y * z * mc - x * s,
				zz + ( 1 - zz ) * c,
				0,
				
				0, 0, 0, 1,
				
			])

		}
		
		static orthographic(
			left: number, right: number,
			bottom: number, top: number,
			near: number, far: number,
		) {
			
			const rpl = right + left
			const tpb = top + bottom
			const npf = near + far
			
			const rml = right - left
			const tmb = top - bottom
			const nmf = near - far
			
			return new $mol_3d_mat4([
				2 / rml, 0, 0, 0,
				0, 2 / tmb, 0, 0,
				0, 0, 2 / nmf, 0,
				- rpl / rml, - tpb / tmb, npf / nmf, 1,
			])
			
		}
		
		static perspective( fov: number, aspect: number, near: number, far: number ) {
			
			var f = Math.tan( Math.PI/2 - fov/2 )
			var irange = 1.0 / ( near - far )
			
			return new $mol_3d_mat4([
				f / aspect, 0, 0, 0,
				0, f, 0, 0,
				0, 0, ( near + far ) * irange, -1,
				0, 0, near * far * irange * 2, 0,
			])
			
		}
		
		static multiply( head: Float32List, ... tail: Float32List[] ): $mol_3d_mat4 {
			
			if( tail.length === 0 ) return new $mol_3d_mat4( head )
			const foot = tail.length > 1 ? this.multiply( ... tail as [any] ) : tail[0]
			
			return new $mol_3d_mat4([
				
				foot[ 0] * head[ 0] + foot[ 1] * head[ 4] + foot[ 2] * head[ 8] + foot[ 3] * head[12],
				foot[ 0] * head[ 1] + foot[ 1] * head[ 5] + foot[ 2] * head[ 9] + foot[ 3] * head[13],
				foot[ 0] * head[ 2] + foot[ 1] * head[ 6] + foot[ 2] * head[10] + foot[ 3] * head[14],
				foot[ 0] * head[ 3] + foot[ 1] * head[ 7] + foot[ 2] * head[11] + foot[ 3] * head[15],
				
				foot[ 4] * head[ 0] + foot[ 5] * head[ 4] + foot[ 6] * head[ 8] + foot[ 7] * head[12],
				foot[ 4] * head[ 1] + foot[ 5] * head[ 5] + foot[ 6] * head[ 9] + foot[ 7] * head[13],
				foot[ 4] * head[ 2] + foot[ 5] * head[ 6] + foot[ 6] * head[10] + foot[ 7] * head[14],
				foot[ 4] * head[ 3] + foot[ 5] * head[ 7] + foot[ 6] * head[11] + foot[ 7] * head[15],
				
				foot[ 8] * head[ 0] + foot[ 9] * head[ 4] + foot[10] * head[ 8] + foot[11] * head[12],
				foot[ 8] * head[ 1] + foot[ 9] * head[ 5] + foot[10] * head[ 9] + foot[11] * head[13],
				foot[ 8] * head[ 2] + foot[ 9] * head[ 6] + foot[10] * head[10] + foot[11] * head[14],
				foot[ 8] * head[ 3] + foot[ 9] * head[ 7] + foot[10] * head[11] + foot[11] * head[15],
				
				foot[12] * head[ 0] + foot[13] * head[ 4] + foot[14] * head[ 8] + foot[15] * head[12],
				foot[12] * head[ 1] + foot[13] * head[ 5] + foot[14] * head[ 9] + foot[15] * head[13],
				foot[12] * head[ 2] + foot[13] * head[ 6] + foot[14] * head[10] + foot[15] * head[14],
				foot[12] * head[ 3] + foot[13] * head[ 7] + foot[14] * head[11] + foot[15] * head[15],
				
			])
		}
		
		@ $mol_memo.method
		inversed() {
			
			const p_0 = this[10] * this[15], p_1 = this[14] * this[11], p_2 = this[ 6] * this[15], p_3 = this[14] * this[ 7]
			const p_4 = this[ 6] * this[11], p_5 = this[10] * this[ 7], p_6 = this[ 2] * this[15], p_7 = this[14] * this[ 3]
			const p_8 = this[ 2] * this[11], p_9 = this[10] * this[ 3], p10 = this[ 2] * this[ 7], p11 = this[ 6] * this[ 3]
			const p12 = this[ 8] * this[13], p13 = this[12] * this[ 9], p14 = this[ 4] * this[13], p15 = this[12] * this[ 5]
			const p16 = this[ 4] * this[ 9], p17 = this[ 8] * this[ 5], p18 = this[ 0] * this[13], p19 = this[12] * this[ 1]
			const p20 = this[ 0] * this[ 9], p21 = this[ 8] * this[ 1], p22 = this[ 0] * this[ 5], p23 = this[ 4] * this[ 1]
		
			const t0 = p_0 * this[ 5] + p_3 * this[ 9] + p_4 * this[13] - p_1 * this[ 5] - p_2 * this[ 9] - p_5 * this[13]
			const t1 = p_1 * this[ 1] + p_6 * this[ 9] + p_9 * this[13] - p_0 * this[ 1] - p_7 * this[ 9] - p_8 * this[13]
			const t2 = p_2 * this[ 1] + p_7 * this[ 5] + p10 * this[13] - p_3 * this[ 1] - p_6 * this[ 5] - p11 * this[13]
			const t3 = p_5 * this[ 1] + p_8 * this[ 5] + p11 * this[ 9] - p_4 * this[ 1] - p_9 * this[ 5] - p10 * this[ 9]
		
			const d = 1.0 /( this[ 0] * t0 + this[ 4] * t1 + this[ 8] * t2 + this[12] * t3 )
		
			return new $mol_3d_mat4([
				
				d * t0, d * t1, d * t2, d * t3,
				
				d * ( p_1 * this[ 4] + p_2 * this[ 8] + p_5 * this[12] - p_0 * this[ 4] - p_3 * this[ 8] - p_4 * this[12] ),
				d * ( p_0 * this[ 0] + p_7 * this[ 8] + p_8 * this[12] - p_1 * this[ 0] - p_6 * this[ 8] - p_9 * this[12] ),
				d * ( p_3 * this[ 0] + p_6 * this[ 4] + p11 * this[12] - p_2 * this[ 0] - p_7 * this[ 4] - p10 * this[12] ),
				d * ( p_4 * this[ 0] + p_9 * this[ 4] + p10 * this[ 8] - p_5 * this[ 0] - p_8 * this[ 4] - p11 * this[ 8] ),
				
				d * ( p12 * this[ 7] + p15 * this[11] + p16 * this[15] - p13 * this[ 7] - p14 * this[11] - p17 * this[15] ),
				d * ( p13 * this[ 3] + p18 * this[11] + p21 * this[15] - p12 * this[ 3] - p19 * this[11] - p20 * this[15] ),
				d * ( p14 * this[ 3] + p19 * this[ 7] + p22 * this[15] - p15 * this[ 3] - p18 * this[ 7] - p23 * this[15] ),
				d * ( p17 * this[ 3] + p20 * this[ 7] + p23 * this[11] - p16 * this[ 3] - p21 * this[ 7] - p22 * this[11] ),
				
				d * ( p14 * this[10] + p17 * this[14] + p13 * this[ 6] - p16 * this[14] - p12 * this[ 6] - p15 * this[10] ),
				d * ( p20 * this[14] + p12 * this[ 2] + p19 * this[10] - p18 * this[10] - p21 * this[14] - p13 * this[ 2] ),
				d * ( p18 * this[ 6] + p23 * this[14] + p15 * this[ 2] - p22 * this[14] - p14 * this[ 2] - p19 * this[ 6] ),
				d * ( p22 * this[10] + p16 * this[ 2] + p21 * this[ 6] - p20 * this[ 6] - p23 * this[10] - p17 * this[ 2] ),
			
			])
			
		}
		
	}
	
}
