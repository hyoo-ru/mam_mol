# $mol_number

[Online demo](http://eigenmethod.github.io/mol/#demo=mol_number_demo)

## Usage
To start using the $mol_number component you need to add this one to your view.tree file by adding this sample:
```
$mol_number
	value > value null
```
Current value of input available through `value()`.

Here we add the component and bind the value param of $mol_number component to our property ```value```. By default we set 
null to this one. If we set something like ``` value > value 2016``` this number will be rendered on input element 
at the beginning of loading page.

## Options
### value
Property `value` is a currently displayed number. Type of `value` property is `number`.
### hint
Property ```hint``` inherits from $mol_stringer component
### disabled
Property ```disabled``` inherits from $mol_stringer component

But in $mol_number added some features to disabled part of component like any button or input
We can turn off $mol_number component separately. To do it we should use some of the following properties:
* ```disabledDec``` - property responds for state of decrease button
* ```disabledInc``` - property responds for state of increase button
* ```disabledStringer``` - property responds for state of input

### precision
$mol_number can display numbers in any format user select for.  

For example if we want to show a number in fixed-point notation
we should set to ```precisionView``` property to a value that would be less then **0**. For example if we want to display 
number in **0.xx** format we should set ```precisionView``` to **0.01**.  

Also we can set $mol_number how it should increase of decrease the value in it's input. If we set ```precisionChange``` any number,
the value in its input field will be increased or decreased on this number.
  

