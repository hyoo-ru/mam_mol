# mol/dev/formatter/simplify

Shows in chrome dev tools only `Symbol.toStringTag` value if defined. 

```
Foo.bar()['lol']
```

Instead of default partial content like that:

```
Foo.bar()['lol'] { [Symbol.toStringTag] : "Foo.bar()['lol']" , title : 'xxx' ... }
```

# Usage

***.meta.tree**

```
include \/mol/dev/formatter/simplify
```
