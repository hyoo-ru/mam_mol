# $mol_crypto

Simple API for effective cross platform cryptography.

## Symmetric encoding

```typescript
// Any DataView or ArrayBuffer
const data = new Uint8Array([1,2,3])

// Should be unique for every encryption (but may be predictable)
const salt = $mol_crypto_salt() // 4 bytes

// Generates secret key
const Alice = await $mol_crypto_secret.generate()

// Serialize secret key to ArrayBuffer (16 byte)
const key = await Alice.serial()

// Reuse secret key from ArrayBuffer
const Bob = await $mol_crypto_secret.from( key )

// Use secret key and salt to encrypt data (4 bytes + data length )
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

// Serialize public key to ArrayBuffer (162 bytes)
const key_public = await pair.public.serial()

// Serialize private key to ArrayBuffer (~640 bytes)
const key_private = await pair.private.serial()

// Reuse keys from ArrayBuffer
const Alice = await $mol_crypto_cipher_public.from( key_public )
const Bob = await $mol_crypto_cipher_private.from( key_private )

// Use public key to encrypt data (max 86 bytes input, 128 bytes output)
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

// Serialize public key to ArrayBuffer (62 bytes)
const key_public = await pair.public.serial()

// Serialize private key to ArrayBuffer (~195 bytes)
const key_private = await pair.private.serial()

// Reuse keys from ArrayBuffer
const Alice = await $mol_crypto_auditor_public.from( key_public )
const Bob = await $mol_crypto_auditor_private.from( key_private )

// Make sign for data (32 bytes)
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
