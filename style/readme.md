# $mol_style

Staticaly typed css style sheets.

## BEM Block

```typescript
class $mol_page extends $mol_view {}

$mol_style_define( $mol_page , {
	flexDirection: 'column',
} )
```

```css
[mol_page] {
	flex-direction: column;
}
```

## BEM Element

```typescript
class $mol_page extends $mol_view {
	@ $mol_mem
	Body() { return new $mol_scroll }
}

$mol_style_define( $mol_page , {
	Body {
		overflow: 'scroll',
	},
} )
```

```css
[mol_page_body] {
	overflow: scroll;
}
```

## BEM Element of Element etc

```typescript
class $mol_scroll extends $mol_view {
	@ $mol_mem
	Strut() { return new $mol_view }
}

class $mol_page extends $mol_view {
	@ $mol_mem
	Body() { return new $mol_scroll }
}

$mol_style_define( $mol_page , {
	Body {
		Strut {
			display: 'none',
		},
	},
} )
```

```css
[mol_page_body_strut] {
	display: none;
}
```

## Nested components by class name

```typescript
class $mol_button extends $mol_view {}
class $my_app extends $mol_view {}

$mol_style_define( $my_app , {
	$mol_button {
		cursor: 'pointer',
	},
} )
```

```css
[my_app] [mol_button] {
	cursor: pointer;
}
```

## Child components by class name

```typescript
class $mol_list extends $mol_view {}

$mol_style_define( $mol_list , {
	'>': {
		$mol_view {
			display: 'block',
		},
	},
} )
```

```css
[mol_list] > [mol_view] {
	display: block;
}
```

## Attributes

```typescript
class $mol_link extends $mol_view {
	attr() {
		return {
			'mol_link_current' : true
		}
	}
}

$mol_style_define( $mol_link , {
	'@': {
		mol_link_current: {
			'true': {
				color: 'black',
			},
		},
	},
} )
```

```css
[mol_link][mol_link_current="true"] {
	color: black;
}
```

## Pseudo classes

```typescript
class $mol_string extends $mol_view {}

$mol_style_define( $mol_string , {
	':focus': {
		outline: 'none',
	},
} )
```

```css
[mol_string]:focus {
	outline: none;
}
```

## Pseudo elements

```typescript
class $mol_text extends $mol_view {}

$mol_style_define( $mol_text , {
	'::first-child': {
		fontWeight: 'bolder',
	},
} )
```

```css
[mol_text]::first-child {
	font-weight: bolder;
}
```

## Media queries

```typescript
class $mol_scroll extends $mol_view {}

$mol_style_define( $mol_scroll , {
	'@media': {
		'print': {
			overflow: 'visible',
		},
	},
} )
```

```css
@media print {
	[mol_scroll] {
		overflow: visible;
	}
}
```

## Theming

```typescript
class $mol_page extends $mol_view {}

$mol_style_define( $mol_page , {
	background: $mol_theme.back,
	boxShadow: `0 0 0 1px ${ $mol_theme.line }`,
} )
```

```css
[mol_page] {
	background: var(--mol_theme_back);
	boxShadow: 0 0 0 1px var(--mol_theme_line);
}
```
