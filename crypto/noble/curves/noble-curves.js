"use strict";
var nobleCurves = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

  // input.js
  var input_exports = {};
  __export(input_exports, {
    bls12_381: () => bls12_381,
    ed25519: () => ed25519,
    ed25519_edwardsToMontgomeryPriv: () => edwardsToMontgomeryPriv,
    ed25519_edwardsToMontgomeryPub: () => edwardsToMontgomeryPub,
    ed448: () => ed448,
    ed448_edwardsToMontgomeryPub: () => edwardsToMontgomeryPub2,
    p256: () => p256,
    p384: () => p384,
    p521: () => p521,
    secp256k1: () => secp256k1,
    secp256k1_schnorr: () => schnorr,
    utils: () => utils,
    x25519: () => x25519,
    x448: () => x448
  });

  // ../esm/abstract/utils.js
  var utils_exports = {};
  __export(utils_exports, {
    abytes: () => abytes,
    bitGet: () => bitGet,
    bitLen: () => bitLen,
    bitMask: () => bitMask,
    bitSet: () => bitSet,
    bytesToHex: () => bytesToHex,
    bytesToNumberBE: () => bytesToNumberBE,
    bytesToNumberLE: () => bytesToNumberLE,
    concatBytes: () => concatBytes,
    createHmacDrbg: () => createHmacDrbg,
    ensureBytes: () => ensureBytes,
    equalBytes: () => equalBytes,
    hexToBytes: () => hexToBytes,
    hexToNumber: () => hexToNumber,
    isBytes: () => isBytes,
    numberToBytesBE: () => numberToBytesBE,
    numberToBytesLE: () => numberToBytesLE,
    numberToHexUnpadded: () => numberToHexUnpadded,
    numberToVarBytesBE: () => numberToVarBytesBE,
    utf8ToBytes: () => utf8ToBytes,
    validateObject: () => validateObject
  });
  var _0n = /* @__PURE__ */ BigInt(0);
  var _1n = /* @__PURE__ */ BigInt(1);
  var _2n = /* @__PURE__ */ BigInt(2);
  function isBytes(a) {
    return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
  }
  function abytes(item) {
    if (!isBytes(item))
      throw new Error("Uint8Array expected");
  }
  var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
  function bytesToHex(bytes2) {
    abytes(bytes2);
    let hex = "";
    for (let i = 0; i < bytes2.length; i++) {
      hex += hexes[bytes2[i]];
    }
    return hex;
  }
  function numberToHexUnpadded(num) {
    const hex = num.toString(16);
    return hex.length & 1 ? `0${hex}` : hex;
  }
  function hexToNumber(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    return BigInt(hex === "" ? "0" : `0x${hex}`);
  }
  var asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
  function asciiToBase16(char) {
    if (char >= asciis._0 && char <= asciis._9)
      return char - asciis._0;
    if (char >= asciis._A && char <= asciis._F)
      return char - (asciis._A - 10);
    if (char >= asciis._a && char <= asciis._f)
      return char - (asciis._a - 10);
    return;
  }
  function hexToBytes(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2)
      throw new Error("padded hex string expected, got unpadded hex of length " + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
      const n1 = asciiToBase16(hex.charCodeAt(hi));
      const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
      if (n1 === void 0 || n2 === void 0) {
        const char = hex[hi] + hex[hi + 1];
        throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
      }
      array[ai] = n1 * 16 + n2;
    }
    return array;
  }
  function bytesToNumberBE(bytes2) {
    return hexToNumber(bytesToHex(bytes2));
  }
  function bytesToNumberLE(bytes2) {
    abytes(bytes2);
    return hexToNumber(bytesToHex(Uint8Array.from(bytes2).reverse()));
  }
  function numberToBytesBE(n, len) {
    return hexToBytes(n.toString(16).padStart(len * 2, "0"));
  }
  function numberToBytesLE(n, len) {
    return numberToBytesBE(n, len).reverse();
  }
  function numberToVarBytesBE(n) {
    return hexToBytes(numberToHexUnpadded(n));
  }
  function ensureBytes(title, hex, expectedLength) {
    let res;
    if (typeof hex === "string") {
      try {
        res = hexToBytes(hex);
      } catch (e) {
        throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e}`);
      }
    } else if (isBytes(hex)) {
      res = Uint8Array.from(hex);
    } else {
      throw new Error(`${title} must be hex string or Uint8Array`);
    }
    const len = res.length;
    if (typeof expectedLength === "number" && len !== expectedLength)
      throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
    return res;
  }
  function concatBytes(...arrays) {
    let sum = 0;
    for (let i = 0; i < arrays.length; i++) {
      const a = arrays[i];
      abytes(a);
      sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
      const a = arrays[i];
      res.set(a, pad);
      pad += a.length;
    }
    return res;
  }
  function equalBytes(a, b) {
    if (a.length !== b.length)
      return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++)
      diff |= a[i] ^ b[i];
    return diff === 0;
  }
  function utf8ToBytes(str) {
    if (typeof str !== "string")
      throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function bitLen(n) {
    let len;
    for (len = 0; n > _0n; n >>= _1n, len += 1)
      ;
    return len;
  }
  function bitGet(n, pos) {
    return n >> BigInt(pos) & _1n;
  }
  function bitSet(n, pos, value) {
    return n | (value ? _1n : _0n) << BigInt(pos);
  }
  var bitMask = (n) => (_2n << BigInt(n - 1)) - _1n;
  var u8n = (data) => new Uint8Array(data);
  var u8fr = (arr) => Uint8Array.from(arr);
  function createHmacDrbg(hashLen, qByteLen, hmacFn) {
    if (typeof hashLen !== "number" || hashLen < 2)
      throw new Error("hashLen must be a number");
    if (typeof qByteLen !== "number" || qByteLen < 2)
      throw new Error("qByteLen must be a number");
    if (typeof hmacFn !== "function")
      throw new Error("hmacFn must be a function");
    let v = u8n(hashLen);
    let k = u8n(hashLen);
    let i = 0;
    const reset = () => {
      v.fill(1);
      k.fill(0);
      i = 0;
    };
    const h = (...b) => hmacFn(k, v, ...b);
    const reseed = (seed = u8n()) => {
      k = h(u8fr([0]), seed);
      v = h();
      if (seed.length === 0)
        return;
      k = h(u8fr([1]), seed);
      v = h();
    };
    const gen2 = () => {
      if (i++ >= 1e3)
        throw new Error("drbg: tried 1000 values");
      let len = 0;
      const out = [];
      while (len < qByteLen) {
        v = h();
        const sl = v.slice();
        out.push(sl);
        len += v.length;
      }
      return concatBytes(...out);
    };
    const genUntil = (seed, pred) => {
      reset();
      reseed(seed);
      let res = void 0;
      while (!(res = pred(gen2())))
        reseed();
      reset();
      return res;
    };
    return genUntil;
  }
  var validatorFns = {
    bigint: (val) => typeof val === "bigint",
    function: (val) => typeof val === "function",
    boolean: (val) => typeof val === "boolean",
    string: (val) => typeof val === "string",
    stringOrUint8Array: (val) => typeof val === "string" || isBytes(val),
    isSafeInteger: (val) => Number.isSafeInteger(val),
    array: (val) => Array.isArray(val),
    field: (val, object) => object.Fp.isValid(val),
    hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
  };
  function validateObject(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional) => {
      const checkVal = validatorFns[type];
      if (typeof checkVal !== "function")
        throw new Error(`Invalid validator "${type}", expected function`);
      const val = object[fieldName];
      if (isOptional && val === void 0)
        return;
      if (!checkVal(val, object)) {
        throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
      }
    };
    for (const [fieldName, type] of Object.entries(validators))
      checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))
      checkField(fieldName, type, true);
    return object;
  }

  // ../node_modules/@noble/hashes/esm/_assert.js
  function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error(`positive integer expected, not ${n}`);
  }
  function isBytes2(a) {
    return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
  }
  function bytes(b, ...lengths) {
    if (!isBytes2(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
  }
  function hash(h) {
    if (typeof h !== "function" || typeof h.create !== "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    number(h.outputLen);
    number(h.blockLen);
  }
  function exists(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function output(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
  }

  // ../node_modules/@noble/hashes/esm/crypto.js
  var crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

  // ../node_modules/@noble/hashes/esm/utils.js
  var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
  var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  var rotr = (word, shift) => word << 32 - shift | word >>> shift;
  var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  var byteSwap = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
  function byteSwap32(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = byteSwap(arr[i]);
    }
  }
  function utf8ToBytes2(str) {
    if (typeof str !== "string")
      throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes(data) {
    if (typeof data === "string")
      data = utf8ToBytes2(data);
    bytes(data);
    return data;
  }
  function concatBytes2(...arrays) {
    let sum = 0;
    for (let i = 0; i < arrays.length; i++) {
      const a = arrays[i];
      bytes(a);
      sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
      const a = arrays[i];
      res.set(a, pad);
      pad += a.length;
    }
    return res;
  }
  var Hash = class {
    // Safe version that clones internal state
    clone() {
      return this._cloneInto();
    }
  };
  var toStr = {}.toString;
  function wrapConstructor(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
  }
  function wrapXOFConstructorWithOpts(hashCons) {
    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts) => hashCons(opts);
    return hashC;
  }
  function randomBytes(bytesLength = 32) {
    if (crypto && typeof crypto.getRandomValues === "function") {
      return crypto.getRandomValues(new Uint8Array(bytesLength));
    }
    throw new Error("crypto.getRandomValues must be defined");
  }

  // ../node_modules/@noble/hashes/esm/_md.js
  function setBigUint64(view, byteOffset, value, isLE2) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE2);
    const _32n2 = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n2 & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE2 ? 4 : 0;
    const l = isLE2 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE2);
    view.setUint32(byteOffset + l, wl, isLE2);
  }
  var Chi = (a, b, c) => a & b ^ ~a & c;
  var Maj = (a, b, c) => a & b ^ a & c ^ b & c;
  var HashMD = class extends Hash {
    constructor(blockLen, outputLen, padOffset, isLE2) {
      super();
      this.blockLen = blockLen;
      this.outputLen = outputLen;
      this.padOffset = padOffset;
      this.isLE = isLE2;
      this.finished = false;
      this.length = 0;
      this.pos = 0;
      this.destroyed = false;
      this.buffer = new Uint8Array(blockLen);
      this.view = createView(this.buffer);
    }
    update(data) {
      exists(this);
      const { view, buffer, blockLen } = this;
      data = toBytes(data);
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          const dataView = createView(data);
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(dataView, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(view, 0);
          this.pos = 0;
        }
      }
      this.length += data.length;
      this.roundClean();
      return this;
    }
    digestInto(out) {
      exists(this);
      output(out, this);
      this.finished = true;
      const { buffer, view, blockLen, isLE: isLE2 } = this;
      let { pos } = this;
      buffer[pos++] = 128;
      this.buffer.subarray(pos).fill(0);
      if (this.padOffset > blockLen - pos) {
        this.process(view, 0);
        pos = 0;
      }
      for (let i = pos; i < blockLen; i++)
        buffer[i] = 0;
      setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
      this.process(view, 0);
      const oview = createView(out);
      const len = this.outputLen;
      if (len % 4)
        throw new Error("_sha2: outputLen should be aligned to 32bit");
      const outLen = len / 4;
      const state = this.get();
      if (outLen > state.length)
        throw new Error("_sha2: outputLen bigger than state");
      for (let i = 0; i < outLen; i++)
        oview.setUint32(4 * i, state[i], isLE2);
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
    _cloneInto(to) {
      to || (to = new this.constructor());
      to.set(...this.get());
      const { blockLen, buffer, length, finished, destroyed, pos } = this;
      to.length = length;
      to.pos = pos;
      to.finished = finished;
      to.destroyed = destroyed;
      if (length % blockLen)
        to.buffer.set(buffer);
      return to;
    }
  };

  // ../node_modules/@noble/hashes/esm/sha256.js
  var SHA256_K = /* @__PURE__ */ new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  var SHA256_IV = /* @__PURE__ */ new Uint32Array([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);
  var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
  var SHA256 = class extends HashMD {
    constructor() {
      super(64, 32, 8, false);
      this.A = SHA256_IV[0] | 0;
      this.B = SHA256_IV[1] | 0;
      this.C = SHA256_IV[2] | 0;
      this.D = SHA256_IV[3] | 0;
      this.E = SHA256_IV[4] | 0;
      this.F = SHA256_IV[5] | 0;
      this.G = SHA256_IV[6] | 0;
      this.H = SHA256_IV[7] | 0;
    }
    get() {
      const { A, B, C, D, E, F, G, H } = this;
      return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
      this.F = F | 0;
      this.G = G | 0;
      this.H = H | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        SHA256_W[i] = view.getUint32(offset, false);
      for (let i = 16; i < 64; i++) {
        const W15 = SHA256_W[i - 15];
        const W2 = SHA256_W[i - 2];
        const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
        const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
        SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
      }
      let { A, B, C, D, E, F, G, H } = this;
      for (let i = 0; i < 64; i++) {
        const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
        const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
        const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
        const T2 = sigma0 + Maj(A, B, C) | 0;
        H = G;
        G = F;
        F = E;
        E = D + T1 | 0;
        D = C;
        C = B;
        B = A;
        A = T1 + T2 | 0;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      F = F + this.F | 0;
      G = G + this.G | 0;
      H = H + this.H | 0;
      this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
      SHA256_W.fill(0);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0);
      this.buffer.fill(0);
    }
  };
  var sha256 = /* @__PURE__ */ wrapConstructor(() => new SHA256());

  // ../node_modules/@noble/hashes/esm/hmac.js
  var HMAC = class extends Hash {
    constructor(hash2, _key) {
      super();
      this.finished = false;
      this.destroyed = false;
      hash(hash2);
      const key = toBytes(_key);
      this.iHash = hash2.create();
      if (typeof this.iHash.update !== "function")
        throw new Error("Expected instance of class which extends utils.Hash");
      this.blockLen = this.iHash.blockLen;
      this.outputLen = this.iHash.outputLen;
      const blockLen = this.blockLen;
      const pad = new Uint8Array(blockLen);
      pad.set(key.length > blockLen ? hash2.create().update(key).digest() : key);
      for (let i = 0; i < pad.length; i++)
        pad[i] ^= 54;
      this.iHash.update(pad);
      this.oHash = hash2.create();
      for (let i = 0; i < pad.length; i++)
        pad[i] ^= 54 ^ 92;
      this.oHash.update(pad);
      pad.fill(0);
    }
    update(buf) {
      exists(this);
      this.iHash.update(buf);
      return this;
    }
    digestInto(out) {
      exists(this);
      bytes(out, this.outputLen);
      this.finished = true;
      this.iHash.digestInto(out);
      this.oHash.update(out);
      this.oHash.digestInto(out);
      this.destroy();
    }
    digest() {
      const out = new Uint8Array(this.oHash.outputLen);
      this.digestInto(out);
      return out;
    }
    _cloneInto(to) {
      to || (to = Object.create(Object.getPrototypeOf(this), {}));
      const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
      to = to;
      to.finished = finished;
      to.destroyed = destroyed;
      to.blockLen = blockLen;
      to.outputLen = outputLen;
      to.oHash = oHash._cloneInto(to.oHash);
      to.iHash = iHash._cloneInto(to.iHash);
      return to;
    }
    destroy() {
      this.destroyed = true;
      this.oHash.destroy();
      this.iHash.destroy();
    }
  };
  var hmac = (hash2, key, message) => new HMAC(hash2, key).update(message).digest();
  hmac.create = (hash2, key) => new HMAC(hash2, key);

  // ../esm/abstract/modular.js
  var _0n2 = BigInt(0);
  var _1n2 = BigInt(1);
  var _2n2 = BigInt(2);
  var _3n = BigInt(3);
  var _4n = BigInt(4);
  var _5n = BigInt(5);
  var _8n = BigInt(8);
  var _9n = BigInt(9);
  var _16n = BigInt(16);
  function mod(a, b) {
    const result = a % b;
    return result >= _0n2 ? result : b + result;
  }
  function pow(num, power, modulo) {
    if (modulo <= _0n2 || power < _0n2)
      throw new Error("Expected power/modulo > 0");
    if (modulo === _1n2)
      return _0n2;
    let res = _1n2;
    while (power > _0n2) {
      if (power & _1n2)
        res = res * num % modulo;
      num = num * num % modulo;
      power >>= _1n2;
    }
    return res;
  }
  function pow2(x, power, modulo) {
    let res = x;
    while (power-- > _0n2) {
      res *= res;
      res %= modulo;
    }
    return res;
  }
  function invert(number2, modulo) {
    if (number2 === _0n2 || modulo <= _0n2) {
      throw new Error(`invert: expected positive integers, got n=${number2} mod=${modulo}`);
    }
    let a = mod(number2, modulo);
    let b = modulo;
    let x = _0n2, y = _1n2, u = _1n2, v = _0n2;
    while (a !== _0n2) {
      const q = b / a;
      const r = b % a;
      const m = x - u * q;
      const n = y - v * q;
      b = a, a = r, x = u, y = v, u = m, v = n;
    }
    const gcd = b;
    if (gcd !== _1n2)
      throw new Error("invert: does not exist");
    return mod(x, modulo);
  }
  function tonelliShanks(P3) {
    const legendreC = (P3 - _1n2) / _2n2;
    let Q, S, Z;
    for (Q = P3 - _1n2, S = 0; Q % _2n2 === _0n2; Q /= _2n2, S++)
      ;
    for (Z = _2n2; Z < P3 && pow(Z, legendreC, P3) !== P3 - _1n2; Z++)
      ;
    if (S === 1) {
      const p1div4 = (P3 + _1n2) / _4n;
      return function tonelliFast(Fp8, n) {
        const root = Fp8.pow(n, p1div4);
        if (!Fp8.eql(Fp8.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    const Q1div2 = (Q + _1n2) / _2n2;
    return function tonelliSlow(Fp8, n) {
      if (Fp8.pow(n, legendreC) === Fp8.neg(Fp8.ONE))
        throw new Error("Cannot find square root");
      let r = S;
      let g = Fp8.pow(Fp8.mul(Fp8.ONE, Z), Q);
      let x = Fp8.pow(n, Q1div2);
      let b = Fp8.pow(n, Q);
      while (!Fp8.eql(b, Fp8.ONE)) {
        if (Fp8.eql(b, Fp8.ZERO))
          return Fp8.ZERO;
        let m = 1;
        for (let t2 = Fp8.sqr(b); m < r; m++) {
          if (Fp8.eql(t2, Fp8.ONE))
            break;
          t2 = Fp8.sqr(t2);
        }
        const ge2 = Fp8.pow(g, _1n2 << BigInt(r - m - 1));
        g = Fp8.sqr(ge2);
        x = Fp8.mul(x, ge2);
        b = Fp8.mul(b, g);
        r = m;
      }
      return x;
    };
  }
  function FpSqrt(P3) {
    if (P3 % _4n === _3n) {
      const p1div4 = (P3 + _1n2) / _4n;
      return function sqrt3mod4(Fp8, n) {
        const root = Fp8.pow(n, p1div4);
        if (!Fp8.eql(Fp8.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    if (P3 % _8n === _5n) {
      const c1 = (P3 - _5n) / _8n;
      return function sqrt5mod8(Fp8, n) {
        const n2 = Fp8.mul(n, _2n2);
        const v = Fp8.pow(n2, c1);
        const nv = Fp8.mul(n, v);
        const i = Fp8.mul(Fp8.mul(nv, _2n2), v);
        const root = Fp8.mul(nv, Fp8.sub(i, Fp8.ONE));
        if (!Fp8.eql(Fp8.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    if (P3 % _16n === _9n) {
    }
    return tonelliShanks(P3);
  }
  var isNegativeLE = (num, modulo) => (mod(num, modulo) & _1n2) === _1n2;
  var FIELD_FIELDS = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN"
  ];
  function validateField(field) {
    const initial = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "isSafeInteger",
      BITS: "isSafeInteger"
    };
    const opts = FIELD_FIELDS.reduce((map, val) => {
      map[val] = "function";
      return map;
    }, initial);
    return validateObject(field, opts);
  }
  function FpPow(f, num, power) {
    if (power < _0n2)
      throw new Error("Expected power > 0");
    if (power === _0n2)
      return f.ONE;
    if (power === _1n2)
      return num;
    let p = f.ONE;
    let d = num;
    while (power > _0n2) {
      if (power & _1n2)
        p = f.mul(p, d);
      d = f.sqr(d);
      power >>= _1n2;
    }
    return p;
  }
  function FpInvertBatch(f, nums) {
    const tmp = new Array(nums.length);
    const lastMultiplied = nums.reduce((acc, num, i) => {
      if (f.is0(num))
        return acc;
      tmp[i] = acc;
      return f.mul(acc, num);
    }, f.ONE);
    const inverted = f.inv(lastMultiplied);
    nums.reduceRight((acc, num, i) => {
      if (f.is0(num))
        return acc;
      tmp[i] = f.mul(acc, tmp[i]);
      return f.mul(acc, num);
    }, inverted);
    return tmp;
  }
  function nLength(n, nBitLength) {
    const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return { nBitLength: _nBitLength, nByteLength };
  }
  function Field(ORDER, bitLen2, isLE2 = false, redef = {}) {
    if (ORDER <= _0n2)
      throw new Error(`Expected Field ORDER > 0, got ${ORDER}`);
    const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen2);
    if (BYTES > 2048)
      throw new Error("Field lengths over 2048 bytes are not supported");
    const sqrtP = FpSqrt(ORDER);
    const f = Object.freeze({
      ORDER,
      BITS,
      BYTES,
      MASK: bitMask(BITS),
      ZERO: _0n2,
      ONE: _1n2,
      create: (num) => mod(num, ORDER),
      isValid: (num) => {
        if (typeof num !== "bigint")
          throw new Error(`Invalid field element: expected bigint, got ${typeof num}`);
        return _0n2 <= num && num < ORDER;
      },
      is0: (num) => num === _0n2,
      isOdd: (num) => (num & _1n2) === _1n2,
      neg: (num) => mod(-num, ORDER),
      eql: (lhs, rhs) => lhs === rhs,
      sqr: (num) => mod(num * num, ORDER),
      add: (lhs, rhs) => mod(lhs + rhs, ORDER),
      sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
      mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
      pow: (num, power) => FpPow(f, num, power),
      div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
      // Same as above, but doesn't normalize
      sqrN: (num) => num * num,
      addN: (lhs, rhs) => lhs + rhs,
      subN: (lhs, rhs) => lhs - rhs,
      mulN: (lhs, rhs) => lhs * rhs,
      inv: (num) => invert(num, ORDER),
      sqrt: redef.sqrt || ((n) => sqrtP(f, n)),
      invertBatch: (lst) => FpInvertBatch(f, lst),
      // TODO: do we really need constant cmov?
      // We don't have const-time bigints anyway, so probably will be not very useful
      cmov: (a, b, c) => c ? b : a,
      toBytes: (num) => isLE2 ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
      fromBytes: (bytes2) => {
        if (bytes2.length !== BYTES)
          throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes2.length}`);
        return isLE2 ? bytesToNumberLE(bytes2) : bytesToNumberBE(bytes2);
      }
    });
    return Object.freeze(f);
  }
  function getFieldBytesLength(fieldOrder) {
    if (typeof fieldOrder !== "bigint")
      throw new Error("field order must be bigint");
    const bitLength = fieldOrder.toString(2).length;
    return Math.ceil(bitLength / 8);
  }
  function getMinHashLength(fieldOrder) {
    const length = getFieldBytesLength(fieldOrder);
    return length + Math.ceil(length / 2);
  }
  function mapHashToField(key, fieldOrder, isLE2 = false) {
    const len = key.length;
    const fieldLen = getFieldBytesLength(fieldOrder);
    const minLen = getMinHashLength(fieldOrder);
    if (len < 16 || len < minLen || len > 1024)
      throw new Error(`expected ${minLen}-1024 bytes of input, got ${len}`);
    const num = isLE2 ? bytesToNumberBE(key) : bytesToNumberLE(key);
    const reduced = mod(num, fieldOrder - _1n2) + _1n2;
    return isLE2 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
  }

  // ../esm/abstract/curve.js
  var _0n3 = BigInt(0);
  var _1n3 = BigInt(1);
  function wNAF(c, bits) {
    const constTimeNegate = (condition, item) => {
      const neg = item.negate();
      return condition ? neg : item;
    };
    const opts = (W) => {
      const windows = Math.ceil(bits / W) + 1;
      const windowSize = 2 ** (W - 1);
      return { windows, windowSize };
    };
    return {
      constTimeNegate,
      // non-const time multiplication ladder
      unsafeLadder(elm, n) {
        let p = c.ZERO;
        let d = elm;
        while (n > _0n3) {
          if (n & _1n3)
            p = p.add(d);
          d = d.double();
          n >>= _1n3;
        }
        return p;
      },
      /**
       * Creates a wNAF precomputation window. Used for caching.
       * Default window size is set by `utils.precompute()` and is equal to 8.
       * Number of precomputed points depends on the curve size:
       * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
       * - 𝑊 is the window size
       * - 𝑛 is the bitlength of the curve order.
       * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
       * @returns precomputed point tables flattened to a single array
       */
      precomputeWindow(elm, W) {
        const { windows, windowSize } = opts(W);
        const points = [];
        let p = elm;
        let base = p;
        for (let window = 0; window < windows; window++) {
          base = p;
          points.push(base);
          for (let i = 1; i < windowSize; i++) {
            base = base.add(p);
            points.push(base);
          }
          p = base.double();
        }
        return points;
      },
      /**
       * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
       * @param W window size
       * @param precomputes precomputed tables
       * @param n scalar (we don't check here, but should be less than curve order)
       * @returns real and fake (for const-time) points
       */
      wNAF(W, precomputes, n) {
        const { windows, windowSize } = opts(W);
        let p = c.ZERO;
        let f = c.BASE;
        const mask = BigInt(2 ** W - 1);
        const maxNumber = 2 ** W;
        const shiftBy = BigInt(W);
        for (let window = 0; window < windows; window++) {
          const offset = window * windowSize;
          let wbits = Number(n & mask);
          n >>= shiftBy;
          if (wbits > windowSize) {
            wbits -= maxNumber;
            n += _1n3;
          }
          const offset1 = offset;
          const offset2 = offset + Math.abs(wbits) - 1;
          const cond1 = window % 2 !== 0;
          const cond2 = wbits < 0;
          if (wbits === 0) {
            f = f.add(constTimeNegate(cond1, precomputes[offset1]));
          } else {
            p = p.add(constTimeNegate(cond2, precomputes[offset2]));
          }
        }
        return { p, f };
      },
      wNAFCached(P3, precomputesMap, n, transform) {
        const W = P3._WINDOW_SIZE || 1;
        let comp = precomputesMap.get(P3);
        if (!comp) {
          comp = this.precomputeWindow(P3, W);
          if (W !== 1) {
            precomputesMap.set(P3, transform(comp));
          }
        }
        return this.wNAF(W, comp, n);
      }
    };
  }
  function validateBasic(curve) {
    validateField(curve.Fp);
    validateObject(curve, {
      n: "bigint",
      h: "bigint",
      Gx: "field",
      Gy: "field"
    }, {
      nBitLength: "isSafeInteger",
      nByteLength: "isSafeInteger"
    });
    return Object.freeze({
      ...nLength(curve.n, curve.nBitLength),
      ...curve,
      ...{ p: curve.Fp.ORDER }
    });
  }

  // ../esm/abstract/weierstrass.js
  function validatePointOpts(curve) {
    const opts = validateBasic(curve);
    validateObject(opts, {
      a: "field",
      b: "field"
    }, {
      allowedPrivateKeyLengths: "array",
      wrapPrivateKey: "boolean",
      isTorsionFree: "function",
      clearCofactor: "function",
      allowInfinityPoint: "boolean",
      fromBytes: "function",
      toBytes: "function"
    });
    const { endo, Fp: Fp8, a } = opts;
    if (endo) {
      if (!Fp8.eql(a, Fp8.ZERO)) {
        throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
      }
      if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
        throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
      }
    }
    return Object.freeze({ ...opts });
  }
  var { bytesToNumberBE: b2n, hexToBytes: h2b } = utils_exports;
  var DER = {
    // asn.1 DER encoding utils
    Err: class DERErr extends Error {
      constructor(m = "") {
        super(m);
      }
    },
    _parseInt(data) {
      const { Err: E } = DER;
      if (data.length < 2 || data[0] !== 2)
        throw new E("Invalid signature integer tag");
      const len = data[1];
      const res = data.subarray(2, len + 2);
      if (!len || res.length !== len)
        throw new E("Invalid signature integer: wrong length");
      if (res[0] & 128)
        throw new E("Invalid signature integer: negative");
      if (res[0] === 0 && !(res[1] & 128))
        throw new E("Invalid signature integer: unnecessary leading zero");
      return { d: b2n(res), l: data.subarray(len + 2) };
    },
    toSig(hex) {
      const { Err: E } = DER;
      const data = typeof hex === "string" ? h2b(hex) : hex;
      abytes(data);
      let l = data.length;
      if (l < 2 || data[0] != 48)
        throw new E("Invalid signature tag");
      if (data[1] !== l - 2)
        throw new E("Invalid signature: incorrect length");
      const { d: r, l: sBytes } = DER._parseInt(data.subarray(2));
      const { d: s, l: rBytesLeft } = DER._parseInt(sBytes);
      if (rBytesLeft.length)
        throw new E("Invalid signature: left bytes after parsing");
      return { r, s };
    },
    hexFromSig(sig) {
      const slice = (s2) => Number.parseInt(s2[0], 16) & 8 ? "00" + s2 : s2;
      const h = (num) => {
        const hex = num.toString(16);
        return hex.length & 1 ? `0${hex}` : hex;
      };
      const s = slice(h(sig.s));
      const r = slice(h(sig.r));
      const shl = s.length / 2;
      const rhl = r.length / 2;
      const sl = h(shl);
      const rl = h(rhl);
      return `30${h(rhl + shl + 4)}02${rl}${r}02${sl}${s}`;
    }
  };
  var _0n4 = BigInt(0);
  var _1n4 = BigInt(1);
  var _2n3 = BigInt(2);
  var _3n2 = BigInt(3);
  var _4n2 = BigInt(4);
  function weierstrassPoints(opts) {
    const CURVE2 = validatePointOpts(opts);
    const { Fp: Fp8 } = CURVE2;
    const toBytes2 = CURVE2.toBytes || ((_c, point, _isCompressed) => {
      const a = point.toAffine();
      return concatBytes(Uint8Array.from([4]), Fp8.toBytes(a.x), Fp8.toBytes(a.y));
    });
    const fromBytes = CURVE2.fromBytes || ((bytes2) => {
      const tail = bytes2.subarray(1);
      const x = Fp8.fromBytes(tail.subarray(0, Fp8.BYTES));
      const y = Fp8.fromBytes(tail.subarray(Fp8.BYTES, 2 * Fp8.BYTES));
      return { x, y };
    });
    function weierstrassEquation(x) {
      const { a, b } = CURVE2;
      const x2 = Fp8.sqr(x);
      const x3 = Fp8.mul(x2, x);
      return Fp8.add(Fp8.add(x3, Fp8.mul(x, a)), b);
    }
    if (!Fp8.eql(Fp8.sqr(CURVE2.Gy), weierstrassEquation(CURVE2.Gx)))
      throw new Error("bad generator point: equation left != right");
    function isWithinCurveOrder(num) {
      return typeof num === "bigint" && _0n4 < num && num < CURVE2.n;
    }
    function assertGE(num) {
      if (!isWithinCurveOrder(num))
        throw new Error("Expected valid bigint: 0 < bigint < curve.n");
    }
    function normPrivateKeyToScalar(key) {
      const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n } = CURVE2;
      if (lengths && typeof key !== "bigint") {
        if (isBytes(key))
          key = bytesToHex(key);
        if (typeof key !== "string" || !lengths.includes(key.length))
          throw new Error("Invalid key");
        key = key.padStart(nByteLength * 2, "0");
      }
      let num;
      try {
        num = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
      } catch (error) {
        throw new Error(`private key must be ${nByteLength} bytes, hex or bigint, not ${typeof key}`);
      }
      if (wrapPrivateKey)
        num = mod(num, n);
      assertGE(num);
      return num;
    }
    const pointPrecomputes = /* @__PURE__ */ new Map();
    function assertPrjPoint(other) {
      if (!(other instanceof Point2))
        throw new Error("ProjectivePoint expected");
    }
    class Point2 {
      constructor(px, py, pz) {
        this.px = px;
        this.py = py;
        this.pz = pz;
        if (px == null || !Fp8.isValid(px))
          throw new Error("x required");
        if (py == null || !Fp8.isValid(py))
          throw new Error("y required");
        if (pz == null || !Fp8.isValid(pz))
          throw new Error("z required");
      }
      // Does not validate if the point is on-curve.
      // Use fromHex instead, or call assertValidity() later.
      static fromAffine(p) {
        const { x, y } = p || {};
        if (!p || !Fp8.isValid(x) || !Fp8.isValid(y))
          throw new Error("invalid affine point");
        if (p instanceof Point2)
          throw new Error("projective point not allowed");
        const is0 = (i) => Fp8.eql(i, Fp8.ZERO);
        if (is0(x) && is0(y))
          return Point2.ZERO;
        return new Point2(x, y, Fp8.ONE);
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      /**
       * Takes a bunch of Projective Points but executes only one
       * inversion on all of them. Inversion is very slow operation,
       * so this improves performance massively.
       * Optimization: converts a list of projective points to a list of identical points with Z=1.
       */
      static normalizeZ(points) {
        const toInv = Fp8.invertBatch(points.map((p) => p.pz));
        return points.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
      }
      /**
       * Converts hash string or Uint8Array to Point.
       * @param hex short/long ECDSA hex
       */
      static fromHex(hex) {
        const P3 = Point2.fromAffine(fromBytes(ensureBytes("pointHex", hex)));
        P3.assertValidity();
        return P3;
      }
      // Multiplies generator point by privateKey.
      static fromPrivateKey(privateKey) {
        return Point2.BASE.multiply(normPrivateKeyToScalar(privateKey));
      }
      // "Private method", don't use it directly
      _setWindowSize(windowSize) {
        this._WINDOW_SIZE = windowSize;
        pointPrecomputes.delete(this);
      }
      // A point on curve is valid if it conforms to equation.
      assertValidity() {
        if (this.is0()) {
          if (CURVE2.allowInfinityPoint && !Fp8.is0(this.py))
            return;
          throw new Error("bad point: ZERO");
        }
        const { x, y } = this.toAffine();
        if (!Fp8.isValid(x) || !Fp8.isValid(y))
          throw new Error("bad point: x or y not FE");
        const left = Fp8.sqr(y);
        const right = weierstrassEquation(x);
        if (!Fp8.eql(left, right))
          throw new Error("bad point: equation left != right");
        if (!this.isTorsionFree())
          throw new Error("bad point: not in prime-order subgroup");
      }
      hasEvenY() {
        const { y } = this.toAffine();
        if (Fp8.isOdd)
          return !Fp8.isOdd(y);
        throw new Error("Field doesn't support isOdd");
      }
      /**
       * Compare one point to another.
       */
      equals(other) {
        assertPrjPoint(other);
        const { px: X1, py: Y1, pz: Z1 } = this;
        const { px: X2, py: Y2, pz: Z2 } = other;
        const U1 = Fp8.eql(Fp8.mul(X1, Z2), Fp8.mul(X2, Z1));
        const U2 = Fp8.eql(Fp8.mul(Y1, Z2), Fp8.mul(Y2, Z1));
        return U1 && U2;
      }
      /**
       * Flips point to one corresponding to (x, -y) in Affine coordinates.
       */
      negate() {
        return new Point2(this.px, Fp8.neg(this.py), this.pz);
      }
      // Renes-Costello-Batina exception-free doubling formula.
      // There is 30% faster Jacobian formula, but it is not complete.
      // https://eprint.iacr.org/2015/1060, algorithm 3
      // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
      double() {
        const { a, b } = CURVE2;
        const b3 = Fp8.mul(b, _3n2);
        const { px: X1, py: Y1, pz: Z1 } = this;
        let X3 = Fp8.ZERO, Y3 = Fp8.ZERO, Z3 = Fp8.ZERO;
        let t0 = Fp8.mul(X1, X1);
        let t1 = Fp8.mul(Y1, Y1);
        let t2 = Fp8.mul(Z1, Z1);
        let t3 = Fp8.mul(X1, Y1);
        t3 = Fp8.add(t3, t3);
        Z3 = Fp8.mul(X1, Z1);
        Z3 = Fp8.add(Z3, Z3);
        X3 = Fp8.mul(a, Z3);
        Y3 = Fp8.mul(b3, t2);
        Y3 = Fp8.add(X3, Y3);
        X3 = Fp8.sub(t1, Y3);
        Y3 = Fp8.add(t1, Y3);
        Y3 = Fp8.mul(X3, Y3);
        X3 = Fp8.mul(t3, X3);
        Z3 = Fp8.mul(b3, Z3);
        t2 = Fp8.mul(a, t2);
        t3 = Fp8.sub(t0, t2);
        t3 = Fp8.mul(a, t3);
        t3 = Fp8.add(t3, Z3);
        Z3 = Fp8.add(t0, t0);
        t0 = Fp8.add(Z3, t0);
        t0 = Fp8.add(t0, t2);
        t0 = Fp8.mul(t0, t3);
        Y3 = Fp8.add(Y3, t0);
        t2 = Fp8.mul(Y1, Z1);
        t2 = Fp8.add(t2, t2);
        t0 = Fp8.mul(t2, t3);
        X3 = Fp8.sub(X3, t0);
        Z3 = Fp8.mul(t2, t1);
        Z3 = Fp8.add(Z3, Z3);
        Z3 = Fp8.add(Z3, Z3);
        return new Point2(X3, Y3, Z3);
      }
      // Renes-Costello-Batina exception-free addition formula.
      // There is 30% faster Jacobian formula, but it is not complete.
      // https://eprint.iacr.org/2015/1060, algorithm 1
      // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
      add(other) {
        assertPrjPoint(other);
        const { px: X1, py: Y1, pz: Z1 } = this;
        const { px: X2, py: Y2, pz: Z2 } = other;
        let X3 = Fp8.ZERO, Y3 = Fp8.ZERO, Z3 = Fp8.ZERO;
        const a = CURVE2.a;
        const b3 = Fp8.mul(CURVE2.b, _3n2);
        let t0 = Fp8.mul(X1, X2);
        let t1 = Fp8.mul(Y1, Y2);
        let t2 = Fp8.mul(Z1, Z2);
        let t3 = Fp8.add(X1, Y1);
        let t4 = Fp8.add(X2, Y2);
        t3 = Fp8.mul(t3, t4);
        t4 = Fp8.add(t0, t1);
        t3 = Fp8.sub(t3, t4);
        t4 = Fp8.add(X1, Z1);
        let t5 = Fp8.add(X2, Z2);
        t4 = Fp8.mul(t4, t5);
        t5 = Fp8.add(t0, t2);
        t4 = Fp8.sub(t4, t5);
        t5 = Fp8.add(Y1, Z1);
        X3 = Fp8.add(Y2, Z2);
        t5 = Fp8.mul(t5, X3);
        X3 = Fp8.add(t1, t2);
        t5 = Fp8.sub(t5, X3);
        Z3 = Fp8.mul(a, t4);
        X3 = Fp8.mul(b3, t2);
        Z3 = Fp8.add(X3, Z3);
        X3 = Fp8.sub(t1, Z3);
        Z3 = Fp8.add(t1, Z3);
        Y3 = Fp8.mul(X3, Z3);
        t1 = Fp8.add(t0, t0);
        t1 = Fp8.add(t1, t0);
        t2 = Fp8.mul(a, t2);
        t4 = Fp8.mul(b3, t4);
        t1 = Fp8.add(t1, t2);
        t2 = Fp8.sub(t0, t2);
        t2 = Fp8.mul(a, t2);
        t4 = Fp8.add(t4, t2);
        t0 = Fp8.mul(t1, t4);
        Y3 = Fp8.add(Y3, t0);
        t0 = Fp8.mul(t5, t4);
        X3 = Fp8.mul(t3, X3);
        X3 = Fp8.sub(X3, t0);
        t0 = Fp8.mul(t3, t1);
        Z3 = Fp8.mul(t5, Z3);
        Z3 = Fp8.add(Z3, t0);
        return new Point2(X3, Y3, Z3);
      }
      subtract(other) {
        return this.add(other.negate());
      }
      is0() {
        return this.equals(Point2.ZERO);
      }
      wNAF(n) {
        return wnaf.wNAFCached(this, pointPrecomputes, n, (comp) => {
          const toInv = Fp8.invertBatch(comp.map((p) => p.pz));
          return comp.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
        });
      }
      /**
       * Non-constant-time multiplication. Uses double-and-add algorithm.
       * It's faster, but should only be used when you don't care about
       * an exposed private key e.g. sig verification, which works over *public* keys.
       */
      multiplyUnsafe(n) {
        const I = Point2.ZERO;
        if (n === _0n4)
          return I;
        assertGE(n);
        if (n === _1n4)
          return this;
        const { endo } = CURVE2;
        if (!endo)
          return wnaf.unsafeLadder(this, n);
        let { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
        let k1p = I;
        let k2p = I;
        let d = this;
        while (k1 > _0n4 || k2 > _0n4) {
          if (k1 & _1n4)
            k1p = k1p.add(d);
          if (k2 & _1n4)
            k2p = k2p.add(d);
          d = d.double();
          k1 >>= _1n4;
          k2 >>= _1n4;
        }
        if (k1neg)
          k1p = k1p.negate();
        if (k2neg)
          k2p = k2p.negate();
        k2p = new Point2(Fp8.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
        return k1p.add(k2p);
      }
      /**
       * Constant time multiplication.
       * Uses wNAF method. Windowed method may be 10% faster,
       * but takes 2x longer to generate and consumes 2x memory.
       * Uses precomputes when available.
       * Uses endomorphism for Koblitz curves.
       * @param scalar by which the point would be multiplied
       * @returns New point
       */
      multiply(scalar) {
        assertGE(scalar);
        let n = scalar;
        let point, fake;
        const { endo } = CURVE2;
        if (endo) {
          const { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
          let { p: k1p, f: f1p } = this.wNAF(k1);
          let { p: k2p, f: f2p } = this.wNAF(k2);
          k1p = wnaf.constTimeNegate(k1neg, k1p);
          k2p = wnaf.constTimeNegate(k2neg, k2p);
          k2p = new Point2(Fp8.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
          point = k1p.add(k2p);
          fake = f1p.add(f2p);
        } else {
          const { p, f } = this.wNAF(n);
          point = p;
          fake = f;
        }
        return Point2.normalizeZ([point, fake])[0];
      }
      /**
       * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
       * Not using Strauss-Shamir trick: precomputation tables are faster.
       * The trick could be useful if both P and Q are not G (not in our case).
       * @returns non-zero affine point
       */
      multiplyAndAddUnsafe(Q, a, b) {
        const G = Point2.BASE;
        const mul = (P3, a2) => a2 === _0n4 || a2 === _1n4 || !P3.equals(G) ? P3.multiplyUnsafe(a2) : P3.multiply(a2);
        const sum = mul(this, a).add(mul(Q, b));
        return sum.is0() ? void 0 : sum;
      }
      // Converts Projective point to affine (x, y) coordinates.
      // Can accept precomputed Z^-1 - for example, from invertBatch.
      // (x, y, z) ∋ (x=x/z, y=y/z)
      toAffine(iz) {
        const { px: x, py: y, pz: z } = this;
        const is0 = this.is0();
        if (iz == null)
          iz = is0 ? Fp8.ONE : Fp8.inv(z);
        const ax = Fp8.mul(x, iz);
        const ay = Fp8.mul(y, iz);
        const zz = Fp8.mul(z, iz);
        if (is0)
          return { x: Fp8.ZERO, y: Fp8.ZERO };
        if (!Fp8.eql(zz, Fp8.ONE))
          throw new Error("invZ was invalid");
        return { x: ax, y: ay };
      }
      isTorsionFree() {
        const { h: cofactor, isTorsionFree } = CURVE2;
        if (cofactor === _1n4)
          return true;
        if (isTorsionFree)
          return isTorsionFree(Point2, this);
        throw new Error("isTorsionFree() has not been declared for the elliptic curve");
      }
      clearCofactor() {
        const { h: cofactor, clearCofactor } = CURVE2;
        if (cofactor === _1n4)
          return this;
        if (clearCofactor)
          return clearCofactor(Point2, this);
        return this.multiplyUnsafe(CURVE2.h);
      }
      toRawBytes(isCompressed = true) {
        this.assertValidity();
        return toBytes2(Point2, this, isCompressed);
      }
      toHex(isCompressed = true) {
        return bytesToHex(this.toRawBytes(isCompressed));
      }
    }
    Point2.BASE = new Point2(CURVE2.Gx, CURVE2.Gy, Fp8.ONE);
    Point2.ZERO = new Point2(Fp8.ZERO, Fp8.ONE, Fp8.ZERO);
    const _bits = CURVE2.nBitLength;
    const wnaf = wNAF(Point2, CURVE2.endo ? Math.ceil(_bits / 2) : _bits);
    return {
      CURVE: CURVE2,
      ProjectivePoint: Point2,
      normPrivateKeyToScalar,
      weierstrassEquation,
      isWithinCurveOrder
    };
  }
  function validateOpts(curve) {
    const opts = validateBasic(curve);
    validateObject(opts, {
      hash: "hash",
      hmac: "function",
      randomBytes: "function"
    }, {
      bits2int: "function",
      bits2int_modN: "function",
      lowS: "boolean"
    });
    return Object.freeze({ lowS: true, ...opts });
  }
  function weierstrass(curveDef) {
    const CURVE2 = validateOpts(curveDef);
    const { Fp: Fp8, n: CURVE_ORDER } = CURVE2;
    const compressedLen = Fp8.BYTES + 1;
    const uncompressedLen = 2 * Fp8.BYTES + 1;
    function isValidFieldElement(num) {
      return _0n4 < num && num < Fp8.ORDER;
    }
    function modN2(a) {
      return mod(a, CURVE_ORDER);
    }
    function invN(a) {
      return invert(a, CURVE_ORDER);
    }
    const { ProjectivePoint: Point2, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
      ...CURVE2,
      toBytes(_c, point, isCompressed) {
        const a = point.toAffine();
        const x = Fp8.toBytes(a.x);
        const cat = concatBytes;
        if (isCompressed) {
          return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
        } else {
          return cat(Uint8Array.from([4]), x, Fp8.toBytes(a.y));
        }
      },
      fromBytes(bytes2) {
        const len = bytes2.length;
        const head = bytes2[0];
        const tail = bytes2.subarray(1);
        if (len === compressedLen && (head === 2 || head === 3)) {
          const x = bytesToNumberBE(tail);
          if (!isValidFieldElement(x))
            throw new Error("Point is not on curve");
          const y2 = weierstrassEquation(x);
          let y;
          try {
            y = Fp8.sqrt(y2);
          } catch (sqrtError) {
            const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
            throw new Error("Point is not on curve" + suffix);
          }
          const isYOdd = (y & _1n4) === _1n4;
          const isHeadOdd = (head & 1) === 1;
          if (isHeadOdd !== isYOdd)
            y = Fp8.neg(y);
          return { x, y };
        } else if (len === uncompressedLen && head === 4) {
          const x = Fp8.fromBytes(tail.subarray(0, Fp8.BYTES));
          const y = Fp8.fromBytes(tail.subarray(Fp8.BYTES, 2 * Fp8.BYTES));
          return { x, y };
        } else {
          throw new Error(`Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`);
        }
      }
    });
    const numToNByteStr = (num) => bytesToHex(numberToBytesBE(num, CURVE2.nByteLength));
    function isBiggerThanHalfOrder(number2) {
      const HALF = CURVE_ORDER >> _1n4;
      return number2 > HALF;
    }
    function normalizeS(s) {
      return isBiggerThanHalfOrder(s) ? modN2(-s) : s;
    }
    const slcNum = (b, from, to) => bytesToNumberBE(b.slice(from, to));
    class Signature {
      constructor(r, s, recovery) {
        this.r = r;
        this.s = s;
        this.recovery = recovery;
        this.assertValidity();
      }
      // pair (bytes of r, bytes of s)
      static fromCompact(hex) {
        const l = CURVE2.nByteLength;
        hex = ensureBytes("compactSignature", hex, l * 2);
        return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
      }
      // DER encoded ECDSA signature
      // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
      static fromDER(hex) {
        const { r, s } = DER.toSig(ensureBytes("DER", hex));
        return new Signature(r, s);
      }
      assertValidity() {
        if (!isWithinCurveOrder(this.r))
          throw new Error("r must be 0 < r < CURVE.n");
        if (!isWithinCurveOrder(this.s))
          throw new Error("s must be 0 < s < CURVE.n");
      }
      addRecoveryBit(recovery) {
        return new Signature(this.r, this.s, recovery);
      }
      recoverPublicKey(msgHash) {
        const { r, s, recovery: rec } = this;
        const h = bits2int_modN(ensureBytes("msgHash", msgHash));
        if (rec == null || ![0, 1, 2, 3].includes(rec))
          throw new Error("recovery id invalid");
        const radj = rec === 2 || rec === 3 ? r + CURVE2.n : r;
        if (radj >= Fp8.ORDER)
          throw new Error("recovery id 2 or 3 invalid");
        const prefix = (rec & 1) === 0 ? "02" : "03";
        const R = Point2.fromHex(prefix + numToNByteStr(radj));
        const ir = invN(radj);
        const u1 = modN2(-h * ir);
        const u2 = modN2(s * ir);
        const Q = Point2.BASE.multiplyAndAddUnsafe(R, u1, u2);
        if (!Q)
          throw new Error("point at infinify");
        Q.assertValidity();
        return Q;
      }
      // Signatures should be low-s, to prevent malleability.
      hasHighS() {
        return isBiggerThanHalfOrder(this.s);
      }
      normalizeS() {
        return this.hasHighS() ? new Signature(this.r, modN2(-this.s), this.recovery) : this;
      }
      // DER-encoded
      toDERRawBytes() {
        return hexToBytes(this.toDERHex());
      }
      toDERHex() {
        return DER.hexFromSig({ r: this.r, s: this.s });
      }
      // padded bytes of r, then padded bytes of s
      toCompactRawBytes() {
        return hexToBytes(this.toCompactHex());
      }
      toCompactHex() {
        return numToNByteStr(this.r) + numToNByteStr(this.s);
      }
    }
    const utils2 = {
      isValidPrivateKey(privateKey) {
        try {
          normPrivateKeyToScalar(privateKey);
          return true;
        } catch (error) {
          return false;
        }
      },
      normPrivateKeyToScalar,
      /**
       * Produces cryptographically secure private key from random of size
       * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
       */
      randomPrivateKey: () => {
        const length = getMinHashLength(CURVE2.n);
        return mapHashToField(CURVE2.randomBytes(length), CURVE2.n);
      },
      /**
       * Creates precompute table for an arbitrary EC point. Makes point "cached".
       * Allows to massively speed-up `point.multiply(scalar)`.
       * @returns cached point
       * @example
       * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
       * fast.multiply(privKey); // much faster ECDH now
       */
      precompute(windowSize = 8, point = Point2.BASE) {
        point._setWindowSize(windowSize);
        point.multiply(BigInt(3));
        return point;
      }
    };
    function getPublicKey(privateKey, isCompressed = true) {
      return Point2.fromPrivateKey(privateKey).toRawBytes(isCompressed);
    }
    function isProbPub(item) {
		console.log('item', item)
      const arr = isBytes(item);
      const str = typeof item === "string";
      const len = (arr || str) && item.length;
	  console.log('uncompressedLen', uncompressedLen)
	  console.log('compressedLen', compressedLen)
	  console.log('len', len)
	//   console.log('arr', arr)
	//   console.log('str', str)
      if (arr){
		return len === compressedLen || len === uncompressedLen;
	  }
      if (str)
        return len === 2 * compressedLen || len === 2 * uncompressedLen;
	console.log('item', item)
	console.log('item instanceof Point2', item instanceof Point2)
      if (item instanceof Point2)
        return true;
      return false;
    }
    function getSharedSecret(privateA, publicB, isCompressed = true) {
	// 	console.log('isProbPub(privateA)', isProbPub(privateA))
    //   if (isProbPub(privateA))
    //     throw new Error("first arg must be private key");
	// console.log('isProbPub(publicB)', isProbPub(publicB))
    //   if (!isProbPub(publicB))
    //     throw new Error("second arg must be public key");
      const b = Point2.fromHex(publicB);
      return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
    }
    const bits2int = CURVE2.bits2int || function(bytes2) {
      const num = bytesToNumberBE(bytes2);
      const delta = bytes2.length * 8 - CURVE2.nBitLength;
      return delta > 0 ? num >> BigInt(delta) : num;
    };
    const bits2int_modN = CURVE2.bits2int_modN || function(bytes2) {
      return modN2(bits2int(bytes2));
    };
    const ORDER_MASK = bitMask(CURVE2.nBitLength);
    function int2octets(num) {
      if (typeof num !== "bigint")
        throw new Error("bigint expected");
      if (!(_0n4 <= num && num < ORDER_MASK))
        throw new Error(`bigint expected < 2^${CURVE2.nBitLength}`);
      return numberToBytesBE(num, CURVE2.nByteLength);
    }
    function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
      if (["recovered", "canonical"].some((k) => k in opts))
        throw new Error("sign() legacy options not supported");
      const { hash: hash2, randomBytes: randomBytes2 } = CURVE2;
      let { lowS, prehash, extraEntropy: ent } = opts;
      if (lowS == null)
        lowS = true;
      msgHash = ensureBytes("msgHash", msgHash);
      if (prehash)
        msgHash = ensureBytes("prehashed msgHash", hash2(msgHash));
      const h1int = bits2int_modN(msgHash);
      const d = normPrivateKeyToScalar(privateKey);
      const seedArgs = [int2octets(d), int2octets(h1int)];
      if (ent != null && ent !== false) {
        const e = ent === true ? randomBytes2(Fp8.BYTES) : ent;
        seedArgs.push(ensureBytes("extraEntropy", e));
      }
      const seed = concatBytes(...seedArgs);
      const m = h1int;
      function k2sig(kBytes) {
        const k = bits2int(kBytes);
        if (!isWithinCurveOrder(k))
          return;
        const ik = invN(k);
        const q = Point2.BASE.multiply(k).toAffine();
        const r = modN2(q.x);
        if (r === _0n4)
          return;
        const s = modN2(ik * modN2(m + r * d));
        if (s === _0n4)
          return;
        let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n4);
        let normS = s;
        if (lowS && isBiggerThanHalfOrder(s)) {
          normS = normalizeS(s);
          recovery ^= 1;
        }
        return new Signature(r, normS, recovery);
      }
      return { seed, k2sig };
    }
    const defaultSigOpts = { lowS: CURVE2.lowS, prehash: false };
    const defaultVerOpts = { lowS: CURVE2.lowS, prehash: false };
    function sign(msgHash, privKey, opts = defaultSigOpts) {
      const { seed, k2sig } = prepSig(msgHash, privKey, opts);
      const C = CURVE2;
      const drbg = createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
      return drbg(seed, k2sig);
    }
    Point2.BASE._setWindowSize(8);
    function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
      const sg = signature;
      msgHash = ensureBytes("msgHash", msgHash);
      publicKey = ensureBytes("publicKey", publicKey);
      if ("strict" in opts)
        throw new Error("options.strict was renamed to lowS");
      const { lowS, prehash } = opts;
      let _sig = void 0;
      let P3;
      try {
        if (typeof sg === "string" || isBytes(sg)) {
          try {
            _sig = Signature.fromDER(sg);
          } catch (derError) {
            if (!(derError instanceof DER.Err))
              throw derError;
            _sig = Signature.fromCompact(sg);
          }
        } else if (typeof sg === "object" && typeof sg.r === "bigint" && typeof sg.s === "bigint") {
          const { r: r2, s: s2 } = sg;
          _sig = new Signature(r2, s2);
        } else {
          throw new Error("PARSE");
        }
        P3 = Point2.fromHex(publicKey);
      } catch (error) {
        if (error.message === "PARSE")
          throw new Error(`signature must be Signature instance, Uint8Array or hex string`);
        return false;
      }
      if (lowS && _sig.hasHighS())
        return false;
      if (prehash)
        msgHash = CURVE2.hash(msgHash);
      const { r, s } = _sig;
      const h = bits2int_modN(msgHash);
      const is = invN(s);
      const u1 = modN2(h * is);
      const u2 = modN2(r * is);
      const R = Point2.BASE.multiplyAndAddUnsafe(P3, u1, u2)?.toAffine();
      if (!R)
        return false;
      const v = modN2(R.x);
      return v === r;
    }
    return {
      CURVE: CURVE2,
      getPublicKey,
      getSharedSecret,
      sign,
      verify,
      ProjectivePoint: Point2,
      Signature,
      utils: utils2
    };
  }
  function SWUFpSqrtRatio(Fp8, Z) {
    const q = Fp8.ORDER;
    let l = _0n4;
    for (let o = q - _1n4; o % _2n3 === _0n4; o /= _2n3)
      l += _1n4;
    const c1 = l;
    const _2n_pow_c1_1 = _2n3 << c1 - _1n4 - _1n4;
    const _2n_pow_c1 = _2n_pow_c1_1 * _2n3;
    const c2 = (q - _1n4) / _2n_pow_c1;
    const c3 = (c2 - _1n4) / _2n3;
    const c4 = _2n_pow_c1 - _1n4;
    const c5 = _2n_pow_c1_1;
    const c6 = Fp8.pow(Z, c2);
    const c7 = Fp8.pow(Z, (c2 + _1n4) / _2n3);
    let sqrtRatio = (u, v) => {
      let tv1 = c6;
      let tv2 = Fp8.pow(v, c4);
      let tv3 = Fp8.sqr(tv2);
      tv3 = Fp8.mul(tv3, v);
      let tv5 = Fp8.mul(u, tv3);
      tv5 = Fp8.pow(tv5, c3);
      tv5 = Fp8.mul(tv5, tv2);
      tv2 = Fp8.mul(tv5, v);
      tv3 = Fp8.mul(tv5, u);
      let tv4 = Fp8.mul(tv3, tv2);
      tv5 = Fp8.pow(tv4, c5);
      let isQR = Fp8.eql(tv5, Fp8.ONE);
      tv2 = Fp8.mul(tv3, c7);
      tv5 = Fp8.mul(tv4, tv1);
      tv3 = Fp8.cmov(tv2, tv3, isQR);
      tv4 = Fp8.cmov(tv5, tv4, isQR);
      for (let i = c1; i > _1n4; i--) {
        let tv52 = i - _2n3;
        tv52 = _2n3 << tv52 - _1n4;
        let tvv5 = Fp8.pow(tv4, tv52);
        const e1 = Fp8.eql(tvv5, Fp8.ONE);
        tv2 = Fp8.mul(tv3, tv1);
        tv1 = Fp8.mul(tv1, tv1);
        tvv5 = Fp8.mul(tv4, tv1);
        tv3 = Fp8.cmov(tv2, tv3, e1);
        tv4 = Fp8.cmov(tvv5, tv4, e1);
      }
      return { isValid: isQR, value: tv3 };
    };
    if (Fp8.ORDER % _4n2 === _3n2) {
      const c12 = (Fp8.ORDER - _3n2) / _4n2;
      const c22 = Fp8.sqrt(Fp8.neg(Z));
      sqrtRatio = (u, v) => {
        let tv1 = Fp8.sqr(v);
        const tv2 = Fp8.mul(u, v);
        tv1 = Fp8.mul(tv1, tv2);
        let y1 = Fp8.pow(tv1, c12);
        y1 = Fp8.mul(y1, tv2);
        const y2 = Fp8.mul(y1, c22);
        const tv3 = Fp8.mul(Fp8.sqr(y1), v);
        const isQR = Fp8.eql(tv3, u);
        let y = Fp8.cmov(y2, y1, isQR);
        return { isValid: isQR, value: y };
      };
    }
    return sqrtRatio;
  }
  function mapToCurveSimpleSWU(Fp8, opts) {
    validateField(Fp8);
    if (!Fp8.isValid(opts.A) || !Fp8.isValid(opts.B) || !Fp8.isValid(opts.Z))
      throw new Error("mapToCurveSimpleSWU: invalid opts");
    const sqrtRatio = SWUFpSqrtRatio(Fp8, opts.Z);
    if (!Fp8.isOdd)
      throw new Error("Fp.isOdd is not implemented!");
    return (u) => {
      let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
      tv1 = Fp8.sqr(u);
      tv1 = Fp8.mul(tv1, opts.Z);
      tv2 = Fp8.sqr(tv1);
      tv2 = Fp8.add(tv2, tv1);
      tv3 = Fp8.add(tv2, Fp8.ONE);
      tv3 = Fp8.mul(tv3, opts.B);
      tv4 = Fp8.cmov(opts.Z, Fp8.neg(tv2), !Fp8.eql(tv2, Fp8.ZERO));
      tv4 = Fp8.mul(tv4, opts.A);
      tv2 = Fp8.sqr(tv3);
      tv6 = Fp8.sqr(tv4);
      tv5 = Fp8.mul(tv6, opts.A);
      tv2 = Fp8.add(tv2, tv5);
      tv2 = Fp8.mul(tv2, tv3);
      tv6 = Fp8.mul(tv6, tv4);
      tv5 = Fp8.mul(tv6, opts.B);
      tv2 = Fp8.add(tv2, tv5);
      x = Fp8.mul(tv1, tv3);
      const { isValid, value } = sqrtRatio(tv2, tv6);
      y = Fp8.mul(tv1, u);
      y = Fp8.mul(y, value);
      x = Fp8.cmov(x, tv3, isValid);
      y = Fp8.cmov(y, value, isValid);
      const e1 = Fp8.isOdd(u) === Fp8.isOdd(y);
      y = Fp8.cmov(Fp8.neg(y), y, e1);
      x = Fp8.div(x, tv4);
      return { x, y };
    };
  }

  // ../esm/_shortw_utils.js
  function getHash(hash2) {
    return {
      hash: hash2,
      hmac: (key, ...msgs) => hmac(hash2, key, concatBytes2(...msgs)),
      randomBytes
    };
  }
  function createCurve(curveDef, defHash) {
    const create = (hash2) => weierstrass({ ...curveDef, ...getHash(hash2) });
    return Object.freeze({ ...create(defHash), create });
  }

  // ../esm/abstract/hash-to-curve.js
  var os2ip = bytesToNumberBE;
  function i2osp(value, length) {
    if (value < 0 || value >= 1 << 8 * length) {
      throw new Error(`bad I2OSP call: value=${value} length=${length}`);
    }
    const res = Array.from({ length }).fill(0);
    for (let i = length - 1; i >= 0; i--) {
      res[i] = value & 255;
      value >>>= 8;
    }
    return new Uint8Array(res);
  }
  function strxor(a, b) {
    const arr = new Uint8Array(a.length);
    for (let i = 0; i < a.length; i++) {
      arr[i] = a[i] ^ b[i];
    }
    return arr;
  }
  function anum(item) {
    if (!Number.isSafeInteger(item))
      throw new Error("number expected");
  }
  function expand_message_xmd(msg, DST, lenInBytes, H) {
    abytes(msg);
    abytes(DST);
    anum(lenInBytes);
    if (DST.length > 255)
      DST = H(concatBytes(utf8ToBytes("H2C-OVERSIZE-DST-"), DST));
    const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H;
    const ell = Math.ceil(lenInBytes / b_in_bytes);
    if (ell > 255)
      throw new Error("Invalid xmd length");
    const DST_prime = concatBytes(DST, i2osp(DST.length, 1));
    const Z_pad = i2osp(0, r_in_bytes);
    const l_i_b_str = i2osp(lenInBytes, 2);
    const b = new Array(ell);
    const b_0 = H(concatBytes(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
    b[0] = H(concatBytes(b_0, i2osp(1, 1), DST_prime));
    for (let i = 1; i <= ell; i++) {
      const args = [strxor(b_0, b[i - 1]), i2osp(i + 1, 1), DST_prime];
      b[i] = H(concatBytes(...args));
    }
    const pseudo_random_bytes = concatBytes(...b);
    return pseudo_random_bytes.slice(0, lenInBytes);
  }
  function expand_message_xof(msg, DST, lenInBytes, k, H) {
    abytes(msg);
    abytes(DST);
    anum(lenInBytes);
    if (DST.length > 255) {
      const dkLen = Math.ceil(2 * k / 8);
      DST = H.create({ dkLen }).update(utf8ToBytes("H2C-OVERSIZE-DST-")).update(DST).digest();
    }
    if (lenInBytes > 65535 || DST.length > 255)
      throw new Error("expand_message_xof: invalid lenInBytes");
    return H.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
  }
  function hash_to_field(msg, count, options) {
    validateObject(options, {
      DST: "stringOrUint8Array",
      p: "bigint",
      m: "isSafeInteger",
      k: "isSafeInteger",
      hash: "hash"
    });
    const { p, k, m, hash: hash2, expand, DST: _DST } = options;
    abytes(msg);
    anum(count);
    const DST = typeof _DST === "string" ? utf8ToBytes(_DST) : _DST;
    const log2p = p.toString(2).length;
    const L = Math.ceil((log2p + k) / 8);
    const len_in_bytes = count * m * L;
    let prb;
    if (expand === "xmd") {
      prb = expand_message_xmd(msg, DST, len_in_bytes, hash2);
    } else if (expand === "xof") {
      prb = expand_message_xof(msg, DST, len_in_bytes, k, hash2);
    } else if (expand === "_internal_pass") {
      prb = msg;
    } else {
      throw new Error('expand must be "xmd" or "xof"');
    }
    const u = new Array(count);
    for (let i = 0; i < count; i++) {
      const e = new Array(m);
      for (let j = 0; j < m; j++) {
        const elm_offset = L * (j + i * m);
        const tv = prb.subarray(elm_offset, elm_offset + L);
        e[j] = mod(os2ip(tv), p);
      }
      u[i] = e;
    }
    return u;
  }
  function isogenyMap(field, map) {
    const COEFF = map.map((i) => Array.from(i).reverse());
    return (x, y) => {
      const [xNum, xDen, yNum, yDen] = COEFF.map((val) => val.reduce((acc, i) => field.add(field.mul(acc, x), i)));
      x = field.div(xNum, xDen);
      y = field.mul(y, field.div(yNum, yDen));
      return { x, y };
    };
  }
  function createHasher(Point2, mapToCurve, def) {
    if (typeof mapToCurve !== "function")
      throw new Error("mapToCurve() must be defined");
    return {
      // Encodes byte string to elliptic curve.
      // hash_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
      hashToCurve(msg, options) {
        const u = hash_to_field(msg, 2, { ...def, DST: def.DST, ...options });
        const u0 = Point2.fromAffine(mapToCurve(u[0]));
        const u1 = Point2.fromAffine(mapToCurve(u[1]));
        const P3 = u0.add(u1).clearCofactor();
        P3.assertValidity();
        return P3;
      },
      // Encodes byte string to elliptic curve.
      // encode_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
      encodeToCurve(msg, options) {
        const u = hash_to_field(msg, 1, { ...def, DST: def.encodeDST, ...options });
        const P3 = Point2.fromAffine(mapToCurve(u[0])).clearCofactor();
        P3.assertValidity();
        return P3;
      },
      // Same as encodeToCurve, but without hash
      mapToCurve(scalars) {
        if (!Array.isArray(scalars))
          throw new Error("mapToCurve: expected array of bigints");
        for (const i of scalars)
          if (typeof i !== "bigint")
            throw new Error(`mapToCurve: expected array of bigints, got ${i} in array`);
        const P3 = Point2.fromAffine(mapToCurve(scalars)).clearCofactor();
        P3.assertValidity();
        return P3;
      }
    };
  }

  // ../esm/secp256k1.js
  var secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
  var secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
  var _1n5 = BigInt(1);
  var _2n4 = BigInt(2);
  var divNearest = (a, b) => (a + b / _2n4) / b;
  function sqrtMod(y) {
    const P3 = secp256k1P;
    const _3n7 = BigInt(3), _6n = BigInt(6), _11n2 = BigInt(11), _22n2 = BigInt(22);
    const _23n = BigInt(23), _44n2 = BigInt(44), _88n2 = BigInt(88);
    const b2 = y * y * y % P3;
    const b3 = b2 * b2 * y % P3;
    const b6 = pow2(b3, _3n7, P3) * b3 % P3;
    const b9 = pow2(b6, _3n7, P3) * b3 % P3;
    const b11 = pow2(b9, _2n4, P3) * b2 % P3;
    const b22 = pow2(b11, _11n2, P3) * b11 % P3;
    const b44 = pow2(b22, _22n2, P3) * b22 % P3;
    const b88 = pow2(b44, _44n2, P3) * b44 % P3;
    const b176 = pow2(b88, _88n2, P3) * b88 % P3;
    const b220 = pow2(b176, _44n2, P3) * b44 % P3;
    const b223 = pow2(b220, _3n7, P3) * b3 % P3;
    const t1 = pow2(b223, _23n, P3) * b22 % P3;
    const t2 = pow2(t1, _6n, P3) * b2 % P3;
    const root = pow2(t2, _2n4, P3);
    if (!Fp.eql(Fp.sqr(root), y))
      throw new Error("Cannot find square root");
    return root;
  }
  var Fp = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
  var secp256k1 = createCurve({
    a: BigInt(0),
    // equation params: a, b
    b: BigInt(7),
    // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
    Fp,
    // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
    n: secp256k1N,
    // Curve order, total count of valid points in the field
    // Base point (x, y) aka generator point
    Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
    Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
    h: BigInt(1),
    // Cofactor
    lowS: true,
    // Allow only low-S signatures by default in sign() and verify()
    /**
     * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
     * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
     * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
     * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
     */
    endo: {
      beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
      splitScalar: (k) => {
        const n = secp256k1N;
        const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
        const b1 = -_1n5 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
        const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
        const b2 = a1;
        const POW_2_128 = BigInt("0x100000000000000000000000000000000");
        const c1 = divNearest(b2 * k, n);
        const c2 = divNearest(-b1 * k, n);
        let k1 = mod(k - c1 * a1 - c2 * a2, n);
        let k2 = mod(-c1 * b1 - c2 * b2, n);
        const k1neg = k1 > POW_2_128;
        const k2neg = k2 > POW_2_128;
        if (k1neg)
          k1 = n - k1;
        if (k2neg)
          k2 = n - k2;
        if (k1 > POW_2_128 || k2 > POW_2_128) {
          throw new Error("splitScalar: Endomorphism failed, k=" + k);
        }
        return { k1neg, k1, k2neg, k2 };
      }
    }
  }, sha256);
  var _0n5 = BigInt(0);
  var fe = (x) => typeof x === "bigint" && _0n5 < x && x < secp256k1P;
  var ge = (x) => typeof x === "bigint" && _0n5 < x && x < secp256k1N;
  var TAGGED_HASH_PREFIXES = {};
  function taggedHash(tag, ...messages) {
    let tagP = TAGGED_HASH_PREFIXES[tag];
    if (tagP === void 0) {
      const tagH = sha256(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
      tagP = concatBytes(tagH, tagH);
      TAGGED_HASH_PREFIXES[tag] = tagP;
    }
    return sha256(concatBytes(tagP, ...messages));
  }
  var pointToBytes = (point) => point.toRawBytes(true).slice(1);
  var numTo32b = (n) => numberToBytesBE(n, 32);
  var modP = (x) => mod(x, secp256k1P);
  var modN = (x) => mod(x, secp256k1N);
  var Point = secp256k1.ProjectivePoint;
  var GmulAdd = (Q, a, b) => Point.BASE.multiplyAndAddUnsafe(Q, a, b);
  function schnorrGetExtPubKey(priv) {
    let d_ = secp256k1.utils.normPrivateKeyToScalar(priv);
    let p = Point.fromPrivateKey(d_);
    const scalar = p.hasEvenY() ? d_ : modN(-d_);
    return { scalar, bytes: pointToBytes(p) };
  }
  function lift_x(x) {
    if (!fe(x))
      throw new Error("bad x: need 0 < x < p");
    const xx = modP(x * x);
    const c = modP(xx * x + BigInt(7));
    let y = sqrtMod(c);
    if (y % _2n4 !== _0n5)
      y = modP(-y);
    const p = new Point(x, y, _1n5);
    p.assertValidity();
    return p;
  }
  function challenge(...args) {
    return modN(bytesToNumberBE(taggedHash("BIP0340/challenge", ...args)));
  }
  function schnorrGetPublicKey(privateKey) {
    return schnorrGetExtPubKey(privateKey).bytes;
  }
  function schnorrSign(message, privateKey, auxRand = randomBytes(32)) {
    const m = ensureBytes("message", message);
    const { bytes: px, scalar: d } = schnorrGetExtPubKey(privateKey);
    const a = ensureBytes("auxRand", auxRand, 32);
    const t = numTo32b(d ^ bytesToNumberBE(taggedHash("BIP0340/aux", a)));
    const rand = taggedHash("BIP0340/nonce", t, px, m);
    const k_ = modN(bytesToNumberBE(rand));
    if (k_ === _0n5)
      throw new Error("sign failed: k is zero");
    const { bytes: rx, scalar: k } = schnorrGetExtPubKey(k_);
    const e = challenge(rx, px, m);
    const sig = new Uint8Array(64);
    sig.set(rx, 0);
    sig.set(numTo32b(modN(k + e * d)), 32);
    if (!schnorrVerify(sig, m, px))
      throw new Error("sign: Invalid signature produced");
    return sig;
  }
  function schnorrVerify(signature, message, publicKey) {
    const sig = ensureBytes("signature", signature, 64);
    const m = ensureBytes("message", message);
    const pub = ensureBytes("publicKey", publicKey, 32);
    try {
      const P3 = lift_x(bytesToNumberBE(pub));
      const r = bytesToNumberBE(sig.subarray(0, 32));
      if (!fe(r))
        return false;
      const s = bytesToNumberBE(sig.subarray(32, 64));
      if (!ge(s))
        return false;
      const e = challenge(numTo32b(r), pointToBytes(P3), m);
      const R = GmulAdd(P3, s, modN(-e));
      if (!R || !R.hasEvenY() || R.toAffine().x !== r)
        return false;
      return true;
    } catch (error) {
      return false;
    }
  }
  var schnorr = /* @__PURE__ */ (() => ({
    getPublicKey: schnorrGetPublicKey,
    sign: schnorrSign,
    verify: schnorrVerify,
    utils: {
      randomPrivateKey: secp256k1.utils.randomPrivateKey,
      lift_x,
      pointToBytes,
      numberToBytesBE,
      bytesToNumberBE,
      taggedHash,
      mod
    }
  }))();

  // ../node_modules/@noble/hashes/esm/_u64.js
  var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
  var _32n = /* @__PURE__ */ BigInt(32);
  function fromBig(n, le = false) {
    if (le)
      return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
    return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
  }
  function split(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for (let i = 0; i < lst.length; i++) {
      const { h, l } = fromBig(lst[i], le);
      [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
  }
  var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
  var shrSH = (h, _l, s) => h >>> s;
  var shrSL = (h, l, s) => h << 32 - s | l >>> s;
  var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
  var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
  var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
  var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
  var rotr32H = (_h, l) => l;
  var rotr32L = (h, _l) => h;
  var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
  var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
  var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
  var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
  function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
  }
  var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
  var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
  var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
  var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
  var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
  var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
  var u64 = {
    fromBig,
    split,
    toBig,
    shrSH,
    shrSL,
    rotrSH,
    rotrSL,
    rotrBH,
    rotrBL,
    rotr32H,
    rotr32L,
    rotlSH,
    rotlSL,
    rotlBH,
    rotlBL,
    add,
    add3L,
    add3H,
    add4L,
    add4H,
    add5H,
    add5L
  };
  var u64_default = u64;

  // ../node_modules/@noble/hashes/esm/sha512.js
  var [SHA512_Kh, SHA512_Kl] = /* @__PURE__ */ (() => u64_default.split([
    "0x428a2f98d728ae22",
    "0x7137449123ef65cd",
    "0xb5c0fbcfec4d3b2f",
    "0xe9b5dba58189dbbc",
    "0x3956c25bf348b538",
    "0x59f111f1b605d019",
    "0x923f82a4af194f9b",
    "0xab1c5ed5da6d8118",
    "0xd807aa98a3030242",
    "0x12835b0145706fbe",
    "0x243185be4ee4b28c",
    "0x550c7dc3d5ffb4e2",
    "0x72be5d74f27b896f",
    "0x80deb1fe3b1696b1",
    "0x9bdc06a725c71235",
    "0xc19bf174cf692694",
    "0xe49b69c19ef14ad2",
    "0xefbe4786384f25e3",
    "0x0fc19dc68b8cd5b5",
    "0x240ca1cc77ac9c65",
    "0x2de92c6f592b0275",
    "0x4a7484aa6ea6e483",
    "0x5cb0a9dcbd41fbd4",
    "0x76f988da831153b5",
    "0x983e5152ee66dfab",
    "0xa831c66d2db43210",
    "0xb00327c898fb213f",
    "0xbf597fc7beef0ee4",
    "0xc6e00bf33da88fc2",
    "0xd5a79147930aa725",
    "0x06ca6351e003826f",
    "0x142929670a0e6e70",
    "0x27b70a8546d22ffc",
    "0x2e1b21385c26c926",
    "0x4d2c6dfc5ac42aed",
    "0x53380d139d95b3df",
    "0x650a73548baf63de",
    "0x766a0abb3c77b2a8",
    "0x81c2c92e47edaee6",
    "0x92722c851482353b",
    "0xa2bfe8a14cf10364",
    "0xa81a664bbc423001",
    "0xc24b8b70d0f89791",
    "0xc76c51a30654be30",
    "0xd192e819d6ef5218",
    "0xd69906245565a910",
    "0xf40e35855771202a",
    "0x106aa07032bbd1b8",
    "0x19a4c116b8d2d0c8",
    "0x1e376c085141ab53",
    "0x2748774cdf8eeb99",
    "0x34b0bcb5e19b48a8",
    "0x391c0cb3c5c95a63",
    "0x4ed8aa4ae3418acb",
    "0x5b9cca4f7763e373",
    "0x682e6ff3d6b2b8a3",
    "0x748f82ee5defb2fc",
    "0x78a5636f43172f60",
    "0x84c87814a1f0ab72",
    "0x8cc702081a6439ec",
    "0x90befffa23631e28",
    "0xa4506cebde82bde9",
    "0xbef9a3f7b2c67915",
    "0xc67178f2e372532b",
    "0xca273eceea26619c",
    "0xd186b8c721c0c207",
    "0xeada7dd6cde0eb1e",
    "0xf57d4f7fee6ed178",
    "0x06f067aa72176fba",
    "0x0a637dc5a2c898a6",
    "0x113f9804bef90dae",
    "0x1b710b35131c471b",
    "0x28db77f523047d84",
    "0x32caab7b40c72493",
    "0x3c9ebe0a15c9bebc",
    "0x431d67c49c100d4c",
    "0x4cc5d4becb3e42b6",
    "0x597f299cfc657e2a",
    "0x5fcb6fab3ad6faec",
    "0x6c44198c4a475817"
  ].map((n) => BigInt(n))))();
  var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
  var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
  var SHA512 = class extends HashMD {
    constructor() {
      super(128, 64, 16, false);
      this.Ah = 1779033703 | 0;
      this.Al = 4089235720 | 0;
      this.Bh = 3144134277 | 0;
      this.Bl = 2227873595 | 0;
      this.Ch = 1013904242 | 0;
      this.Cl = 4271175723 | 0;
      this.Dh = 2773480762 | 0;
      this.Dl = 1595750129 | 0;
      this.Eh = 1359893119 | 0;
      this.El = 2917565137 | 0;
      this.Fh = 2600822924 | 0;
      this.Fl = 725511199 | 0;
      this.Gh = 528734635 | 0;
      this.Gl = 4215389547 | 0;
      this.Hh = 1541459225 | 0;
      this.Hl = 327033209 | 0;
    }
    // prettier-ignore
    get() {
      const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
      return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
    }
    // prettier-ignore
    set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
      this.Ah = Ah | 0;
      this.Al = Al | 0;
      this.Bh = Bh | 0;
      this.Bl = Bl | 0;
      this.Ch = Ch | 0;
      this.Cl = Cl | 0;
      this.Dh = Dh | 0;
      this.Dl = Dl | 0;
      this.Eh = Eh | 0;
      this.El = El | 0;
      this.Fh = Fh | 0;
      this.Fl = Fl | 0;
      this.Gh = Gh | 0;
      this.Gl = Gl | 0;
      this.Hh = Hh | 0;
      this.Hl = Hl | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4) {
        SHA512_W_H[i] = view.getUint32(offset);
        SHA512_W_L[i] = view.getUint32(offset += 4);
      }
      for (let i = 16; i < 80; i++) {
        const W15h = SHA512_W_H[i - 15] | 0;
        const W15l = SHA512_W_L[i - 15] | 0;
        const s0h = u64_default.rotrSH(W15h, W15l, 1) ^ u64_default.rotrSH(W15h, W15l, 8) ^ u64_default.shrSH(W15h, W15l, 7);
        const s0l = u64_default.rotrSL(W15h, W15l, 1) ^ u64_default.rotrSL(W15h, W15l, 8) ^ u64_default.shrSL(W15h, W15l, 7);
        const W2h = SHA512_W_H[i - 2] | 0;
        const W2l = SHA512_W_L[i - 2] | 0;
        const s1h = u64_default.rotrSH(W2h, W2l, 19) ^ u64_default.rotrBH(W2h, W2l, 61) ^ u64_default.shrSH(W2h, W2l, 6);
        const s1l = u64_default.rotrSL(W2h, W2l, 19) ^ u64_default.rotrBL(W2h, W2l, 61) ^ u64_default.shrSL(W2h, W2l, 6);
        const SUMl = u64_default.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
        const SUMh = u64_default.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
        SHA512_W_H[i] = SUMh | 0;
        SHA512_W_L[i] = SUMl | 0;
      }
      let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
      for (let i = 0; i < 80; i++) {
        const sigma1h = u64_default.rotrSH(Eh, El, 14) ^ u64_default.rotrSH(Eh, El, 18) ^ u64_default.rotrBH(Eh, El, 41);
        const sigma1l = u64_default.rotrSL(Eh, El, 14) ^ u64_default.rotrSL(Eh, El, 18) ^ u64_default.rotrBL(Eh, El, 41);
        const CHIh = Eh & Fh ^ ~Eh & Gh;
        const CHIl = El & Fl ^ ~El & Gl;
        const T1ll = u64_default.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
        const T1h = u64_default.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
        const T1l = T1ll | 0;
        const sigma0h = u64_default.rotrSH(Ah, Al, 28) ^ u64_default.rotrBH(Ah, Al, 34) ^ u64_default.rotrBH(Ah, Al, 39);
        const sigma0l = u64_default.rotrSL(Ah, Al, 28) ^ u64_default.rotrBL(Ah, Al, 34) ^ u64_default.rotrBL(Ah, Al, 39);
        const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
        const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
        Hh = Gh | 0;
        Hl = Gl | 0;
        Gh = Fh | 0;
        Gl = Fl | 0;
        Fh = Eh | 0;
        Fl = El | 0;
        ({ h: Eh, l: El } = u64_default.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
        Dh = Ch | 0;
        Dl = Cl | 0;
        Ch = Bh | 0;
        Cl = Bl | 0;
        Bh = Ah | 0;
        Bl = Al | 0;
        const All = u64_default.add3L(T1l, sigma0l, MAJl);
        Ah = u64_default.add3H(All, T1h, sigma0h, MAJh);
        Al = All | 0;
      }
      ({ h: Ah, l: Al } = u64_default.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
      ({ h: Bh, l: Bl } = u64_default.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
      ({ h: Ch, l: Cl } = u64_default.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
      ({ h: Dh, l: Dl } = u64_default.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
      ({ h: Eh, l: El } = u64_default.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
      ({ h: Fh, l: Fl } = u64_default.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
      ({ h: Gh, l: Gl } = u64_default.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
      ({ h: Hh, l: Hl } = u64_default.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
      this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
    }
    roundClean() {
      SHA512_W_H.fill(0);
      SHA512_W_L.fill(0);
    }
    destroy() {
      this.buffer.fill(0);
      this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  };
  var SHA384 = class extends SHA512 {
    constructor() {
      super();
      this.Ah = 3418070365 | 0;
      this.Al = 3238371032 | 0;
      this.Bh = 1654270250 | 0;
      this.Bl = 914150663 | 0;
      this.Ch = 2438529370 | 0;
      this.Cl = 812702999 | 0;
      this.Dh = 355462360 | 0;
      this.Dl = 4144912697 | 0;
      this.Eh = 1731405415 | 0;
      this.El = 4290775857 | 0;
      this.Fh = 2394180231 | 0;
      this.Fl = 1750603025 | 0;
      this.Gh = 3675008525 | 0;
      this.Gl = 1694076839 | 0;
      this.Hh = 1203062813 | 0;
      this.Hl = 3204075428 | 0;
      this.outputLen = 48;
    }
  };
  var sha512 = /* @__PURE__ */ wrapConstructor(() => new SHA512());
  var sha384 = /* @__PURE__ */ wrapConstructor(() => new SHA384());

  // ../esm/abstract/edwards.js
  var _0n6 = BigInt(0);
  var _1n6 = BigInt(1);
  var _2n5 = BigInt(2);
  var _8n2 = BigInt(8);
  var VERIFY_DEFAULT = { zip215: true };
  function validateOpts2(curve) {
    const opts = validateBasic(curve);
    validateObject(curve, {
      hash: "function",
      a: "bigint",
      d: "bigint",
      randomBytes: "function"
    }, {
      adjustScalarBytes: "function",
      domain: "function",
      uvRatio: "function",
      mapToCurve: "function"
    });
    return Object.freeze({ ...opts });
  }
  function twistedEdwards(curveDef) {
    const CURVE2 = validateOpts2(curveDef);
    const { Fp: Fp8, n: CURVE_ORDER, prehash, hash: cHash, randomBytes: randomBytes2, nByteLength, h: cofactor } = CURVE2;
    const MASK = _2n5 << BigInt(nByteLength * 8) - _1n6;
    const modP2 = Fp8.create;
    const uvRatio3 = CURVE2.uvRatio || ((u, v) => {
      try {
        return { isValid: true, value: Fp8.sqrt(u * Fp8.inv(v)) };
      } catch (e) {
        return { isValid: false, value: _0n6 };
      }
    });
    const adjustScalarBytes3 = CURVE2.adjustScalarBytes || ((bytes2) => bytes2);
    const domain = CURVE2.domain || ((data, ctx, phflag) => {
      if (ctx.length || phflag)
        throw new Error("Contexts/pre-hash are not supported");
      return data;
    });
    const inBig = (n) => typeof n === "bigint" && _0n6 < n;
    const inRange = (n, max) => inBig(n) && inBig(max) && n < max;
    const in0MaskRange = (n) => n === _0n6 || inRange(n, MASK);
    function assertInRange(n, max) {
      if (inRange(n, max))
        return n;
      throw new Error(`Expected valid scalar < ${max}, got ${typeof n} ${n}`);
    }
    function assertGE0(n) {
      return n === _0n6 ? n : assertInRange(n, CURVE_ORDER);
    }
    const pointPrecomputes = /* @__PURE__ */ new Map();
    function isPoint(other) {
      if (!(other instanceof Point2))
        throw new Error("ExtendedPoint expected");
    }
    class Point2 {
      constructor(ex, ey, ez, et) {
        this.ex = ex;
        this.ey = ey;
        this.ez = ez;
        this.et = et;
        if (!in0MaskRange(ex))
          throw new Error("x required");
        if (!in0MaskRange(ey))
          throw new Error("y required");
        if (!in0MaskRange(ez))
          throw new Error("z required");
        if (!in0MaskRange(et))
          throw new Error("t required");
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      static fromAffine(p) {
        if (p instanceof Point2)
          throw new Error("extended point not allowed");
        const { x, y } = p || {};
        if (!in0MaskRange(x) || !in0MaskRange(y))
          throw new Error("invalid affine point");
        return new Point2(x, y, _1n6, modP2(x * y));
      }
      static normalizeZ(points) {
        const toInv = Fp8.invertBatch(points.map((p) => p.ez));
        return points.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
      }
      // "Private method", don't use it directly
      _setWindowSize(windowSize) {
        this._WINDOW_SIZE = windowSize;
        pointPrecomputes.delete(this);
      }
      // Not required for fromHex(), which always creates valid points.
      // Could be useful for fromAffine().
      assertValidity() {
        const { a, d } = CURVE2;
        if (this.is0())
          throw new Error("bad point: ZERO");
        const { ex: X, ey: Y, ez: Z, et: T } = this;
        const X2 = modP2(X * X);
        const Y2 = modP2(Y * Y);
        const Z2 = modP2(Z * Z);
        const Z4 = modP2(Z2 * Z2);
        const aX2 = modP2(X2 * a);
        const left = modP2(Z2 * modP2(aX2 + Y2));
        const right = modP2(Z4 + modP2(d * modP2(X2 * Y2)));
        if (left !== right)
          throw new Error("bad point: equation left != right (1)");
        const XY = modP2(X * Y);
        const ZT = modP2(Z * T);
        if (XY !== ZT)
          throw new Error("bad point: equation left != right (2)");
      }
      // Compare one point to another.
      equals(other) {
        isPoint(other);
        const { ex: X1, ey: Y1, ez: Z1 } = this;
        const { ex: X2, ey: Y2, ez: Z2 } = other;
        const X1Z2 = modP2(X1 * Z2);
        const X2Z1 = modP2(X2 * Z1);
        const Y1Z2 = modP2(Y1 * Z2);
        const Y2Z1 = modP2(Y2 * Z1);
        return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
      }
      is0() {
        return this.equals(Point2.ZERO);
      }
      negate() {
        return new Point2(modP2(-this.ex), this.ey, this.ez, modP2(-this.et));
      }
      // Fast algo for doubling Extended Point.
      // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
      // Cost: 4M + 4S + 1*a + 6add + 1*2.
      double() {
        const { a } = CURVE2;
        const { ex: X1, ey: Y1, ez: Z1 } = this;
        const A = modP2(X1 * X1);
        const B = modP2(Y1 * Y1);
        const C = modP2(_2n5 * modP2(Z1 * Z1));
        const D = modP2(a * A);
        const x1y1 = X1 + Y1;
        const E = modP2(modP2(x1y1 * x1y1) - A - B);
        const G2 = D + B;
        const F = G2 - C;
        const H = D - B;
        const X3 = modP2(E * F);
        const Y3 = modP2(G2 * H);
        const T3 = modP2(E * H);
        const Z3 = modP2(F * G2);
        return new Point2(X3, Y3, Z3, T3);
      }
      // Fast algo for adding 2 Extended Points.
      // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
      // Cost: 9M + 1*a + 1*d + 7add.
      add(other) {
        isPoint(other);
        const { a, d } = CURVE2;
        const { ex: X1, ey: Y1, ez: Z1, et: T1 } = this;
        const { ex: X2, ey: Y2, ez: Z2, et: T2 } = other;
        if (a === BigInt(-1)) {
          const A2 = modP2((Y1 - X1) * (Y2 + X2));
          const B2 = modP2((Y1 + X1) * (Y2 - X2));
          const F2 = modP2(B2 - A2);
          if (F2 === _0n6)
            return this.double();
          const C2 = modP2(Z1 * _2n5 * T2);
          const D2 = modP2(T1 * _2n5 * Z2);
          const E2 = D2 + C2;
          const G3 = B2 + A2;
          const H2 = D2 - C2;
          const X32 = modP2(E2 * F2);
          const Y32 = modP2(G3 * H2);
          const T32 = modP2(E2 * H2);
          const Z32 = modP2(F2 * G3);
          return new Point2(X32, Y32, Z32, T32);
        }
        const A = modP2(X1 * X2);
        const B = modP2(Y1 * Y2);
        const C = modP2(T1 * d * T2);
        const D = modP2(Z1 * Z2);
        const E = modP2((X1 + Y1) * (X2 + Y2) - A - B);
        const F = D - C;
        const G2 = D + C;
        const H = modP2(B - a * A);
        const X3 = modP2(E * F);
        const Y3 = modP2(G2 * H);
        const T3 = modP2(E * H);
        const Z3 = modP2(F * G2);
        return new Point2(X3, Y3, Z3, T3);
      }
      subtract(other) {
        return this.add(other.negate());
      }
      wNAF(n) {
        return wnaf.wNAFCached(this, pointPrecomputes, n, Point2.normalizeZ);
      }
      // Constant-time multiplication.
      multiply(scalar) {
        const { p, f } = this.wNAF(assertInRange(scalar, CURVE_ORDER));
        return Point2.normalizeZ([p, f])[0];
      }
      // Non-constant-time multiplication. Uses double-and-add algorithm.
      // It's faster, but should only be used when you don't care about
      // an exposed private key e.g. sig verification.
      // Does NOT allow scalars higher than CURVE.n.
      multiplyUnsafe(scalar) {
        let n = assertGE0(scalar);
        if (n === _0n6)
          return I;
        if (this.equals(I) || n === _1n6)
          return this;
        if (this.equals(G))
          return this.wNAF(n).p;
        return wnaf.unsafeLadder(this, n);
      }
      // Checks if point is of small order.
      // If you add something to small order point, you will have "dirty"
      // point with torsion component.
      // Multiplies point by cofactor and checks if the result is 0.
      isSmallOrder() {
        return this.multiplyUnsafe(cofactor).is0();
      }
      // Multiplies point by curve order and checks if the result is 0.
      // Returns `false` is the point is dirty.
      isTorsionFree() {
        return wnaf.unsafeLadder(this, CURVE_ORDER).is0();
      }
      // Converts Extended point to default (x, y) coordinates.
      // Can accept precomputed Z^-1 - for example, from invertBatch.
      toAffine(iz) {
        const { ex: x, ey: y, ez: z } = this;
        const is0 = this.is0();
        if (iz == null)
          iz = is0 ? _8n2 : Fp8.inv(z);
        const ax = modP2(x * iz);
        const ay = modP2(y * iz);
        const zz = modP2(z * iz);
        if (is0)
          return { x: _0n6, y: _1n6 };
        if (zz !== _1n6)
          throw new Error("invZ was invalid");
        return { x: ax, y: ay };
      }
      clearCofactor() {
        const { h: cofactor2 } = CURVE2;
        if (cofactor2 === _1n6)
          return this;
        return this.multiplyUnsafe(cofactor2);
      }
      // Converts hash string or Uint8Array to Point.
      // Uses algo from RFC8032 5.1.3.
      static fromHex(hex, zip215 = false) {
        const { d, a } = CURVE2;
        const len = Fp8.BYTES;
        hex = ensureBytes("pointHex", hex, len);
        const normed = hex.slice();
        const lastByte = hex[len - 1];
        normed[len - 1] = lastByte & ~128;
        const y = bytesToNumberLE(normed);
        if (y === _0n6) {
        } else {
          if (zip215)
            assertInRange(y, MASK);
          else
            assertInRange(y, Fp8.ORDER);
        }
        const y2 = modP2(y * y);
        const u = modP2(y2 - _1n6);
        const v = modP2(d * y2 - a);
        let { isValid, value: x } = uvRatio3(u, v);
        if (!isValid)
          throw new Error("Point.fromHex: invalid y coordinate");
        const isXOdd = (x & _1n6) === _1n6;
        const isLastByteOdd = (lastByte & 128) !== 0;
        if (!zip215 && x === _0n6 && isLastByteOdd)
          throw new Error("Point.fromHex: x=0 and x_0=1");
        if (isLastByteOdd !== isXOdd)
          x = modP2(-x);
        return Point2.fromAffine({ x, y });
      }
      static fromPrivateKey(privKey) {
        return getExtendedPublicKey(privKey).point;
      }
      toRawBytes() {
        const { x, y } = this.toAffine();
        const bytes2 = numberToBytesLE(y, Fp8.BYTES);
        bytes2[bytes2.length - 1] |= x & _1n6 ? 128 : 0;
        return bytes2;
      }
      toHex() {
        return bytesToHex(this.toRawBytes());
      }
    }
    Point2.BASE = new Point2(CURVE2.Gx, CURVE2.Gy, _1n6, modP2(CURVE2.Gx * CURVE2.Gy));
    Point2.ZERO = new Point2(_0n6, _1n6, _1n6, _0n6);
    const { BASE: G, ZERO: I } = Point2;
    const wnaf = wNAF(Point2, nByteLength * 8);
    function modN2(a) {
      return mod(a, CURVE_ORDER);
    }
    function modN_LE(hash2) {
      return modN2(bytesToNumberLE(hash2));
    }
    function getExtendedPublicKey(key) {
      const len = nByteLength;
      key = ensureBytes("private key", key, len);
      const hashed = ensureBytes("hashed private key", cHash(key), 2 * len);
      const head = adjustScalarBytes3(hashed.slice(0, len));
      const prefix = hashed.slice(len, 2 * len);
      const scalar = modN_LE(head);
      const point = G.multiply(scalar);
      const pointBytes = point.toRawBytes();
      return { head, prefix, scalar, point, pointBytes };
    }
    function getPublicKey(privKey) {
      return getExtendedPublicKey(privKey).pointBytes;
    }
    function hashDomainToScalar(context = new Uint8Array(), ...msgs) {
      const msg = concatBytes(...msgs);
      return modN_LE(cHash(domain(msg, ensureBytes("context", context), !!prehash)));
    }
    function sign(msg, privKey, options = {}) {
      msg = ensureBytes("message", msg);
      if (prehash)
        msg = prehash(msg);
      const { prefix, scalar, pointBytes } = getExtendedPublicKey(privKey);
      const r = hashDomainToScalar(options.context, prefix, msg);
      const R = G.multiply(r).toRawBytes();
      const k = hashDomainToScalar(options.context, R, pointBytes, msg);
      const s = modN2(r + k * scalar);
      assertGE0(s);
      const res = concatBytes(R, numberToBytesLE(s, Fp8.BYTES));
      return ensureBytes("result", res, nByteLength * 2);
    }
    const verifyOpts = VERIFY_DEFAULT;
    function verify(sig, msg, publicKey, options = verifyOpts) {
      const { context, zip215 } = options;
      const len = Fp8.BYTES;
      sig = ensureBytes("signature", sig, 2 * len);
      msg = ensureBytes("message", msg);
      if (prehash)
        msg = prehash(msg);
      const s = bytesToNumberLE(sig.slice(len, 2 * len));
      let A, R, SB;
      try {
        A = Point2.fromHex(publicKey, zip215);
        R = Point2.fromHex(sig.slice(0, len), zip215);
        SB = G.multiplyUnsafe(s);
      } catch (error) {
        return false;
      }
      if (!zip215 && A.isSmallOrder())
        return false;
      const k = hashDomainToScalar(context, R.toRawBytes(), A.toRawBytes(), msg);
      const RkA = R.add(A.multiplyUnsafe(k));
      return RkA.subtract(SB).clearCofactor().equals(Point2.ZERO);
    }
    G._setWindowSize(8);
    const utils2 = {
      getExtendedPublicKey,
      // ed25519 private keys are uniform 32b. No need to check for modulo bias, like in secp256k1.
      randomPrivateKey: () => randomBytes2(Fp8.BYTES),
      /**
       * We're doing scalar multiplication (used in getPublicKey etc) with precomputed BASE_POINT
       * values. This slows down first getPublicKey() by milliseconds (see Speed section),
       * but allows to speed-up subsequent getPublicKey() calls up to 20x.
       * @param windowSize 2, 4, 8, 16
       */
      precompute(windowSize = 8, point = Point2.BASE) {
        point._setWindowSize(windowSize);
        point.multiply(BigInt(3));
        return point;
      }
    };
    return {
      CURVE: CURVE2,
      getPublicKey,
      sign,
      verify,
      ExtendedPoint: Point2,
      utils: utils2
    };
  }

  // ../esm/abstract/montgomery.js
  var _0n7 = BigInt(0);
  var _1n7 = BigInt(1);
  function validateOpts3(curve) {
    validateObject(curve, {
      a: "bigint"
    }, {
      montgomeryBits: "isSafeInteger",
      nByteLength: "isSafeInteger",
      adjustScalarBytes: "function",
      domain: "function",
      powPminus2: "function",
      Gu: "bigint"
    });
    return Object.freeze({ ...curve });
  }
  function montgomery(curveDef) {
    const CURVE2 = validateOpts3(curveDef);
    const { P: P3 } = CURVE2;
    const modP2 = (n) => mod(n, P3);
    const montgomeryBits = CURVE2.montgomeryBits;
    const montgomeryBytes = Math.ceil(montgomeryBits / 8);
    const fieldLen = CURVE2.nByteLength;
    const adjustScalarBytes3 = CURVE2.adjustScalarBytes || ((bytes2) => bytes2);
    const powPminus2 = CURVE2.powPminus2 || ((x) => pow(x, P3 - BigInt(2), P3));
    function cswap(swap, x_2, x_3) {
      const dummy = modP2(swap * (x_2 - x_3));
      x_2 = modP2(x_2 - dummy);
      x_3 = modP2(x_3 + dummy);
      return [x_2, x_3];
    }
    function assertFieldElement(n) {
      if (typeof n === "bigint" && _0n7 <= n && n < P3)
        return n;
      throw new Error("Expected valid scalar 0 < scalar < CURVE.P");
    }
    const a24 = (CURVE2.a - BigInt(2)) / BigInt(4);
    function montgomeryLadder(pointU, scalar) {
      const u = assertFieldElement(pointU);
      const k = assertFieldElement(scalar);
      const x_1 = u;
      let x_2 = _1n7;
      let z_2 = _0n7;
      let x_3 = u;
      let z_3 = _1n7;
      let swap = _0n7;
      let sw;
      for (let t = BigInt(montgomeryBits - 1); t >= _0n7; t--) {
        const k_t = k >> t & _1n7;
        swap ^= k_t;
        sw = cswap(swap, x_2, x_3);
        x_2 = sw[0];
        x_3 = sw[1];
        sw = cswap(swap, z_2, z_3);
        z_2 = sw[0];
        z_3 = sw[1];
        swap = k_t;
        const A = x_2 + z_2;
        const AA = modP2(A * A);
        const B = x_2 - z_2;
        const BB = modP2(B * B);
        const E = AA - BB;
        const C = x_3 + z_3;
        const D = x_3 - z_3;
        const DA = modP2(D * A);
        const CB = modP2(C * B);
        const dacb = DA + CB;
        const da_cb = DA - CB;
        x_3 = modP2(dacb * dacb);
        z_3 = modP2(x_1 * modP2(da_cb * da_cb));
        x_2 = modP2(AA * BB);
        z_2 = modP2(E * (AA + modP2(a24 * E)));
      }
      sw = cswap(swap, x_2, x_3);
      x_2 = sw[0];
      x_3 = sw[1];
      sw = cswap(swap, z_2, z_3);
      z_2 = sw[0];
      z_3 = sw[1];
      const z2 = powPminus2(z_2);
      return modP2(x_2 * z2);
    }
    function encodeUCoordinate(u) {
      return numberToBytesLE(modP2(u), montgomeryBytes);
    }
    function decodeUCoordinate(uEnc) {
      const u = ensureBytes("u coordinate", uEnc, montgomeryBytes);
      if (fieldLen === 32)
        u[31] &= 127;
      return bytesToNumberLE(u);
    }
    function decodeScalar(n) {
      const bytes2 = ensureBytes("scalar", n);
      const len = bytes2.length;
      if (len !== montgomeryBytes && len !== fieldLen)
        throw new Error(`Expected ${montgomeryBytes} or ${fieldLen} bytes, got ${len}`);
      return bytesToNumberLE(adjustScalarBytes3(bytes2));
    }
    function scalarMult(scalar, u) {
      const pointU = decodeUCoordinate(u);
      const _scalar = decodeScalar(scalar);
      const pu = montgomeryLadder(pointU, _scalar);
      if (pu === _0n7)
        throw new Error("Invalid private or public key received");
      return encodeUCoordinate(pu);
    }
    const GuBytes = encodeUCoordinate(CURVE2.Gu);
    function scalarMultBase(scalar) {
      return scalarMult(scalar, GuBytes);
    }
    return {
      scalarMult,
      scalarMultBase,
      getSharedSecret: (privateKey, publicKey) => scalarMult(privateKey, publicKey),
      getPublicKey: (privateKey) => scalarMultBase(privateKey),
      utils: { randomPrivateKey: () => CURVE2.randomBytes(CURVE2.nByteLength) },
      GuBytes
    };
  }

  // ../esm/ed25519.js
  var ED25519_P = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
  var ED25519_SQRT_M1 = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
  var _0n8 = BigInt(0);
  var _1n8 = BigInt(1);
  var _2n6 = BigInt(2);
  var _3n3 = BigInt(3);
  var _5n2 = BigInt(5);
  var _8n3 = BigInt(8);
  function ed25519_pow_2_252_3(x) {
    const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
    const P3 = ED25519_P;
    const x2 = x * x % P3;
    const b2 = x2 * x % P3;
    const b4 = pow2(b2, _2n6, P3) * b2 % P3;
    const b5 = pow2(b4, _1n8, P3) * x % P3;
    const b10 = pow2(b5, _5n2, P3) * b5 % P3;
    const b20 = pow2(b10, _10n, P3) * b10 % P3;
    const b40 = pow2(b20, _20n, P3) * b20 % P3;
    const b80 = pow2(b40, _40n, P3) * b40 % P3;
    const b160 = pow2(b80, _80n, P3) * b80 % P3;
    const b240 = pow2(b160, _80n, P3) * b80 % P3;
    const b250 = pow2(b240, _10n, P3) * b10 % P3;
    const pow_p_5_8 = pow2(b250, _2n6, P3) * x % P3;
    return { pow_p_5_8, b2 };
  }
  function adjustScalarBytes(bytes2) {
    bytes2[0] &= 248;
    bytes2[31] &= 127;
    bytes2[31] |= 64;
    return bytes2;
  }
  function uvRatio(u, v) {
    const P3 = ED25519_P;
    const v3 = mod(v * v * v, P3);
    const v7 = mod(v3 * v3 * v, P3);
    const pow3 = ed25519_pow_2_252_3(u * v7).pow_p_5_8;
    let x = mod(u * v3 * pow3, P3);
    const vx2 = mod(v * x * x, P3);
    const root1 = x;
    const root2 = mod(x * ED25519_SQRT_M1, P3);
    const useRoot1 = vx2 === u;
    const useRoot2 = vx2 === mod(-u, P3);
    const noRoot = vx2 === mod(-u * ED25519_SQRT_M1, P3);
    if (useRoot1)
      x = root1;
    if (useRoot2 || noRoot)
      x = root2;
    if (isNegativeLE(x, P3))
      x = mod(-x, P3);
    return { isValid: useRoot1 || useRoot2, value: x };
  }
  var Fp2 = /* @__PURE__ */ (() => Field(ED25519_P, void 0, true))();
  var ed25519Defaults = /* @__PURE__ */ (() => ({
    // Param: a
    a: BigInt(-1),
    // Fp.create(-1) is proper; our way still works and is faster
    // d is equal to -121665/121666 over finite field.
    // Negative number is P - number, and division is invert(number, P)
    d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
    // Finite field 𝔽p over which we'll do calculations; 2n**255n - 19n
    Fp: Fp2,
    // Subgroup order: how many points curve has
    // 2n**252n + 27742317777372353535851937790883648493n;
    n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
    // Cofactor
    h: _8n3,
    // Base point (x, y) aka generator point
    Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
    Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
    hash: sha512,
    randomBytes,
    adjustScalarBytes,
    // dom2
    // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
    // Constant-time, u/√v
    uvRatio
  }))();
  var ed25519 = /* @__PURE__ */ (() => twistedEdwards(ed25519Defaults))();
  var x25519 = /* @__PURE__ */ (() => montgomery({
    P: ED25519_P,
    a: BigInt(486662),
    montgomeryBits: 255,
    // n is 253 bits
    nByteLength: 32,
    Gu: BigInt(9),
    powPminus2: (x) => {
      const P3 = ED25519_P;
      const { pow_p_5_8, b2 } = ed25519_pow_2_252_3(x);
      return mod(pow2(pow_p_5_8, _3n3, P3) * b2, P3);
    },
    adjustScalarBytes,
    randomBytes
  }))();
  function edwardsToMontgomeryPub(edwardsPub) {
    const { y } = ed25519.ExtendedPoint.fromHex(edwardsPub);
    const _1n12 = BigInt(1);
    return Fp2.toBytes(Fp2.create((_1n12 + y) * Fp2.inv(_1n12 - y)));
  }
  function edwardsToMontgomeryPriv(edwardsPriv) {
    const hashed = ed25519Defaults.hash(edwardsPriv.subarray(0, 32));
    return ed25519Defaults.adjustScalarBytes(hashed).subarray(0, 32);
  }

  // ../node_modules/@noble/hashes/esm/sha3.js
  var SHA3_PI = [];
  var SHA3_ROTL = [];
  var _SHA3_IOTA = [];
  var _0n9 = /* @__PURE__ */ BigInt(0);
  var _1n9 = /* @__PURE__ */ BigInt(1);
  var _2n7 = /* @__PURE__ */ BigInt(2);
  var _7n = /* @__PURE__ */ BigInt(7);
  var _256n = /* @__PURE__ */ BigInt(256);
  var _0x71n = /* @__PURE__ */ BigInt(113);
  for (let round = 0, R = _1n9, x = 1, y = 0; round < 24; round++) {
    [x, y] = [y, (2 * x + 3 * y) % 5];
    SHA3_PI.push(2 * (5 * y + x));
    SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
    let t = _0n9;
    for (let j = 0; j < 7; j++) {
      R = (R << _1n9 ^ (R >> _7n) * _0x71n) % _256n;
      if (R & _2n7)
        t ^= _1n9 << (_1n9 << /* @__PURE__ */ BigInt(j)) - _1n9;
    }
    _SHA3_IOTA.push(t);
  }
  var [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ split(_SHA3_IOTA, true);
  var rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
  var rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
  function keccakP(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    for (let round = 24 - rounds; round < 24; round++) {
      for (let x = 0; x < 10; x++)
        B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
      for (let x = 0; x < 10; x += 2) {
        const idx1 = (x + 8) % 10;
        const idx0 = (x + 2) % 10;
        const B0 = B[idx0];
        const B1 = B[idx0 + 1];
        const Th = rotlH(B0, B1, 1) ^ B[idx1];
        const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
        for (let y = 0; y < 50; y += 10) {
          s[x + y] ^= Th;
          s[x + y + 1] ^= Tl;
        }
      }
      let curH = s[2];
      let curL = s[3];
      for (let t = 0; t < 24; t++) {
        const shift = SHA3_ROTL[t];
        const Th = rotlH(curH, curL, shift);
        const Tl = rotlL(curH, curL, shift);
        const PI = SHA3_PI[t];
        curH = s[PI];
        curL = s[PI + 1];
        s[PI] = Th;
        s[PI + 1] = Tl;
      }
      for (let y = 0; y < 50; y += 10) {
        for (let x = 0; x < 10; x++)
          B[x] = s[y + x];
        for (let x = 0; x < 10; x++)
          s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
      }
      s[0] ^= SHA3_IOTA_H[round];
      s[1] ^= SHA3_IOTA_L[round];
    }
    B.fill(0);
  }
  var Keccak = class _Keccak extends Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
      super();
      this.blockLen = blockLen;
      this.suffix = suffix;
      this.outputLen = outputLen;
      this.enableXOF = enableXOF;
      this.rounds = rounds;
      this.pos = 0;
      this.posOut = 0;
      this.finished = false;
      this.destroyed = false;
      number(outputLen);
      if (0 >= this.blockLen || this.blockLen >= 200)
        throw new Error("Sha3 supports only keccak-f1600 function");
      this.state = new Uint8Array(200);
      this.state32 = u32(this.state);
    }
    keccak() {
      if (!isLE)
        byteSwap32(this.state32);
      keccakP(this.state32, this.rounds);
      if (!isLE)
        byteSwap32(this.state32);
      this.posOut = 0;
      this.pos = 0;
    }
    update(data) {
      exists(this);
      const { blockLen, state } = this;
      data = toBytes(data);
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        for (let i = 0; i < take; i++)
          state[this.pos++] ^= data[pos++];
        if (this.pos === blockLen)
          this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = true;
      const { state, suffix, pos, blockLen } = this;
      state[pos] ^= suffix;
      if ((suffix & 128) !== 0 && pos === blockLen - 1)
        this.keccak();
      state[blockLen - 1] ^= 128;
      this.keccak();
    }
    writeInto(out) {
      exists(this, false);
      bytes(out);
      this.finish();
      const bufferOut = this.state;
      const { blockLen } = this;
      for (let pos = 0, len = out.length; pos < len; ) {
        if (this.posOut >= blockLen)
          this.keccak();
        const take = Math.min(blockLen - this.posOut, len - pos);
        out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
        this.posOut += take;
        pos += take;
      }
      return out;
    }
    xofInto(out) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(out);
    }
    xof(bytes2) {
      number(bytes2);
      return this.xofInto(new Uint8Array(bytes2));
    }
    digestInto(out) {
      output(out, this);
      if (this.finished)
        throw new Error("digest() was already called");
      this.writeInto(out);
      this.destroy();
      return out;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = true;
      this.state.fill(0);
    }
    _cloneInto(to) {
      const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
      to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
      to.state32.set(this.state32);
      to.pos = this.pos;
      to.posOut = this.posOut;
      to.finished = this.finished;
      to.rounds = rounds;
      to.suffix = suffix;
      to.outputLen = outputLen;
      to.enableXOF = enableXOF;
      to.destroyed = this.destroyed;
      return to;
    }
  };
  var gen = (suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen));
  var sha3_224 = /* @__PURE__ */ gen(6, 144, 224 / 8);
  var sha3_256 = /* @__PURE__ */ gen(6, 136, 256 / 8);
  var sha3_384 = /* @__PURE__ */ gen(6, 104, 384 / 8);
  var sha3_512 = /* @__PURE__ */ gen(6, 72, 512 / 8);
  var keccak_224 = /* @__PURE__ */ gen(1, 144, 224 / 8);
  var keccak_256 = /* @__PURE__ */ gen(1, 136, 256 / 8);
  var keccak_384 = /* @__PURE__ */ gen(1, 104, 384 / 8);
  var keccak_512 = /* @__PURE__ */ gen(1, 72, 512 / 8);
  var genShake = (suffix, blockLen, outputLen) => wrapXOFConstructorWithOpts((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
  var shake128 = /* @__PURE__ */ genShake(31, 168, 128 / 8);
  var shake256 = /* @__PURE__ */ genShake(31, 136, 256 / 8);

  // ../esm/ed448.js
  var shake256_114 = wrapConstructor(() => shake256.create({ dkLen: 114 }));
  var shake256_64 = wrapConstructor(() => shake256.create({ dkLen: 64 }));
  var ed448P = BigInt("726838724295606890549323807888004534353641360687318060281490199180612328166730772686396383698676545930088884461843637361053498018365439");
  var _1n10 = BigInt(1);
  var _2n8 = BigInt(2);
  var _3n4 = BigInt(3);
  var _4n3 = BigInt(4);
  var _11n = BigInt(11);
  var _22n = BigInt(22);
  var _44n = BigInt(44);
  var _88n = BigInt(88);
  var _223n = BigInt(223);
  function ed448_pow_Pminus3div4(x) {
    const P3 = ed448P;
    const b2 = x * x * x % P3;
    const b3 = b2 * b2 * x % P3;
    const b6 = pow2(b3, _3n4, P3) * b3 % P3;
    const b9 = pow2(b6, _3n4, P3) * b3 % P3;
    const b11 = pow2(b9, _2n8, P3) * b2 % P3;
    const b22 = pow2(b11, _11n, P3) * b11 % P3;
    const b44 = pow2(b22, _22n, P3) * b22 % P3;
    const b88 = pow2(b44, _44n, P3) * b44 % P3;
    const b176 = pow2(b88, _88n, P3) * b88 % P3;
    const b220 = pow2(b176, _44n, P3) * b44 % P3;
    const b222 = pow2(b220, _2n8, P3) * b2 % P3;
    const b223 = pow2(b222, _1n10, P3) * x % P3;
    return pow2(b223, _223n, P3) * b222 % P3;
  }
  function adjustScalarBytes2(bytes2) {
    bytes2[0] &= 252;
    bytes2[55] |= 128;
    bytes2[56] = 0;
    return bytes2;
  }
  function uvRatio2(u, v) {
    const P3 = ed448P;
    const u2v = mod(u * u * v, P3);
    const u3v = mod(u2v * u, P3);
    const u5v3 = mod(u3v * u2v * v, P3);
    const root = ed448_pow_Pminus3div4(u5v3);
    const x = mod(u3v * root, P3);
    const x2 = mod(x * x, P3);
    return { isValid: mod(x2 * v, P3) === u, value: x };
  }
  var Fp3 = Field(ed448P, 456, true);
  var ED448_DEF = {
    // Param: a
    a: BigInt(1),
    // -39081. Negative number is P - number
    d: BigInt("726838724295606890549323807888004534353641360687318060281490199180612328166730772686396383698676545930088884461843637361053498018326358"),
    // Finite field 𝔽p over which we'll do calculations; 2n**448n - 2n**224n - 1n
    Fp: Fp3,
    // Subgroup order: how many points curve has;
    // 2n**446n - 13818066809895115352007386748515426880336692474882178609894547503885n
    n: BigInt("181709681073901722637330951972001133588410340171829515070372549795146003961539585716195755291692375963310293709091662304773755859649779"),
    // RFC 7748 has 56-byte keys, RFC 8032 has 57-byte keys
    nBitLength: 456,
    // Cofactor
    h: BigInt(4),
    // Base point (x, y) aka generator point
    Gx: BigInt("224580040295924300187604334099896036246789641632564134246125461686950415467406032909029192869357953282578032075146446173674602635247710"),
    Gy: BigInt("298819210078481492676017930443930673437544040154080242095928241372331506189835876003536878655418784733982303233503462500531545062832660"),
    // SHAKE256(dom4(phflag,context)||x, 114)
    hash: shake256_114,
    randomBytes,
    adjustScalarBytes: adjustScalarBytes2,
    // dom4
    domain: (data, ctx, phflag) => {
      if (ctx.length > 255)
        throw new Error(`Context is too big: ${ctx.length}`);
      return concatBytes2(utf8ToBytes2("SigEd448"), new Uint8Array([phflag ? 1 : 0, ctx.length]), ctx, data);
    },
    uvRatio: uvRatio2
  };
  var ed448 = /* @__PURE__ */ twistedEdwards(ED448_DEF);
  var ed448ph = /* @__PURE__ */ twistedEdwards({ ...ED448_DEF, prehash: shake256_64 });
  var x448 = /* @__PURE__ */ (() => montgomery({
    a: BigInt(156326),
    // RFC 7748 has 56-byte keys, RFC 8032 has 57-byte keys
    montgomeryBits: 448,
    nByteLength: 56,
    P: ed448P,
    Gu: BigInt(5),
    powPminus2: (x) => {
      const P3 = ed448P;
      const Pminus3div4 = ed448_pow_Pminus3div4(x);
      const Pminus3 = pow2(Pminus3div4, BigInt(2), P3);
      return mod(Pminus3 * x, P3);
    },
    adjustScalarBytes: adjustScalarBytes2,
    randomBytes
  }))();
  function edwardsToMontgomeryPub2(edwardsPub) {
    const { y } = ed448.ExtendedPoint.fromHex(edwardsPub);
    const _1n12 = BigInt(1);
    return Fp3.toBytes(Fp3.create((y - _1n12) * Fp3.inv(y + _1n12)));
  }
  var ELL2_C1 = (Fp3.ORDER - BigInt(3)) / BigInt(4);
  var ELL2_J = BigInt(156326);
  var ONE_MINUS_D = BigInt("39082");
  var ONE_MINUS_TWO_D = BigInt("78163");
  var SQRT_MINUS_D = BigInt("98944233647732219769177004876929019128417576295529901074099889598043702116001257856802131563896515373927712232092845883226922417596214");
  var INVSQRT_MINUS_D = BigInt("315019913931389607337177038330951043522456072897266928557328499619017160722351061360252776265186336876723201881398623946864393857820716");
  var MAX_448B = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

  // ../esm/p256.js
  var Fp4 = Field(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"));
  var CURVE_A = Fp4.create(BigInt("-3"));
  var CURVE_B = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b");
  var p256 = createCurve({
    a: CURVE_A,
    // Equation params: a, b
    b: CURVE_B,
    Fp: Fp4,
    // Field: 2n**224n * (2n**32n-1n) + 2n**192n + 2n**96n-1n
    // Curve order, total count of valid points in the field
    n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
    // Base (generator) point (x, y)
    Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
    Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"),
    h: BigInt(1),
    lowS: false
  }, sha256);

  // ../esm/p384.js
  var P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff");
  var Fp5 = Field(P);
  var CURVE_A2 = Fp5.create(BigInt("-3"));
  var CURVE_B2 = BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef");
  var p384 = createCurve({
    a: CURVE_A2,
    // Equation params: a, b
    b: CURVE_B2,
    Fp: Fp5,
    // Field: 2n**384n - 2n**128n - 2n**96n + 2n**32n - 1n
    // Curve order, total count of valid points in the field.
    n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"),
    // Base (generator) point (x, y)
    Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"),
    Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f"),
    h: BigInt(1),
    lowS: false
  }, sha384);

  // ../esm/p521.js
  var P2 = BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  var Fp6 = Field(P2);
  var CURVE = {
    a: Fp6.create(BigInt("-3")),
    b: BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"),
    Fp: Fp6,
    n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"),
    Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"),
    Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650"),
    h: BigInt(1)
  };
  var p521 = createCurve({
    a: CURVE.a,
    // Equation params: a, b
    b: CURVE.b,
    Fp: Fp6,
    // Field: 2n**521n - 1n
    // Curve order, total count of valid points in the field
    n: CURVE.n,
    Gx: CURVE.Gx,
    // Base point (x, y) aka generator point
    Gy: CURVE.Gy,
    h: CURVE.h,
    lowS: false,
    allowedPrivateKeyLengths: [130, 131, 132]
    // P521 keys are variable-length. Normalize to 132b
  }, sha512);

  // ../esm/abstract/bls.js
  var _2n9 = BigInt(2);
  var _3n5 = BigInt(3);
  function bls(CURVE2) {
    const { Fp: Fp8, Fr: Fr2, Fp2: Fp23, Fp6: Fp63, Fp12: Fp122 } = CURVE2.fields;
    const BLS_X_LEN2 = bitLen(CURVE2.params.x);
    function calcPairingPrecomputes(p) {
      const { x, y } = p;
      const Qx = x, Qy = y, Qz = Fp23.ONE;
      let Rx = Qx, Ry = Qy, Rz = Qz;
      let ell_coeff = [];
      for (let i = BLS_X_LEN2 - 2; i >= 0; i--) {
        let t0 = Fp23.sqr(Ry);
        let t1 = Fp23.sqr(Rz);
        let t2 = Fp23.multiplyByB(Fp23.mul(t1, _3n5));
        let t3 = Fp23.mul(t2, _3n5);
        let t4 = Fp23.sub(Fp23.sub(Fp23.sqr(Fp23.add(Ry, Rz)), t1), t0);
        ell_coeff.push([
          Fp23.sub(t2, t0),
          // T2 - T0
          Fp23.mul(Fp23.sqr(Rx), _3n5),
          // 3 * Rx²
          Fp23.neg(t4)
          // -T4
        ]);
        Rx = Fp23.div(Fp23.mul(Fp23.mul(Fp23.sub(t0, t3), Rx), Ry), _2n9);
        Ry = Fp23.sub(Fp23.sqr(Fp23.div(Fp23.add(t0, t3), _2n9)), Fp23.mul(Fp23.sqr(t2), _3n5));
        Rz = Fp23.mul(t0, t4);
        if (bitGet(CURVE2.params.x, i)) {
          let t02 = Fp23.sub(Ry, Fp23.mul(Qy, Rz));
          let t12 = Fp23.sub(Rx, Fp23.mul(Qx, Rz));
          ell_coeff.push([
            Fp23.sub(Fp23.mul(t02, Qx), Fp23.mul(t12, Qy)),
            // T0 * Qx - T1 * Qy
            Fp23.neg(t02),
            // -T0
            t12
            // T1
          ]);
          let t22 = Fp23.sqr(t12);
          let t32 = Fp23.mul(t22, t12);
          let t42 = Fp23.mul(t22, Rx);
          let t5 = Fp23.add(Fp23.sub(t32, Fp23.mul(t42, _2n9)), Fp23.mul(Fp23.sqr(t02), Rz));
          Rx = Fp23.mul(t12, t5);
          Ry = Fp23.sub(Fp23.mul(Fp23.sub(t42, t5), t02), Fp23.mul(t32, Ry));
          Rz = Fp23.mul(Rz, t32);
        }
      }
      return ell_coeff;
    }
    function millerLoop(ell, g1) {
      const { x } = CURVE2.params;
      const Px = g1[0];
      const Py = g1[1];
      let f12 = Fp122.ONE;
      for (let j = 0, i = BLS_X_LEN2 - 2; i >= 0; i--, j++) {
        const E = ell[j];
        f12 = Fp122.multiplyBy014(f12, E[0], Fp23.mul(E[1], Px), Fp23.mul(E[2], Py));
        if (bitGet(x, i)) {
          j += 1;
          const F = ell[j];
          f12 = Fp122.multiplyBy014(f12, F[0], Fp23.mul(F[1], Px), Fp23.mul(F[2], Py));
        }
        if (i !== 0)
          f12 = Fp122.sqr(f12);
      }
      return Fp122.conjugate(f12);
    }
    const utils2 = {
      randomPrivateKey: () => {
        const length = getMinHashLength(Fr2.ORDER);
        return mapHashToField(CURVE2.randomBytes(length), Fr2.ORDER);
      },
      calcPairingPrecomputes
    };
    const G1_ = weierstrassPoints({ n: Fr2.ORDER, ...CURVE2.G1 });
    const G1 = Object.assign(G1_, createHasher(G1_.ProjectivePoint, CURVE2.G1.mapToCurve, {
      ...CURVE2.htfDefaults,
      ...CURVE2.G1.htfDefaults
    }));
    function pairingPrecomputes(point) {
      const p = point;
      if (p._PPRECOMPUTES)
        return p._PPRECOMPUTES;
      p._PPRECOMPUTES = calcPairingPrecomputes(point.toAffine());
      return p._PPRECOMPUTES;
    }
    const G2_ = weierstrassPoints({ n: Fr2.ORDER, ...CURVE2.G2 });
    const G2 = Object.assign(G2_, createHasher(G2_.ProjectivePoint, CURVE2.G2.mapToCurve, {
      ...CURVE2.htfDefaults,
      ...CURVE2.G2.htfDefaults
    }));
    const { ShortSignature } = CURVE2.G1;
    const { Signature } = CURVE2.G2;
    function pairing(Q, P3, withFinalExponent = true) {
      if (Q.equals(G1.ProjectivePoint.ZERO) || P3.equals(G2.ProjectivePoint.ZERO))
        throw new Error("pairing is not available for ZERO point");
      Q.assertValidity();
      P3.assertValidity();
      const Qa = Q.toAffine();
      const looped = millerLoop(pairingPrecomputes(P3), [Qa.x, Qa.y]);
      return withFinalExponent ? Fp122.finalExponentiate(looped) : looped;
    }
    function normP1(point) {
      return point instanceof G1.ProjectivePoint ? point : G1.ProjectivePoint.fromHex(point);
    }
    function normP1Hash(point, htfOpts) {
      return point instanceof G1.ProjectivePoint ? point : G1.hashToCurve(ensureBytes("point", point), htfOpts);
    }
    function normP2(point) {
      return point instanceof G2.ProjectivePoint ? point : Signature.fromHex(point);
    }
    function normP2Hash(point, htfOpts) {
      return point instanceof G2.ProjectivePoint ? point : G2.hashToCurve(ensureBytes("point", point), htfOpts);
    }
    function getPublicKey(privateKey) {
      return G1.ProjectivePoint.fromPrivateKey(privateKey).toRawBytes(true);
    }
    function getPublicKeyForShortSignatures(privateKey) {
      return G2.ProjectivePoint.fromPrivateKey(privateKey).toRawBytes(true);
    }
    function sign(message, privateKey, htfOpts) {
      const msgPoint = normP2Hash(message, htfOpts);
      msgPoint.assertValidity();
      const sigPoint = msgPoint.multiply(G1.normPrivateKeyToScalar(privateKey));
      if (message instanceof G2.ProjectivePoint)
        return sigPoint;
      return Signature.toRawBytes(sigPoint);
    }
    function signShortSignature(message, privateKey, htfOpts) {
      const msgPoint = normP1Hash(message, htfOpts);
      msgPoint.assertValidity();
      const sigPoint = msgPoint.multiply(G1.normPrivateKeyToScalar(privateKey));
      if (message instanceof G1.ProjectivePoint)
        return sigPoint;
      return ShortSignature.toRawBytes(sigPoint);
    }
    function verify(signature, message, publicKey, htfOpts) {
      const P3 = normP1(publicKey);
      const Hm = normP2Hash(message, htfOpts);
      const G = G1.ProjectivePoint.BASE;
      const S = normP2(signature);
      const ePHm = pairing(P3.negate(), Hm, false);
      const eGS = pairing(G, S, false);
      const exp = Fp122.finalExponentiate(Fp122.mul(eGS, ePHm));
      return Fp122.eql(exp, Fp122.ONE);
    }
    function verifyShortSignature(signature, message, publicKey, htfOpts) {
      const P3 = normP2(publicKey);
      const Hm = normP1Hash(message, htfOpts);
      const G = G2.ProjectivePoint.BASE;
      const S = normP1(signature);
      const eHmP = pairing(Hm, P3, false);
      const eSG = pairing(S, G.negate(), false);
      const exp = Fp122.finalExponentiate(Fp122.mul(eSG, eHmP));
      return Fp122.eql(exp, Fp122.ONE);
    }
    function aggregatePublicKeys(publicKeys) {
      if (!publicKeys.length)
        throw new Error("Expected non-empty array");
      const agg = publicKeys.map(normP1).reduce((sum, p) => sum.add(p), G1.ProjectivePoint.ZERO);
      const aggAffine = agg;
      if (publicKeys[0] instanceof G1.ProjectivePoint) {
        aggAffine.assertValidity();
        return aggAffine;
      }
      return aggAffine.toRawBytes(true);
    }
    function aggregateSignatures(signatures) {
      if (!signatures.length)
        throw new Error("Expected non-empty array");
      const agg = signatures.map(normP2).reduce((sum, s) => sum.add(s), G2.ProjectivePoint.ZERO);
      const aggAffine = agg;
      if (signatures[0] instanceof G2.ProjectivePoint) {
        aggAffine.assertValidity();
        return aggAffine;
      }
      return Signature.toRawBytes(aggAffine);
    }
    function aggregateShortSignatures(signatures) {
      if (!signatures.length)
        throw new Error("Expected non-empty array");
      const agg = signatures.map(normP1).reduce((sum, s) => sum.add(s), G1.ProjectivePoint.ZERO);
      const aggAffine = agg;
      if (signatures[0] instanceof G1.ProjectivePoint) {
        aggAffine.assertValidity();
        return aggAffine;
      }
      return ShortSignature.toRawBytes(aggAffine);
    }
    function verifyBatch(signature, messages, publicKeys, htfOpts) {
      if (!messages.length)
        throw new Error("Expected non-empty messages array");
      if (publicKeys.length !== messages.length)
        throw new Error("Pubkey count should equal msg count");
      const sig = normP2(signature);
      const nMessages = messages.map((i) => normP2Hash(i, htfOpts));
      const nPublicKeys = publicKeys.map(normP1);
      try {
        const paired = [];
        for (const message of new Set(nMessages)) {
          const groupPublicKey = nMessages.reduce((groupPublicKey2, subMessage, i) => subMessage === message ? groupPublicKey2.add(nPublicKeys[i]) : groupPublicKey2, G1.ProjectivePoint.ZERO);
          paired.push(pairing(groupPublicKey, message, false));
        }
        paired.push(pairing(G1.ProjectivePoint.BASE.negate(), sig, false));
        const product = paired.reduce((a, b) => Fp122.mul(a, b), Fp122.ONE);
        const exp = Fp122.finalExponentiate(product);
        return Fp122.eql(exp, Fp122.ONE);
      } catch {
        return false;
      }
    }
    G1.ProjectivePoint.BASE._setWindowSize(4);
    return {
      getPublicKey,
      getPublicKeyForShortSignatures,
      sign,
      signShortSignature,
      verify,
      verifyBatch,
      verifyShortSignature,
      aggregatePublicKeys,
      aggregateSignatures,
      aggregateShortSignatures,
      millerLoop,
      pairing,
      G1,
      G2,
      Signature,
      ShortSignature,
      fields: {
        Fr: Fr2,
        Fp: Fp8,
        Fp2: Fp23,
        Fp6: Fp63,
        Fp12: Fp122
      },
      params: {
        x: CURVE2.params.x,
        r: CURVE2.params.r,
        G1b: CURVE2.G1.b,
        G2b: CURVE2.G2.b
      },
      utils: utils2
    };
  }

  // ../esm/bls12-381.js
  var _0n10 = BigInt(0);
  var _1n11 = BigInt(1);
  var _2n10 = BigInt(2);
  var _3n6 = BigInt(3);
  var _4n4 = BigInt(4);
  var _8n4 = BigInt(8);
  var _16n2 = BigInt(16);
  var Fp_raw = BigInt("0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab");
  var Fp7 = Field(Fp_raw);
  var Fr = Field(BigInt("0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001"));
  var Fp2Add = ({ c0, c1 }, { c0: r0, c1: r1 }) => ({
    c0: Fp7.add(c0, r0),
    c1: Fp7.add(c1, r1)
  });
  var Fp2Subtract = ({ c0, c1 }, { c0: r0, c1: r1 }) => ({
    c0: Fp7.sub(c0, r0),
    c1: Fp7.sub(c1, r1)
  });
  var Fp2Multiply = ({ c0, c1 }, rhs) => {
    if (typeof rhs === "bigint")
      return { c0: Fp7.mul(c0, rhs), c1: Fp7.mul(c1, rhs) };
    const { c0: r0, c1: r1 } = rhs;
    let t1 = Fp7.mul(c0, r0);
    let t2 = Fp7.mul(c1, r1);
    const o0 = Fp7.sub(t1, t2);
    const o1 = Fp7.sub(Fp7.mul(Fp7.add(c0, c1), Fp7.add(r0, r1)), Fp7.add(t1, t2));
    return { c0: o0, c1: o1 };
  };
  var Fp2Square = ({ c0, c1 }) => {
    const a = Fp7.add(c0, c1);
    const b = Fp7.sub(c0, c1);
    const c = Fp7.add(c0, c0);
    return { c0: Fp7.mul(a, b), c1: Fp7.mul(c, c1) };
  };
  var FP2_ORDER = Fp_raw * Fp_raw;
  var Fp22 = {
    ORDER: FP2_ORDER,
    BITS: bitLen(FP2_ORDER),
    BYTES: Math.ceil(bitLen(FP2_ORDER) / 8),
    MASK: bitMask(bitLen(FP2_ORDER)),
    ZERO: { c0: Fp7.ZERO, c1: Fp7.ZERO },
    ONE: { c0: Fp7.ONE, c1: Fp7.ZERO },
    create: (num) => num,
    isValid: ({ c0, c1 }) => typeof c0 === "bigint" && typeof c1 === "bigint",
    is0: ({ c0, c1 }) => Fp7.is0(c0) && Fp7.is0(c1),
    eql: ({ c0, c1 }, { c0: r0, c1: r1 }) => Fp7.eql(c0, r0) && Fp7.eql(c1, r1),
    neg: ({ c0, c1 }) => ({ c0: Fp7.neg(c0), c1: Fp7.neg(c1) }),
    pow: (num, power) => FpPow(Fp22, num, power),
    invertBatch: (nums) => FpInvertBatch(Fp22, nums),
    // Normalized
    add: Fp2Add,
    sub: Fp2Subtract,
    mul: Fp2Multiply,
    sqr: Fp2Square,
    // NonNormalized stuff
    addN: Fp2Add,
    subN: Fp2Subtract,
    mulN: Fp2Multiply,
    sqrN: Fp2Square,
    // Why inversion for bigint inside Fp instead of Fp2? it is even used in that context?
    div: (lhs, rhs) => Fp22.mul(lhs, typeof rhs === "bigint" ? Fp7.inv(Fp7.create(rhs)) : Fp22.inv(rhs)),
    inv: ({ c0: a, c1: b }) => {
      const factor = Fp7.inv(Fp7.create(a * a + b * b));
      return { c0: Fp7.mul(factor, Fp7.create(a)), c1: Fp7.mul(factor, Fp7.create(-b)) };
    },
    sqrt: (num) => {
      if (Fp22.eql(num, Fp22.ZERO))
        return Fp22.ZERO;
      const candidateSqrt = Fp22.pow(num, (Fp22.ORDER + _8n4) / _16n2);
      const check = Fp22.div(Fp22.sqr(candidateSqrt), num);
      const R = FP2_ROOTS_OF_UNITY;
      const divisor = [R[0], R[2], R[4], R[6]].find((r) => Fp22.eql(r, check));
      if (!divisor)
        throw new Error("No root");
      const index = R.indexOf(divisor);
      const root = R[index / 2];
      if (!root)
        throw new Error("Invalid root");
      const x1 = Fp22.div(candidateSqrt, root);
      const x2 = Fp22.neg(x1);
      const { re: re1, im: im1 } = Fp22.reim(x1);
      const { re: re2, im: im2 } = Fp22.reim(x2);
      if (im1 > im2 || im1 === im2 && re1 > re2)
        return x1;
      return x2;
    },
    // Same as sgn0_m_eq_2 in RFC 9380
    isOdd: (x) => {
      const { re: x0, im: x1 } = Fp22.reim(x);
      const sign_0 = x0 % _2n10;
      const zero_0 = x0 === _0n10;
      const sign_1 = x1 % _2n10;
      return BigInt(sign_0 || zero_0 && sign_1) == _1n11;
    },
    // Bytes util
    fromBytes(b) {
      if (b.length !== Fp22.BYTES)
        throw new Error(`fromBytes wrong length=${b.length}`);
      return { c0: Fp7.fromBytes(b.subarray(0, Fp7.BYTES)), c1: Fp7.fromBytes(b.subarray(Fp7.BYTES)) };
    },
    toBytes: ({ c0, c1 }) => concatBytes(Fp7.toBytes(c0), Fp7.toBytes(c1)),
    cmov: ({ c0, c1 }, { c0: r0, c1: r1 }, c) => ({
      c0: Fp7.cmov(c0, r0, c),
      c1: Fp7.cmov(c1, r1, c)
    }),
    // Specific utils
    // toString() {
    //   return `Fp2(${this.c0} + ${this.c1}×i)`;
    // }
    reim: ({ c0, c1 }) => ({ re: c0, im: c1 }),
    // multiply by u + 1
    mulByNonresidue: ({ c0, c1 }) => ({ c0: Fp7.sub(c0, c1), c1: Fp7.add(c0, c1) }),
    multiplyByB: ({ c0, c1 }) => {
      let t0 = Fp7.mul(c0, _4n4);
      let t1 = Fp7.mul(c1, _4n4);
      return { c0: Fp7.sub(t0, t1), c1: Fp7.add(t0, t1) };
    },
    fromBigTuple: (tuple) => {
      if (tuple.length !== 2)
        throw new Error("Invalid tuple");
      const fps = tuple.map((n) => Fp7.create(n));
      return { c0: fps[0], c1: fps[1] };
    },
    frobeniusMap: ({ c0, c1 }, power) => ({
      c0,
      c1: Fp7.mul(c1, FP2_FROBENIUS_COEFFICIENTS[power % 2])
    })
  };
  var FP2_FROBENIUS_COEFFICIENTS = [
    BigInt("0x1"),
    BigInt("0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaaa")
  ].map((item) => Fp7.create(item));
  var rv1 = BigInt("0x6af0e0437ff400b6831e36d6bd17ffe48395dabc2d3435e77f76e17009241c5ee67992f72ec05f4c81084fbede3cc09");
  var FP2_ROOTS_OF_UNITY = [
    [_1n11, _0n10],
    [rv1, -rv1],
    [_0n10, _1n11],
    [rv1, rv1],
    [-_1n11, _0n10],
    [-rv1, rv1],
    [_0n10, -_1n11],
    [-rv1, -rv1]
  ].map((pair) => Fp22.fromBigTuple(pair));
  var Fp6Add = ({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) => ({
    c0: Fp22.add(c0, r0),
    c1: Fp22.add(c1, r1),
    c2: Fp22.add(c2, r2)
  });
  var Fp6Subtract = ({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) => ({
    c0: Fp22.sub(c0, r0),
    c1: Fp22.sub(c1, r1),
    c2: Fp22.sub(c2, r2)
  });
  var Fp6Multiply = ({ c0, c1, c2 }, rhs) => {
    if (typeof rhs === "bigint") {
      return {
        c0: Fp22.mul(c0, rhs),
        c1: Fp22.mul(c1, rhs),
        c2: Fp22.mul(c2, rhs)
      };
    }
    const { c0: r0, c1: r1, c2: r2 } = rhs;
    const t0 = Fp22.mul(c0, r0);
    const t1 = Fp22.mul(c1, r1);
    const t2 = Fp22.mul(c2, r2);
    return {
      // t0 + (c1 + c2) * (r1 * r2) - (T1 + T2) * (u + 1)
      c0: Fp22.add(t0, Fp22.mulByNonresidue(Fp22.sub(Fp22.mul(Fp22.add(c1, c2), Fp22.add(r1, r2)), Fp22.add(t1, t2)))),
      // (c0 + c1) * (r0 + r1) - (T0 + T1) + T2 * (u + 1)
      c1: Fp22.add(Fp22.sub(Fp22.mul(Fp22.add(c0, c1), Fp22.add(r0, r1)), Fp22.add(t0, t1)), Fp22.mulByNonresidue(t2)),
      // T1 + (c0 + c2) * (r0 + r2) - T0 + T2
      c2: Fp22.sub(Fp22.add(t1, Fp22.mul(Fp22.add(c0, c2), Fp22.add(r0, r2))), Fp22.add(t0, t2))
    };
  };
  var Fp6Square = ({ c0, c1, c2 }) => {
    let t0 = Fp22.sqr(c0);
    let t1 = Fp22.mul(Fp22.mul(c0, c1), _2n10);
    let t3 = Fp22.mul(Fp22.mul(c1, c2), _2n10);
    let t4 = Fp22.sqr(c2);
    return {
      c0: Fp22.add(Fp22.mulByNonresidue(t3), t0),
      // T3 * (u + 1) + T0
      c1: Fp22.add(Fp22.mulByNonresidue(t4), t1),
      // T4 * (u + 1) + T1
      // T1 + (c0 - c1 + c2)² + T3 - T0 - T4
      c2: Fp22.sub(Fp22.sub(Fp22.add(Fp22.add(t1, Fp22.sqr(Fp22.add(Fp22.sub(c0, c1), c2))), t3), t0), t4)
    };
  };
  var Fp62 = {
    ORDER: Fp22.ORDER,
    // TODO: unused, but need to verify
    BITS: 3 * Fp22.BITS,
    BYTES: 3 * Fp22.BYTES,
    MASK: bitMask(3 * Fp22.BITS),
    ZERO: { c0: Fp22.ZERO, c1: Fp22.ZERO, c2: Fp22.ZERO },
    ONE: { c0: Fp22.ONE, c1: Fp22.ZERO, c2: Fp22.ZERO },
    create: (num) => num,
    isValid: ({ c0, c1, c2 }) => Fp22.isValid(c0) && Fp22.isValid(c1) && Fp22.isValid(c2),
    is0: ({ c0, c1, c2 }) => Fp22.is0(c0) && Fp22.is0(c1) && Fp22.is0(c2),
    neg: ({ c0, c1, c2 }) => ({ c0: Fp22.neg(c0), c1: Fp22.neg(c1), c2: Fp22.neg(c2) }),
    eql: ({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) => Fp22.eql(c0, r0) && Fp22.eql(c1, r1) && Fp22.eql(c2, r2),
    sqrt: () => {
      throw new Error("Not implemented");
    },
    // Do we need division by bigint at all? Should be done via order:
    div: (lhs, rhs) => Fp62.mul(lhs, typeof rhs === "bigint" ? Fp7.inv(Fp7.create(rhs)) : Fp62.inv(rhs)),
    pow: (num, power) => FpPow(Fp62, num, power),
    invertBatch: (nums) => FpInvertBatch(Fp62, nums),
    // Normalized
    add: Fp6Add,
    sub: Fp6Subtract,
    mul: Fp6Multiply,
    sqr: Fp6Square,
    // NonNormalized stuff
    addN: Fp6Add,
    subN: Fp6Subtract,
    mulN: Fp6Multiply,
    sqrN: Fp6Square,
    inv: ({ c0, c1, c2 }) => {
      let t0 = Fp22.sub(Fp22.sqr(c0), Fp22.mulByNonresidue(Fp22.mul(c2, c1)));
      let t1 = Fp22.sub(Fp22.mulByNonresidue(Fp22.sqr(c2)), Fp22.mul(c0, c1));
      let t2 = Fp22.sub(Fp22.sqr(c1), Fp22.mul(c0, c2));
      let t4 = Fp22.inv(Fp22.add(Fp22.mulByNonresidue(Fp22.add(Fp22.mul(c2, t1), Fp22.mul(c1, t2))), Fp22.mul(c0, t0)));
      return { c0: Fp22.mul(t4, t0), c1: Fp22.mul(t4, t1), c2: Fp22.mul(t4, t2) };
    },
    // Bytes utils
    fromBytes: (b) => {
      if (b.length !== Fp62.BYTES)
        throw new Error(`fromBytes wrong length=${b.length}`);
      return {
        c0: Fp22.fromBytes(b.subarray(0, Fp22.BYTES)),
        c1: Fp22.fromBytes(b.subarray(Fp22.BYTES, 2 * Fp22.BYTES)),
        c2: Fp22.fromBytes(b.subarray(2 * Fp22.BYTES))
      };
    },
    toBytes: ({ c0, c1, c2 }) => concatBytes(Fp22.toBytes(c0), Fp22.toBytes(c1), Fp22.toBytes(c2)),
    cmov: ({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }, c) => ({
      c0: Fp22.cmov(c0, r0, c),
      c1: Fp22.cmov(c1, r1, c),
      c2: Fp22.cmov(c2, r2, c)
    }),
    // Utils
    //   fromTriple(triple: [Fp2, Fp2, Fp2]) {
    //     return new Fp6(...triple);
    //   }
    //   toString() {
    //     return `Fp6(${this.c0} + ${this.c1} * v, ${this.c2} * v^2)`;
    //   }
    fromBigSix: (t) => {
      if (!Array.isArray(t) || t.length !== 6)
        throw new Error("Invalid Fp6 usage");
      return {
        c0: Fp22.fromBigTuple(t.slice(0, 2)),
        c1: Fp22.fromBigTuple(t.slice(2, 4)),
        c2: Fp22.fromBigTuple(t.slice(4, 6))
      };
    },
    frobeniusMap: ({ c0, c1, c2 }, power) => ({
      c0: Fp22.frobeniusMap(c0, power),
      c1: Fp22.mul(Fp22.frobeniusMap(c1, power), FP6_FROBENIUS_COEFFICIENTS_1[power % 6]),
      c2: Fp22.mul(Fp22.frobeniusMap(c2, power), FP6_FROBENIUS_COEFFICIENTS_2[power % 6])
    }),
    mulByNonresidue: ({ c0, c1, c2 }) => ({ c0: Fp22.mulByNonresidue(c2), c1: c0, c2: c1 }),
    // Sparse multiplication
    multiplyBy1: ({ c0, c1, c2 }, b1) => ({
      c0: Fp22.mulByNonresidue(Fp22.mul(c2, b1)),
      c1: Fp22.mul(c0, b1),
      c2: Fp22.mul(c1, b1)
    }),
    // Sparse multiplication
    multiplyBy01({ c0, c1, c2 }, b0, b1) {
      let t0 = Fp22.mul(c0, b0);
      let t1 = Fp22.mul(c1, b1);
      return {
        // ((c1 + c2) * b1 - T1) * (u + 1) + T0
        c0: Fp22.add(Fp22.mulByNonresidue(Fp22.sub(Fp22.mul(Fp22.add(c1, c2), b1), t1)), t0),
        // (b0 + b1) * (c0 + c1) - T0 - T1
        c1: Fp22.sub(Fp22.sub(Fp22.mul(Fp22.add(b0, b1), Fp22.add(c0, c1)), t0), t1),
        // (c0 + c2) * b0 - T0 + T1
        c2: Fp22.add(Fp22.sub(Fp22.mul(Fp22.add(c0, c2), b0), t0), t1)
      };
    },
    multiplyByFp2: ({ c0, c1, c2 }, rhs) => ({
      c0: Fp22.mul(c0, rhs),
      c1: Fp22.mul(c1, rhs),
      c2: Fp22.mul(c2, rhs)
    })
  };
  var FP6_FROBENIUS_COEFFICIENTS_1 = [
    [BigInt("0x1"), BigInt("0x0")],
    [
      BigInt("0x0"),
      BigInt("0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaac")
    ],
    [
      BigInt("0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffe"),
      BigInt("0x0")
    ],
    [BigInt("0x0"), BigInt("0x1")],
    [
      BigInt("0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaac"),
      BigInt("0x0")
    ],
    [
      BigInt("0x0"),
      BigInt("0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffe")
    ]
  ].map((pair) => Fp22.fromBigTuple(pair));
  var FP6_FROBENIUS_COEFFICIENTS_2 = [
    [BigInt("0x1"), BigInt("0x0")],
    [
      BigInt("0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaad"),
      BigInt("0x0")
    ],
    [
      BigInt("0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaac"),
      BigInt("0x0")
    ],
    [
      BigInt("0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaaa"),
      BigInt("0x0")
    ],
    [
      BigInt("0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffe"),
      BigInt("0x0")
    ],
    [
      BigInt("0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffeffff"),
      BigInt("0x0")
    ]
  ].map((pair) => Fp22.fromBigTuple(pair));
  var BLS_X = BigInt("0xd201000000010000");
  var BLS_X_LEN = bitLen(BLS_X);
  var Fp12Add = ({ c0, c1 }, { c0: r0, c1: r1 }) => ({
    c0: Fp62.add(c0, r0),
    c1: Fp62.add(c1, r1)
  });
  var Fp12Subtract = ({ c0, c1 }, { c0: r0, c1: r1 }) => ({
    c0: Fp62.sub(c0, r0),
    c1: Fp62.sub(c1, r1)
  });
  var Fp12Multiply = ({ c0, c1 }, rhs) => {
    if (typeof rhs === "bigint")
      return { c0: Fp62.mul(c0, rhs), c1: Fp62.mul(c1, rhs) };
    let { c0: r0, c1: r1 } = rhs;
    let t1 = Fp62.mul(c0, r0);
    let t2 = Fp62.mul(c1, r1);
    return {
      c0: Fp62.add(t1, Fp62.mulByNonresidue(t2)),
      // T1 + T2 * v
      // (c0 + c1) * (r0 + r1) - (T1 + T2)
      c1: Fp62.sub(Fp62.mul(Fp62.add(c0, c1), Fp62.add(r0, r1)), Fp62.add(t1, t2))
    };
  };
  var Fp12Square = ({ c0, c1 }) => {
    let ab = Fp62.mul(c0, c1);
    return {
      // (c1 * v + c0) * (c0 + c1) - AB - AB * v
      c0: Fp62.sub(Fp62.sub(Fp62.mul(Fp62.add(Fp62.mulByNonresidue(c1), c0), Fp62.add(c0, c1)), ab), Fp62.mulByNonresidue(ab)),
      c1: Fp62.add(ab, ab)
    };
  };
  function Fp4Square(a, b) {
    const a2 = Fp22.sqr(a);
    const b2 = Fp22.sqr(b);
    return {
      first: Fp22.add(Fp22.mulByNonresidue(b2), a2),
      // b² * Nonresidue + a²
      second: Fp22.sub(Fp22.sub(Fp22.sqr(Fp22.add(a, b)), a2), b2)
      // (a + b)² - a² - b²
    };
  }
  var Fp12 = {
    ORDER: Fp22.ORDER,
    // TODO: unused, but need to verify
    BITS: 2 * Fp22.BITS,
    BYTES: 2 * Fp22.BYTES,
    MASK: bitMask(2 * Fp22.BITS),
    ZERO: { c0: Fp62.ZERO, c1: Fp62.ZERO },
    ONE: { c0: Fp62.ONE, c1: Fp62.ZERO },
    create: (num) => num,
    isValid: ({ c0, c1 }) => Fp62.isValid(c0) && Fp62.isValid(c1),
    is0: ({ c0, c1 }) => Fp62.is0(c0) && Fp62.is0(c1),
    neg: ({ c0, c1 }) => ({ c0: Fp62.neg(c0), c1: Fp62.neg(c1) }),
    eql: ({ c0, c1 }, { c0: r0, c1: r1 }) => Fp62.eql(c0, r0) && Fp62.eql(c1, r1),
    sqrt: () => {
      throw new Error("Not implemented");
    },
    inv: ({ c0, c1 }) => {
      let t = Fp62.inv(Fp62.sub(Fp62.sqr(c0), Fp62.mulByNonresidue(Fp62.sqr(c1))));
      return { c0: Fp62.mul(c0, t), c1: Fp62.neg(Fp62.mul(c1, t)) };
    },
    div: (lhs, rhs) => Fp12.mul(lhs, typeof rhs === "bigint" ? Fp7.inv(Fp7.create(rhs)) : Fp12.inv(rhs)),
    pow: (num, power) => FpPow(Fp12, num, power),
    invertBatch: (nums) => FpInvertBatch(Fp12, nums),
    // Normalized
    add: Fp12Add,
    sub: Fp12Subtract,
    mul: Fp12Multiply,
    sqr: Fp12Square,
    // NonNormalized stuff
    addN: Fp12Add,
    subN: Fp12Subtract,
    mulN: Fp12Multiply,
    sqrN: Fp12Square,
    // Bytes utils
    fromBytes: (b) => {
      if (b.length !== Fp12.BYTES)
        throw new Error(`fromBytes wrong length=${b.length}`);
      return {
        c0: Fp62.fromBytes(b.subarray(0, Fp62.BYTES)),
        c1: Fp62.fromBytes(b.subarray(Fp62.BYTES))
      };
    },
    toBytes: ({ c0, c1 }) => concatBytes(Fp62.toBytes(c0), Fp62.toBytes(c1)),
    cmov: ({ c0, c1 }, { c0: r0, c1: r1 }, c) => ({
      c0: Fp62.cmov(c0, r0, c),
      c1: Fp62.cmov(c1, r1, c)
    }),
    // Utils
    // toString() {
    //   return `Fp12(${this.c0} + ${this.c1} * w)`;
    // },
    // fromTuple(c: [Fp6, Fp6]) {
    //   return new Fp12(...c);
    // }
    fromBigTwelve: (t) => ({
      c0: Fp62.fromBigSix(t.slice(0, 6)),
      c1: Fp62.fromBigSix(t.slice(6, 12))
    }),
    // Raises to q**i -th power
    frobeniusMap(lhs, power) {
      const r0 = Fp62.frobeniusMap(lhs.c0, power);
      const { c0, c1, c2 } = Fp62.frobeniusMap(lhs.c1, power);
      const coeff = FP12_FROBENIUS_COEFFICIENTS[power % 12];
      return {
        c0: r0,
        c1: Fp62.create({
          c0: Fp22.mul(c0, coeff),
          c1: Fp22.mul(c1, coeff),
          c2: Fp22.mul(c2, coeff)
        })
      };
    },
    // Sparse multiplication
    multiplyBy014: ({ c0, c1 }, o0, o1, o4) => {
      let t0 = Fp62.multiplyBy01(c0, o0, o1);
      let t1 = Fp62.multiplyBy1(c1, o4);
      return {
        c0: Fp62.add(Fp62.mulByNonresidue(t1), t0),
        // T1 * v + T0
        // (c1 + c0) * [o0, o1+o4] - T0 - T1
        c1: Fp62.sub(Fp62.sub(Fp62.multiplyBy01(Fp62.add(c1, c0), o0, Fp22.add(o1, o4)), t0), t1)
      };
    },
    multiplyByFp2: ({ c0, c1 }, rhs) => ({
      c0: Fp62.multiplyByFp2(c0, rhs),
      c1: Fp62.multiplyByFp2(c1, rhs)
    }),
    conjugate: ({ c0, c1 }) => ({ c0, c1: Fp62.neg(c1) }),
    // A cyclotomic group is a subgroup of Fp^n defined by
    //   GΦₙ(p) = {α ∈ Fpⁿ : α^Φₙ(p) = 1}
    // The result of any pairing is in a cyclotomic subgroup
    // https://eprint.iacr.org/2009/565.pdf
    _cyclotomicSquare: ({ c0, c1 }) => {
      const { c0: c0c0, c1: c0c1, c2: c0c2 } = c0;
      const { c0: c1c0, c1: c1c1, c2: c1c2 } = c1;
      const { first: t3, second: t4 } = Fp4Square(c0c0, c1c1);
      const { first: t5, second: t6 } = Fp4Square(c1c0, c0c2);
      const { first: t7, second: t8 } = Fp4Square(c0c1, c1c2);
      let t9 = Fp22.mulByNonresidue(t8);
      return {
        c0: Fp62.create({
          c0: Fp22.add(Fp22.mul(Fp22.sub(t3, c0c0), _2n10), t3),
          // 2 * (T3 - c0c0)  + T3
          c1: Fp22.add(Fp22.mul(Fp22.sub(t5, c0c1), _2n10), t5),
          // 2 * (T5 - c0c1)  + T5
          c2: Fp22.add(Fp22.mul(Fp22.sub(t7, c0c2), _2n10), t7)
        }),
        // 2 * (T7 - c0c2)  + T7
        c1: Fp62.create({
          c0: Fp22.add(Fp22.mul(Fp22.add(t9, c1c0), _2n10), t9),
          // 2 * (T9 + c1c0) + T9
          c1: Fp22.add(Fp22.mul(Fp22.add(t4, c1c1), _2n10), t4),
          // 2 * (T4 + c1c1) + T4
          c2: Fp22.add(Fp22.mul(Fp22.add(t6, c1c2), _2n10), t6)
        })
      };
    },
    _cyclotomicExp(num, n) {
      let z = Fp12.ONE;
      for (let i = BLS_X_LEN - 1; i >= 0; i--) {
        z = Fp12._cyclotomicSquare(z);
        if (bitGet(n, i))
          z = Fp12.mul(z, num);
      }
      return z;
    },
    // https://eprint.iacr.org/2010/354.pdf
    // https://eprint.iacr.org/2009/565.pdf
    finalExponentiate: (num) => {
      const x = BLS_X;
      const t0 = Fp12.div(Fp12.frobeniusMap(num, 6), num);
      const t1 = Fp12.mul(Fp12.frobeniusMap(t0, 2), t0);
      const t2 = Fp12.conjugate(Fp12._cyclotomicExp(t1, x));
      const t3 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicSquare(t1)), t2);
      const t4 = Fp12.conjugate(Fp12._cyclotomicExp(t3, x));
      const t5 = Fp12.conjugate(Fp12._cyclotomicExp(t4, x));
      const t6 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicExp(t5, x)), Fp12._cyclotomicSquare(t2));
      const t7 = Fp12.conjugate(Fp12._cyclotomicExp(t6, x));
      const t2_t5_pow_q2 = Fp12.frobeniusMap(Fp12.mul(t2, t5), 2);
      const t4_t1_pow_q3 = Fp12.frobeniusMap(Fp12.mul(t4, t1), 3);
      const t6_t1c_pow_q1 = Fp12.frobeniusMap(Fp12.mul(t6, Fp12.conjugate(t1)), 1);
      const t7_t3c_t1 = Fp12.mul(Fp12.mul(t7, Fp12.conjugate(t3)), t1);
      return Fp12.mul(Fp12.mul(Fp12.mul(t2_t5_pow_q2, t4_t1_pow_q3), t6_t1c_pow_q1), t7_t3c_t1);
    }
  };
  var FP12_FROBENIUS_COEFFICIENTS = [
    [BigInt("0x1"), BigInt("0x0")],
    [
      BigInt("0x1904d3bf02bb0667c231beb4202c0d1f0fd603fd3cbd5f4f7b2443d784bab9c4f67ea53d63e7813d8d0775ed92235fb8"),
      BigInt("0x00fc3e2b36c4e03288e9e902231f9fb854a14787b6c7b36fec0c8ec971f63c5f282d5ac14d6c7ec22cf78a126ddc4af3")
    ],
    [
      BigInt("0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffeffff"),
      BigInt("0x0")
    ],
    [
      BigInt("0x135203e60180a68ee2e9c448d77a2cd91c3dedd930b1cf60ef396489f61eb45e304466cf3e67fa0af1ee7b04121bdea2"),
      BigInt("0x06af0e0437ff400b6831e36d6bd17ffe48395dabc2d3435e77f76e17009241c5ee67992f72ec05f4c81084fbede3cc09")
    ],
    [
      BigInt("0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffe"),
      BigInt("0x0")
    ],
    [
      BigInt("0x144e4211384586c16bd3ad4afa99cc9170df3560e77982d0db45f3536814f0bd5871c1908bd478cd1ee605167ff82995"),
      BigInt("0x05b2cfd9013a5fd8df47fa6b48b1e045f39816240c0b8fee8beadf4d8e9c0566c63a3e6e257f87329b18fae980078116")
    ],
    [
      BigInt("0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaaa"),
      BigInt("0x0")
    ],
    [
      BigInt("0x00fc3e2b36c4e03288e9e902231f9fb854a14787b6c7b36fec0c8ec971f63c5f282d5ac14d6c7ec22cf78a126ddc4af3"),
      BigInt("0x1904d3bf02bb0667c231beb4202c0d1f0fd603fd3cbd5f4f7b2443d784bab9c4f67ea53d63e7813d8d0775ed92235fb8")
    ],
    [
      BigInt("0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaac"),
      BigInt("0x0")
    ],
    [
      BigInt("0x06af0e0437ff400b6831e36d6bd17ffe48395dabc2d3435e77f76e17009241c5ee67992f72ec05f4c81084fbede3cc09"),
      BigInt("0x135203e60180a68ee2e9c448d77a2cd91c3dedd930b1cf60ef396489f61eb45e304466cf3e67fa0af1ee7b04121bdea2")
    ],
    [
      BigInt("0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaad"),
      BigInt("0x0")
    ],
    [
      BigInt("0x05b2cfd9013a5fd8df47fa6b48b1e045f39816240c0b8fee8beadf4d8e9c0566c63a3e6e257f87329b18fae980078116"),
      BigInt("0x144e4211384586c16bd3ad4afa99cc9170df3560e77982d0db45f3536814f0bd5871c1908bd478cd1ee605167ff82995")
    ]
  ].map((n) => Fp22.fromBigTuple(n));
  var isogenyMapG2 = isogenyMap(Fp22, [
    // xNum
    [
      [
        "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6",
        "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6"
      ],
      [
        "0x0",
        "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71a"
      ],
      [
        "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71e",
        "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38d"
      ],
      [
        "0x171d6541fa38ccfaed6dea691f5fb614cb14b4e7f4e810aa22d6108f142b85757098e38d0f671c7188e2aaaaaaaa5ed1",
        "0x0"
      ]
    ],
    // xDen
    [
      [
        "0x0",
        "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa63"
      ],
      [
        "0xc",
        "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9f"
      ],
      ["0x1", "0x0"]
      // LAST 1
    ],
    // yNum
    [
      [
        "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706",
        "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706"
      ],
      [
        "0x0",
        "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97be"
      ],
      [
        "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71c",
        "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38f"
      ],
      [
        "0x124c9ad43b6cf79bfbf7043de3811ad0761b0f37a1e26286b0e977c69aa274524e79097a56dc4bd9e1b371c71c718b10",
        "0x0"
      ]
    ],
    // yDen
    [
      [
        "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb",
        "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb"
      ],
      [
        "0x0",
        "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa9d3"
      ],
      [
        "0x12",
        "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa99"
      ],
      ["0x1", "0x0"]
      // LAST 1
    ]
  ].map((i) => i.map((pair) => Fp22.fromBigTuple(pair.map(BigInt)))));
  var isogenyMapG1 = isogenyMap(Fp7, [
    // xNum
    [
      "0x11a05f2b1e833340b809101dd99815856b303e88a2d7005ff2627b56cdb4e2c85610c2d5f2e62d6eaeac1662734649b7",
      "0x17294ed3e943ab2f0588bab22147a81c7c17e75b2f6a8417f565e33c70d1e86b4838f2a6f318c356e834eef1b3cb83bb",
      "0xd54005db97678ec1d1048c5d10a9a1bce032473295983e56878e501ec68e25c958c3e3d2a09729fe0179f9dac9edcb0",
      "0x1778e7166fcc6db74e0609d307e55412d7f5e4656a8dbf25f1b33289f1b330835336e25ce3107193c5b388641d9b6861",
      "0xe99726a3199f4436642b4b3e4118e5499db995a1257fb3f086eeb65982fac18985a286f301e77c451154ce9ac8895d9",
      "0x1630c3250d7313ff01d1201bf7a74ab5db3cb17dd952799b9ed3ab9097e68f90a0870d2dcae73d19cd13c1c66f652983",
      "0xd6ed6553fe44d296a3726c38ae652bfb11586264f0f8ce19008e218f9c86b2a8da25128c1052ecaddd7f225a139ed84",
      "0x17b81e7701abdbe2e8743884d1117e53356de5ab275b4db1a682c62ef0f2753339b7c8f8c8f475af9ccb5618e3f0c88e",
      "0x80d3cf1f9a78fc47b90b33563be990dc43b756ce79f5574a2c596c928c5d1de4fa295f296b74e956d71986a8497e317",
      "0x169b1f8e1bcfa7c42e0c37515d138f22dd2ecb803a0c5c99676314baf4bb1b7fa3190b2edc0327797f241067be390c9e",
      "0x10321da079ce07e272d8ec09d2565b0dfa7dccdde6787f96d50af36003b14866f69b771f8c285decca67df3f1605fb7b",
      "0x6e08c248e260e70bd1e962381edee3d31d79d7e22c837bc23c0bf1bc24c6b68c24b1b80b64d391fa9c8ba2e8ba2d229"
    ],
    // xDen
    [
      "0x8ca8d548cff19ae18b2e62f4bd3fa6f01d5ef4ba35b48ba9c9588617fc8ac62b558d681be343df8993cf9fa40d21b1c",
      "0x12561a5deb559c4348b4711298e536367041e8ca0cf0800c0126c2588c48bf5713daa8846cb026e9e5c8276ec82b3bff",
      "0xb2962fe57a3225e8137e629bff2991f6f89416f5a718cd1fca64e00b11aceacd6a3d0967c94fedcfcc239ba5cb83e19",
      "0x3425581a58ae2fec83aafef7c40eb545b08243f16b1655154cca8abc28d6fd04976d5243eecf5c4130de8938dc62cd8",
      "0x13a8e162022914a80a6f1d5f43e7a07dffdfc759a12062bb8d6b44e833b306da9bd29ba81f35781d539d395b3532a21e",
      "0xe7355f8e4e667b955390f7f0506c6e9395735e9ce9cad4d0a43bcef24b8982f7400d24bc4228f11c02df9a29f6304a5",
      "0x772caacf16936190f3e0c63e0596721570f5799af53a1894e2e073062aede9cea73b3538f0de06cec2574496ee84a3a",
      "0x14a7ac2a9d64a8b230b3f5b074cf01996e7f63c21bca68a81996e1cdf9822c580fa5b9489d11e2d311f7d99bbdcc5a5e",
      "0xa10ecf6ada54f825e920b3dafc7a3cce07f8d1d7161366b74100da67f39883503826692abba43704776ec3a79a1d641",
      "0x95fc13ab9e92ad4476d6e3eb3a56680f682b4ee96f7d03776df533978f31c1593174e4b4b7865002d6384d168ecdd0a",
      "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
      // LAST 1
    ],
    // yNum
    [
      "0x90d97c81ba24ee0259d1f094980dcfa11ad138e48a869522b52af6c956543d3cd0c7aee9b3ba3c2be9845719707bb33",
      "0x134996a104ee5811d51036d776fb46831223e96c254f383d0f906343eb67ad34d6c56711962fa8bfe097e75a2e41c696",
      "0xcc786baa966e66f4a384c86a3b49942552e2d658a31ce2c344be4b91400da7d26d521628b00523b8dfe240c72de1f6",
      "0x1f86376e8981c217898751ad8746757d42aa7b90eeb791c09e4a3ec03251cf9de405aba9ec61deca6355c77b0e5f4cb",
      "0x8cc03fdefe0ff135caf4fe2a21529c4195536fbe3ce50b879833fd221351adc2ee7f8dc099040a841b6daecf2e8fedb",
      "0x16603fca40634b6a2211e11db8f0a6a074a7d0d4afadb7bd76505c3d3ad5544e203f6326c95a807299b23ab13633a5f0",
      "0x4ab0b9bcfac1bbcb2c977d027796b3ce75bb8ca2be184cb5231413c4d634f3747a87ac2460f415ec961f8855fe9d6f2",
      "0x987c8d5333ab86fde9926bd2ca6c674170a05bfe3bdd81ffd038da6c26c842642f64550fedfe935a15e4ca31870fb29",
      "0x9fc4018bd96684be88c9e221e4da1bb8f3abd16679dc26c1e8b6e6a1f20cabe69d65201c78607a360370e577bdba587",
      "0xe1bba7a1186bdb5223abde7ada14a23c42a0ca7915af6fe06985e7ed1e4d43b9b3f7055dd4eba6f2bafaaebca731c30",
      "0x19713e47937cd1be0dfd0b8f1d43fb93cd2fcbcb6caf493fd1183e416389e61031bf3a5cce3fbafce813711ad011c132",
      "0x18b46a908f36f6deb918c143fed2edcc523559b8aaf0c2462e6bfe7f911f643249d9cdf41b44d606ce07c8a4d0074d8e",
      "0xb182cac101b9399d155096004f53f447aa7b12a3426b08ec02710e807b4633f06c851c1919211f20d4c04f00b971ef8",
      "0x245a394ad1eca9b72fc00ae7be315dc757b3b080d4c158013e6632d3c40659cc6cf90ad1c232a6442d9d3f5db980133",
      "0x5c129645e44cf1102a159f748c4a3fc5e673d81d7e86568d9ab0f5d396a7ce46ba1049b6579afb7866b1e715475224b",
      "0x15e6be4e990f03ce4ea50b3b42df2eb5cb181d8f84965a3957add4fa95af01b2b665027efec01c7704b456be69c8b604"
    ],
    // yDen
    [
      "0x16112c4c3a9c98b252181140fad0eae9601a6de578980be6eec3232b5be72e7a07f3688ef60c206d01479253b03663c1",
      "0x1962d75c2381201e1a0cbd6c43c348b885c84ff731c4d59ca4a10356f453e01f78a4260763529e3532f6102c2e49a03d",
      "0x58df3306640da276faaae7d6e8eb15778c4855551ae7f310c35a5dd279cd2eca6757cd636f96f891e2538b53dbf67f2",
      "0x16b7d288798e5395f20d23bf89edb4d1d115c5dbddbcd30e123da489e726af41727364f2c28297ada8d26d98445f5416",
      "0xbe0e079545f43e4b00cc912f8228ddcc6d19c9f0f69bbb0542eda0fc9dec916a20b15dc0fd2ededda39142311a5001d",
      "0x8d9e5297186db2d9fb266eaac783182b70152c65550d881c5ecd87b6f0f5a6449f38db9dfa9cce202c6477faaf9b7ac",
      "0x166007c08a99db2fc3ba8734ace9824b5eecfdfa8d0cf8ef5dd365bc400a0051d5fa9c01a58b1fb93d1a1399126a775c",
      "0x16a3ef08be3ea7ea03bcddfabba6ff6ee5a4375efa1f4fd7feb34fd206357132b920f5b00801dee460ee415a15812ed9",
      "0x1866c8ed336c61231a1be54fd1d74cc4f9fb0ce4c6af5920abc5750c4bf39b4852cfe2f7bb9248836b233d9d55535d4a",
      "0x167a55cda70a6e1cea820597d94a84903216f763e13d87bb5308592e7ea7d4fbc7385ea3d529b35e346ef48bb8913f55",
      "0x4d2f259eea405bd48f010a01ad2911d9c6dd039bb61a6290e591b36e636a5c871a5c29f4f83060400f8b49cba8f6aa8",
      "0xaccbb67481d033ff5852c1e48c50c477f94ff8aefce42d28c0f9a88cea7913516f968986f7ebbea9684b529e2561092",
      "0xad6b9514c767fe3c3613144b45f1496543346d98adf02267d5ceef9a00d9b8693000763e3b90ac11e99b138573345cc",
      "0x2660400eb2e4f3b628bdd0d53cd76f2bf565b94e72927c1cb748df27942480e420517bd8714cc80d1fadc1326ed06f7",
      "0xe0fa1d816ddc03e6b24255e0d7819c171c40f65e273b853324efcd6356caa205ca2f570f13497804415473a1d634b8f",
      "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
      // LAST 1
    ]
  ].map((i) => i.map((j) => BigInt(j))));
  var G2_SWU = mapToCurveSimpleSWU(Fp22, {
    A: Fp22.create({ c0: Fp7.create(_0n10), c1: Fp7.create(BigInt(240)) }),
    // A' = 240 * I
    B: Fp22.create({ c0: Fp7.create(BigInt(1012)), c1: Fp7.create(BigInt(1012)) }),
    // B' = 1012 * (1 + I)
    Z: Fp22.create({ c0: Fp7.create(BigInt(-2)), c1: Fp7.create(BigInt(-1)) })
    // Z: -(2 + I)
  });
  var G1_SWU = mapToCurveSimpleSWU(Fp7, {
    A: Fp7.create(BigInt("0x144698a3b8e9433d693a02c96d4982b0ea985383ee66a8d8e8981aefd881ac98936f8da0e0f97f5cf428082d584c1d")),
    B: Fp7.create(BigInt("0x12e2908d11688030018b12e8753eee3b2016c1f0f24f4070a0b9c14fcef35ef55a23215a316ceaa5d1cc48e98e172be0")),
    Z: Fp7.create(BigInt(11))
  });
  var ut_root = Fp62.create({ c0: Fp22.ZERO, c1: Fp22.ONE, c2: Fp22.ZERO });
  var wsq = Fp12.create({ c0: ut_root, c1: Fp62.ZERO });
  var wcu = Fp12.create({ c0: Fp62.ZERO, c1: ut_root });
  var [wsq_inv, wcu_inv] = Fp12.invertBatch([wsq, wcu]);
  function psi(x, y) {
    const x2 = Fp12.mul(Fp12.frobeniusMap(Fp12.multiplyByFp2(wsq_inv, x), 1), wsq).c0.c0;
    const y2 = Fp12.mul(Fp12.frobeniusMap(Fp12.multiplyByFp2(wcu_inv, y), 1), wcu).c0.c0;
    return [x2, y2];
  }
  function G2psi(c, P3) {
    const affine = P3.toAffine();
    const p = psi(affine.x, affine.y);
    return new c(p[0], p[1], Fp22.ONE);
  }
  var PSI2_C1 = BigInt("0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaac");
  function psi2(x, y) {
    return [Fp22.mul(x, PSI2_C1), Fp22.neg(y)];
  }
  function G2psi2(c, P3) {
    const affine = P3.toAffine();
    const p = psi2(affine.x, affine.y);
    return new c(p[0], p[1], Fp22.ONE);
  }
  var htfDefaults = Object.freeze({
    // DST: a domain separation tag
    // defined in section 2.2.5
    // Use utils.getDSTLabel(), utils.setDSTLabel(value)
    DST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
    encodeDST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
    // p: the characteristic of F
    //    where F is a finite field of characteristic p and order q = p^m
    p: Fp7.ORDER,
    // m: the extension degree of F, m >= 1
    //     where F is a finite field of characteristic p and order q = p^m
    m: 2,
    // k: the target security level for the suite in bits
    // defined in section 5.1
    k: 128,
    // option to use a message that has already been processed by
    // expand_message_xmd
    expand: "xmd",
    // Hash functions for: expand_message_xmd is appropriate for use with a
    // wide range of hash functions, including SHA-2, SHA-3, BLAKE2, and others.
    // BBS+ uses blake2: https://github.com/hyperledger/aries-framework-go/issues/2247
    hash: sha256
  });
  var COMPRESSED_ZERO = setMask(Fp7.toBytes(_0n10), { infinity: true, compressed: true });
  function parseMask(bytes2) {
    bytes2 = bytes2.slice();
    const mask = bytes2[0] & 224;
    const compressed = !!(mask >> 7 & 1);
    const infinity = !!(mask >> 6 & 1);
    const sort = !!(mask >> 5 & 1);
    bytes2[0] &= 31;
    return { compressed, infinity, sort, value: bytes2 };
  }
  function setMask(bytes2, mask) {
    if (bytes2[0] & 224)
      throw new Error("setMask: non-empty mask");
    if (mask.compressed)
      bytes2[0] |= 128;
    if (mask.infinity)
      bytes2[0] |= 64;
    if (mask.sort)
      bytes2[0] |= 32;
    return bytes2;
  }
  function signatureG1ToRawBytes(point) {
    point.assertValidity();
    const isZero = point.equals(bls12_381.G1.ProjectivePoint.ZERO);
    const { x, y } = point.toAffine();
    if (isZero)
      return COMPRESSED_ZERO.slice();
    const P3 = Fp7.ORDER;
    const sort = Boolean(y * _2n10 / P3);
    return setMask(numberToBytesBE(x, Fp7.BYTES), { compressed: true, sort });
  }
  function signatureG2ToRawBytes(point) {
    point.assertValidity();
    const len = Fp7.BYTES;
    if (point.equals(bls12_381.G2.ProjectivePoint.ZERO))
      return concatBytes(COMPRESSED_ZERO, numberToBytesBE(_0n10, len));
    const { x, y } = point.toAffine();
    const { re: x0, im: x1 } = Fp22.reim(x);
    const { re: y0, im: y1 } = Fp22.reim(y);
    const tmp = y1 > _0n10 ? y1 * _2n10 : y0 * _2n10;
    const sort = Boolean(tmp / Fp7.ORDER & _1n11);
    const z2 = x0;
    return concatBytes(setMask(numberToBytesBE(x1, len), { sort, compressed: true }), numberToBytesBE(z2, len));
  }
  var bls12_381 = bls({
    // Fields
    fields: {
      Fp: Fp7,
      Fp2: Fp22,
      Fp6: Fp62,
      Fp12,
      Fr
    },
    // G1 is the order-q subgroup of E1(Fp) : y² = x³ + 4, #E1(Fp) = h1q, where
    // characteristic; z + (z⁴ - z² + 1)(z - 1)²/3
    G1: {
      Fp: Fp7,
      // cofactor; (z - 1)²/3
      h: BigInt("0x396c8c005555e1568c00aaab0000aaab"),
      // generator's coordinates
      // x = 3685416753713387016781088315183077757961620795782546409894578378688607592378376318836054947676345821548104185464507
      // y = 1339506544944476473020471379941921221584933875938349620426543736416511423956333506472724655353366534992391756441569
      Gx: BigInt("0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb"),
      Gy: BigInt("0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1"),
      a: Fp7.ZERO,
      b: _4n4,
      htfDefaults: { ...htfDefaults, m: 1, DST: "BLS_SIG_BLS12381G1_XMD:SHA-256_SSWU_RO_NUL_" },
      wrapPrivateKey: true,
      allowInfinityPoint: true,
      // Checks is the point resides in prime-order subgroup.
      // point.isTorsionFree() should return true for valid points
      // It returns false for shitty points.
      // https://eprint.iacr.org/2021/1130.pdf
      isTorsionFree: (c, point) => {
        const cubicRootOfUnityModP = BigInt("0x5f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffe");
        const phi = new c(Fp7.mul(point.px, cubicRootOfUnityModP), point.py, point.pz);
        const xP = point.multiplyUnsafe(bls12_381.params.x).negate();
        const u2P = xP.multiplyUnsafe(bls12_381.params.x);
        return u2P.equals(phi);
      },
      // Clear cofactor of G1
      // https://eprint.iacr.org/2019/403
      clearCofactor: (_c, point) => {
        return point.multiplyUnsafe(bls12_381.params.x).add(point);
      },
      mapToCurve: (scalars) => {
        const { x, y } = G1_SWU(Fp7.create(scalars[0]));
        return isogenyMapG1(x, y);
      },
      fromBytes: (bytes2) => {
        const { compressed, infinity, sort, value } = parseMask(bytes2);
        if (value.length === 48 && compressed) {
          const P3 = Fp7.ORDER;
          const compressedValue = bytesToNumberBE(value);
          const x = Fp7.create(compressedValue & Fp7.MASK);
          if (infinity) {
            if (x !== _0n10)
              throw new Error("G1: non-empty compressed point at infinity");
            return { x: _0n10, y: _0n10 };
          }
          const right = Fp7.add(Fp7.pow(x, _3n6), Fp7.create(bls12_381.params.G1b));
          let y = Fp7.sqrt(right);
          if (!y)
            throw new Error("Invalid compressed G1 point");
          if (y * _2n10 / P3 !== BigInt(sort))
            y = Fp7.neg(y);
          return { x: Fp7.create(x), y: Fp7.create(y) };
        } else if (value.length === 96 && !compressed) {
          const x = bytesToNumberBE(value.subarray(0, Fp7.BYTES));
          const y = bytesToNumberBE(value.subarray(Fp7.BYTES));
          if (infinity) {
            if (x !== _0n10 || y !== _0n10)
              throw new Error("G1: non-empty point at infinity");
            return bls12_381.G1.ProjectivePoint.ZERO.toAffine();
          }
          return { x: Fp7.create(x), y: Fp7.create(y) };
        } else {
          throw new Error("Invalid point G1, expected 48/96 bytes");
        }
      },
      toBytes: (c, point, isCompressed) => {
        const isZero = point.equals(c.ZERO);
        const { x, y } = point.toAffine();
        if (isCompressed) {
          if (isZero)
            return COMPRESSED_ZERO.slice();
          const P3 = Fp7.ORDER;
          const sort = Boolean(y * _2n10 / P3);
          return setMask(numberToBytesBE(x, Fp7.BYTES), { compressed: true, sort });
        } else {
          if (isZero) {
            const x2 = concatBytes(new Uint8Array([64]), new Uint8Array(2 * Fp7.BYTES - 1));
            return x2;
          } else {
            return concatBytes(numberToBytesBE(x, Fp7.BYTES), numberToBytesBE(y, Fp7.BYTES));
          }
        }
      },
      ShortSignature: {
        fromHex(hex) {
          const { infinity, sort, value } = parseMask(ensureBytes("signatureHex", hex, 48));
          const P3 = Fp7.ORDER;
          const compressedValue = bytesToNumberBE(value);
          if (infinity)
            return bls12_381.G1.ProjectivePoint.ZERO;
          const x = Fp7.create(compressedValue & Fp7.MASK);
          const right = Fp7.add(Fp7.pow(x, _3n6), Fp7.create(bls12_381.params.G1b));
          let y = Fp7.sqrt(right);
          if (!y)
            throw new Error("Invalid compressed G1 point");
          const aflag = BigInt(sort);
          if (y * _2n10 / P3 !== aflag)
            y = Fp7.neg(y);
          const point = bls12_381.G1.ProjectivePoint.fromAffine({ x, y });
          point.assertValidity();
          return point;
        },
        toRawBytes(point) {
          return signatureG1ToRawBytes(point);
        },
        toHex(point) {
          return bytesToHex(signatureG1ToRawBytes(point));
        }
      }
    },
    // G2 is the order-q subgroup of E2(Fp²) : y² = x³+4(1+√−1),
    // where Fp2 is Fp[√−1]/(x2+1). #E2(Fp2 ) = h2q, where
    // G² - 1
    // h2q
    G2: {
      Fp: Fp22,
      // cofactor
      h: BigInt("0x5d543a95414e7f1091d50792876a202cd91de4547085abaa68a205b2e5a7ddfa628f1cb4d9e82ef21537e293a6691ae1616ec6e786f0c70cf1c38e31c7238e5"),
      Gx: Fp22.fromBigTuple([
        BigInt("0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8"),
        BigInt("0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e")
      ]),
      // y =
      // 927553665492332455747201965776037880757740193453592970025027978793976877002675564980949289727957565575433344219582,
      // 1985150602287291935568054521177171638300868978215655730859378665066344726373823718423869104263333984641494340347905
      Gy: Fp22.fromBigTuple([
        BigInt("0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801"),
        BigInt("0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79be")
      ]),
      a: Fp22.ZERO,
      b: Fp22.fromBigTuple([_4n4, _4n4]),
      hEff: BigInt("0xbc69f08f2ee75b3584c6a0ea91b352888e2a8e9145ad7689986ff031508ffe1329c2f178731db956d82bf015d1212b02ec0ec69d7477c1ae954cbc06689f6a359894c0adebbf6b4e8020005aaa95551"),
      htfDefaults: { ...htfDefaults },
      wrapPrivateKey: true,
      allowInfinityPoint: true,
      mapToCurve: (scalars) => {
        const { x, y } = G2_SWU(Fp22.fromBigTuple(scalars));
        return isogenyMapG2(x, y);
      },
      // Checks is the point resides in prime-order subgroup.
      // point.isTorsionFree() should return true for valid points
      // It returns false for shitty points.
      // https://eprint.iacr.org/2021/1130.pdf
      isTorsionFree: (c, P3) => {
        return P3.multiplyUnsafe(bls12_381.params.x).negate().equals(G2psi(c, P3));
      },
      // Maps the point into the prime-order subgroup G2.
      // clear_cofactor_bls12381_g2 from cfrg-hash-to-curve-11
      // https://eprint.iacr.org/2017/419.pdf
      // prettier-ignore
      clearCofactor: (c, P3) => {
        const x = bls12_381.params.x;
        let t1 = P3.multiplyUnsafe(x).negate();
        let t2 = G2psi(c, P3);
        let t3 = P3.double();
        t3 = G2psi2(c, t3);
        t3 = t3.subtract(t2);
        t2 = t1.add(t2);
        t2 = t2.multiplyUnsafe(x).negate();
        t3 = t3.add(t2);
        t3 = t3.subtract(t1);
        const Q = t3.subtract(P3);
        return Q;
      },
      fromBytes: (bytes2) => {
        const { compressed, infinity, sort, value } = parseMask(bytes2);
        if (!compressed && !infinity && sort || // 00100000
        !compressed && infinity && sort || // 01100000
        sort && infinity && compressed) {
          throw new Error("Invalid encoding flag: " + (bytes2[0] & 224));
        }
        const L = Fp7.BYTES;
        const slc = (b, from, to) => bytesToNumberBE(b.slice(from, to));
        if (value.length === 96 && compressed) {
          const b = bls12_381.params.G2b;
          const P3 = Fp7.ORDER;
          if (infinity) {
            if (value.reduce((p, c) => p !== 0 ? c + 1 : c, 0) > 0) {
              throw new Error("Invalid compressed G2 point");
            }
            return { x: Fp22.ZERO, y: Fp22.ZERO };
          }
          const x_1 = slc(value, 0, L);
          const x_0 = slc(value, L, 2 * L);
          const x = Fp22.create({ c0: Fp7.create(x_0), c1: Fp7.create(x_1) });
          const right = Fp22.add(Fp22.pow(x, _3n6), b);
          let y = Fp22.sqrt(right);
          const Y_bit = y.c1 === _0n10 ? y.c0 * _2n10 / P3 : y.c1 * _2n10 / P3 ? _1n11 : _0n10;
          y = sort && Y_bit > 0 ? y : Fp22.neg(y);
          return { x, y };
        } else if (value.length === 192 && !compressed) {
          if (infinity) {
            if (value.reduce((p, c) => p !== 0 ? c + 1 : c, 0) > 0) {
              throw new Error("Invalid uncompressed G2 point");
            }
            return { x: Fp22.ZERO, y: Fp22.ZERO };
          }
          const x1 = slc(value, 0, L);
          const x0 = slc(value, L, 2 * L);
          const y1 = slc(value, 2 * L, 3 * L);
          const y0 = slc(value, 3 * L, 4 * L);
          return { x: Fp22.fromBigTuple([x0, x1]), y: Fp22.fromBigTuple([y0, y1]) };
        } else {
          throw new Error("Invalid point G2, expected 96/192 bytes");
        }
      },
      toBytes: (c, point, isCompressed) => {
        const { BYTES: len, ORDER: P3 } = Fp7;
        const isZero = point.equals(c.ZERO);
        const { x, y } = point.toAffine();
        if (isCompressed) {
          if (isZero)
            return concatBytes(COMPRESSED_ZERO, numberToBytesBE(_0n10, len));
          const flag = Boolean(y.c1 === _0n10 ? y.c0 * _2n10 / P3 : y.c1 * _2n10 / P3);
          return concatBytes(setMask(numberToBytesBE(x.c1, len), { compressed: true, sort: flag }), numberToBytesBE(x.c0, len));
        } else {
          if (isZero)
            return concatBytes(new Uint8Array([64]), new Uint8Array(4 * len - 1));
          const { re: x0, im: x1 } = Fp22.reim(x);
          const { re: y0, im: y1 } = Fp22.reim(y);
          return concatBytes(numberToBytesBE(x1, len), numberToBytesBE(x0, len), numberToBytesBE(y1, len), numberToBytesBE(y0, len));
        }
      },
      Signature: {
        // TODO: Optimize, it's very slow because of sqrt.
        fromHex(hex) {
          const { infinity, sort, value } = parseMask(ensureBytes("signatureHex", hex));
          const P3 = Fp7.ORDER;
          const half = value.length / 2;
          if (half !== 48 && half !== 96)
            throw new Error("Invalid compressed signature length, must be 96 or 192");
          const z1 = bytesToNumberBE(value.slice(0, half));
          const z2 = bytesToNumberBE(value.slice(half));
          if (infinity)
            return bls12_381.G2.ProjectivePoint.ZERO;
          const x1 = Fp7.create(z1 & Fp7.MASK);
          const x2 = Fp7.create(z2);
          const x = Fp22.create({ c0: x2, c1: x1 });
          const y2 = Fp22.add(Fp22.pow(x, _3n6), bls12_381.params.G2b);
          let y = Fp22.sqrt(y2);
          if (!y)
            throw new Error("Failed to find a square root");
          const { re: y0, im: y1 } = Fp22.reim(y);
          const aflag1 = BigInt(sort);
          const isGreater = y1 > _0n10 && y1 * _2n10 / P3 !== aflag1;
          const isZero = y1 === _0n10 && y0 * _2n10 / P3 !== aflag1;
          if (isGreater || isZero)
            y = Fp22.neg(y);
          const point = bls12_381.G2.ProjectivePoint.fromAffine({ x, y });
          point.assertValidity();
          return point;
        },
        toRawBytes(point) {
          return signatureG2ToRawBytes(point);
        },
        toHex(point) {
          return bytesToHex(signatureG2ToRawBytes(point));
        }
      }
    },
    params: {
      x: BLS_X,
      // The BLS parameter x for BLS12-381
      r: Fr.ORDER
      // order; z⁴ − z² + 1; CURVE.n from other curves
    },
    htfDefaults,
    hash: sha256,
    randomBytes
  });

  // input.js
  var utils = { bytesToHex, concatBytes, hexToBytes, utf8ToBytes };
  return __toCommonJS(input_exports);
})();
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
