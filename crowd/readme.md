# Conflict-free Reinterpretable Ordered Washed Data (CROWD)

![](https://habrastorage.org/webt/lz/d_/kh/lzd_khq4fnql2hgo3zlhfwkebg4.png)

## Key Properties

### Conflict-free

- Any states can merged without conflicts.
- Strong Eventual Consistency.
- Merge result independent of merge order on different actors.
- Branch merge is semilattice.

### Reinterpretable

- Same state can be reinterpreted as any CROWD Storage.
- CROWD Storage type can be changed dynamicaly without data migration.
- Cross-merge available through different CROWD Storages.

### Ordered

- Changes from same actor always ordered and can't be reordered.
- Deltas from same actor aren't commutative.
- All deltas are idempotent.

### Washed

- Historical data isn't stored (except tombstones).
- Past state can't be reproduced.
- Garbage collection isn't required.

## Available Stores

- [CROWD Counter](./numb) - Equivalent of dCRDT PN-Counter with same properties.
- [CROWD Register](./reg) - Just CvRDT LWW-Register with same properties.
- [CROWD Unordered Set](./set) - Equivalent of dCRDT LWW-Element-Set with same properties.
- [CROWD Ordered Set](./list) - No CRDT alternatives.
- [CROWD Dictionary](./dict) - No CRDT alternatives.

## Utilites

- [CROWD Store](./store) - Base store class with common CROWD API.
- [CROWD Stamper](./stamper) - Manages versions through composed CROWD Stores.

## Common API

- `toJSON( version_min = 0 )` Returns delta between `version_min` and current.
- `apply( delta )` Merges delta to current state.
- `delta( store )` Returns delta between base fork and current.
- `fork( actor: number )` Makes independent clone with fixed actor id for testing purposes.
