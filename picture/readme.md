# $mol_picture

Image processing.

## Usage

```ts
// downsize, preserve aspect
const pict = $mol_picture.fit( uri, 96 )
const blob = pict.format( 'image/png' )
```

```ts
// downsize, preserve aspect
const pict = $mol_picture.fit( file, 800 )
const blob = pict.format( 'image/jpeg' )
```

```ts
// resize, change aspect
const pict = $mol_picture.make( img, 1920, 1080 )
const blob = pict.format( 'image/webp' )
```