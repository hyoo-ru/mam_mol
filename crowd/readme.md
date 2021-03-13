# Conflict-free Replicable Ordered Washed Data

## Key Properties

- **Conflict-free**. Any states can merged without conflicts. Strong eventual consistency.
- **Replicable**. Merge result independent of merge order on different actors. Branch merge is semilattice.
- **Ordered**. Changes from same actor always ordered and can't be reordered. Patches aren't commutative but are idempotent.
- **Washed**. Historical data is not stored (except tombstones). Past state can't be reproduced.

## Available Stores

- [CROWD Register](./reg) - Just CvRDT LWW-Register with same properties.
- [CROWD Unordered Set](./set) - Equivalent of dCRDT LWW-Element-Set with same properties.
- [CROWD Ordered Set](./list) - No CRDT alternatives.
- [CROWD Dictionary](./dict) - No CRDT alternatives.
