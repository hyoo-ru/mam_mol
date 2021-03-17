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
- Cross-merge available between different CROWD Storages.

### Ordered

- Changes from same actor always ordered and can't be reordered.
- Deltas from same actor aren't commutative.
- All deltas are idempotent.

### Washed

- Historical data isn't stored (except tombstones).
- Small footprint. Metadata size ~= user data size.
- Past state can't be reproduced.
- Garbage collection isn't required.

### Data

- Closest to user data as more as possible. Just list of values and list of stamps.
- Deltas are simple slices of full state.
- Deltas can be merged together to reduce transmit size.

## Comparison

### With CRDT

- CRDT has stronger guarantees for events commutativity. This gives a strong restriction for deleting old data. CROWD slightly weakens the guarantees, which gives more compact data representation without garbage collection and compactification.
- Some CROWD storages is accidentally dCRDT too.
- Stored CROWD State can be reinterpredeted by different CROWD Storages. CRDT structures are incompatible in general.

### With OT

- OT stores full edit history which is redundant. CROWD competely erases history. For history navigation purposes periodically snapshots is better solution for both.
- OT requires history rebase for convergence. This is too slow and complex. CROWD merge is very simple and fast.

## Available Stores

- [CROWD Counter](./numb) - Equivalent of dCRDT PN-Counter with same properties.
- [CROWD Register](./reg) - Just CvRDT LWW-Register with same properties.
- [CROWD Unordered Set](./set) - Equivalent of dCRDT LWW-Element-Set with same properties.
- [CROWD Ordered Set](./list) - No CRDT alternatives.
- [CROWD Tagged Union](./union) - No CRDT alternatives.
- [CROWD Dictionary](./dict) - No CRDT alternatives.
- CROWD Graph - Coming soon.
- CROWD JSON - Coming soon.
- CROWD Text - Coming soon.

## Utilites

- [CROWD Store](./store) - Base store class with common CROWD API.
- [CROWD Stamper](./stamper) - Manages versions through composed CROWD Stores.

## Common API

- `toJSON( version_min = 0 )` Returns delta between `version_min` and current.
- `apply( delta )` Merges delta to current state.
- `delta( store )` Returns delta between base fork and current.
- `fork( actor: number )` Makes independent clone with fixed actor id for testing purposes.

## State/Delta Format

```javascript
{
	"values": ( string | number | boolean | null )[]
	"stamps": number[] // ints
}
```

## Usage Example

```typescript
import {
  $mol_crowd_numb,
  $mol_crowd_reg,
  $mol_crowd_set
  $mol_crowd_list,
  $mol_crowd_union,
  $mol_crowd_dict,
} from 'mol_crowd_all'

// Dynamic typing in custom store
const MyStore = $mol_crowd_dict.of(
  $mol_crowd_union.of({
    counter: $mol_crowd_numb,
    boolean: $mol_crowd_reg,
    number: $mol_crowd_reg,
    string: $mol_crowd_reg,
    sequence: $mol_crowd_list
  })
);

// Normal store creation
const base = MyStore.make();

// Make independent forks for testng
const alice = base.fork(1);
const bob = base.fork(2);
const carol = base.fork(3);

// Twice change register named "foo"
alice.for("foo").to("string").str = "A1";
alice.for("foo").to("string").str = "A2";

// Change register named "foo" then converts it to register and insert value
bob.for("foo").to("string").str = "B1";
bob.for("foo").to("sequence").insert("B2").insert("B3");

// Serial insert to sequence named "foo"
carol.for("foo").to("sequence").insert("C1").insert("C2");

// Make deltas
const alice_delta = alice.delta(base);
const bob_delta = bob.delta(base);
const carol_delta = carol.delta(base);

// Cross merge all of them
alice.apply(bob_delta).apply(carol_delta);
bob.apply(alice_delta).apply(carol_delta);
carol.apply(bob_delta).apply(alice_delta);

// ["A2","C1","C2","B1","B2","B3"]
console.log(
  alice.for("foo").as("sequence").items,
  bob.for("foo").as("sequence").items,
  carol.for("foo").as("sequence").items
);
```

[Sandbox](https://codepen.io/nin-jin/pen/JjbqRYX?editors=0011)
