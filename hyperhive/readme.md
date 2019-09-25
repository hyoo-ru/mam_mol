# $mol_hyperhive

Reactive adapter for [HypeHive](http://eigenmethod.com/products/hh/). Communicates over http or cordova plugin if installed.

## Usage example

```typescript
namespace $ {
	
	export interface $my_domain_user {
		name : string
		age : number
		avatar : string
	} 
	
	export class $my_domain extends $mol_object {
		
		hyperhive() {
			return $mol_hyperhive.item({
				host : "example.org" ,
				version : "v0.6" ,
				environment : "env_id" ,
				project : "prj_id" ,
				application : "app_id" ,
			})
		}
		
		@ $mol_mem
		data( next? : $my_data ) {
			return this.hyperhive().data< $my_domain_user[] >( 'USERS_TABLE' )
		}
		
		login( next? : string ) {
			return this.hyperhive().login( next )
		}
		
		password( next? : string ) {
			return this.hyperhive().password( next )
		}
		
	}
}
```

## Factory

**`$mol_hyperhive.item({ host , version , envinronment , project , application }) : $mol_hyperhive`**

Returns configured $mol_hyperhive instance.

### Properties

**`login( next? : string ) : string`**

Setup login.

**`password( next? : string ) : string`**

Setup password.

**`authentificated() : boolean`**

Returns true if logged in.

**`data< Data >( table : string , next? : Data ) : Data`**

Returns and modifies table.

