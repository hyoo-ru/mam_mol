namespace $ {

	export type $mol_style_properties = Partial< $mol_type_override< CSSStyleDeclaration , Overrides > >

	type Common =
	| 'inherit' | 'initial' | 'unset' | 'revert' | 'revert-layer' | 'none'
	| $mol_style_func< 'var' >

	export type $mol_style_properties_color =
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
	
	type Single_animation_composition = 'replace' | 'add' | 'accumulate'
	type Single_animation_direction = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
	type Single_animation_fill_mode = 'none' | 'forwards' | 'backwards' | 'both'
	type Single_animation_iteration_count = 'infinite' | number
	type Single_animation_play_state = 'running' | 'paused'
	type Easing_function = Linear_easing_function | Cubic_bezier_easing_function | Step_easing_function
	type Linear_easing_function = 'linear' | $mol_style_func<'linear'>
	type Cubic_bezier_easing_function = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | $mol_style_func<'cubic-bezier'>
	type Step_easing_function = 'step-start' | 'step-end' | $mol_style_func<'steps'>
	type Compat_auto = 'searchfield' | 'textarea' | 'push-button' | 'slider-horizontal' | 'checkbox' | 'radio'
	| 'menulist' | 'listbox' | 'meter' | 'progress-bar' | 'button'
	type Compat_special = 'textfield' | 'menulist-button'
	type Mix_blend_mode = Blend_mode | 'plus-darker' | 'plus-lighter'
	type Blend_mode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' |	'color-dodge' |	'color-burn'
	| 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity'
	type Box = 'border-box' | 'padding-box' | 'content-box'

	type Baseline_position = 'baseline' | `${'first'|'last'} baseline`

	type Content_distribution = 'space-between' | 'space-around' | 'space-evenly' | 'stretch' 
	type Self_position = 'center' | 'start' | 'end' | 'self-start' | 'self-end' | 'flex-start' | 'flex-end'
	type Content_position = 'center' | 'start' | 'end' | 'flex-start' | 'flex-end'
	type Span_align = 'none' | 'start' | 'end' | 'center' | $mol_style_func< 'var' >
	type Snap_axis = 'x' | 'y' | 'block' | 'inline' | 'both' | $mol_style_func< 'var' >

	type Overflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | 'overlay' | Common
	type Overflow_position = 'unsafe'  | 'safe';

	type ContainRule = 'size' | 'layout' | 'style' | 'paint' | $mol_style_func< 'var' >

	type Repeat = 'repeat-x' | 'repeat-y' | 'repeat' | 'space' | 'round' | 'no-repeat' | $mol_style_func< 'var' >
	type BG_size = Length | 'auto' | 'contain' | 'cover'

	interface Overrides {

		/**
		 * Sets the accent color for user-interface controls generated by some elements.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color
		 */
		accentColor?: $mol_style_properties_color | Common;
		
		align?: {
			
			/** 
			 * Distribution of space between and around content items along a flexbox's cross-axis or a grid's block axis.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
			 */
			content? : 'normal' | Baseline_position | Content_distribution | Content_position | `${Overflow_position} ${Content_position}` | Common
			
			/**
			 * Sets the align-self value on all direct children as a group.
			 * In Flexbox, it controls the alignment of items on the Cross Axis.
			 * In Grid Layout, it controls the alignment of items on the Block Axis within their grid area.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
			 */
			items? : 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common
			
			/**
			 * Overrides a grid or flex item's align-items value.
			 * In Grid, it aligns the item inside the grid area.
			 * In Flexbox, it aligns the item on the cross axis.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-self
			 */
			self? : 'auto' | 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common
			
		}
		
		justify?: {
			
			/** 
			 * Distribution of space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
			 */
			content? : 'normal' | Baseline_position | Content_distribution | Content_position | `${Overflow_position} ${Content_position}` | Common
			
			/**
			 * Sets the justify-self value on all direct children as a group.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items
			 */
			items? : 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common
			
			/**
			 * Way a box is justified inside its alignment container along the appropriate axis.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self
			 */
			self? : 'auto' | 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common
			
		}
		
		/**
		 * resets all of an element's properties except unicode-bidi, direction, and CSS Custom Properties.
		 * It can set properties to their initial or inherited values, or to the values specified in another cascade layer or stylesheet origin.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/all
		 */
		all? : Common
		
		animation?: {
			
			/**
			 * Specifies the composite operation to use when multiple animations affect the same property simultaneously.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-composition
			 */
			composition? : Single_animation_composition | Single_animation_composition[][] | Common
			
			/**
			 * Specifies the amount of time to wait from applying the animation to an element before beginning to perform the animation.
			 * The animation can start later, immediately from its beginning, or immediately and partway through the animation.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay
			 */
			delay? : $mol_style_unit_str<$mol_style_unit_time> | $mol_style_unit_str<$mol_style_unit_time>[][] | Common
			
			/**
			 * Sets whether an animation should play forward, backward, or alternate back and forth between playing the sequence forward and backward.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction
			 */
			direction? : Single_animation_direction | Single_animation_direction[][] | Common
			
			/**
			 * Sets the length of time that an animation takes to complete one cycle.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
			 */
			duration? : $mol_style_unit_str<$mol_style_unit_time> | $mol_style_unit_str<$mol_style_unit_time>[][] | Common
			
			/**
			 * Sets how a CSS animation applies styles to its target before and after its execution.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
			 */
			fillMode? : Single_animation_fill_mode | Single_animation_fill_mode[][] | Common
			
			/**
			 * Sets the number of times an animation sequence should be played before stopping.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count
			 */
			iterationCount? : Single_animation_iteration_count | Single_animation_iteration_count[][] | Common
			
			/**
			 * Specifies the names of one or more keyframes at-rules that describe the animation to apply to an element.
			 * Multiple keyframe at-rules are specified as a comma-separated list of names.
			 * If the specified name does not match any keyframe at-rule, no properties are animated.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name
			 */
			name? : 'none' | string&{} | ( 'none' | string&{} )[][] | Common
			
			/**
			 * Sets whether an animation is running or paused.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state
			 */
			playState? : Single_animation_play_state | Single_animation_play_state[][] | Common
			
			/**
			 * Sets how an animation progresses through the duration of each cycle.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
			 */
			timingFunction? : Easing_function | Easing_function[][] | Common
			
		}
		
		/**
		 * Used to control native appearance of UI controls, that are based on operating system's theme.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/appearance
		 */
		appearance?: 'none' | 'auto' | Compat_auto | Compat_special | Common
		
		/**
		 * Sets a preferred aspect ratio for the box, which will be used in the calculation of auto sizes and some other layout functions.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
		 */
		aspectRatio?: 'auto' | number | `${number} / ${number}`
		
		/**
		 * lets you apply graphical effects such as blurring or color shifting to the area behind an element.
		 * Because it applies to everything behind the element, to see the effect you must make the element
		 * or its background at least partially transparent.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
		 */
		backdropFilter:
		| $mol_style_func<$mol_style_func_filter> | $mol_style_func<'url'>
		| ( $mol_style_func<$mol_style_func_filter> | $mol_style_func<'url'> )[][]
		|'none' | Common
		
		/**
		 * Sets whether the back face of an element is visible when turned towards the user.
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility	
		 */
		backfaceVisibility: 'visible' | 'hidden' | Common
		
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
			 * Sets whether a background image's position is fixed within the viewport, or scrolls with its containing block.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment
			 */
			attachment?: 'scroll' | 'fixed' | 'local' | ('scroll' | 'fixed' | 'local')[][] | Common
			
			/**
			 * Sets how an element's background images should blend with each other and with the element's background color.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode
			 */
			blendMode?: Mix_blend_mode | Mix_blend_mode[][] | Common
			
			/**
			 * Sets whether an element's background extends underneath its border box, padding box, or content box.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip
			 */
			clip?: Box | Box[][] | Common
			
			/** 
			 * Background color.
			 * @see https://developer.mozilla.org/ru/docs/Web/CSS/background-color 
			 */
			color?: $mol_style_properties_color | Common
			
			/** 
			 * Background images.
			 * @see https://developer.mozilla.org/ru/docs/Web/CSS/background-image
			 */
			image?:
			| readonly( readonly [ $mol_style_func< $mol_style_func_image > | string&{} ] )[]
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

		/** @see https://developer.mozilla.org/ru/docs/Web/CSS/box-shadow */
		box?: {

			/** 
			 * Shadow effects around an element's frame.
			 * @see https://developer.mozilla.org/ru/docs/Web/CSS/box-shadow
			 */
			shadow?:
			| readonly (
				| [
					... [ inset: 'inset' ] | [],
					x: Length,
					y: Length,
					blur: Length,
					spread: Length,
					color: $mol_style_properties_color,
				]
				| {
					inset?: boolean
					x: Length
					y: Length
					blur: Length
					spread: Length
					color: $mol_style_properties_color
				}
			)[]
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
			| string & {}
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
		color?: $mol_style_properties_color | Common

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
			color?: readonly [ $mol_style_properties_color , $mol_style_properties_color ] | 'auto' | Common
			
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
		border?: Directions<{

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
			color?: $mol_style_properties_color | Common

			/** 
			 * Width of element's border.
			 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border-width
			 */
			width?: Length | Common

		}>

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
		
	}

}
