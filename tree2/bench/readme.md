# $mol_tree2 benchmark

```sh
npm start mol/tree2/bench && node mol/tree2/bench/-/node.js

json <= string <= file: 104.564ms
json => string => file: 175.846ms
tree <= json: 167.657ms
tree => string => file: 222.12ms
tree => file stream: 2.546s
tree <= string <= file: 278.535ms
```
