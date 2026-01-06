# $mol_charset_ucf

> [UCF](https://page.hyoo.ru/#!=1woher_nlk5d3) - Simple compact unicode text binarization format.

![](https://habrastorage.org/webt/hj/r6/lr/hjr6lrivvtdevnuwa99v8__njn0.png)

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
} from 'mol_charset_ucf_lib'
```

# Benchmarks

System: Chrome 143, Win 10, i7-6600U 2.60GHz

## Encoding perf
[Online](https://perf.js.hyoo.ru/#!bench=yl2hcs_rfamzi)

![](https://habrastorage.org/webt/xy/0w/qn/xy0wqnvz9vlc2uwmcbbwm98a3v0.png)

## Decoding perf
[Online](https://perf.js.hyoo.ru/#!bench=hlj49x_hdq7va)

![](https://habrastorage.org/webt/t5/lj/7l/t5lj7lwg97tzih7cpukqg7k6j88.png)
