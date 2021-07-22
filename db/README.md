# $mol_db

Static typed facade for [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) with simple API.

## IndexedDB Structure

- **Database** has Stores
- - **Store** has Documents
- - - **Index** points to Documents

## DB life Cycle

### DB Schema

```typescript
type ACME = {
	Users: {
		Key: number
		Doc: {
			name: {
				first: string
				last: string
			}
			age: number
		}
		Indexes: {
			names: [ string, string ]
			ages: [ number ]
		}
	}
	Articles: {
		Key: string
		Doc: {
			title: string
			body: string
		}
		Indexes: {
			full: [ string, string ]
		}
	}
}
```

### Open DB without Migrations

```typescript
const db = await $$.$mol_db< ACME >( 'ACME' )
```

### Open DB with automatic migrations

```typescript
const db = await $$.$mol_db< ACME >( 'ACME',
	mig => mig.store_make( 'Users' )
	mig => mig.stores.Users.index_make( 'ages', [ 'age' ] )
	mig => mig.stores.Users.index_make( 'names', [ 'name.first', 'name.last' ], !!'unique' )
	mig => mig.stores.Users.index_drop( 'ages' )
	mig => mig.store_drop( 'Users' )
)
```

There is 5 migrations. And DB version is 6.

### Close DB Connection

```typescript
db.destructor()
```

### Delete DB

```typescript
db.kill()
```

## Transaction Life Cycle

### Read Only Transactions

```typescript
const { Users, Articles } = db.read( 'Users', 'Articles' )
```

### Read/Write Trasactions

```typescript
const trans = db.read( 'Users', 'Articles' )
const { Users, Articles } = trans.stores

// ...

trans.abort()
// or
await trans.commit()
```

Uncommited transaction without errors will be commitetd automatically. Any modification error aborts transaction.

## Documents Life Cycle

### By Primary key

#### Insert with Auto Incremental Primary Key

```typescript
const key = await Users.put({
	first: 'Jin',
	last: 'Nin',
	age: 36,
})
```

#### Put/Overwrite by Primary Key

```typescript
await Users.put( {
	first: 'Jin',
	last: 'Nin',
	age: 37,
}, 1 )
```

### Get One By Primary Key

```typescript
const [ user ]= await Users.get( 1 )
```

### Select 10 By Primary Keys

```typescript
const users = await Users.get( IDBKeyRange.bound( 10, 50 ), 10 )
```

### Count By Primary Keys

```typescript
const count = await Users.count( IDBKeyRange.bound( 10, 50 ) )
```

### By Index

```typescript
const { names, ages } = users.indexes
```

### Get One By Index

```typescript
const [ user ]= await names.get([ 'Jin', 'Nin' ])
```

### Select 10 By Index

```typescript
const users = await ages.get( [ 18 ], 10 )
```

### Count By Primary Keys

```typescript
const count = await Users.count([ 18 ])
```

