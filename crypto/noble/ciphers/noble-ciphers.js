"use strict";
var nobleCiphers = (() => {
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
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // input.js
  var input_exports = {};
  __export(input_exports, {
    cbc: () => cbc,
    chacha12: () => chacha12,
    chacha20: () => chacha20,
    chacha20poly1305: () => chacha20poly1305,
    chacha8: () => chacha8,
    ctr: () => ctr,
    ecb: () => ecb,
    gcm: () => gcm,
    salsa20: () => salsa20,
    siv: () => siv,
    utils: () => utils2,
    xchacha20poly1305: () => xchacha20poly1305,
    xsalsa20poly1305: () => xsalsa20poly1305
  });

  // ../esm/_assert.js
  function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error(`positive integer expected, not ${n}`);
  }
  function bool(b) {
    if (typeof b !== "boolean")
      throw new Error(`boolean expected, not ${b}`);
  }
  function isBytes(a) {
    return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
  }
  function bytes(b, ...lengths) {
    if (!isBytes(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
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

  // ../esm/utils.js
  var u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
  var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
  var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  if (!isLE)
    throw new Error("Non little-endian hardware is not supported");
  var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
  function bytesToHex(bytes2) {
    bytes(bytes2);
    let hex = "";
    for (let i = 0; i < bytes2.length; i++) {
      hex += hexes[bytes2[i]];
    }
    return hex;
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
  function hexToNumber(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    return BigInt(hex === "" ? "0" : `0x${hex}`);
  }
  function numberToBytesBE(n, len) {
    return hexToBytes(n.toString(16).padStart(len * 2, "0"));
  }
  function utf8ToBytes(str) {
    if (typeof str !== "string")
      throw new Error(`string expected, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function bytesToUtf8(bytes2) {
    return new TextDecoder().decode(bytes2);
  }
  function toBytes(data) {
    if (typeof data === "string")
      data = utf8ToBytes(data);
    else if (isBytes(data))
      data = data.slice();
    else
      throw new Error(`Uint8Array expected, got ${typeof data}`);
    return data;
  }
  function concatBytes(...arrays) {
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
  function checkOpts(defaults, opts) {
    if (opts == null || typeof opts !== "object")
      throw new Error("options must be defined");
    const merged = Object.assign(defaults, opts);
    return merged;
  }
  function equalBytes(a, b) {
    if (a.length !== b.length)
      return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++)
      diff |= a[i] ^ b[i];
    return diff === 0;
  }
  var wrapCipher = /* @__NO_SIDE_EFFECTS__ */ (params, c) => {
    Object.assign(c, params);
    return c;
  };
  function setBigUint64(view, byteOffset, value, isLE2) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE2);
    const _32n = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE2 ? 4 : 0;
    const l = isLE2 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE2);
    view.setUint32(byteOffset + l, wl, isLE2);
  }

  // ../esm/_arx.js
  var _utf8ToBytes = (str) => Uint8Array.from(str.split("").map((c) => c.charCodeAt(0)));
  var sigma16 = _utf8ToBytes("expand 16-byte k");
  var sigma32 = _utf8ToBytes("expand 32-byte k");
  var sigma16_32 = u32(sigma16);
  var sigma32_32 = u32(sigma32);
  var sigma = sigma32_32.slice();
  function rotl(a, b) {
    return a << b | a >>> 32 - b;
  }
  function isAligned32(b) {
    return b.byteOffset % 4 === 0;
  }
  var BLOCK_LEN = 64;
  var BLOCK_LEN32 = 16;
  var MAX_COUNTER = 2 ** 32 - 1;
  var U32_EMPTY = new Uint32Array();
  function runCipher(core, sigma2, key, nonce, data, output2, counter, rounds) {
    const len = data.length;
    const block = new Uint8Array(BLOCK_LEN);
    const b32 = u32(block);
    const isAligned = isAligned32(data) && isAligned32(output2);
    const d32 = isAligned ? u32(data) : U32_EMPTY;
    const o32 = isAligned ? u32(output2) : U32_EMPTY;
    for (let pos = 0; pos < len; counter++) {
      core(sigma2, key, nonce, b32, counter, rounds);
      if (counter >= MAX_COUNTER)
        throw new Error("arx: counter overflow");
      const take = Math.min(BLOCK_LEN, len - pos);
      if (isAligned && take === BLOCK_LEN) {
        const pos32 = pos / 4;
        if (pos % 4 !== 0)
          throw new Error("arx: invalid block position");
        for (let j = 0, posj; j < BLOCK_LEN32; j++) {
          posj = pos32 + j;
          o32[posj] = d32[posj] ^ b32[j];
        }
        pos += BLOCK_LEN;
        continue;
      }
      for (let j = 0, posj; j < take; j++) {
        posj = pos + j;
        output2[posj] = data[posj] ^ block[j];
      }
      pos += take;
    }
  }
  function createCipher(core, opts) {
    const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = checkOpts({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, opts);
    if (typeof core !== "function")
      throw new Error("core must be a function");
    number(counterLength);
    number(rounds);
    bool(counterRight);
    bool(allowShortKeys);
    return (key, nonce, data, output2, counter = 0) => {
      bytes(key);
      bytes(nonce);
      bytes(data);
      const len = data.length;
      if (!output2)
        output2 = new Uint8Array(len);
      bytes(output2);
      number(counter);
      if (counter < 0 || counter >= MAX_COUNTER)
        throw new Error("arx: counter overflow");
      if (output2.length < len)
        throw new Error(`arx: output (${output2.length}) is shorter than data (${len})`);
      const toClean = [];
      let l = key.length, k, sigma2;
      if (l === 32) {
        k = key.slice();
        toClean.push(k);
        sigma2 = sigma32_32;
      } else if (l === 16 && allowShortKeys) {
        k = new Uint8Array(32);
        k.set(key);
        k.set(key, 16);
        sigma2 = sigma16_32;
        toClean.push(k);
      } else {
        throw new Error(`arx: invalid 32-byte key, got length=${l}`);
      }
      if (!isAligned32(nonce)) {
        nonce = nonce.slice();
        toClean.push(nonce);
      }
      const k32 = u32(k);
      if (extendNonceFn) {
        if (nonce.length !== 24)
          throw new Error(`arx: extended nonce must be 24 bytes`);
        extendNonceFn(sigma2, k32, u32(nonce.subarray(0, 16)), k32);
        nonce = nonce.subarray(16);
      }
      const nonceNcLen = 16 - counterLength;
      if (nonceNcLen !== nonce.length)
        throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
      if (nonceNcLen !== 12) {
        const nc = new Uint8Array(12);
        nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
        nonce = nc;
        toClean.push(nonce);
      }
      const n32 = u32(nonce);
      runCipher(core, sigma2, k32, n32, data, output2, counter, rounds);
      while (toClean.length > 0)
        toClean.pop().fill(0);
      return output2;
    };
  }

  // ../esm/_micro.js
  function bytesToNumberLE(bytes2) {
    return hexToNumber(bytesToHex(Uint8Array.from(bytes2).reverse()));
  }
  function numberToBytesLE(n, len) {
    return numberToBytesBE(n, len).reverse();
  }
  function salsaQR(x, a, b, c, d) {
    x[b] ^= rotl(x[a] + x[d] | 0, 7);
    x[c] ^= rotl(x[b] + x[a] | 0, 9);
    x[d] ^= rotl(x[c] + x[b] | 0, 13);
    x[a] ^= rotl(x[d] + x[c] | 0, 18);
  }
  function chachaQR(x, a, b, c, d) {
    x[a] = x[a] + x[b] | 0;
    x[d] = rotl(x[d] ^ x[a], 16);
    x[c] = x[c] + x[d] | 0;
    x[b] = rotl(x[b] ^ x[c], 12);
    x[a] = x[a] + x[b] | 0;
    x[d] = rotl(x[d] ^ x[a], 8);
    x[c] = x[c] + x[d] | 0;
    x[b] = rotl(x[b] ^ x[c], 7);
  }
  function salsaRound(x, rounds = 20) {
    for (let r = 0; r < rounds; r += 2) {
      salsaQR(x, 0, 4, 8, 12);
      salsaQR(x, 5, 9, 13, 1);
      salsaQR(x, 10, 14, 2, 6);
      salsaQR(x, 15, 3, 7, 11);
      salsaQR(x, 0, 1, 2, 3);
      salsaQR(x, 5, 6, 7, 4);
      salsaQR(x, 10, 11, 8, 9);
      salsaQR(x, 15, 12, 13, 14);
    }
  }
  function chachaRound(x, rounds = 20) {
    for (let r = 0; r < rounds; r += 2) {
      chachaQR(x, 0, 4, 8, 12);
      chachaQR(x, 1, 5, 9, 13);
      chachaQR(x, 2, 6, 10, 14);
      chachaQR(x, 3, 7, 11, 15);
      chachaQR(x, 0, 5, 10, 15);
      chachaQR(x, 1, 6, 11, 12);
      chachaQR(x, 2, 7, 8, 13);
      chachaQR(x, 3, 4, 9, 14);
    }
  }
  function salsaCore(s, k, n, out, cnt, rounds = 20) {
    const y = new Uint32Array([
      s[0],
      k[0],
      k[1],
      k[2],
      // "expa" Key     Key     Key
      k[3],
      s[1],
      n[0],
      n[1],
      // Key    "nd 3"  Nonce   Nonce
      cnt,
      0,
      s[2],
      k[4],
      // Pos.   Pos.    "2-by"  Key
      k[5],
      k[6],
      k[7],
      s[3]
      // Key    Key     Key     "te k"
    ]);
    const x = y.slice();
    salsaRound(x, rounds);
    for (let i = 0; i < 16; i++)
      out[i] = y[i] + x[i] | 0;
  }
  function hsalsa(s, k, i, o32) {
    const x = new Uint32Array([
      s[0],
      k[0],
      k[1],
      k[2],
      k[3],
      s[1],
      i[0],
      i[1],
      i[2],
      i[3],
      s[2],
      k[4],
      k[5],
      k[6],
      k[7],
      s[3]
    ]);
    salsaRound(x, 20);
    let oi = 0;
    o32[oi++] = x[0];
    o32[oi++] = x[5];
    o32[oi++] = x[10];
    o32[oi++] = x[15];
    o32[oi++] = x[6];
    o32[oi++] = x[7];
    o32[oi++] = x[8];
    o32[oi++] = x[9];
  }
  function chachaCore(s, k, n, out, cnt, rounds = 20) {
    const y = new Uint32Array([
      s[0],
      s[1],
      s[2],
      s[3],
      // "expa"   "nd 3"  "2-by"  "te k"
      k[0],
      k[1],
      k[2],
      k[3],
      // Key      Key     Key     Key
      k[4],
      k[5],
      k[6],
      k[7],
      // Key      Key     Key     Key
      cnt,
      n[0],
      n[1],
      n[2]
      // Counter  Counter Nonce   Nonce
    ]);
    const x = y.slice();
    chachaRound(x, rounds);
    for (let i = 0; i < 16; i++)
      out[i] = y[i] + x[i] | 0;
  }
  function hchacha(s, k, i, o32) {
    const x = new Uint32Array([
      s[0],
      s[1],
      s[2],
      s[3],
      k[0],
      k[1],
      k[2],
      k[3],
      k[4],
      k[5],
      k[6],
      k[7],
      i[0],
      i[1],
      i[2],
      i[3]
    ]);
    chachaRound(x, 20);
    let oi = 0;
    o32[oi++] = x[0];
    o32[oi++] = x[1];
    o32[oi++] = x[2];
    o32[oi++] = x[3];
    o32[oi++] = x[12];
    o32[oi++] = x[13];
    o32[oi++] = x[14];
    o32[oi++] = x[15];
  }
  var salsa20 = /* @__PURE__ */ createCipher(salsaCore, {
    allowShortKeys: true,
    counterRight: true
  });
  var xsalsa20 = /* @__PURE__ */ createCipher(salsaCore, {
    counterRight: true,
    extendNonceFn: hsalsa
  });
  var chacha20 = /* @__PURE__ */ createCipher(chachaCore, {
    counterRight: false,
    counterLength: 4
  });
  var xchacha20 = /* @__PURE__ */ createCipher(chachaCore, {
    counterRight: false,
    counterLength: 8,
    extendNonceFn: hchacha
  });
  var chacha8 = /* @__PURE__ */ createCipher(chachaCore, {
    counterRight: false,
    counterLength: 4,
    rounds: 8
  });
  var chacha12 = /* @__PURE__ */ createCipher(chachaCore, {
    counterRight: false,
    counterLength: 4,
    rounds: 12
  });
  var POW_2_130_5 = BigInt(2) ** BigInt(130) - BigInt(5);
  var POW_2_128_1 = BigInt(2) ** BigInt(16 * 8) - BigInt(1);
  var CLAMP_R = BigInt("0x0ffffffc0ffffffc0ffffffc0fffffff");
  var _0 = BigInt(0);
  var _1 = BigInt(1);
  function poly1305(msg, key) {
    bytes(msg);
    bytes(key);
    let acc = _0;
    const r = bytesToNumberLE(key.subarray(0, 16)) & CLAMP_R;
    const s = bytesToNumberLE(key.subarray(16));
    for (let i = 0; i < msg.length; i += 16) {
      const m = msg.subarray(i, i + 16);
      const n = bytesToNumberLE(m) | _1 << BigInt(8 * m.length);
      acc = (acc + n) * r % POW_2_130_5;
    }
    const res = acc + s & POW_2_128_1;
    return numberToBytesLE(res, 16);
  }
  function computeTag(fn, key, nonce, ciphertext, AAD) {
    const res = [];
    if (AAD) {
      res.push(AAD);
      const leftover2 = AAD.length % 16;
      if (leftover2 > 0)
        res.push(new Uint8Array(16 - leftover2));
    }
    res.push(ciphertext);
    const leftover = ciphertext.length % 16;
    if (leftover > 0)
      res.push(new Uint8Array(16 - leftover));
    const num = new Uint8Array(16);
    const view = createView(num);
    setBigUint64(view, 0, BigInt(AAD ? AAD.length : 0), true);
    setBigUint64(view, 8, BigInt(ciphertext.length), true);
    res.push(num);
    const authKey = fn(key, nonce, new Uint8Array(32));
    return poly1305(concatBytes(...res), authKey);
  }
  var xsalsa20poly1305 = /* @__PURE__ */ wrapCipher({ blockSize: 64, nonceLength: 24, tagLength: 16 }, function xsalsa20poly13052(key, nonce) {
    bytes(key);
    bytes(nonce);
    return {
      encrypt: (plaintext) => {
        bytes(plaintext);
        const m = concatBytes(new Uint8Array(32), plaintext);
        const c = xsalsa20(key, nonce, m);
        const authKey = c.subarray(0, 32);
        const data = c.subarray(32);
        const tag = poly1305(data, authKey);
        return concatBytes(tag, data);
      },
      decrypt: (ciphertext) => {
        bytes(ciphertext);
        if (ciphertext.length < 16)
          throw new Error("encrypted data must be at least 16 bytes");
        const c = concatBytes(new Uint8Array(16), ciphertext);
        const authKey = xsalsa20(key, nonce, new Uint8Array(32));
        const tag = poly1305(c.subarray(32), authKey);
        if (!equalBytes(c.subarray(16, 32), tag))
          throw new Error("invalid poly1305 tag");
        return xsalsa20(key, nonce, c).subarray(32);
      }
    };
  });
  var _poly1305_aead = (fn) => (key, nonce, AAD) => {
    const tagLength = 16;
    const keyLength = 32;
    bytes(key, keyLength);
    bytes(nonce);
    return {
      encrypt: (plaintext) => {
        bytes(plaintext);
        const res = fn(key, nonce, plaintext, void 0, 1);
        const tag = computeTag(fn, key, nonce, res, AAD);
        return concatBytes(res, tag);
      },
      decrypt: (ciphertext) => {
        bytes(ciphertext);
        if (ciphertext.length < tagLength)
          throw new Error(`encrypted data must be at least ${tagLength} bytes`);
        const passedTag = ciphertext.subarray(-tagLength);
        const data = ciphertext.subarray(0, -tagLength);
        const tag = computeTag(fn, key, nonce, data, AAD);
        if (!equalBytes(passedTag, tag))
          throw new Error("invalid poly1305 tag");
        return fn(key, nonce, data, void 0, 1);
      }
    };
  };
  var chacha20poly1305 = /* @__PURE__ */ wrapCipher({ blockSize: 64, nonceLength: 12, tagLength: 16 }, _poly1305_aead(chacha20));
  var xchacha20poly1305 = /* @__PURE__ */ wrapCipher({ blockSize: 64, nonceLength: 24, tagLength: 16 }, _poly1305_aead(xchacha20));

  // ../esm/_polyval.js
  var BLOCK_SIZE = 16;
  var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
  var ZEROS32 = u32(ZEROS16);
  var POLY = 225;
  var mul2 = (s0, s1, s2, s3) => {
    const hiBit = s3 & 1;
    return {
      s3: s2 << 31 | s3 >>> 1,
      s2: s1 << 31 | s2 >>> 1,
      s1: s0 << 31 | s1 >>> 1,
      s0: s0 >>> 1 ^ POLY << 24 & -(hiBit & 1)
      // reduce % poly
    };
  };
  var swapLE = (n) => (n >>> 0 & 255) << 24 | (n >>> 8 & 255) << 16 | (n >>> 16 & 255) << 8 | n >>> 24 & 255 | 0;
  function _toGHASHKey(k) {
    k.reverse();
    const hiBit = k[15] & 1;
    let carry = 0;
    for (let i = 0; i < k.length; i++) {
      const t = k[i];
      k[i] = t >>> 1 | carry;
      carry = (t & 1) << 7;
    }
    k[0] ^= -hiBit & 225;
    return k;
  }
  var estimateWindow = (bytes2) => {
    if (bytes2 > 64 * 1024)
      return 8;
    if (bytes2 > 1024)
      return 4;
    return 2;
  };
  var GHASH = class {
    // We select bits per window adaptively based on expectedLength
    constructor(key, expectedLength) {
      this.blockLen = BLOCK_SIZE;
      this.outputLen = BLOCK_SIZE;
      this.s0 = 0;
      this.s1 = 0;
      this.s2 = 0;
      this.s3 = 0;
      this.finished = false;
      key = toBytes(key);
      bytes(key, 16);
      const kView = createView(key);
      let k0 = kView.getUint32(0, false);
      let k1 = kView.getUint32(4, false);
      let k2 = kView.getUint32(8, false);
      let k3 = kView.getUint32(12, false);
      const doubles = [];
      for (let i = 0; i < 128; i++) {
        doubles.push({ s0: swapLE(k0), s1: swapLE(k1), s2: swapLE(k2), s3: swapLE(k3) });
        ({ s0: k0, s1: k1, s2: k2, s3: k3 } = mul2(k0, k1, k2, k3));
      }
      const W = estimateWindow(expectedLength || 1024);
      if (![1, 2, 4, 8].includes(W))
        throw new Error(`ghash: wrong window size=${W}, should be 2, 4 or 8`);
      this.W = W;
      const bits = 128;
      const windows = bits / W;
      const windowSize = this.windowSize = 2 ** W;
      const items = [];
      for (let w = 0; w < windows; w++) {
        for (let byte = 0; byte < windowSize; byte++) {
          let s0 = 0, s1 = 0, s2 = 0, s3 = 0;
          for (let j = 0; j < W; j++) {
            const bit = byte >>> W - j - 1 & 1;
            if (!bit)
              continue;
            const { s0: d0, s1: d1, s2: d2, s3: d3 } = doubles[W * w + j];
            s0 ^= d0, s1 ^= d1, s2 ^= d2, s3 ^= d3;
          }
          items.push({ s0, s1, s2, s3 });
        }
      }
      this.t = items;
    }
    _updateBlock(s0, s1, s2, s3) {
      s0 ^= this.s0, s1 ^= this.s1, s2 ^= this.s2, s3 ^= this.s3;
      const { W, t, windowSize } = this;
      let o0 = 0, o1 = 0, o2 = 0, o3 = 0;
      const mask = (1 << W) - 1;
      let w = 0;
      for (const num of [s0, s1, s2, s3]) {
        for (let bytePos = 0; bytePos < 4; bytePos++) {
          const byte = num >>> 8 * bytePos & 255;
          for (let bitPos = 8 / W - 1; bitPos >= 0; bitPos--) {
            const bit = byte >>> W * bitPos & mask;
            const { s0: e0, s1: e1, s2: e2, s3: e3 } = t[w * windowSize + bit];
            o0 ^= e0, o1 ^= e1, o2 ^= e2, o3 ^= e3;
            w += 1;
          }
        }
      }
      this.s0 = o0;
      this.s1 = o1;
      this.s2 = o2;
      this.s3 = o3;
    }
    update(data) {
      data = toBytes(data);
      exists(this);
      const b32 = u32(data);
      const blocks = Math.floor(data.length / BLOCK_SIZE);
      const left = data.length % BLOCK_SIZE;
      for (let i = 0; i < blocks; i++) {
        this._updateBlock(b32[i * 4 + 0], b32[i * 4 + 1], b32[i * 4 + 2], b32[i * 4 + 3]);
      }
      if (left) {
        ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
        this._updateBlock(ZEROS32[0], ZEROS32[1], ZEROS32[2], ZEROS32[3]);
        ZEROS32.fill(0);
      }
      return this;
    }
    destroy() {
      const { t } = this;
      for (const elm of t) {
        elm.s0 = 0, elm.s1 = 0, elm.s2 = 0, elm.s3 = 0;
      }
    }
    digestInto(out) {
      exists(this);
      output(out, this);
      this.finished = true;
      const { s0, s1, s2, s3 } = this;
      const o32 = u32(out);
      o32[0] = s0;
      o32[1] = s1;
      o32[2] = s2;
      o32[3] = s3;
      return out;
    }
    digest() {
      const res = new Uint8Array(BLOCK_SIZE);
      this.digestInto(res);
      this.destroy();
      return res;
    }
  };
  var Polyval = class extends GHASH {
    constructor(key, expectedLength) {
      key = toBytes(key);
      const ghKey = _toGHASHKey(key.slice());
      super(ghKey, expectedLength);
      ghKey.fill(0);
    }
    update(data) {
      data = toBytes(data);
      exists(this);
      const b32 = u32(data);
      const left = data.length % BLOCK_SIZE;
      const blocks = Math.floor(data.length / BLOCK_SIZE);
      for (let i = 0; i < blocks; i++) {
        this._updateBlock(swapLE(b32[i * 4 + 3]), swapLE(b32[i * 4 + 2]), swapLE(b32[i * 4 + 1]), swapLE(b32[i * 4 + 0]));
      }
      if (left) {
        ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
        this._updateBlock(swapLE(ZEROS32[3]), swapLE(ZEROS32[2]), swapLE(ZEROS32[1]), swapLE(ZEROS32[0]));
        ZEROS32.fill(0);
      }
      return this;
    }
    digestInto(out) {
      exists(this);
      output(out, this);
      this.finished = true;
      const { s0, s1, s2, s3 } = this;
      const o32 = u32(out);
      o32[0] = s0;
      o32[1] = s1;
      o32[2] = s2;
      o32[3] = s3;
      return out.reverse();
    }
  };
  function wrapConstructorWithKey(hashCons) {
    const hashC = (msg, key) => hashCons(key, msg.length).update(toBytes(msg)).digest();
    const tmp = hashCons(new Uint8Array(16), 0);
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (key, expectedLength) => hashCons(key, expectedLength);
    return hashC;
  }
  var ghash = wrapConstructorWithKey((key, expectedLength) => new GHASH(key, expectedLength));
  var polyval = wrapConstructorWithKey((key, expectedLength) => new Polyval(key, expectedLength));

  // ../esm/aes.js
  var BLOCK_SIZE2 = 16;
  var BLOCK_SIZE32 = 4;
  var EMPTY_BLOCK = new Uint8Array(BLOCK_SIZE2);
  var POLY2 = 283;
  function mul22(n) {
    return n << 1 ^ POLY2 & -(n >> 7);
  }
  function mul(a, b) {
    let res = 0;
    for (; b > 0; b >>= 1) {
      res ^= a & -(b & 1);
      a = mul22(a);
    }
    return res;
  }
  var sbox = /* @__PURE__ */ (() => {
    let t = new Uint8Array(256);
    for (let i = 0, x = 1; i < 256; i++, x ^= mul22(x))
      t[i] = x;
    const box = new Uint8Array(256);
    box[0] = 99;
    for (let i = 0; i < 255; i++) {
      let x = t[255 - i];
      x |= x << 8;
      box[t[i]] = (x ^ x >> 4 ^ x >> 5 ^ x >> 6 ^ x >> 7 ^ 99) & 255;
    }
    return box;
  })();
  var invSbox = /* @__PURE__ */ sbox.map((_, j) => sbox.indexOf(j));
  var rotr32_8 = (n) => n << 24 | n >>> 8;
  var rotl32_8 = (n) => n << 8 | n >>> 24;
  function genTtable(sbox2, fn) {
    if (sbox2.length !== 256)
      throw new Error("Wrong sbox length");
    const T0 = new Uint32Array(256).map((_, j) => fn(sbox2[j]));
    const T1 = T0.map(rotl32_8);
    const T2 = T1.map(rotl32_8);
    const T3 = T2.map(rotl32_8);
    const T01 = new Uint32Array(256 * 256);
    const T23 = new Uint32Array(256 * 256);
    const sbox22 = new Uint16Array(256 * 256);
    for (let i = 0; i < 256; i++) {
      for (let j = 0; j < 256; j++) {
        const idx = i * 256 + j;
        T01[idx] = T0[i] ^ T1[j];
        T23[idx] = T2[i] ^ T3[j];
        sbox22[idx] = sbox2[i] << 8 | sbox2[j];
      }
    }
    return { sbox: sbox2, sbox2: sbox22, T0, T1, T2, T3, T01, T23 };
  }
  var tableEncoding = /* @__PURE__ */ genTtable(sbox, (s) => mul(s, 3) << 24 | s << 16 | s << 8 | mul(s, 2));
  var tableDecoding = /* @__PURE__ */ genTtable(invSbox, (s) => mul(s, 11) << 24 | mul(s, 13) << 16 | mul(s, 9) << 8 | mul(s, 14));
  var xPowers = /* @__PURE__ */ (() => {
    const p = new Uint8Array(16);
    for (let i = 0, x = 1; i < 16; i++, x = mul22(x))
      p[i] = x;
    return p;
  })();
  function expandKeyLE(key) {
    bytes(key);
    const len = key.length;
    if (![16, 24, 32].includes(len))
      throw new Error(`aes: wrong key size: should be 16, 24 or 32, got: ${len}`);
    const { sbox2 } = tableEncoding;
    const k32 = u32(key);
    const Nk = k32.length;
    const subByte = (n) => applySbox(sbox2, n, n, n, n);
    const xk = new Uint32Array(len + 28);
    xk.set(k32);
    for (let i = Nk; i < xk.length; i++) {
      let t = xk[i - 1];
      if (i % Nk === 0)
        t = subByte(rotr32_8(t)) ^ xPowers[i / Nk - 1];
      else if (Nk > 6 && i % Nk === 4)
        t = subByte(t);
      xk[i] = xk[i - Nk] ^ t;
    }
    return xk;
  }
  function expandKeyDecLE(key) {
    const encKey = expandKeyLE(key);
    const xk = encKey.slice();
    const Nk = encKey.length;
    const { sbox2 } = tableEncoding;
    const { T0, T1, T2, T3 } = tableDecoding;
    for (let i = 0; i < Nk; i += 4) {
      for (let j = 0; j < 4; j++)
        xk[i + j] = encKey[Nk - i - 4 + j];
    }
    encKey.fill(0);
    for (let i = 4; i < Nk - 4; i++) {
      const x = xk[i];
      const w = applySbox(sbox2, x, x, x, x);
      xk[i] = T0[w & 255] ^ T1[w >>> 8 & 255] ^ T2[w >>> 16 & 255] ^ T3[w >>> 24];
    }
    return xk;
  }
  function apply0123(T01, T23, s0, s1, s2, s3) {
    return T01[s0 << 8 & 65280 | s1 >>> 8 & 255] ^ T23[s2 >>> 8 & 65280 | s3 >>> 24 & 255];
  }
  function applySbox(sbox2, s0, s1, s2, s3) {
    return sbox2[s0 & 255 | s1 & 65280] | sbox2[s2 >>> 16 & 255 | s3 >>> 16 & 65280] << 16;
  }
  function encrypt(xk, s0, s1, s2, s3) {
    const { sbox2, T01, T23 } = tableEncoding;
    let k = 0;
    s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
    const rounds = xk.length / 4 - 2;
    for (let i = 0; i < rounds; i++) {
      const t02 = xk[k++] ^ apply0123(T01, T23, s0, s1, s2, s3);
      const t12 = xk[k++] ^ apply0123(T01, T23, s1, s2, s3, s0);
      const t22 = xk[k++] ^ apply0123(T01, T23, s2, s3, s0, s1);
      const t32 = xk[k++] ^ apply0123(T01, T23, s3, s0, s1, s2);
      s0 = t02, s1 = t12, s2 = t22, s3 = t32;
    }
    const t0 = xk[k++] ^ applySbox(sbox2, s0, s1, s2, s3);
    const t1 = xk[k++] ^ applySbox(sbox2, s1, s2, s3, s0);
    const t2 = xk[k++] ^ applySbox(sbox2, s2, s3, s0, s1);
    const t3 = xk[k++] ^ applySbox(sbox2, s3, s0, s1, s2);
    return { s0: t0, s1: t1, s2: t2, s3: t3 };
  }
  function decrypt(xk, s0, s1, s2, s3) {
    const { sbox2, T01, T23 } = tableDecoding;
    let k = 0;
    s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
    const rounds = xk.length / 4 - 2;
    for (let i = 0; i < rounds; i++) {
      const t02 = xk[k++] ^ apply0123(T01, T23, s0, s3, s2, s1);
      const t12 = xk[k++] ^ apply0123(T01, T23, s1, s0, s3, s2);
      const t22 = xk[k++] ^ apply0123(T01, T23, s2, s1, s0, s3);
      const t32 = xk[k++] ^ apply0123(T01, T23, s3, s2, s1, s0);
      s0 = t02, s1 = t12, s2 = t22, s3 = t32;
    }
    const t0 = xk[k++] ^ applySbox(sbox2, s0, s3, s2, s1);
    const t1 = xk[k++] ^ applySbox(sbox2, s1, s0, s3, s2);
    const t2 = xk[k++] ^ applySbox(sbox2, s2, s1, s0, s3);
    const t3 = xk[k++] ^ applySbox(sbox2, s3, s2, s1, s0);
    return { s0: t0, s1: t1, s2: t2, s3: t3 };
  }
  function getDst(len, dst) {
    if (!dst)
      return new Uint8Array(len);
    bytes(dst);
    if (dst.length < len)
      throw new Error(`aes: wrong destination length, expected at least ${len}, got: ${dst.length}`);
    return dst;
  }
  function ctrCounter(xk, nonce, src, dst) {
    bytes(nonce, BLOCK_SIZE2);
    bytes(src);
    const srcLen = src.length;
    dst = getDst(srcLen, dst);
    const ctr4 = nonce;
    const c32 = u32(ctr4);
    let { s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]);
    const src32 = u32(src);
    const dst32 = u32(dst);
    for (let i = 0; i + 4 <= src32.length; i += 4) {
      dst32[i + 0] = src32[i + 0] ^ s0;
      dst32[i + 1] = src32[i + 1] ^ s1;
      dst32[i + 2] = src32[i + 2] ^ s2;
      dst32[i + 3] = src32[i + 3] ^ s3;
      let carry = 1;
      for (let i2 = ctr4.length - 1; i2 >= 0; i2--) {
        carry = carry + (ctr4[i2] & 255) | 0;
        ctr4[i2] = carry & 255;
        carry >>>= 8;
      }
      ({ s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]));
    }
    const start = BLOCK_SIZE2 * Math.floor(src32.length / BLOCK_SIZE32);
    if (start < srcLen) {
      const b32 = new Uint32Array([s0, s1, s2, s3]);
      const buf = u8(b32);
      for (let i = start, pos = 0; i < srcLen; i++, pos++)
        dst[i] = src[i] ^ buf[pos];
    }
    return dst;
  }
  function ctr32(xk, isLE2, nonce, src, dst) {
    bytes(nonce, BLOCK_SIZE2);
    bytes(src);
    dst = getDst(src.length, dst);
    const ctr4 = nonce;
    const c32 = u32(ctr4);
    const view = createView(ctr4);
    const src32 = u32(src);
    const dst32 = u32(dst);
    const ctrPos = isLE2 ? 0 : 12;
    const srcLen = src.length;
    let ctrNum = view.getUint32(ctrPos, isLE2);
    let { s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]);
    for (let i = 0; i + 4 <= src32.length; i += 4) {
      dst32[i + 0] = src32[i + 0] ^ s0;
      dst32[i + 1] = src32[i + 1] ^ s1;
      dst32[i + 2] = src32[i + 2] ^ s2;
      dst32[i + 3] = src32[i + 3] ^ s3;
      ctrNum = ctrNum + 1 >>> 0;
      view.setUint32(ctrPos, ctrNum, isLE2);
      ({ s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]));
    }
    const start = BLOCK_SIZE2 * Math.floor(src32.length / BLOCK_SIZE32);
    if (start < srcLen) {
      const b32 = new Uint32Array([s0, s1, s2, s3]);
      const buf = u8(b32);
      for (let i = start, pos = 0; i < srcLen; i++, pos++)
        dst[i] = src[i] ^ buf[pos];
    }
    return dst;
  }
  var ctr = wrapCipher({ blockSize: 16, nonceLength: 16 }, function ctr2(key, nonce) {
    bytes(key);
    bytes(nonce, BLOCK_SIZE2);
    function processCtr(buf, dst) {
      const xk = expandKeyLE(key);
      const n = nonce.slice();
      const out = ctrCounter(xk, n, buf, dst);
      xk.fill(0);
      n.fill(0);
      return out;
    }
    return {
      encrypt: (plaintext, dst) => processCtr(plaintext, dst),
      decrypt: (ciphertext, dst) => processCtr(ciphertext, dst)
    };
  });
  function validateBlockDecrypt(data) {
    bytes(data);
    if (data.length % BLOCK_SIZE2 !== 0) {
      throw new Error(`aes/(cbc-ecb).decrypt ciphertext should consist of blocks with size ${BLOCK_SIZE2}`);
    }
  }
  function validateBlockEncrypt(plaintext, pcks5, dst) {
    let outLen = plaintext.length;
    const remaining = outLen % BLOCK_SIZE2;
    if (!pcks5 && remaining !== 0)
      throw new Error("aec/(cbc-ecb): unpadded plaintext with disabled padding");
    const b = u32(plaintext);
    if (pcks5) {
      let left = BLOCK_SIZE2 - remaining;
      if (!left)
        left = BLOCK_SIZE2;
      outLen = outLen + left;
    }
    const out = getDst(outLen, dst);
    const o = u32(out);
    return { b, o, out };
  }
  function validatePCKS(data, pcks5) {
    if (!pcks5)
      return data;
    const len = data.length;
    if (!len)
      throw new Error(`aes/pcks5: empty ciphertext not allowed`);
    const lastByte = data[len - 1];
    if (lastByte <= 0 || lastByte > 16)
      throw new Error(`aes/pcks5: wrong padding byte: ${lastByte}`);
    const out = data.subarray(0, -lastByte);
    for (let i = 0; i < lastByte; i++)
      if (data[len - i - 1] !== lastByte)
        throw new Error(`aes/pcks5: wrong padding`);
    return out;
  }
  function padPCKS(left) {
    const tmp = new Uint8Array(16);
    const tmp32 = u32(tmp);
    tmp.set(left);
    const paddingByte = BLOCK_SIZE2 - left.length;
    for (let i = BLOCK_SIZE2 - paddingByte; i < BLOCK_SIZE2; i++)
      tmp[i] = paddingByte;
    return tmp32;
  }
  var ecb = wrapCipher({ blockSize: 16 }, function ecb2(key, opts = {}) {
    bytes(key);
    const pcks5 = !opts.disablePadding;
    return {
      encrypt: (plaintext, dst) => {
        bytes(plaintext);
        const { b, o, out: _out } = validateBlockEncrypt(plaintext, pcks5, dst);
        const xk = expandKeyLE(key);
        let i = 0;
        for (; i + 4 <= b.length; ) {
          const { s0, s1, s2, s3 } = encrypt(xk, b[i + 0], b[i + 1], b[i + 2], b[i + 3]);
          o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
        }
        if (pcks5) {
          const tmp32 = padPCKS(plaintext.subarray(i * 4));
          const { s0, s1, s2, s3 } = encrypt(xk, tmp32[0], tmp32[1], tmp32[2], tmp32[3]);
          o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
        }
        xk.fill(0);
        return _out;
      },
      decrypt: (ciphertext, dst) => {
        validateBlockDecrypt(ciphertext);
        const xk = expandKeyDecLE(key);
        const out = getDst(ciphertext.length, dst);
        const b = u32(ciphertext);
        const o = u32(out);
        for (let i = 0; i + 4 <= b.length; ) {
          const { s0, s1, s2, s3 } = decrypt(xk, b[i + 0], b[i + 1], b[i + 2], b[i + 3]);
          o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
        }
        xk.fill(0);
        return validatePCKS(out, pcks5);
      }
    };
  });
  var cbc = wrapCipher({ blockSize: 16, nonceLength: 16 }, function cbc2(key, iv, opts = {}) {
    bytes(key);
    bytes(iv, 16);
    const pcks5 = !opts.disablePadding;
    return {
      encrypt: (plaintext, dst) => {
        const xk = expandKeyLE(key);
        const { b, o, out: _out } = validateBlockEncrypt(plaintext, pcks5, dst);
        const n32 = u32(iv);
        let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
        let i = 0;
        for (; i + 4 <= b.length; ) {
          s0 ^= b[i + 0], s1 ^= b[i + 1], s2 ^= b[i + 2], s3 ^= b[i + 3];
          ({ s0, s1, s2, s3 } = encrypt(xk, s0, s1, s2, s3));
          o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
        }
        if (pcks5) {
          const tmp32 = padPCKS(plaintext.subarray(i * 4));
          s0 ^= tmp32[0], s1 ^= tmp32[1], s2 ^= tmp32[2], s3 ^= tmp32[3];
          ({ s0, s1, s2, s3 } = encrypt(xk, s0, s1, s2, s3));
          o[i++] = s0, o[i++] = s1, o[i++] = s2, o[i++] = s3;
        }
        xk.fill(0);
        return _out;
      },
      decrypt: (ciphertext, dst) => {
        validateBlockDecrypt(ciphertext);
        const xk = expandKeyDecLE(key);
        const n32 = u32(iv);
        const out = getDst(ciphertext.length, dst);
        const b = u32(ciphertext);
        const o = u32(out);
        let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
        for (let i = 0; i + 4 <= b.length; ) {
          const ps0 = s0, ps1 = s1, ps2 = s2, ps3 = s3;
          s0 = b[i + 0], s1 = b[i + 1], s2 = b[i + 2], s3 = b[i + 3];
          const { s0: o0, s1: o1, s2: o2, s3: o3 } = decrypt(xk, s0, s1, s2, s3);
          o[i++] = o0 ^ ps0, o[i++] = o1 ^ ps1, o[i++] = o2 ^ ps2, o[i++] = o3 ^ ps3;
        }
        xk.fill(0);
        return validatePCKS(out, pcks5);
      }
    };
  });
  var cfb = wrapCipher({ blockSize: 16, nonceLength: 16 }, function cfb2(key, iv) {
    bytes(key);
    bytes(iv, 16);
    function processCfb(src, isEncrypt, dst) {
      const xk = expandKeyLE(key);
      const srcLen = src.length;
      dst = getDst(srcLen, dst);
      const src32 = u32(src);
      const dst32 = u32(dst);
      const next32 = isEncrypt ? dst32 : src32;
      const n32 = u32(iv);
      let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
      for (let i = 0; i + 4 <= src32.length; ) {
        const { s0: e0, s1: e1, s2: e2, s3: e3 } = encrypt(xk, s0, s1, s2, s3);
        dst32[i + 0] = src32[i + 0] ^ e0;
        dst32[i + 1] = src32[i + 1] ^ e1;
        dst32[i + 2] = src32[i + 2] ^ e2;
        dst32[i + 3] = src32[i + 3] ^ e3;
        s0 = next32[i++], s1 = next32[i++], s2 = next32[i++], s3 = next32[i++];
      }
      const start = BLOCK_SIZE2 * Math.floor(src32.length / BLOCK_SIZE32);
      if (start < srcLen) {
        ({ s0, s1, s2, s3 } = encrypt(xk, s0, s1, s2, s3));
        const buf = u8(new Uint32Array([s0, s1, s2, s3]));
        for (let i = start, pos = 0; i < srcLen; i++, pos++)
          dst[i] = src[i] ^ buf[pos];
        buf.fill(0);
      }
      xk.fill(0);
      return dst;
    }
    return {
      encrypt: (plaintext, dst) => processCfb(plaintext, true, dst),
      decrypt: (ciphertext, dst) => processCfb(ciphertext, false, dst)
    };
  });
  function computeTag2(fn, isLE2, key, data, AAD) {
    const h = fn.create(key, data.length + (AAD?.length || 0));
    if (AAD)
      h.update(AAD);
    h.update(data);
    const num = new Uint8Array(16);
    const view = createView(num);
    if (AAD)
      setBigUint64(view, 0, BigInt(AAD.length * 8), isLE2);
    setBigUint64(view, 8, BigInt(data.length * 8), isLE2);
    h.update(num);
    return h.digest();
  }
  var gcm = wrapCipher({ blockSize: 16, nonceLength: 12, tagLength: 16 }, function gcm2(key, nonce, AAD) {
    bytes(nonce);
    if (nonce.length === 0)
      throw new Error("aes/gcm: empty nonce");
    const tagLength = 16;
    function _computeTag(authKey, tagMask, data) {
      const tag = computeTag2(ghash, false, authKey, data, AAD);
      for (let i = 0; i < tagMask.length; i++)
        tag[i] ^= tagMask[i];
      return tag;
    }
    function deriveKeys() {
      const xk = expandKeyLE(key);
      const authKey = EMPTY_BLOCK.slice();
      const counter = EMPTY_BLOCK.slice();
      ctr32(xk, false, counter, counter, authKey);
      if (nonce.length === 12) {
        counter.set(nonce);
      } else {
        const nonceLen = EMPTY_BLOCK.slice();
        const view = createView(nonceLen);
        setBigUint64(view, 8, BigInt(nonce.length * 8), false);
        ghash.create(authKey).update(nonce).update(nonceLen).digestInto(counter);
      }
      const tagMask = ctr32(xk, false, counter, EMPTY_BLOCK);
      return { xk, authKey, counter, tagMask };
    }
    return {
      encrypt: (plaintext) => {
        bytes(plaintext);
        const { xk, authKey, counter, tagMask } = deriveKeys();
        const out = new Uint8Array(plaintext.length + tagLength);
        ctr32(xk, false, counter, plaintext, out);
        const tag = _computeTag(authKey, tagMask, out.subarray(0, out.length - tagLength));
        out.set(tag, plaintext.length);
        xk.fill(0);
        return out;
      },
      decrypt: (ciphertext) => {
        bytes(ciphertext);
        if (ciphertext.length < tagLength)
          throw new Error(`aes/gcm: ciphertext less than tagLen (${tagLength})`);
        const { xk, authKey, counter, tagMask } = deriveKeys();
        const data = ciphertext.subarray(0, -tagLength);
        const passedTag = ciphertext.subarray(-tagLength);
        const tag = _computeTag(authKey, tagMask, data);
        if (!equalBytes(tag, passedTag))
          throw new Error("aes/gcm: invalid ghash tag");
        const out = ctr32(xk, false, counter, data);
        authKey.fill(0);
        tagMask.fill(0);
        xk.fill(0);
        return out;
      }
    };
  });
  var limit = (name, min, max) => (value) => {
    if (!Number.isSafeInteger(value) || min > value || value > max)
      throw new Error(`${name}: invalid value=${value}, must be [${min}..${max}]`);
  };
  var siv = wrapCipher({ blockSize: 16, nonceLength: 12, tagLength: 16 }, function siv2(key, nonce, AAD) {
    const tagLength = 16;
    const AAD_LIMIT = limit("AAD", 0, 2 ** 36);
    const PLAIN_LIMIT = limit("plaintext", 0, 2 ** 36);
    const NONCE_LIMIT = limit("nonce", 12, 12);
    const CIPHER_LIMIT = limit("ciphertext", 16, 2 ** 36 + 16);
    bytes(nonce);
    NONCE_LIMIT(nonce.length);
    if (AAD) {
      bytes(AAD);
      AAD_LIMIT(AAD.length);
    }
    function deriveKeys() {
      const len = key.length;
      if (len !== 16 && len !== 24 && len !== 32)
        throw new Error(`key length must be 16, 24 or 32 bytes, got: ${len} bytes`);
      const xk = expandKeyLE(key);
      const encKey = new Uint8Array(len);
      const authKey = new Uint8Array(16);
      const n32 = u32(nonce);
      let s0 = 0, s1 = n32[0], s2 = n32[1], s3 = n32[2];
      let counter = 0;
      for (const derivedKey of [authKey, encKey].map(u32)) {
        const d32 = u32(derivedKey);
        for (let i = 0; i < d32.length; i += 2) {
          const { s0: o0, s1: o1 } = encrypt(xk, s0, s1, s2, s3);
          d32[i + 0] = o0;
          d32[i + 1] = o1;
          s0 = ++counter;
        }
      }
      xk.fill(0);
      return { authKey, encKey: expandKeyLE(encKey) };
    }
    function _computeTag(encKey, authKey, data) {
      const tag = computeTag2(polyval, true, authKey, data, AAD);
      for (let i = 0; i < 12; i++)
        tag[i] ^= nonce[i];
      tag[15] &= 127;
      const t32 = u32(tag);
      let s0 = t32[0], s1 = t32[1], s2 = t32[2], s3 = t32[3];
      ({ s0, s1, s2, s3 } = encrypt(encKey, s0, s1, s2, s3));
      t32[0] = s0, t32[1] = s1, t32[2] = s2, t32[3] = s3;
      return tag;
    }
    function processSiv(encKey, tag, input) {
      let block = tag.slice();
      block[15] |= 128;
      return ctr32(encKey, true, block, input);
    }
    return {
      encrypt: (plaintext) => {
        bytes(plaintext);
        PLAIN_LIMIT(plaintext.length);
        const { encKey, authKey } = deriveKeys();
        const tag = _computeTag(encKey, authKey, plaintext);
        const out = new Uint8Array(plaintext.length + tagLength);
        out.set(tag, plaintext.length);
        out.set(processSiv(encKey, tag, plaintext));
        encKey.fill(0);
        authKey.fill(0);
        return out;
      },
      decrypt: (ciphertext) => {
        bytes(ciphertext);
        CIPHER_LIMIT(ciphertext.length);
        const tag = ciphertext.subarray(-tagLength);
        const { encKey, authKey } = deriveKeys();
        const plaintext = processSiv(encKey, tag, ciphertext.subarray(0, -tagLength));
        const expectedTag = _computeTag(encKey, authKey, plaintext);
        encKey.fill(0);
        authKey.fill(0);
        if (!equalBytes(tag, expectedTag))
          throw new Error("invalid polyval tag");
        return plaintext;
      }
    };
  });

  // ../src/crypto.ts
  var cr = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
  function randomBytes(bytesLength = 32) {
    if (cr && typeof cr.getRandomValues === "function")
      return cr.getRandomValues(new Uint8Array(bytesLength));
    throw new Error("crypto.getRandomValues must be defined");
  }
  function getWebcryptoSubtle() {
    if (cr && typeof cr.subtle === "object" && cr.subtle != null)
      return cr.subtle;
    throw new Error("crypto.subtle must be defined");
  }

  // ../esm/webcrypto.js
  var utils = {
    async encrypt(key, keyParams, cryptParams, plaintext) {
      const cr2 = getWebcryptoSubtle();
      const iKey = await cr2.importKey("raw", key, keyParams, true, ["encrypt"]);
      const ciphertext = await cr2.encrypt(cryptParams, iKey, plaintext);
      return new Uint8Array(ciphertext);
    },
    async decrypt(key, keyParams, cryptParams, ciphertext) {
      const cr2 = getWebcryptoSubtle();
      const iKey = await cr2.importKey("raw", key, keyParams, true, ["decrypt"]);
      const plaintext = await cr2.decrypt(cryptParams, iKey, ciphertext);
      return new Uint8Array(plaintext);
    }
  };
  var mode = {
    CBC: "AES-CBC",
    CTR: "AES-CTR",
    GCM: "AES-GCM"
  };
  function getCryptParams(algo, nonce, AAD) {
    if (algo === mode.CBC)
      return { name: mode.CBC, iv: nonce };
    if (algo === mode.CTR)
      return { name: mode.CTR, counter: nonce, length: 64 };
    if (algo === mode.GCM) {
      if (AAD)
        return { name: mode.GCM, iv: nonce, additionalData: AAD };
      else
        return { name: mode.GCM, iv: nonce };
    }
    throw new Error("unknown aes block mode");
  }
  function generate(algo) {
    return (key, nonce, AAD) => {
      bytes(key);
      bytes(nonce);
      const keyParams = { name: algo, length: key.length * 8 };
      const cryptParams = getCryptParams(algo, nonce, AAD);
      return {
        // keyLength,
        encrypt(plaintext) {
          bytes(plaintext);
          return utils.encrypt(key, keyParams, cryptParams, plaintext);
        },
        decrypt(ciphertext) {
          bytes(ciphertext);
          return utils.decrypt(key, keyParams, cryptParams, ciphertext);
        }
      };
    };
  }
  var cbc3 = generate(mode.CBC);
  var ctr3 = generate(mode.CTR);
  var gcm3 = generate(mode.GCM);

  // input.js
  var utils2 = { bytesToHex, bytesToUtf8, hexToBytes, randomBytes, utf8ToBytes };
  return __toCommonJS(input_exports);
})();
/*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */
