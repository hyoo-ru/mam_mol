# $mol_charset_ucf

> [UCF](https://page.hyoo.ru/#!=1woher_nlk5d3) - Simple compact unicode text binarization format.

![](https://habrastorage.org/webt/ce/wj/w5/cewjw5ghf9byepbm_iuxahke9qi.png)

# Usage

```ts
bin = $mol_charset_ucf_encode( text )
text = $mol_charset_ucf_decode( bin )
```

## From NPM

`npm install` [mol_charset_ucf](https://www.npmjs.com/package/mol_charset_ucf)

```ts
import {
	$mol_charset_ucf_encode,
	$mol_charset_ucf_decode
} from 'mol_charset_ucf'
```

# Benchmarks

System: Chrome 143, Win 10, i7-6600U 2.60GHz

## Encoding perf
[Online](https://perf.js.hyoo.ru/#!bench=yl2hcs_rfamzi)

![](https://habrastorage.org/webt/so/yi/zn/soyiznuilrlcavnkdvrrrzkneyg.png)

## Decoding perf
[Online](https://perf.js.hyoo.ru/#!bench=hlj49x_hdq7va)

![](https://habrastorage.org/webt/nd/a5/tc/nda5tcoyonivn5x3onukgpd4yew.png)
