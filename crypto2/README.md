# $mol_crypto2

Simple and fast API for effective cross platform cryptography with minimal extra size. Uses SHA-1 and Curve25519.

## Hashing

Fast sync implementation of SHA-1 (20B, 160b).

```typescript
const data = new Uint8Array([ 1, 2, 3 ]) // 3B
const hash = $mol_crypto2_hash( data ) // 20B
```

## Padding

Padding to hide data length. Uses random to fill whole padding. Length of padding is stored in last 4 bits.

```typescript
const data = new Uint8Array([ 1, 2, 3 ]) // 3B
const padded = $.$mol_crypto2_padding_add( data ) // 16B
const cropped = $.$mol_crypto2_padding_crop( padded ) // 3B
```

## Signing & Verifying

Native async implementation of Ed25519.

- `Auditor` = 32B public key for sign verification.
- `Signer` = Auditor + 32B private key for signing.
- `Sign` = 64B signature of data.

```typescript
const Alice = await $mol_crypto2_signer.generate() // 64B
const Bella = await $mol_crypto2_signer.generate() // 64B

const data = new Uint8Array([ 1, 2, 3 ]) // 3B
const digest = $mol_crypto2_hash( data ) // 20B
const sign = await Alice.sign( digest ) // 64B

const auditor = Alice.auditor() // 32B
const verified = await auditor.verify( digest, sign ) // true
```

## Encryption & Decryption

Native async implementation of AES-CTR.

- `Secret` = 16B secret key for encryption/decryption.
- `Nonce` = unique 16B bytes. First 8B may be predictable, but must be unique.

```typescript
const Alice = await $mol_crypto2_secret.make() // 16B
const Bella = await $mol_crypto2_cipher.from( Alice.asArray() ) // 16B

const data = new Uint8Array([ 1, 2, 3 ]) // 3B
const nonce = $mol_crypto2_nonce() // 16B

const padded = $mol_crypto2_padding_add( data ) // 16B
const closed = await Alice.encrypt( padded, nonce ) // 16B
const opened = await Bella.decrypt( closed, nonce ) // 16B
const cropped = $mol_crypto2_padding_crop( opened ) // 3B
```

## Shared Secret

Native async implementation of x25519.

- `Socket` = 32B public key for encryption/decryption.
- `Cipher` = Socket + 32B private key for encryption/decryption.

```typescript
const Alice = await $mol_crypto2_cipher.generate() // 64B
const Bella = await $mol_crypto2_cipher.generate() // 64B

const socket = Alice.socket() // 32B
const secret = Bella.secret( socket ) // 16B
```

## Universal Keys

Composition of Ed25519 and x25519 keys.

```typescript
const key = await $mol_crypto2_private.generate() // 128B

const signer = key.signer() // 64B
const cipher = key.cipher() // 64B

const auditor = signer.auditor() // 32B
const socket = cipher.socket() // 32B
```

# Usage from NPM

http://npmjs.com/package/mol_crypto2_lib

```
npm install mol_crypto2_lib
```

[![](https://badgen.net/bundlephobia/minzip/mol_crypto2_lib)](https://bundlephobia.com/package/mol_crypto2_lib)

```javascript
export { $mol_crypto2_private, default as $ } from "mol_crypto2_lib"
```
