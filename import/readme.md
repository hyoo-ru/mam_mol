# $mol_import

Dynamic sources import.

## Import scripts

**`$mol_import.script( uri : string ) : Window`**

```typescript
return $mol_import.script( `https://api-maps.yandex.ru/2.1/?lang=${ $mol_locale.lang() }` ).ymaps
```

## Import styles

**`$mol_import.style( uri : string ) : CSSStyleSheet `**

```typescript
return $mol_import.style( `https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css` ).cssRules
```
