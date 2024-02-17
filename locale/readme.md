# $mol_locale

Language selection component

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_locale_demo)


## Usage example

All languages

```
	<= All_languages $mol_locale_select
```

Or you can give user select from your list

```
	<= List_of_languages $mol_locale_select
		dictionary *
			ru \Russian
			en \English
```

Or from code usage

```typescript
$mol_locale.lang() //  get current lang
$mol_locale.lang("en") // set lang
```

Sample language list - https://github.com/hyoo-ru/lingua.hyoo.ru/blob/master/langs/langs.ts
