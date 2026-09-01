// vector of scales by transformation matrix
vec4 mol_3d_mat4_scales( in mat4 trans ) {
	return vec4(
		length( trans[0] ),
		length( trans[1] ),
		length( trans[2] ),
		length( trans[3] )
	);
}
