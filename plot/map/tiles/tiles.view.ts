namespace $.$$ {
	
	type Id = [ number, number, number ]
	
	export class $mol_plot_map_tiles extends $.$mol_plot_map_tiles {
		
		@ $mol_mem
		level() {
			return Math.max( 0, Math.round( Math.log2( this.scale()[0] ) ) )
		}
		
		@ $mol_mem
		override tiles() {
			
			const level = this.level()
			const limit = this.tiles_limit()
			const dims = this.dimensions_pane()
			const tiles = []
			const range = [ level, Math.max( 0, level + this.level_pyramid() ) ].sort( ( a, b )=> a - b )
			
			for( let l = range[0]; l <= range[1]; ++l ) {
				
				let [ xs, ys ] = this.tile_at([ l, dims.x.min, dims.y.min ])
				let [ xe, ye ] = this.tile_at([ l, dims.x.max, dims.y.max ])
				
				if( xe - xs >= limit ) {
					xs = Math.ceil( ( xs + xe - limit ) / 2 )
					xe = xs + limit - 1
				}
				
				if( ye - ys >= limit ) {
					ys = Math.ceil( ( ys + ye - limit ) / 2 )
					ye = ys + limit - 1
				}
				
				for( let y= ys; y <= ye; ++y ) {
					for( let x= xs; x <= xe; ++x ) {
						tiles.push(
							this.Tile([ l, x, y ])
						)
					}
				}
				
			}
			
			return tiles
		}
		
		@ $mol_mem_key
		override tile_uri( id: Id ) {
			
			const [ level, x, y ] = id
			const count = 1 << level
			
			return this.uri_template()
				.replace( '{level}', String( level ) )
				.replace( '{x}', String( ( x % count + count ) % count ) )
				.replace( '{y}', String( ( y % count + count ) % count ) )
			
		}
		
		@ $mol_mem_key
		override tile_transform( id: Id ) {
			
			const [ level, x, y ] = id
			const [ shift_x, shift_y ] = this.shift()
			const [ scale_x, scale_y ] = this.scale()
			const count = 1 << level
			const tile_size = this.tile_dims_real()
			
			const pos_x = ( ( x / count - .5 ) * tile_size[0] * scale_x + shift_x )
			const pos_y = ( ( y / count - .5 ) * tile_size[1] * scale_y + shift_y )
			
			const scale = scale_x / 2**level + .5 / tile_size[1]
			
			return `translate3d(${pos_x}px,${pos_y}px,0px) scale(${scale})`
		}
		
		// @ $mol_mem_key
		// override tile_pos( id: Id ) {
			
		// 	const [ level, x, y ] = id
		// 	const [ shift_x, shift_y ] = this.shift()
		// 	const [ scale_x, scale_y ] = this.scale()
		// 	const count = 1 << level
		// 	const tile_size = this.tile_size_real()
			
		// 	return [
		// 		Math.floor( ( x / count - .5 ) * tile_size * scale_x + shift_x ) ,
		// 		Math.floor( ( y / count - .5 ) * tile_size * scale_y + shift_y ) ,
		// 	]
			
		// }
		
		tile_at( pos: [ number, number, number ] ) {
			
			const [ level, x, y ] = pos
			const count = 1 << level
			const tile_size = this.tile_dims_real()
			
			return [
				Math.floor( ( x / tile_size[0] + .5 ) * count ),
				Math.floor( ( y / tile_size[1] + .5 ) * count ),
			]
			
		}
		
		// @ $mol_mem_key
		// override tile_size( id: Id ) {
			
		// 	const [ level ] = id
		// 	const [ scale_x, scale_y ] = this.scale()
		// 	const tile_size = this.tile_size_real()
			
		// 	return [
		// 		Math.ceil( tile_size * scale_x / 2**level ) ,
		// 		Math.ceil( tile_size * scale_y / 2**level ) ,
		// 	]
			
		// }
		
		back() {
			return [ this ] as unknown as readonly $.$mol_svg[]
		}
		
		front() {
			return [ ]
		}
		
	}
	
}
