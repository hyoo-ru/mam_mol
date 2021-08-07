# $mol_plot

Fastest plot lib for vector graphics.

## Benchmarks

* [chart/rope](chart/rope) - Line graphs rendering by charts libraries ([online](http://bench.hyoo.ru/chart/rope/#sort=fill/sample=hcharts~mol))
* [chart/bar](chart/bar) - Bar graphs rendering by charts libraries ([online](http://bench.hyoo.ru/chart/bar/#sort=fill/sample=hcharts~mol))

## Real life usages

- [draw.hyoo.ru](https://draw.hyoo.ru/)
- [life.hyoo.ru](https://life.hyoo.ru/)
- [iq.hyoo.ru](https://iq.hyoo.ru/)

## NPM usage

```sh
npm install mol_plot_all
```

```javascript
import {
	$mol_plot_pane,
	$mol_plot_map_heat,
	$mol_atom2,
} from 'mol_plot_all'

// constants
const width = 20;
const height = 200;
const length = width * height;

// prepare heat map graph
const map = new $mol_plot_map_heat();
map.series_x = () => Array.from({ length }, (_, i) => i % width);
map.series_y = () => Array.from({ length }, (_, i) => Math.floor(i / width));

// make observable atom
const source = new $mol_atom2
// define memoized calculation
source.calculate = ()=> Array.from({ length }, (_, i) => Math.floor(Math.random() * 20) * 1000);
// enforce update data every second 
setInterval( ()=> source.obsolete(), 1000 )
// connect dynamic provider with graph
map.series_z = () => source.get()

// prepare pane for graphs
const pane = new $mol_plot_pane();
// connect zoom with Y axis
pane.zoom = next => pane.scale_y( next )
// provide graphs to map
pane.graphs = () => [map];

// place pane to document
document.body.appendChild(pane.dom_node());
// activate dynamic behaviour
const alive = pane.autorun()

// deactivate
// alive.destructor()
```

[Online sandbox](https://codepen.io/nin-jin/pen/xxdQGEO?editors=0010)
