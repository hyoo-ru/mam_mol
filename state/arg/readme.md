# $mol_state_arg

State of arguments.

## NodeJS

When command line arguments like ```foo=bar xxx```:

```
$mol_state_arg.value( 'foo' ) // 'bar'
$mol_state_arg.value( 'xxx' ) // ''
$mol_state_arg.value( 'help' ) // null
```

## Web

When document location like ```#foo=bar/xxx``` or ```?foo=bar&xxx```:

```
$mol_state_arg.value( 'foo' ) // 'bar'
$mol_state_arg.value( 'xxx' ) // ''
$mol_state_arg.value( 'help' ) // null
$mol_state_arg.value( 'xxx' , null ) // Location is '#foo=bar' now
$mol_state_arg.link({ xxx : '' , abc : 'hello' }) // '#foo=bar/xxx/abc=hello'
```

## Properties

**```value( key : string , next? : string ) : string```**

Returns and sets value by key without history position changing.

**```dict( next? : { [ ket : string ] : string } ) : { [ ket : string ] : string }```**

Returns and sets dictionary of all arguments.

**```link( next : { [ key : string ] : string } ) : string```**

Returns link with overrided arguments.

# Real world usage

- [$mol_link](../../link)
