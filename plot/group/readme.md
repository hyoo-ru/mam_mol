# $mol_plot_group

Group of another graphs. Legend sample will be combined from samples of nested graphs.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_plot)

## Usage example

```tree
<= Plan $mol_plot_group
	series <= plan /
	graphs /
		<= Plan_line $mol_plot_line
		<= Plan_dots $mol_plot_dot
```

## Properties

See [$mol_plot_graph](../graph).

`graphs() : $mol_plot_graph[]`

List of graphs. ```series``` will be injected to every of them.
