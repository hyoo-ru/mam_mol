# Conflict-free Replicable Ordered Washed Data

## Key Properties

- **Conflict-free**. Any states can merged without conflicts. Strong Eventual Consistency.
- **Replicable**. Merge result independent of merge order on different actors. Branch merge is semilattice.
- **Ordered**. Changes from same actor always ordered and can't be reordered. Patches aren't commutative but are idempotent.
- **Washed**. Historical data is not stored (except tombstones). Past state can't be reproduced.

## Available Stores

- [CROWD Counter](./numb) - Equivalent of dCRDT PN-Counter with same properties.
- [CROWD Register](./reg) - Just CvRDT LWW-Register with same properties.
- [CROWD Unordered Set](./set) - Equivalent of dCRDT LWW-Element-Set with same properties.
- [CROWD Ordered Set](./list) - No CRDT alternatives.
- [CROWD Dictionary](./dict) - No CRDT alternatives.

## Common API

- `toJSON( version_min = 0 )` Returns patch to remove gap between `version_min` and current that can be applied to actor that saw state until `version_min` from this actor.
- `merge( data )` Merges incremental patch to current state.
- `fork( actor: number )` Makes independent clone with fixed actor id for testing purposes.
