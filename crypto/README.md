# $mol_crypto

Simple API for effective cross platform cryptography with minimal extra size.

## (a)Symmetric Encryption, Signing, Hashing


```typescript
const Alice = await $mol_crypto_key_private.generate() // 96 B
const Bella = await $mol_crypto_key_private.generate() // 96 B

const secret = await $mol_crypto_secret.derive(
	Alice.toString(), // 96 -> 129 B
	Bella.public().toString() // 64 -> 86 B
)

const data = new Uint8Array([ 1, 2, 3 ]) // 3 B
const salt = $mol_crypto_salt() // 12 B

const closed = await secret.encrypt( data, salt ) // 3+4 B
const digest = $mol_crypto_hash( closed ) // 20 B
const sign = await Alice.sign( digest ) // 64 B

const verified = await Alice.public().verify( digest, sign )
const opened = await secret.decrypt( closed, salt ) // 3 B
```

## Authentication

```typescript
// Returns authenticated secret key using WebAuthn
const Alice = await $mol_crypto_secret_id()
```

# Usage from NPM

```
npm install mol_crypto_lib
```

[![](https://badgen.net/bundlephobia/minzip/mol_crypto_lib)](https://bundlephobia.com/package/mol_crypto_lib)

```javascript
import { $mol_crypto_salt } from 'mol_crypto_lib'
```
