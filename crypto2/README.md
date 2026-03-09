# $mol_crypto2

Simple API for effective cross platform cryptography with minimal extra size. Uses:

## Signing & Verifying

Uses Ed25519.

- `Auditor` = 32B public key for sign verification.
- `Signer` = Auditor + 32B private key for signing.
- `Sign` = 64B signature of data.

```typescript
const Alice = await $mol_crypto2_signer.generate() // 64 B
const Bella = await $mol_crypto2_signer.generate() // 64 B

const data = new Uint8Array([ 1, 2, 3 ]) // 3 B
const digest = $mol_crypto_hash( data ) // 20 B
const sign = await Alice.sign( digest ) // 64 B

const auditor = Alice.auditor() // 32 B
const verified = await auditor.verify( digest, sign ) // true
```

## Encryption & Decryption

Uses x25519.

- `Socket` = 32B public key for encryption/decryption.
- `Cipher` = Socket + 32B private key for encryption/decryption.
- `Nonce` = 16B unique bytes. May be predictable.

```typescript
const Alice = await $mol_crypto2_cipher.generate() // 64 B
const Bella = await $mol_crypto2_cipher.generate() // 64 B

const secret = Bella.secret( Alice.socket() ) // 16 B
// const secret = Alice.secret( Bella.socket() ) // same

const data = new Uint8Array([ 1, 2, 3 ]) // 3 B
const nonce = $mol_crypto2_nonce() // 16 B

const closed = await secret.encrypt( data, nonce ) // 16 B
const opened = await secret.decrypt( closed, nonce ) // 3 B
```

## Signing & Verifying & Encryption & Decryption

```typescript
const Alice = await $mol_crypto2_private.generate() // 128 B
const Bella = await $mol_crypto2_private.generate() // 128 B

const secret = await Alice.cipher().secret( Bella.socket() ) // 16 B
// const secret = await Bella.cipher().secret( Alice.socket() ) // same

const data = new Uint8Array([ 1, 2, 3 ]) // 3 B
const nonce = $mol_crypto2_nonce() // 16 B

const closed = await secretA.encrypt( data, nonce ) // 16 B
const digest = $mol_crypto_hash( closed ) // 20 B
const sign = await Alice.signer().sign( digest ) // 64 B

const auditor = Alice.auditor() // 32 B
const verified = await auditor.verify( digest, sign ) ) // true
const opened = await secretA.decrypt( closed, nonce ) ) // 3 B
```

# Usage from NPM

```
npm install mol_crypto2_lib
```

[![](https://badgen.net/bundlephobia/minzip/mol_crypto2_lib)](https://bundlephobia.com/package/mol_crypto2_lib)

```javascript
export { $mol_crypto2_private, default as $ } from "mol_crypto2_lib"
```
