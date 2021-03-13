# Conflict-free Replicable Ordered Washed Data

## Key Properties

- **Conflict-free**. Any states can merged without conflicts. Strong eventual consistency.
- **Replicable**. Merge result independent of merge order on different actors. Branch merge is semilattice.
- **Ordered**. Changes from same actor always ordered and can't be reordered. Patches aren't commutative.
- **Washed**. Historical data is not stored (except tombstones).
- **Idempotence**. Same patch can be merged repeatedly.
