# $mol_wire_dom

Polyfill makes DOM reactive.

**Proof of Concept. Very slow until real DOM isn't reactve.**

[Complete example](./index.html). [Online sandbox](https://jsfiddle.net/05hm6Lkt/).

## Make some DOM tree reactive

```js
$mol_wire_dom( document.body )
```

Reactivity fully working only on connected DOM tree.

## Add reactive rules

At any time you can define or redefine getter for some DOM node fields.

```ts
const root!: HTMLDIvElement
const form!: HTMLFormElement
const greet!: HTMLInputElement
const greeting!: HTMLParagraphElement

root.__defineGetter__( 'childNodes', ()=> greet.checked ? [ form, greeting ] : [ form ] )
```

So far, not all are supported yet. See sources for more info.
