# $mol_store_shared

Shared local-first offline-ready store with [CROWD](https://github.com/hyoo-ru/crowd.hyoo.ru) conflict resulution.

## Comparison

| Property            | $mol_store_shared           | [Logux](https://logux.io/)
|---------------------|-----------------------------|---------------------------
| Tab synchronization | Instant, sync               | Optional, async
| Conflict resolution | CROWD                       | CRDT (text doesn't support yet) / custom
| Crypto encryption   | Not yet                     | Single user
| What is stored      | Actual state, O(state size) | Total history, O(changes count)
| Long offline        | Available                   | Log compress rejects old changes
| Persistent storage  | LocalStorage                | IndexedDB / LocalStorage / custom
