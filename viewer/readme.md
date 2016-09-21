# $mol_viewer

Базовый класс для всех визуальных компонент. Обеспечивает инфраструктуру для ленивого реактивного рендеринга, обработку исключительных ситуаций.

## view.tree

*view.tree* - декларативный язык описания компонент, основанный на [формате tree](https://github.com/nin-jin/tree.d). В одном файле может быть последовательно определено сколько угодно компонент, но лучше каждую компоненту помещать в отдельный файл, кроме совсем уж тривиальных случаев.

Чтобы создать новую компоненту достаточно отнаследовать её от любой уже существующей. Именя компонент должны начинаться с символа `$` и быть глобально уникальными в соответствии с принципами [PMS](https://github.com/nin-jin/pms). Например, объявим компоненту `$my_app_header` как наследника от `$mol_viewer`:

```tree
$my_button $mol_viewer
```

При наследовании есть возможность объявлять дополнительные свойства или перегружать уже существующие (при этом типы свойств должны совпадать). Например, перегрузим свойство `uri` строкой `"https://example.org"`, а `childs` - массивом из одной строки `"Click me!"`:

```
$my_exampler $mol_linker
	uri \https://example.org
	childs /
		\Click me!
```

Узлы, начинающиеся на `-` - игнорируются, что позволяет использовать их для комментирования и временного выключения поддерева. Начинающиеся на `$` - имена компонент. `/` - так опозначаются массивы. `\` - предваряет сырые данные, которые до конца строки могут содержать совершенно любые символы. Числа, булевы значения и `null` пишутся как есть, без каких либо префиксов:

```
$my_numbers $mol_viewer
	childs /
		0
		1.1
		true
		false
		null
		\I can contain any character! \("o")/
		- I am remark...
```

Словари можно объявлять через узел `*`, через который задаются, например, значения для атрибутов DOM-элемента:

```
$my_number $mol_viewer
	tagName \input
	attr *
		type \number
		- attribute values must be a strings
		min \0
		max \20
```

Аналогичным образом можно задавать значения для полей DOM-элемента:

```
$my_wonder $mol_viewer
	tagName \input
	field *
		value \Hello!
		style.transform \rotate( 180deg )
```

В качестве значений мы можем брать не только константы, но и содержимое других полей через одностороннее связывание свойств:

```
$my_hint $mol_viewer
	title \Default title
	text \Default text
	field *
		title < title 
	childs /
		< text
```

Зачастую удобно совмещать объявление свойства и его использование:

```
$my_hint $mol_viewer
	field *
		title < title \Default title 
	childs /
		< text \Default text
```

Реакции на DOM-события уже требуют двустороннее связывание:

```
$my_remover $mol_viewer
	event *
		click > eventRemove null 
	childs /
		\Remove
```

Непосредственным значением свойства можно объявить инстанс другого класса:

```
$my_app $mol_pager
	head /
		\Demo lister
	body /
		< lister $mol_lister_demo
```

У вложенных компонент можно перегружать любое свойство:

```
$my_name $mol_viewer
	childs /
		< info $mol_labeler
			title \Name
			content \Jin
```

Свойства родительской и дочерней компоненты можно связывать:

```
$my_greeter $mol_viewer
	- ">" allows pushing to property
	> name \
	childs /
		< input $mol_stringer
			hint \Name
			value > name
		< output $mol_viewer
			childs /
				< name
```

Бывают такие свойства, которые в зависимости от ключа возвращают разные значения. Типичный пример - строки списка. Каждая строка - отдельный компонент, доступный по уникальному ключу. Для объявления таких свойств используется суффикс `#`:

```
$my_tasks $mol_lister
	childs < taskRows /
	taskRow# $mol_viewer
	 	childs / < taskTitle#
	taskTitle# \
```
