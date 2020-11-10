# $mol_override

Checks them member is override of same member of superclass.

## Sample

```typescript
class Foo1 {

    bar1( a : number ) {
        return a 
    }

    bar2( a : number , b : number ) {
        return a 
    }

}

class Foo2 extends Foo1 {
    
    @$mol_override( Foo1 )
    bar2( a : number , b : number ) {
        return 1 
    }

}

class Foo3 extends Foo2 {

    @ $mol_override( Foo2 ) // OK
    bar1( a : number ) { return 5 }

    @ $mol_override( Foo2 ) // Error: less args than should
    bar2( a : number ) { return 5 }

    @ $mol_override( Foo2 ) // Error: override of absent method
    bar3() { return 0 }

}
```

[Playground](https://www.typescriptlang.org/play?#code/MYGwhgzhAEBiD28CM0DeBYAUF6voCMwAnJACmjGgC5oA7AVwFt8BTI6ASjRz16JYAu9IrQrQeuAL5YJBYgCZylGg2ZtoAGgLU6TVuy4ZMvPoOGjKs6dkzWsoSDATx50FgA8BLWgBMniFCNeWQABABJGeBAAfXgANzYiAEsfFnJnFA5ZQiJFMRU9dS18HVV9Tm5jE1x+IRFoFCsZW2aHKDhEAGY3T28-DpdK0OgIqNiEomTU9MRXLgB6eegAeQBpbOIyfN01AzRoWvNoAFZoOyrcEJHImPjElLSBuehF6ABRSfgiGhAWduIAOYwAQACzAoggIPg9BAPg2uSUpUKe1QBzM9VO514V1GtwmU0ezmerw+RC+NDukwe0HgADMKPgIN4BNBGIIoXCLnIiJ1SIY0XVRAAGM7Nc60+i0YACJLwUS48b3VIAHmgAGV6AAHaAAPnIEC1pRYAHc+QBeHXqw2GWSHerK2S8WBJFiwnpeXwwADWLAAnnSrdqNI68AAFMkCeDuvowVEAbWgPt90CSomdrp80AAujoNZqE+m3TnJJpZHqQ7hNRGozRw-BI6WubxaS63TRC5ng028KkIMB2DQACq+zUsHx10dEAS+gAif37SU1kaIqrzBdbmZzlq7vA4FrQ1msQA)
