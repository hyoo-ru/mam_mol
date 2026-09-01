# $mol_wire_log

Watch and logs reactive states. Logger automatically added to test bundle which is adding to `test.html`.

## Usage

- Open console.
- Locate interesting channel.
- Provide it as watching root to the $mol_wire_log.

```
$mol_wire_log.watch( ()=> $mol_app_hello.Root(0).Greeting().dom_tree() )
```

Changes to all states on which the root explicitly or implicitly depends will be output to the console.

![](https://i.imgur.com/smQUjZB.png)

To disable logging type: `$mol_wire_log.watch( null )`
