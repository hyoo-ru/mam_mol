# $mol_expander

Component which expands any content

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_expander_demo)

## Usage example

```
$mol_expander
	label \Lorem Ipsum
	content $mol_filler
```

## Properties

**`label(): any`**  

Property which would be shown as label. It can accept any type of content. 

**`content(): any`**  

Property that can be hidden/shown by click on the button.

**`expanded(): boolean`**
Property state for expander content.  
* `false` - content is not expanded  
* `true` - content is expanded
