# $mol_viewer

Базовый класс для всех визуальных компонент. Обеспечивает инфраструктуру для ленивого реактивного рендеринга, обработку исключительных ситуаций.

## Свойства

**`tagName()' = 'div'`**

Задаёт имя DOM-элемента, создаваемого для компонента, если элемент с соответствующим идентификатором ещё не присутствует в DOM.

**`nameSpace() = 'http://www.w3.org/1999/xhtml'`**

Задаёт пространство имён для DOM-элемента. 

**`childs() = null `**

Задаёт список дочерних элементов. В списке могут быть экземпляры `$mol_viewer`, DOM-элементы, примитивы (строки, числа). Если список не задан (по умолчанию), то содержимое DOM-элемента никак меняться не будет, что полезно, при ручной работе с DOM. 

**`heightAvailable( ...diff : number[] ) = 0`**

Доступная компоненту высота, дальше которой точно не будет видно пользователю. Позволяет рендерить не всё своё содержимое, а только видимую его часть. Задаётся автоматически родительским компонентом.

**`heightMinimal()` = 0**

Минимально возможная высота компонента. Задаётся вручную константой или формулой. Используется для ленивого рендеринга.

**`DOMNode() : Element`**

Возвращает DOM-элемент, к которому привязан компонент. Сперва пытается найти его по идентификатору в DOM и только если не находит - создаёт и запоминает новый.

**`DOMTree() : Element`**

То же, что и `DOMNode`, но гарантирует, что содержимое, атрибуты и свойства DOM-элемента имеют актуальное состояние.

**`attr() : { [ key : string ] : ()=> string|number|boolean }`**

Возвращает словарь DOM-атрибутов, значения которым будут заданы при рендеринге. Передача `null` или `false` в качестве значения атрибута, приводит к его полному удалению. Передача `true` эквивалентна передаче его имени в качестве значения. `undefined` просто игнорируется.

**`field() : { [ key : string ] : ()=> any }`**

Возвращает словарь полей, которые необходимо задать DOM-элементу после рендеринга. В качестве имени поля можно задавать пути. Например, `scrollTop` задаст позицию скроллинга, а `style.backgroundPosition` задаст позицию фона.

**`event() : { [ key : string ] : ( event : Event )=> void }`**

Возвращает словарь обработчиков событий. Обработчики событий привязываются к DOM-элементу один раз, когда задаётся значение свойству `DOMNode`.

**`focused() : boolean`**

Определяет, находится ли сейчас компонент в фокусе или нет. Если какой-либо вложенный компонент находится в фокусе, то и текущий считается сфокусированным.

## view.tree

*view.tree* - декларативный язык описания компонент, основанный на [формате tree](https://github.com/nin-jin/tree.d). В одном файле может быть последовательно определено сколько угодно компонент, но лучше каждую компоненту помещать в отдельный файл, кроме совсем уж тривиальных случаев.

Чтобы создать новую компоненту достаточно отнаследовать её от любой уже существующей. Имена компонент должны начинаться с символа `$` и быть глобально уникальными в соответствии с принципами [PMS](https://github.com/nin-jin/pms). Например, объявим компоненту `$my_button` как наследника от `$mol_viewer`:

```tree
$my_button $mol_viewer
```

Транслируется это в (далее для каждого *.view.tree кода будет приводиться результат трансляции во *.view.tree.ts):

```typescript
module $ { export class $my_button extends $mol_viewer {} }
```

При наследовании есть возможность объявлять дополнительные свойства или перегружать уже существующие (при этом типы свойств должны совпадать). Например, перегрузим свойство `uri` строкой `"https://example.org"`, а `childs` - массивом из одной строки `"Click me!"`, кроме того, объявляем новое свойство `target` со значением `"_top"` по умолчанию (важно отметить, что значение по умолчанию обязательно при объявлении свойств):

```tree
$my_exampler $mol_linker
	uri \https://example.org
	childs /
		\Click me!
	target \_top
```

```typescript
module $ { export class $my_exampler extends $mol_linker {

	uri() {
		return "https://example.org"
	}

	childs() {
		return [].concat(  "Click me!" )
	}

	target() {
		return "_top"
	}

} }
```

Узлы, начинающиеся на `-` - игнорируются, что позволяет использовать их для комментирования и временного выключения поддерева. Начинающиеся на `$` - имена компонент. `/` - так опозначаются списки. `\` - предваряет сырые данные, которые до конца строки могут содержать совершенно любые символы. Числа, булевы значения и `null` пишутся как есть, без каких либо префиксов:

```tree
$my_values $mol_viewer
	childs /
		0
		1.1
		true
		false
		null
		\I can contain any character! \("o")/
		- I
			am
				remark...
```

```typescript
module $ { export class $my_values extends $mol_viewer {

	childs() {
		return [].concat( 0 , 1.1 , true , false , <any> null , "I can contain any character! \\(\"o\")/" )
	}

} }
````

Словари (соответствия ключей значениям) можно объявлять через узел `*`, через который задаются, например, значения для атрибутов DOM-элемента:

```tree
$my_number $mol_viewer
	tagName \input
	attr *
		type \number
		- attribute values must be a strings
		min \0
		max \20
```

```typescript
module $ { export class $my_number extends $mol_viewer {

	tagName() {
		return "input"
	}

	attr() {
		return $mol_merge_dict( super.attr() , {
			"type" : ()=> <any> "number" ,
			"min" : ()=> <any> "0" ,
			"max" : ()=> <any> "20" ,
		} )
	}

} }
```

Аналогичным образом можно задавать значения для полей DOM-элемента:

```tree
$my_wonder $mol_viewer
	tagName \input
	field *
		value \Hello!
		style.transform \rotate( 180deg )
```

```typescript
module $ { export class $my_wonder extends $mol_viewer {

	tagName() {
		return "input"
	}

	field() {
		return $mol_merge_dict( super.field() , {
			"value" : ()=> <any> "Hello!" ,
			"style.transform" : ()=> <any> "rotate( 180deg )" ,
		} )
	}

} }
```

В качестве значений мы можем брать не только константы, но и содержимое других свойств через одностороннее связывание. Например, объявим два текстовых совйства `hint` и `text`, а потом воспользуемся ими для формирования словаря `field` и списка `childs`:

```tree
$my_hint $mol_viewer
	hint \Default hint
	text \Default text
	field *
		title < hint 
	childs /
		< text
```

```typescript
module $ { export class $my_hint extends $mol_viewer {

	hint() {
		return "Default hint"
	}

	text() {
		return "Default text"
	}

	field() {
		return $mol_merge_dict( super.field() , {
			"title" : ()=> <any> this.hint() ,
		} )
	}

	childs() {
		return [].concat( this.text() )
	}

} }
```

Зачастую удобно совмещать объявление свойства и его использование. Следующий пример полностью эквивалентен предыдущему:

```tree
$my_hint $mol_viewer
	field *
		title < hint \Default hint 
	childs /
		< text \Default text
```

Реакции на DOM-события уже требуют двустороннее связывание. Например, укажем, что объекты события `click` необходимо помещать в свойство eventRemove, которое мы тут же объявили задав значением по умолчанию `null`:

```tree
$my_remover $mol_viewer
	event *
		click > eventRemove null 
	childs /
		\Remove
```

```typescript
module $ { export class $my_remover extends $mol_viewer {

	@ $mol_prop()
	eventRemove( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : <any> null
	}

	event() {
		return $mol_merge_dict( super.event() , {
			"click" : ( ...diff : any[] )=> <any> this.eventRemove(  ...diff ) ,
		} )
	}

	childs() {
		return [].concat( "Remove" )
	}

} }
```

Непосредственным значением свойства можно объявить экземпляр другого класса. В следующем примере у нас объявляется свойство `lister`, значением которого будет являться компонента типа `$mol_lister_demo`, а потом она помещается в список дочерних комонент `childs`:

```tree
$my_app $mol_viewer
	lister $mol_lister_demo
	childs /
		< lister
```

```typescript
module $ { export class $my_app extends $mol_viewer {

	@ $mol_prop()
	lister( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : new $mol_lister_demo().setup( __ => { 
		} )
	}

	childs() {
		return [].concat( this.lister() )
	}

} }
```

У вложенных компонент также можно перегружать любое их свойство:

```tree
$my_name $mol_viewer
	childs /
		< info $mol_labeler
			title \Name
			content \Jin
```

```typescript
module $ { export class $my_name extends $mol_viewer {

	@ $mol_prop()
	info( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : new $mol_labeler().setup( __ => { 
			__.title = () => "Name"
			__.content = () => "Jin"
		} )
	}

	childs() {
		return [].concat( this.info() )
	}

} }
```

Свойства родительской и дочерней компоненты можно связывать. В следующем примере мы объявляем изменяемое свойство `name`, дочерней компоненте `input` говорим использовать наше свойство `name` в качестве своего свойства `value`, а компоненте `output` указываем выводить внутри себя значение `name`. Таким образом компоненты `input` и `output` становятся связаны через свойство родителя `name`  и изменение значения в `input` приводит к обновлению output:

```tree
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

```typescript
module $ { export class $my_greeter extends $mol_viewer {

	@ $mol_prop()
	name( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : ""
	}

	@ $mol_prop()
	input( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : new $mol_stringer().setup( __ => { 
			__.hint = () => "Name"
			__.value = ( ...diff : any[] ) => this.name(  ...diff )
		} )
	}

	@ $mol_prop()
	output( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : new $mol_viewer().setup( __ => { 
			__.childs = () => [].concat( this.name() )
		} )
	}

	childs() {
		return [].concat( this.input() , this.output() )
	}

} }
```

Бывают такие свойства, которые в зависимости от ключа возвращают разные значения. Типичный пример - строки списка. Каждая строка - отдельный компонент, доступный по уникальному ключу. Для объявления таких свойств используется суффикс `#`:

```tree
$my_tasks $mol_lister
	childs < taskRows
	taskRows /
	taskRow# $mol_viewer
		childs / < taskTitle#
	taskTitle# < defaultTitle
	defaultTitle \
```

```typescript
module $ { export class $my_tasks extends $mol_lister {

	childs() {
		return this.taskRows()
	}

	taskRows() {
		return [].concat(  )
	}

	@ $mol_prop()
	taskRow( key : any , ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : new $mol_viewer().setup( __ => { 
			__.childs = () => [].concat( this.taskTitle( key ) )
		} )
	}

	taskTitle( key : any ) {
		return this.defaultTitle()
	}

	defaultTitle() {
		return ""
	}

} }
```

Тут мы объявили свойтсво `taskRow`, которое принимает на вход некоторый ключ и возвращает для каждого ключа уникальный экземпляр `$mol_viewer`, у которого перегружено свойство `childs`, которое выводит для каждого `taskRow`, соответствующий ему `taskTitle`, а вот `taskTitle` независимо от ключа возвращает по умолчанию содержимое свойства `defaultTitle`, которое изначатльно равно пустой строке. В дальнейшем, перегружая любое из этих свойств, мы можем менять любой аспект поведения компонента.

## view.ts

В дополнение к декларативному описанию компонент, рядом можно создать одноимённый файл с расширением `view.ts`, где описать его поведение. Используя специальную конструкцию, можно отнаследоваться от реализации, полученной из `view.tree` и она автоматически будет перегружена наследником:

Например, у нас есть следующее описание во `./my/hello/hello.view.tree`:

```tree
$my_hello $mol_viewer childs /
	< input $mol_stringer
		hint \Name
		value > name \
	< message \
```

Тут мы объявили 2 свойства: `name` для получения значения из `input` и `message` для вывода значения. Транслируется это в следующий `./my/hello/-/view.tree.ts/hello.view.tree.ts`:

```typescript
module $ { export class $my_hello extends $mol_viewer {

	@ $mol_prop()
	name( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : ""
	}

	@ $mol_prop()
	input( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : new $mol_stringer().setup( __ => { 
			__.hint = () => "Name"
			__.value = ( ...diff : any[] ) => this.name(  ...diff )
		} )
	}

	message() {
		return ""
	}

	childs() {
		return [].concat( this.input() , this.message() )
	}

} }
```

Теперь мы можем "подмешать" в этот класс своё поведение через `./my/hello/hello.view.ts`:

```typescript
module $.$mol {
	export class $my_hello extends $.$my_hello {
		
		message() {
			let name = this.name()
			return name && `Hello, ${name}!`
		}
		
	}
}
```

Тут мы связали наши свойства `message` и `name` через формулу. Так что теперь, где бы мы ни использовали `$my_hello`, значение `message` будет зависеть от введёного пользователем `name`.
