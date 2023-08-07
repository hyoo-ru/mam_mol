# $mol_style_prop

Create record of CSS variables.


## Signature

```ts
type Result = Record< string , $mol_style_func< 'var' > >

$mol_style_prop( prefix : string , postfixes : Array< string > ) : Result
```


## Example

### theme.css

```css
:root {
	--my_app_theme_main: #fffcbb;
	--my_app_theme_main_light: #fffcbb7d;
	--my_app_theme_border: #fffaa0;
}
```

### theme.ts

```ts
export const my_app_theme = $mol_style_prop(
	'my_app_theme',
	[ 'main', 'main_light', 'border' ]
)
```

### *.css.ts

```ts
$mol_style_define(
	$my_app,
	{
		background: {
			color: $my_app_theme.main,
		},
		border: {
			color: $my_app_theme.border,
		},
	}
)
```
