# $mol_view_component

Registers [View](..) as [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

## Register

**`$mol_view_component( View: typeof $mol_view )`**

Example:

```typescript
$mol_view_component( $mol_select )
```

## Instantiate

Example:

```html
<mol-select dictionary='{ "xxx": "yyy" }'></mol-select>
```

All attributes contains JSON, that will be automatically parsed and pushed to property with same name. Like:

```typescript
element.view.dictionary({ xxx: 'yyy' })
```

## Runtime access

Example:

```typescript
element.view.value()
```

`view` property returns `$mol_view` instance that controls web component-content.

## Watching for changes

Example:

```typescript
const watcher = new $mol_wire_atom( 'some id', ()=> {
    const current_value = element.view.value()
    // do something for every new value
} )

// ...

watcher.destructor()
```

## Styling

Styles are copied from `style` element of main document with `id` = `$mol_style_attach`.
