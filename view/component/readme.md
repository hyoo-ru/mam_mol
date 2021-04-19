# $mol_view_component

Registers [View](..) as [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

## Register

```typescript
$mol_view_component( $mol_select )
```

## Instantiate

```html
<mol-select dictionary='{ "xxx": "yyy" }'></mol-select>
```

All attributes contains JSON, that will be parsed and pushed to property with same name. Like:

```typescript
element.view.dictionary({ xxx: 'yyy' })
```

## Runtime access

```typescript
element.view.value()
```

`view` property returns `$mol_view` instance that controls web component-content.

## Styling

Styles are copied from `style` element of main document with `id` = `$mol_style_attach`.
