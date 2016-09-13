# $mol_stringer
Input field to enter single line of text.

[Online demo](http://eigenmethod.github.io/mol/#demo=mol_stringer_demo)

## Usage
To start using the $mol_stinger component you need to add this one to your view.tree file by adding this sample:
```
$mol_stringer
	value > value \
```
Current value of input available through `value()`.

## Options
### value
Property `value` is a currently displayed string. Type of `value` property is `string`.
### hint
To display placeholder text on our $mol_stringer element we should use ```hint``` property. To use it we can just add 
setting of hint in our example:
```
$mol_stringer
	value > value \
	hint \Enter text here
```
### enabled
To turn off $mol_stringer we should use ```enabled``` property and set it to ```false```. Next example illustrates it
```
$mol_stringer
	value > value \
	enabled false
```
And if you don't want to turn off any element of $mol_stringer just write nothing.
