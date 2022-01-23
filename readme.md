# $mol

Reactive micro-modular ui framework. Very simple, but very powerful!

# Contents

- [Levels](#levels)
- [Features](#features)
- [Applications](https://apps.hyoo.ru/)
- [Benchmarks](#benchmarks)
- [Articles](#articles)
- [Discussions](https://teleg.run/mam_mol)
- [Quick start](#quick-start)
- [Tutorials](#tutorials)
- [Rationale](#rationale)
- [Modules](#modules)
- [Usage from NPM](#usage-from-npm-ecosystem)
- [Contributors](#contributors)
- [Cool stuff](#cool-stuff)
- [Donate](#donate)

# Levels

1. ✅ **Library.** $mol is just set of small libs. Honor libs: jQuery, React, Redux, MobX.
2. ✅ **Framework.** $mol is very flexible, but simple. Honor framewworks: Angular, Vue, Ember.
3. ✅ **Сonstruction Kit.** $mol has many costomizable ui components. Honor construction kits: Ext, OpenUI5.
4. ⭕ **Platform.** $mol doesn't fit it yet. Honor platforms: Drupal, SAP, 1C.

# Features

- [Zero configuration](#zero-configuration). Just checkout and use it.
- [Lazy rendering/evaluating/loading etc](#lazyness).
- [Full reactivity](#reactivity) in all application layers. Not only between View and ViewModel.
- [Automatic dependency tracking](#reactivity) between reactive containers. No need to manual publish/subscribe/unsubscribe and streams routing.
- [Effective state synchronization](mem) in right way. 
- Automatic inclusion of modules in package at compile time. No need for manually importing them. [Just use it](#zero-configuration).
- Very small modules. [All of them are optional](#zero-configuration).
- Cross platform. [Support any environment](#zero-configuration) (NodeJS, Web browsers, Cordova).
- Static typing ([TypeScript](https://www.typescriptlang.org/)). Full IDE support.
- Full customization. No hidden implementation. [All aspects are overridable](#lego-components).
- [Lifecycle management](#reactivity). Automatic destruction of unnecessary objects.
- [Easy debugging](#debugging). User friendly id's of all objects. Quick access to all objects from console.
- Easy [user friendly logging](#debugging) of all state changes.
- Pseudosynchronous code. [Asynchrony is abstracted by reactivity](#reactivity). No callbacks/promises/streams hell. No async/await/yield virus.
- Automatic [BEM](https://en.bem.info/methodology/naming-convention/)-attributes generation for elements.


## Usage from NPM ecosystem

You can manually build any $mol module as standalone lib:

```
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start path/to/module
cp path/to/module/-/* your/build/directory
```

Some libs are already published to NPM:

- [$mol_data](data) - Static typed DTO with strict runtime validation and user friendly error messages.
- [$mol_strict](strict) - Makes JS runtime more strict.
- [$mol_time](time) - Proper date/time/duration/interval arithmetic.
- [$mol_type](type) - TypeScript meta types for complex logic.
- [$mol_regexp](regexp) - Regular Expressions builder.
- [$mol_crypto](crypto) - Efficient cryptographic algorithms.
- [$mol_db](db) - Static typed IndexedDB wrapper with auto migrations.
- [$hyoo_crowd](https://github.com/hyoo-ru/crowd.hyoo.ru) - Conflict-free Reinterpretable Ordered Washed Data.
- [$mol_plot](plot) - [Fastest](https://bench.hyoo.ru/app/#!bench=https%3A%2F%2Fbench.hyoo.ru%2Fchart%2Frope%2F/sample=canvasjs~mol~chartjs/sort=update) plot lib for vector graphics.

All of them are very small, powerfull and fastest. Use it for your pleasure.

# Contributors

This project exists thanks to all the people who contribute.

- [nin-jin](https://github.com/nin-jin)
- [ar2r13](https://github.com/ar2r13)
- [zerkalica](https://github.com/zerkalica)
- [muleronko](https://github.com/muleronko)
- [slava-viktorov](https://github.com/slava-viktorov)
- [CONTRIBUTING](https://github.com/hyoo-ru/mol/blob/master/CONTRIBUTING.md)

# Donate

- **[Shut up and take my money](http://yasobe.ru/na/mol)**
