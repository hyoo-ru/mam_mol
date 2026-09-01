namespace $.$$ {
	
	export class $mol_layout_demo extends $.$mol_layout_demo {
		
		@ $mol_mem
		font() {
			return `${ 16 * this.$.$mol_dom_context.devicePixelRatio }px sans-serif`
		}
		
		@ $mol_mem
		widgets_left() {
			return Array.from( { length: 10 }, (_,i) => {
				
				const text = ( i || 'canvas ' ) + ' '
				const font = this.font()
				const width = Math.ceil( $mol_font_measure( font, text ) )
				
				const layout = $mol_layout.make({
					min: width,
					max: width,
					ortho: $mol_layout.make({
						min: 24,
						max: 24,
						base: 16,
					})
				})
				
				return { layout, text, font }
				
			} )
		}
		
		@ $mol_mem
		widgets_right() {
			return Array.from( { length: 20 }, (_,i) => {
				
				const text = ( i || 'render ' ) + ' '
				const font = this.font()
				const width = Math.ceil( $mol_font_measure( font, text ) )
				
				const layout = $mol_layout.make({
					min: width,
					max: width,
					ortho: $mol_layout.make({
						min: 24,
						max: 24,
						base: 16,
					}),
				})
				
				return { layout, text, font }
				
			} )
		}
		
		@ $mol_mem
		layout() {
			return $mol_layout_col.make({
				before: ()=> 12,
				after: ()=> 12,
				ortho: $mol_layout_flex.make({
					before: ()=> 12,
					after: ()=> 12,
				}),
				kids: [
					$mol_layout.make({ ortho: $mol_layout.make({ max:1 }), }),
					$mol_layout_row.make({
						before: ()=> 12,
						after: ()=> 12,
						ortho: $mol_layout_stack.make({
							before: ()=> 12,
							after: ()=> 12,
						}),
						kids: [
							$mol_layout.make({ max:1, ortho: $mol_layout.make({}), }),
							$mol_layout_wrap.make({
								before: ()=> 12,
								after: ()=> 12,
								ortho: $mol_layout_flex.make({
									before: ()=> 8,
									after: ()=> 8,
								}),
								kids: this.widgets_left().map( w => w.layout ),
							}), 
							$mol_layout.make({ max:1, ortho: $mol_layout.make({}), }),
							$mol_layout_wrap.make({
								before: ()=> 12,
								after: ()=> 12,
								ortho: $mol_layout_flex.make({
									before: ()=> 8,
									after: ()=> 8,
								}),
								kids: this.widgets_right().map( w => w.layout ),
							}),
							$mol_layout.make({ max:1, ortho: $mol_layout.make({}), }),
						],
					}),
					$mol_layout.make({ ortho: $mol_layout.make({ max:1 }), }),
				]
			})
		}
		
		@ $mol_mem
		paint() {
			
			this.$.$mol_lights()
			
			const layout = this.layout()
			
			layout.size = this.width()+1
			layout.ortho.size = this.height()+1
			
			layout.fresh()
			
			const context = this.context()
			
			context.strokeStyle = this.$.$mol_dom_context.getComputedStyle( this.dom_node() ).getPropertyValue( '--mol_theme_line' )
			context.fillStyle = this.$.$mol_dom_context.getComputedStyle( this.dom_node() ).getPropertyValue( '--mol_theme_text' )
			
			function rects( x: $mol_layout_tree ) {
				const y = x.ortho!
				context.strokeRect( x.pos-.5, y.pos-.5, x.size-1, y.size-1 )
				for( const kid of x?.kids ?? [] ) rects( kid as $mol_layout_tree )
			}
			rects( layout )
			
			for( const widget of this.widgets_left() ) {
				const x = widget.layout
				const y = x.ortho!
				context.font = widget.font
				context.fillText( widget.text, x.pos, y.pos + y.base, x.size )
			}
			
			for( const widget of this.widgets_right() ) {
				const x = widget.layout
				const y = x.ortho!
				context.font = widget.font
				context.fillText( widget.text, x.pos, y.pos + y.base, x.size )
			}
			
		}
		
	}
	
}
