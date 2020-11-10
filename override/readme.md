# $mol_override

Checks method is override of same method of some superclass.

## Sample

```typescript
class Foo {

    bar( a : number ) {
        return a 
    }

    bar2( a : number , b : number ) {
        return a 
    }

}

class Foo2 {
    
    @$mol_override( Foo )
    bar( a : number ) {
        return 1
    }

    @$mol_override( Foo )
    bar2( a : number , b : number ) {
        return 1 
    }

    xxx() { return '777' }

}

class Foo3 extends Foo2 {

    @$mol_override( Foo ) // OK
    bar( a : number ) { return 5 }

    @$mol_override( Foo ) // Error: less args than should
    bar2( a : number ) { return 5 }

    @$mol_override( Foo ) // Error: accidental override Foo2
    xxx() { return '666' }

    @$mol_override( Foo ) // Error: override of absent method
    yyy() { return 0 }

}
```

[Playground](https://www.typescriptlang.org/play?#code/MYGwhgzhAEBiD29oG8CwAoD1vQEZgCcAKaMaALmgDsBXAW1wFMDoBKFLHLgxgFxoJVS0TtgC+GUXkIAmEmUq0GzaABo8FavSYt2adF258BQslImZ0FjKEgwE8GRwM4pAAQAkdeCAD68ADdmAgBLABNGEgc2KXxiYUVtFT0pI35BaABGc0kXbE9vP0Dg8Mi4RBi86QI5BK1lFnVcTSUdNmdDHB50oUyRKusqgA8Roj1obpNoAHIAdnnp6EHB2yhy+ABmaEYh3kYqMPtEJ313Lx9-IIJQiKiK9gB6B+gAeQBpWMJ5FqTdFAnjBkAKxLXJcAoXYrXUp3JCPZ4AUWu8AIlBAjDWhAA5jBeAALMBCCB4+A0EBhT41b6JBrtZAAnrQEGDcHnIpXG5laLw6BIggoyhgYDAUpUXhgEDQKGc9YyKQjIZjf6TDLTABsGsWLJwEPZJVu63aT15yNRUo5pSlADNSLgIPteNA6HwSRSqgBPT1K+kqoQABlBlkGVpoVGAvBC8CEbMu+sYAB5oABlGgAB2gAD4SBA05p6an+bx4Lx3anGJoU+mxHSpL7oPHUjhYCFGOTtrt9odoABrRju+A2ytqRvYAAKhaQOz2Bxg9IA2j2+9AQkJm62wtAALoVtMLtdt7fV1RSLMj6AF4tISjjy-DqpcK0ttuUfcb4-3nARCDAFiUAAqpaMGEN5lgQJYACIYj+ISpkWBCJpWe5Phu24ZneXCsAAvGhyAWBYQA)
