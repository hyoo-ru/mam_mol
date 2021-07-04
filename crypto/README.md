# $mol_crypto

Simple API for effective cross platform cryptography.

## Symmetric encoding

```typescript
// Any DataView or ArrayBuffer
const data = new Uint8Array([1,2,3])

// Should be unique for every encryption
const salt = $mol_crypto_salt()

// Generates secret key
const Alice = await $mol_crypto_secret.generate()

// Serialize secret key to ArrayBuffer
const key = await Alice.serial()

// Reuse secret key from ArrayBuffer
const Bob = await $mol_crypto_secret.from( key )

// Use secret key and salt to encrypt data
const closed = await Alice.encrypt( data, salt )

// Use secret key and salt to decrypt data
const opened = await Bob.decrypt( closed, salt )
```

## Asymmetric encoding

```typescript
// Any DataView or ArrayBuffer
const data = new Uint8Array([1,2,3])

// Generates private-public key pair
const pair = await $mol_crypto_cipher_pair()

// Serialize keys to ArrayBuffer
const key_public = await pair.public.serial()
const key_private = await pair.private.serial()

// Reuse keys from ArrayBuffer
const Alice = await $mol_crypto_cipher_public.from( key_public )
const Bob = await $mol_crypto_cipher_private.from( key_private )

// Use public key to encrypt data
const closed = await Alice.encrypt( data )

// Use private key to decrypt data
const opened = await Bob.decrypt( closed )
```

## Asymmetric signing

```typescript
// Any DataView or ArrayBuffer
const data = new Uint8Array([1,2,3])

// Generates private-public key pair
const pair = await $mol_crypto_auditor_pair()

// Serialize keys to ArrayBuffer
const key_public = await pair.public.serial()
const key_private = await pair.private.serial()

// Reuse keys from ArrayBuffer
const Alice = await $mol_crypto_auditor_public.from( key_public )
const Bob = await $mol_crypto_auditor_private.from( key_private )

// Make sign for data
const sign = await Alice.sign( data )

// Use sign to verify data
const  = await Bob.verify( data, sign )
```

# Usage from NPM

```
npm install mol_crypto_lib
```

[![](https://badgen.net/bundlephobia/minzip/mol_crypto_lib)](https://bundlephobia.com/package/mol_crypto_lib)

```javascript
import { $mol_crypto_salt } from 'mol_crypto_lib'
```
