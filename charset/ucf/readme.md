# $mol_charset_ucf

> [UCF](https://page.hyoo.ru/#!=1woher_nlk5d3) - Simple compact unicode text binarization format.

![](https://habrastorage.org/webt/vt/dh/un/vtdhunkbk7tztverhjedla2bzhi.png)

# Usage

```ts
bin = $mol_charset_ucf_encode( text )
text = $mol_charset_ucf_decode( bin )
```

## From NPM

`npm install` [mol_charset_ucf_lib](https://www.npmjs.com/package/mol_charset_ucf_lib)

```ts
import {
	$mol_charset_ucf_encode,
	$mol_charset_ucf_decode
} from '$mol_charset_ucf_lib'
```

# Benchmarks

## Encoding perf
![](https://habrastorage.org/webt/4j/nh/iz/4jnhizmmtjbomjwq45_p8vhab-i.png)

## Decoding perf
![](https://habrastorage.org/webt/9u/xp/hb/9uxphba95qedw9wdyyd0rueesww.png)
