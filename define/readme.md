# $mol_define

Checks that a member does not override the same member of the superclass.

## Sample

```typescript
class Foo1 {

    bar0!: number

    bar1() {
        return a 
    }

}

class Foo2 extends Foo1 {
    
    @ $mol_define( Foo1 ) // Error: Accidental redefine
    bar0!: number

    @ $mol_define( Foo1 ) // Error: Accidental redefine
    bar1() {
        return 1 
    }

    @ $mol_define( Foo1 ) // OK
    bar2() {
        return 1 
    }

}
```

[Playground](https://www.typescriptlang.org/play?#code/MYGwhgzhAEBiD28CM0DeBYAUF6voCMwAnABgEIAuaAOwFcBbfAUyKxz0KKQAoBKNdnjxEmAF1pFq0MNEHQAvm0yLsmUJBgJ4AJmhMAHqKbUAJpsQoMmIXIAC0ACT14IAPommAMwCW1JtzgLaH4AehDoAFEiIngiKgBBYGBvD2pRMBBoEQ8fPzlOcio6RhYlIXsnF3cvX39A5GDoMMjo2ISklON0zOyavOsOYh5+KyEhEXFJaBQ5FTtHZzcc2oCtFFDwgHkAaXzibT4BAbGssQkpGeOFJTnMT1pqYFFveClKpb6mAB5oAGVaAAO0AAfAEIIDoEUmAB3PgAXmBfwhIzkE3O0C+ciEsG8TBAJj0hmMZmgAGsmABPeCeaAABRiong0AANFi8PT4IzCUZTDBUPIWXJQWzcACGUyqByuayrkIfHiCVQcQrucSYOSqTT-kCAPwLKqiCkApiuFgxIg-ADkiWSqW6p2WfktIMhcFx+JlJ1wHggwCIeqoABUjUwTBzjURDQARJi+ojeAGMi108UAbTdKoAui7PXheAjoD6-Vhbobjfq3GWTWbYj8ALKxiBgADmTBZ0AAktRPEy4WgBYi+w2oC22wAyNAV1xV02tIiurs9hRAA)
