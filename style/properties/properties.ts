namespace $ {

	export type $mol_style_properties = Partial< $mol_type_override< CSSStyleDeclaration , Overrides > >

	type Common =
	| 'inherit' | 'initial' | 'unset' | 'revert' | 'revert-layer'
	| $mol_style_func< 'var' >

	type Color =
	| 'aliceblue' | 'antiquewhite' | 'aqua' | 'aquamarine' | 'azure'
	| 'beige' | 'bisque' | 'black' | 'blanchedalmond' | 'blue' | 'blueviolet'| 'brown' | 'burlywood'
	| 'cadetblue' | 'chartreuse' | 'chocolate' | 'coral' | 'cornflowerblue' | 'cornsilk' | 'crimson' | 'cyan'
	| 'darkblue' | 'darkcyan' | 'darkgoldenrod' | 'darkgray' | 'darkgreen' | 'darkgrey'
	| 'darkkhaki' | 'darkmagenta' | 'darkolivegreen' | 'darkorange' | 'darkorchid' | 'darkred'
	| 'darksalmon' | 'darkseagreen' | 'darkslateblue' | 'darkslategrey' | 'darkturquoise' | 'darkviolet'
	| 'deeppink' | 'deepskyblue' | 'dimgray' | 'dimgrey' | 'dodgerblue'
	| 'firebrick' | 'floralwhite' | 'forestgreen' | 'fuchsia'
	| 'gainsboro' | 'ghostwhite' | 'gold' | 'goldenrod' | 'gray' | 'green' | 'greenyellow' | 'grey'
	| 'honeydew' | 'hotpink' | 'indianred' | 'indigo' | 'ivory' | 'khaki'
	| 'lavender' | 'lavenderblush' | 'lawngreen' | 'lemonchiffon'
	| 'lightblue' | 'lightcoral' | 'lightcyan' | 'lightgoldenrodyellow' | 'lightgray'
	| 'lightgreen' | 'lightgrey' | 'lightpink' | 'lightsalmon' | 'lightseagreen'
	| 'lightskyblue' | 'lightslategray' | 'lightslategrey' | 'lightsteelblue' | 'lightyellow'
	| 'lime' | 'limegreen' | 'linen' | 'magenta' | 'maroon'
	| 'mediumaquamarine' | 'mediumblue' | 'mediumorchid' | 'mediumpurple' | 'mediumseagreen'
	| 'mediumslateblue' | 'mediumspringgreen' | 'mediumturquoise' | 'mediumvioletred'
	| 'midnightblue' | 'mintcream' | 'mistyrose' | 'moccasin'
	| 'navajowhite' | 'navy'
	| 'oldlace' | 'olive' | 'olivedrab' | 'orange' | 'orangered' | 'orchid'
	| 'palegoldenrod' | 'palegreen' | 'paleturquoise' | 'palevioletred' | 'papayawhip'
	| 'peachpuff' | 'peru' | 'pink' | 'plum' | 'powderblue' | 'purple'
	| 'rebeccapurple' | 'red' | 'rosybrown' | 'royalblue'
	| 'saddlebrown' | 'salmon' | 'sandybrown' | 'seagreen' | 'seashell' | 'sienna' | 'silver'
	| 'skyblue' | 'slateblue' | 'slategray' | 'slategrey' | 'snow' | 'springgreen' | 'steelblue'
	| 'tan' | 'teal' | 'thistle' | 'tomato' | 'turquoise'
	| 'violet' | 'wheat' | 'white' | 'whitesmoke' | 'yellow' | 'yellowgreen'
	| 'transparent' | 'currentcolor'
	| $mol_style_func< 'hsla' | 'rgba' | 'var' >
	| `#${string}`
	
	type Length = 0 | `${number}${ $mol_style_unit_length }` | $mol_style_func< 'calc' | 'var' | 'clamp' >

	type Size =
	| 'auto' | 'max-content' | 'min-content' | 'fit-content'
	| Length | Common

	type Directions< Value > =
	| Value
	| readonly [ Value , Value ]
	| {
		top?: Value ,
		right?: Value ,
		bottom?: Value ,
		left?: Value ,
	}

	type Span_align = 'none' | 'start' | 'end' | 'center' | $mol_style_func< 'var' >
	type Snap_axis = 'x' | 'y' | 'block' | 'inline' | 'both' | $mol_style_func< 'var' >

	type Overflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | 'overlay' | Common

	type ContainRule = 'size' | 'layout' | 'style' | 'paint' | $mol_style_func< 'var' >

	type Repeat = 'repeat-x' | 'repeat-y' | 'repeat' | 'space' | 'round' | 'no-repeat' | $mol_style_func< 'var' >
	type BG_size = Length | 'auto' | 'contain' | 'cover'

	interface Overrides {

		/** 
		 * Distribution of space between and around content items along a flexbox's cross-axis or a grid's block axis.
		 * @see https://developer.mozilla.org/ru/docs/Web/CSS/align-content
		 */
		alignContent? :
		| 'baseline' | 'start' | 'end' | 'flex-start' | 'flex-end'
		| 'center' | 'normal' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch'
		| readonly [ 'first' | 'last' , 'baseline' ]
		| readonly [ 'safe' | 'unsafe' , 'start' | 'end' | 'flex-start' | 'flex-end' ]
		| Common

		/** 
		 * How the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.
		 * @see https://developer.mozilla.org/ru/docs/Web/CSS/justify-content
		 */
		justifyContent?:
		| 'start' | 'end'
		| 'flex-start' | 'flex-end'
		| 'left' | 'right'
		| 'space-between' | 'space-around' | 'space-evenly'
		| 'normal' | 'stretch' | 'center'
		| Common

		/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/gap */
		gap?: Length

		/** 
		 * All background style properties.
		 * @see https://developer.mozilla.org/ru/docs/Web/CSS/background
		 * */
		background?:
		| 'none'
		| {

			/** 
			 * Background color.
			 * @see https://developer.mozilla.org/ru/docs/Web/CSS/background-color 
			 */
			color?: Color | Common
			
			/** 
			 * Background images.
			 * @see https://developer.mozilla.org/ru/docs/Web/CSS/background-image
			 */
			image?:
			| readonly( readonly [ $mol_style_func<'url'> | string&{} ] )[]
			| 'none' | Common
			
			/** 
			 * How background images are repeated.
			 * @see https://developer.mozilla.org/ru/docs/Web/CSS/background-repeat
			 */
			repeat?: Repeat | [ Repeat, Repeat ] | Common
			
			// @TODO add more variants
			/** @see https://developer.mozilla.org/ru/docs/Web/CSS/background-position */
			position?: 'left' | 'right' | 'top' | 'bottom' | 'center' | Common
			
			/** @see https://developer.mozilla.org/ru/docs/Web/CSS/background-size */
			size?: ( BG_size | [ BG_size, BG_size ] )[]
			
		}
		
		/** @see https://developer.mozilla.org/ru/docs/Web/CSS/backdrop-filter */
		backdropFilter: string | Common

		/** @see https://developer.mozilla.org/ru/docs/Web/CSS/box-shadow */
		box?: {

			/** 
			 * Shadow effects around an element's frame.
			 * @see https://developer.mozilla.org/ru/docs/Web/CSS/box-shadow
			 */
			shadow?:
			| readonly {
				inset?: boolean
				x: Length
				y: Length
				blur: Length
				spread: Length
				color: Color
			}[]
			| 'none' | Common

		}

		/** @see https://developer.mozilla.org/ru/docs/Web/CSS/font */
		font?: {

			/** 
			 * Whether a font should be styled.
			 * @see https://developer.mozilla.org/ru/docs/Web/CSS/font-style
			 */
			style?: 'normal' | 'italic' | Common

			/** 
			 * Weight (or boldness) of the font.
			 * @see https://developer.mozilla.org/ru/docs/Web/CSS/font-weight
			 */
			weight?:
			| 'normal' | 'bold' | 'lighter' | 'bolder'
			| 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
			| Common
			
			/** 
			 * Size of the font. Changing the font size also updates the sizes of the font size-relative length units.
			 * @see https://developer.mozilla.org/ru/docs/Web/CSS/font-size
			 */
			size?:
			| 'xx-small' | 'x-small' | 'small' | 'medium'
			| 'large' | 'x-large' | 'xx-large' | 'xxx-large'
			| 'smaller' | 'larger'
			| Length
			| Common

			/** 
			 * Prioritized list of one or more font family names and/or generic family names.
			 * @see https://developer.mozilla.org/ru/docs/Web/CSS/font-family
			 */
			family?:
			| 'serif' | 'sans-serif' | 'monospace'
			| 'cursive' | 'fantasy'
			| 'system-ui' | 'ui-serif' | 'ui-sans-serif' | 'ui-monospace' | 'ui-rounded'
			| 'emoji' | 'math' | 'fangsong'
			| Common

		}

		/** 
		 * Foreground color value of text and text decorations, and sets the `currentcolor` value.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color
		 */
		color?: Color | Common

		/** 
		 * Whether an element is treated as a block or inline element and the layout used for its children, such as flow layout, grid or flex.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/display
		 */
		display?:
		| 'block' | 'inline' | 'run-in' | 'list-item' | 'none'
		| 'flow' | 'flow-root' | 'table' | 'flex' | 'grid'
		| 'contents'
		| 'table-row-group' | 'table-header-group' | 'table-footer-group' | 'table-column-group'
		| 'table-row' | 'table-cell' | 'table-column' | 'table-caption'
		| 'inline-block' | 'inline-table' | 'inline-flex' | 'inline-grid'
		| 'ruby' | 'ruby-base' | 'ruby-text' | 'ruby-base-container' | 'ruby-text-container'
		| Common

		/** 
		 * What to do when an element's content is too big to fit in its block formatting context. It is a shorthand for `overflowX` and `overflowY`.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
		 */
		overflow?: Overflow | {

			/** 
			 * What shows when content overflows a block-level element's left and right edges.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x
			 */
			x?: Overflow | Common
			
			/** 
			 * What shows when content overflows a block-level element's top and bottom edges.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y
			 */
			y?: Overflow | Common

			/** 
			 * A way to opt out of the browser's scroll anchoring behavior, which adjusts scroll position to minimize content shifts.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor
			 */
			anchor?: 'auto' | 'none' | Common
			
		}

		/** 
		 * Indicate that an element and its contents are, as much as possible, independent of the rest of the document tree. This allows the browser to recalculate layout, style, paint, size, or any combination of them for a limited area of the DOM and not the entire page, leading to obvious performance benefits.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/contain
		 */
		contain?:
		| 'none' | 'strict' | 'content'
		| ContainRule | readonly ContainRule[]
		| Common

		/** 
		 * How white space inside an element is handled.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
		 */
		whiteSpace?:
		| 'normal' | 'nowrap' | 'break-spaces'
		| 'pre' | 'pre-wrap' | 'pre-line'
		| Common

		/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-overflow-scrolling */
		webkitOverflowScrolling?: 'auto' | 'touch' | Common

		/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color */	
		scrollbar?: {
			
			/** 
			 * Color of thumb and track of scrollbars.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
			 */
			color?: readonly [ Color , Color ] | 'auto' | Common
			
			/** 
			 * Maximum thickness of scrollbars.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width
			 */
			width?: 'auto' | 'thin' | 'none' | Common
			
		}

		/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior */
		scroll?: {

			/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align */
			snap?: {

				/** 
				 * How strictly snap points are enforced on the scroll container in case there is one.
				 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
				 */
				type:
				| 'none'
				| Snap_axis
				| readonly [ Snap_axis , 'mandatory' | 'proximity' ]
				| Common
				
				/** 
				 * Whether the scroll container is allowed to "pass over" possible snap positions.
				 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop
				 */
				stop: 'normal' | 'always' | Common
				
				/** 
				 * The box’s snap position as an alignment of its snap area (as the alignment subject) within its snap container’s snapport (as the alignment container). The two values specify the snapping alignment in the block axis and inline axis, respectively. If only one value is specified, the second value defaults to the same value.
				 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align
				 */
				align: Span_align | readonly [ Span_align , Span_align ] | Common

			}
			
			/** 
			 * Offsets for the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding
			 */
			padding?: Directions< Length | 'auto' >
			
		}
		
		/** 
		 * Element's width. By default, it sets the width of the content area, but if `boxSizing` is set to `border-box`, it sets the width of the border area.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/width
		 */
		width?: Size
		/** 
		 * Minimum width of an element. It prevents the used value of the `width` property from becoming smaller than the value specified for `minWidth`.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/min-width
		 */
		minWidth?: Size
		/** 
		 * Maximum width of an element. It prevents the used value of the `width` property from becoming larger than the value specified for `maxWidth`.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/max-width
		 */
		maxWidth?: Size

		/** 
		 * Height of an element. By default, the property defines the height of the content area. If box-sizing is set to border-box, however, it instead determines the height of the border area.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/height
		 */
		height?: Size
		/** 
		 * Minimum height of an element. It prevents the used value of the `height` property from becoming smaller than the value specified for `minHeight`.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/min-height 
		 */
		minHeight?: Size
		/** 
		 * Maximum height of an element. It prevents the used value of the `height` property from becoming larger than the value specified for `maxHeight`.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/max-height
		 */
		maxHeight?: Size

		/** 
		 * Margin area on all four sides of an element.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/margin
		 */
		margin?: Directions< Length | 'auto' >

		/** 
		 * Padding area on all four sides of an element.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/padding
		 */
		padding?: Directions< Length | 'auto' >

		/** 
		 * How an element is positioned in a document. The `top`, `right`, `bottom`, and `left` properties determine the final location of positioned elements.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/position
		 */
		position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed' | Common

		/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/top */
		top?: Length | 'auto' | Common
		/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/right */
		right?: Length | 'auto' | Common
		/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/bottom */
		bottom?: Length | 'auto' | Common
		/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/left */
		left?: Length | 'auto' | Common

		/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/border */
		border?: {

			/** 
			 * Rounds the corners of an element's outer border edge. You can set a single radius to make circular corners, or two radii to make elliptical corners.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
			 */
			radius?: Length | [ Length, Length ]

			/** 
			 * Line style for all four sides of an element's border.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
			 */
			style?: 
			| 'none' | 'hidden'
			| 'dotted' | 'dashed'
			| 'solid' | 'double'
			| 'groove' | 'ridge'
			| 'inset' | 'outset'
			| Common

			/** 
			 * Color of element's border.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-color
			 */
			color?: Directions< Color > | Common

			/** 
			 * Width of element's border.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-width
			 */
			width?: Directions< Length > | Common

		}

		/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-top */
		borderTop?: Overrides['border'],

		/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-right */
		borderRight?: Overrides['border'],

		/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom */
		borderBottom?: Overrides['border'],

		/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-left */
		borderLeft?: Overrides['border'],


		/** 
		 * How a flex item will grow or shrink to fit the space available in its flex container. It is a shorthand for `flexGrow`, `flexShrink`, and `flexBasis`.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex
		 */
		flex?:
		| 'none' | 'auto'
		| {

			/** 
			 * Growing weight of the flex item. Negative values are considered invalid. Defaults to 1 when omitted.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow
			 */
			grow?: number | Common
			
			/** 
			 * Shrinking weight of the flex item. Negative values are considered invalid. Defaults to 1 when omitted.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink
			 */
			shrink?: number | Common
			
			/** 
			 * Preferred size of the flex item. A value of 0 must have a unit to avoid being interpreted as a flexibility. Defaults to 0 when omitted.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
			 */
			basis?: Size | Common

			/** 
			 * How flex items are placed in the flex container defining the main axis and the direction (normal or reversed).
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
			 */
			direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | Common

			/** 
			 * Whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
			 */
			wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | Common

		}

		/** 
		 * Z-order of a positioned element and its descendants or flex items. Overlapping elements with a larger z-index cover those with a smaller one.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/z-index
		 */
		zIndex: number | Common

		/** 
		 * Degree to which content behind an element is hidden, and is the opposite of transparency.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/opacity
		 */
		opacity: number | Common
		
		aspectRatio: number | Common
		
	}

}
