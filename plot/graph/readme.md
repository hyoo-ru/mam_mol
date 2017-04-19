# $mol_plot_graph

Plot graph base class. Provides common maths.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_plot)

## Properties

`series() : number[]`

Series of source data.

`points() : number[][]`

List of points to draw on pane in pane coordinates.

`type() : "solid"|"dashed"`

Visualization type.

`Sample() : $mol_view`

Sample for legend.

## Graph types

- Simple: [line](../line), [dots](../dot), [fill](../fill), [bar](../bar)
- Complex: [group](../group)
- Rulers: [vertical](../ruler/vert), [horizontal](../ruler/hor)
