# Overview

$mol - does not have any core. $mol is nothing more than a set of isomorphic modules, well docked to each other. Each module performs its function well. The modules can be used anywhere, including other frameworks. Some of them are published in npm.

Most modules are designed to be deadly simple. Some modules have a readme.md file, not all of them need it. It is good practice to look at the source code, most often you will not see more than 100 lines of code.Yes, the repository has a large number of folders, 199 of them. It may be time to reorganize them, but overall it is not a problem for application development.

I get the impression that people tend to pay a lot of attention to the richness of the framework ecosystem when choosing what to use for the frontend. $mol has enough modules to cover most needs. The missing ones are easy to build on top of existing modules. And of course you can get package from npm.

## Modular system MAM - Mam owns language-Agnostic Modules

MAM is a modular system in which $mol modules live. The agnostic module is the directory with the files that implement it. The module is primary, and its implementation is secondary. MAM is a set of rules/restrictions/principles that allow us to turn our code into LEGO cubes with minimal effort. The MAM implementation, builds the code described by these rules into several bundles.

I would like to call MAM a methodology, but there is still no specification. Only an implementation in one of the $mol modules and not many articles.

I believe that you should start with MAM. Clone a repository, build it, run it, figure out how to create and use modules. And then, to deal with the reactivity system.

## Reactivity

If you know how Mobx works, then you already have an understanding of how the reactivity system in $mol works.

Unlike control-flow architectures, $mol implements the data-flow architecture. All applications are defined as a set of classes having properties. Every property is defined as some function from another property (and properties of another classes too). Properties, which were called while processing a function are saved as dependencies of current property. When their values change, all dependent properties would be invalidated cascading. Calling a non relevant property would lead to its pre-actualization.

In this way the whole application at the execution stage represents a huge tree of dependencies, with a special property at the root of the tree, which in case of invalidation would actualize itself automatically. And as any property always knows, whether something depends on it or not, then it is given a simple and reliable mechanism of controlling lifecycle of objects - they are created when dependence appears and are destroyed when nothing depends on them. This solves two fundamental problems: resources leaks and cache invalidation. 

The reactive system works at all levels of the application, not just in the view-viewModel.

## View components

When you understand how to use the reactivity system, you can move on to creating view components.

$mol components, fully divided into five parts:
1) Declarative description of the component interface and data flow(required, others are optional)
1) Imperative behavior of the component
1) Styles
1) Localization
1) Tests

There is a basic view class with properties like events, attributes, children, etc. - It acts as a wrapper on the DOM element. When any of its properties become not actual, the reactive system automatically triggers its actualization and this updates the element in the DOM-tree.

Custom components, inherited from a base class and customize its layout, behavior, styles. The reactive system ensures that the DOM-tree is updated in a point-by-point and optimized way when the data on which a component depends on changes.

The hardest part here is learning the `view.tree'. This is the language in which the component interface and data flows are described. The difficulty is that it is not familiar. We're used to something similar to html, but this is more of a typescript interface.

With `view.tree' we say:
- what our component is called
- which component it inherits from
- what components it owns
- how these components are composed in its children
- what states the component has
- which data flows are linked to components and states

The view.tree builder turns the description into a typescript class.

## Next
In the next section we study [MAM](./mam.md)
