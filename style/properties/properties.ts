namespace $ {

	export type $mol_style_properties = Partial< $mol_type_override< CSSStyleDeclaration , Overrides > >

	type Common = 'inherit' | 'initial' | 'unset'

	type Color =
	| keyof typeof $mol_colors
	| 'transparent' | 'currentcolor'
	| $mol_style_func< 'hsla' | 'rgba' | 'var' >
	
	type Length = 0 | $mol_style_unit< $mol_style_unit_length > | $mol_style_func<'calc'>

	type Size =
	| 'auto' | 'max-content' | 'min-content' | 'fit-content'
	| Length | Common

	type Directions< Value > =
	| Value
	| [ Value , Value ]
	| {
		top?: Value ,
		right?: Value ,
		bottom?: Value ,
		left?: Value ,
	}

	type Span_align = 'none' | 'start' | 'end' | 'center'
	type Snap_axis = 'x' | 'y' | 'block' | 'inline' | 'both'

	type Overflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | 'overlay' | Common

	interface Overrides {

		/** Distribution of space between and around content items along a flexbox's cross-axis or a grid's block axis. */
		alignContent? :
		| 'baseline' | 'start' | 'end' | 'flex-start' | 'flex-end'
		| 'center' | 'normal' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch'
		| [ 'first' | 'last' , 'baseline' ]
		| [ 'safe' | 'unsafe' , 'start' | 'end' | 'flex-start' | 'flex-end' ]
		| Common

		/** All background style properties. */
		background?:
		| 'none'
		| {

			/** Background color. */
			color?: Color | Common
			
			/** Background images. */
			image?: [ $mol_style_func<'url'> ][]

		}

		box?: {

			/** Shadow effects around an element's frame. */
			shadow?: readonly {
				inset?: boolean
				x: Length
				y: Length
				blur: Length
				spread: Length
				color: Color
			}[]

		}

		font?: {

			/** Whether a font should be styled. */
			style?: 'normal' | 'italic' | Common

			/** Weight (or boldness) of the font. */
			weight?:
			| 'normal' | 'bold' | 'lighter' | 'bolder'
			| 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
			| Common
			
			/** Size of the font. Changing the font size also updates the sizes of the font size-relative length units. */
			size?:
			| 'xx-small' | 'x-small' | 'small' | 'medium'
			| 'large' | 'x-large' | 'xx-large' | 'xxx-large'
			| 'smaller' | 'larger'
			| Length
			| Common

			/** Prioritized list of one or more font family names and/or generic family names. */
			family?:
			| 'serif' | 'sans-serif' | 'monospace'
			| 'cursive' | 'fantasy'
			| 'system-ui' | 'ui-serif' | 'ui-sans-serif' | 'ui-monospace' | 'ui-rounded'
			| 'emoji' | 'math' | 'fangsong'
			| Common

		}

		/** Foreground color value of text and text decorations, and sets the `currentcolor` value. */
		color?: Color | Common

		/** Whether an element is treated as a block or inline element and the layout used for its children, such as flow layout, grid or flex. */
		display?:
		| 'block' | 'inline' | 'run-in' | 'list-item' | 'none'
		| 'flow' | 'flow-root' | 'table' | 'flex' | 'grid'
		| 'contents'
		| 'table-row-group' | 'table-header-group' | 'table-footer-group' | 'table-column-group'
		| 'table-row' | 'table-cell' | 'table-column' | 'table-caption'
		| 'inline-block' | 'inline-table' | 'inline-flex' | 'inline-grid'
		| 'ruby' | 'ruby-base' | 'ruby-text' | 'ruby-base-container' | 'ruby-text-container'
		| Common

		/** What to do when an element's content is too big to fit in its block formatting context. It is a shorthand for `overflowX` and `overflowY`. */
		overflow?: Overflow | {

			/** What shows when content overflows a block-level element's left and right edges. */
			x?: Overflow | Common
			
			/** What shows when content overflows a block-level element's top and bottom edges. */
			y?: Overflow | Common

			/** A way to opt out of the browser's scroll anchoring behavior, which adjusts scroll position to minimize content shifts. */
			anchor?: 'auto' | 'none' | Common
			
		}

		/** How white space inside an element is handled. */
		whiteSpace?:
		| 'normal' | 'nowrap' | 'break-spaces'
		| 'pre' | 'pre-wrap' | 'pre-line'
		| Common

		webkitOverflowScrolling?: 'auto' | 'touch'

		scrollbar?: {
			color?: [ Color , Color ] | 'dark' | 'light' | 'auto' | Common
		}

		scroll?: {

			snap?: {

				/** How strictly snap points are enforced on the scroll container in case there is one. */
				type:
				| 'none'
				| Snap_axis
				| [ Snap_axis , 'mandatory' | 'proximity' ]
				| Common
				
				/** Whether the scroll container is allowed to "pass over" possible snap positions. */
				stop: 'normal' | 'always' | Common
				
				/** The box’s snap position as an alignment of its snap area (as the alignment subject) within its snap container’s snapport (as the alignment container). The two values specify the snapping alignment in the block axis and inline axis, respectively. If only one value is specified, the second value defaults to the same value. */
				align: Span_align | [ Span_align , Span_align ] | Common

			}

		}
		
		/** Element's width. By default, it sets the width of the content area, but if `boxSizing` is set to `border-box`, it sets the width of the border area. */
		width?: Size
		/** Minimum width of an element. It prevents the used value of the `width` property from becoming smaller than the value specified for `minWidth`. */
		minWidth?: Size
		/** Maximum width of an element. It prevents the used value of the `width` property from becoming larger than the value specified for `maxWidth`. */
		maxWidth?: Size

		/** Height of an element. By default, the property defines the height of the content area. If box-sizing is set to border-box, however, it instead determines the height of the border area. */
		height?: Size
		/** Minimum height of an element. It prevents the used value of the `height` property from becoming smaller than the value specified for `minHeight`. */
		minHeight?: Size
		/** Maximum height of an element. It prevents the used value of the `height` property from becoming larger than the value specified for `maxHeight`. */
		maxHeight?: Size

		/** Margin area on all four sides of an element. */
		margin?: Directions< Length | 'auto' >

		/** Padding area on all four sides of an element. */
		padding?: Directions< Length | 'auto' >

		/** How a flex item will grow or shrink to fit the space available in its flex container. It is a shorthand for `flexGrow`, `flexShrink`, and `flexBasis`. */
		flex?:
		| 'none' | 'auto'
		| {

			/** Growing weight of the flex item. Negative values are considered invalid. Defaults to 1 when omitted. */
			grow?: number | Common
			
			/** Shrinking weight of the flex item. Negative values are considered invalid. Defaults to 1 when omitted. */
			shrink?: number | Common
			
			/** Preferred size of the flex item. A value of 0 must have a unit to avoid being interpreted as a flexibility. Defaults to 0 when omitted. */
			basis?: Size

			/** How flex items are placed in the flex container defining the main axis and the direction (normal or reversed). */
			direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'

			/** Whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked. */
			wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | Common

		}

		/** Z-order of a positioned element and its descendants or flex items. Overlapping elements with a larger z-index cover those with a smaller one. */
		zIndex: number
		
	}

}
