# $mol_crypto

Simple API for effective cross platform cryptography with minimal extra size.

## (a)Symmetric Encryption, Signing, Hashing


```typescript
const Alice = await $mol_crypto_key_private.generate() // 96 B
const Bella = await $mol_crypto_key_private.generate() // 96 B

const secret = await $mol_crypto_sacred_shared( // 16 B
	Alice, // 96 B
	Bella.public(), // 64 B
)

const data = new Uint8Array([ 1, 2, 3 ]) // 3 B
const salt = $mol_crypto_salt() // 16 B

const closed = await secret.encrypt( data, salt ) // 16x B
const digest = $mol_crypto_hash( closed ) // 20 B
const sign = await Alice.sign( digest ) // 64 B

const verified = await Alice.public().verify( digest, sign ) // true
const opened = await secret.decrypt( closed, salt ) // 3 B
```

## Authentication

```typescript
// Returns authenticated secret key using WebAuthn
const Alice = await $.$mol_crypto_sacred_id() // 16 B
```

## Password Hashig, Encryption

```typescript
const password = "qwerty"
const app = $mol_crypto_hash( $mol_charset_encode( "example.com" ) ) // 20 B
const secret = await $mol_crypto_sacred_pass( password, app ) // 16 B

const data = new Uint8Array([ 1, 2, 3 ]) // 3 B
const salt = $mol_crypto_salt() // 16 B

const closed = await secret.encrypt( data, salt ) // 16x B
const opened = await secret.decrypt( closed, salt ) // 3 B
```

# Usage from NPM

```
npm install mol_crypto_lib
```

[![](https://badgen.net/bundlephobia/minzip/mol_crypto_lib)](https://bundlephobia.com/package/mol_crypto_lib)

```javascript
export { $mol_crypto_salt, default as $ } from "mol_crypto_lib"
```
