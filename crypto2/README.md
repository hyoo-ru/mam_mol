# $mol_crypto2

Simple API for effective cross platform cryptography with minimal extra size.

## Signing & Verifying

- Auditor - public key for sign verification.
- Signer - private key for signing. Can be used as Auditor.

```typescript
const Alice = await $mol_crypto2_signer.generate() // 64 B
const Bella = await $mol_crypto2_signer.generate() // 64 B

const data = new Uint8Array([ 1, 2, 3 ]) // 3 B
const digest = $mol_crypto_hash( data ) // 20 B
const sign = await Alice.sign( digest ) // 64 B

const verified = await Alice.auditor().verify( digest, sign ) // true
```

## Encryption & Decryption

- Socket - public key for encryption/decryption.
- Cipher - private key for encryption/decryption. Can be used as Socket.

```typescript
const Alice = await $mol_crypto2_cipher.generate() // 64 B
const Bella = await $mol_crypto2_cipher.generate() // 64 B

const secret = Bella.secret( Alice.socket() ) // 16 B
// const secret = Alice.secret( Bella.socket() ) // same

const data = new Uint8Array([ 1, 2, 3 ]) // 3 B
const salt = $mol_crypto_salt() // 16 B

const closed = await secret.encrypt( data, salt ) // 16 B
const opened = await secret.decrypt( closed, salt ) // 3 B
```

## Signing & Verifying & Encryption & Decryption

```typescript
const Alice = await $mol_crypto2_private.generate() // 128 B
const Bella = await $mol_crypto2_private.generate() // 128 B

const secret = await Alice.cipher().secret( Bella.socket() ) // 16 B
// const secret = await Bella.cipher().secret( Alice.socket() ) // same

const data = new Uint8Array([ 1, 2, 3 ]) // 3 B
const salt = $mol_crypto_salt() // 16 B

const closed = await secretA.encrypt( data, salt ) // 16 B
const digest = $mol_crypto_hash( closed ) // 20 B
const sign = await Alice.signer().sign( digest ) // 64 B

const verified = await Alice.auditor().verify( digest, sign ) ) // true
const opened = await secretA.decrypt( closed, salt ) ) // 3 B
```
