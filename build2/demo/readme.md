# $mol_build2_demo

Markdown-редактор с превью: демо npm в новом сборщике.

```sh
cd mol/build2/demo && npm start
```

`npm start` собирает новый сборщик и им — демку. Страница `-/index.html`, веб-тесты `-/test.html`, node-тесты идут при сборке.

## npm

```ts
preview() {
	return $npm[ 'marked' ].parse( this.source(), { async: false } ) as string
}

stamp() {
	return `${ $mol_build2_demo_hello( 'MAM' ) } ${ $npm[ 'date-fns' ].format( new Date, 'dd.MM.yyyy HH:mm' ) }`
}
```

- Пакет ставится в `node_modules` рядом с `index.html`, а сборщик дописывает его в `package.json` здесь же.
- На вебе каждый пакет собирается esbuild'ом в отдельный чанк только с использованными членами: `parse` из `marked`, `format` из `date-fns`. На ноде остаётся обычный `require`.
- Типы пакетов генерируются в `-web/deps.d.ts` и `-node/deps.d.ts`.

## Плагин

Стартовый текст лежит в `text/intro.text.md`. В код его превращает плагин `$mol_build2_demo_plugin_md` из `plugin/md`, а демка подключает плагин файлом `demo.build.ts`:

```ts
namespace $ {
	$mol_build2_demo_plugin_md
}
```

Сборщик сам находит `.build.`-файл, грузит плагин и генерирует `text/-md/intro.text.md.ts`:

```ts
namespace $ { export const $mol_build2_demo_text_intro = "# Новый сборщик MAM\n…" }
```

Демка берёт текст по FQN, как любой модуль: `source()` возвращает `$mol_build2_demo_text_intro`.
