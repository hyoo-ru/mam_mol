# $mol_db

Static typed facade for [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) with simple API.

## Teaser

```typescript
type User = {
	name: string
	admin: boolean
}

// Static typed schema
type DB = {
	User: {
		Key: [ string ]
		Doc: User
		Indexes: {
			Name: [ string ]
		}
	}
}

// Automatic migrations
const db = await $mol_db< DB >( '$my_app',
	mig => mig.store_make( 'User' ),
	mig => {
		const { User } = mig.stores
		User.index_make( 'Name', [ 'name' ] )
	},
)

// Writing transaction
const { User } = db.change( 'User' ).stores
await User.put({ name: 'Jin', admin: true })

// Reading transaction
const { Name } = db.read( 'User' ).User.indexes
const jins = await Name.select([ 'Jin' ])
```

## IndexedDB Structure

- **Database** contains named Stores
- - **Store** contains Documents by primary keys and named Indexes
- - - **Document** contains any data
- - - **Index** points to Documents

## DB life Cycle

### DB Schema Example

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
			content: string
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
	mig => mig.store_make( 'Users' ),
	mig => mig.stores.Users.index_make( 'ages', [ 'age' ] ),
	mig => mig.stores.Users.index_make( 'names', [ 'name.first', 'name.last' ], !!'unique' ),
	mig => mig.store_make( 'Articles' ),
	mig => mig.stores.Articles.index_make( 'full', [ 'title', 'content' ] ),
	// mig => mig.stores.Articles.index_drop( 'full' ),
	// mig => mig.store_drop( 'Articles' ),
)
```

There is 5 migrations. And DB version is 6. After uncommenting last 2 rows, it applies 2 additional migrations and DB version will be 8.

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
const trans = db.change( 'Users', 'Articles' )
const { Users, Articles } = trans.stores

// ...

trans.abort()
// or
await trans.commit()
```

Uncommitted transaction without errors will be committed automatically. Any modification error aborts transaction.

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
const user = await Users.get( 1 )
```

### Select 10 By Primary Keys

```typescript
const users = await Users.get( $mol_dom_context.IDBKeyRange.bound( 10, 50 ), 10 )
```

### Count By Primary Keys

```typescript
const count = await Users.count( $mol_dom_context.IDBKeyRange.bound( 10, 50 ) )
```

### By Index

```typescript
const { names, ages } = users.indexes
```

### Get One By Index

```typescript
const user = await names.get([ 'Jin', 'Nin' ])
```

### Select 10 By Index

```typescript
const users = await ages.get( [ 18 ], 10 )
```

### Count By Primary Keys

```typescript
const count = await Users.count([ 18 ])
```

## Usage from NPM

```
npm install mol_db
```

[![](https://badgen.net/bundlephobia/minzip/mol_db)](https://bundlephobia.com/package/mol_db)

```javascript
import { $mol_db } from 'mol_db'
```
