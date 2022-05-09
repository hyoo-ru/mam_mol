# $mol_state_shared

Shared local-first offline-ready store with [CROWD](https://github.com/hyoo-ru/crowd.hyoo.ru) conflict resolution.

## Comparison

| Property            | $mol_state_shared           | [Logux](https://logux.io/)
|---------------------|-----------------------------|---------------------------
| Tab synchronization | Auto                        | Optional
| Conflict resolution | CROWD                       | CRDT (text doesn't support yet) / custom
| Crypto encryption   | Not yet                     | Single user
| Long offline        | Available                   | Log compress rejects old changes
| Persistent storage  | It will be IndexedDB        | IndexedDB / LocalStorage / custom
