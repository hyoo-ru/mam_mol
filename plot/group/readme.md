# $mol_plot_group

Group of another graphs. Legend sample will be combined from samples of nested graphs.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_plot_demo)

## Usage example

```tree
<= Plan $mol_plot_group
	series_x <= plan_x /
	series_y <= plan_y /
	graphs /
		<= Plan_line $mol_plot_line
		<= Plan_dots $mol_plot_dot
```

## Properties

See [$mol_plot_graph](../graph).

`graphs() : $mol_plot_graph[]`

List of graphs. ```series_x```, ```series_y``` will be injected to every of them.
