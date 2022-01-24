

--




## Zero configuration

Instead of ensuring configurability by any means, $mol concentrates on everything working good directly out of the box and does not bother $mol's developer by a typical configuration process. (Nevertheless, this doesn't exclude setup for your needs if required)

## Lego components

$mol uses the component approach to building interfaces, however **every component is self-sufficient** and can be used as a self-sufficient application. Small components are aggregated inside larger components etc.

Unlike another frameworks, $mol does not isolate the internals of its components. Vice versa, a comfortable mechanism is provided for developers to configure them, the creator of the component doesn't have to do any additional actions.

## Lazyness

Laziness has many incarnations. It is not to load something that will not be processed. Not to compute what will not be rendered. Don't render what won't be seen. The basis of laziness is the semantics of pull. The idea is to do nothing until no one needs the result. The whole architecture of $mol is built on this idea.

## Virulization

The DOM elements are created only for the visible part of the page. As you scroll down, further parts of the page are rendered. And when you scroll up, on the contrary, they are removed.

## Debugging

$mol pays special attention to debugging possibilities and research of how its code works.

A human friendly `id` is automatically formed for every DOM-element, e.g. `$hyoo_todomvc.root(0).taskRow(0).titler()`, which is a valid javascript code, that could be executed in a console, returning a link to the component, which the DOM-element corresponds to.

## Открытос 

## Кросплатформеность

## Стойкость к ошибкам

## Девелопер френдли

## Простота

## Модульность (межпроектная кодовая база, парарельная разработка)

## добрые ограничения

## Псевдосинхронность

## Размер бандла

## Автоматизация

## Изоморфность

## Концентрация усилий сообщества

## 

принципы
искренность
кросплатформеность
прагматичность
длина цикла отладки
стойкость к ошибкам
fqn
mam
псевдосинхронность
реактивность
микромодульность
фрактальность



Unlike control-flow architectures, $mol implements the data-flow architecture. All applications are defined as a set of classes having properties. Every property is defined as some function from another property (and properties of another classes too). Properties, which were called while processing a function are saved as dependencies of current property. When their values change, all dependent properties would be invalidated cascading. Calling a non relevant property would lead to its pre-actualization.

In this way the whole application at the execution stage represents a huge tree of dependencies, with a special property at the root of the tree, which in case of invalidation would actualize itself automatically. And as any property always knows, whether something depends on it or not, then it is given a simple and reliable mechanism of controlling lifecycle of objects - they are created when dependence appears and are destroyed when nothing depends on them. This solves two fundamental problems: resources leaks and cache invalidation. 

Besides, the reactive architecture allows us to abstract code elegantly from asynchronous operations. If the function can't return value at the moment, it can throw `Promise` and is marked as part of the tree as "waiting of results". When result is retrieved, it can be inserted into property directly and an application would be reconstructed for the new state.
