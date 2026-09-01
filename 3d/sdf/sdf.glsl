// min##   = union
// max##   = joint
// -#      = inverse
// #+#     = scale

float mol_3d_sdf_joint( float a, float b ) {
  return max( a, b );
}
float mol_3d_sdf_joint( float a, float b, float c ) {
  return max( max( a, b ), c );
}
float mol_3d_sdf_joint( float a, float b, float c, float d ) {
  return max( max( a, b ), max( c, d ) );
}
float mol_3d_sdf_joint( vec3 point ) {
  return mol_3d_sdf_joint( point.x, point.y, point.z );
}

float mol_3d_sdf_union( float a, float b ) {
  return min( a, b );
}
float mol_3d_sdf_union( float a, float b, float c ) {
  return min( min( a, b ), c );
}
float mol_3d_sdf_union( float a, float b, float c, float d ) {
  return min( min( a, b ), min( c, d ) );
}
float mol_3d_sdf_union( vec3 point ) {
  return mol_3d_sdf_union( point.x, point.y, point.z );
}

float mol_3d_sdf_union_smooth( float d1, float d2, float k ) {
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h);
}

float mol_3d_sdf_sphere( vec3 point, float size ) {
  return length(point) - size;
}

float mol_3d_sdf_plane( vec3 point, vec3 normal ) {
  return dot( point, normal );
}

float mol_3d_sdf_box( vec3 point, vec3 size, float round ) {
	vec3 d = abs(point) - size + round;
	return min( mol_3d_sdf_joint( d ), 0.0 )
		+ length( max( d, 0.0 ) )
		- round;
}
