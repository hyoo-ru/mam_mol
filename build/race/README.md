# Checker race

Script for dev server audit races: breaks types in a file, requests audit, fixes the file in 0-900 ms while audit is running, then checks audit 3 s later.

```sh
sleep 100000 | npx mam
node mol/build/race/race.js mol/textarea/textarea.view.ts http://localhost:9080/mol/textarea/-/web.audit.js stale 25
```

Modes:

- `stale` - error is fixed, but audit still fails. Prints `stale N of runs`, should be 0.
- `swap` - one error is replaced by another, audit must show only the new one. Prints `right N of runs`, should be all.
- `stuck` - waits for stale error and checks whether it goes away in 5 and 10 s without file changes.

Choose module with typecheck about 1 s, otherwise the window is too narrow. Source file is restored at the end.
