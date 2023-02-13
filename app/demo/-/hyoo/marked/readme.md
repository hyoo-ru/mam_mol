```
= MarkedText

Text format with **lightweight consistent formatting**

--

== Principles

+ Syntax:
  - Unambiguity
  - Simplicity
  - Uniformity
+ Look:
  - Minimal impact on the natural appearance of the text
  - Clarity of formatting and naturalness of metaphors
+ Editing:
  - Independence from the keyboard layout
  - Fast and reliable memorability

== Comparison

! **Language**
  ! **Pros**
    ! **Cons**
! MarkedText
  ! - Convenient editing of tables.
  ! - Support for complex formatting inside cells.
  ! - Ease of implementation.
  ! - Easy-to-remember consistent syntax.
  ! - Ease of editing in a non-English keyboard layout.
  ! - The columns do not spread far to the right for horizontal scrolling and are not transferred to a new line.
    ! - There is no broad support by third-party tools.
! MarkDown
  ! - Extensive support with various tools.
  ! - A human-readable representation of simple tables.
    ! - Difficulties with editing tables.
    ! - Highly restricted cell contents.

== Parsing

    const res = [ ... $hyoo_marked_line.parse( '**text**' ) ]
  --$mol_assert_equal( res[0].strong, '**text**' )
  ++$mol_assert_equal( res[0].marker, '**' )
  **$mol_assert_equal( res[0].content, 'text' )

== Comments

" " " Typical user: Isn't supported anywhere, go to --ass-- ++assassins++ with this syntax!
" " 
" " But we are **programmers**, we can //fix// it.. You don't even need to be an expert on ;;C++;; to do this ..
" 
" No one needs it (c) Sofa Expert

Nevertheless, it is a useful exercise in design.

== Links

- Online sandbox: \\https://marked.hyoo.ru/\\
- \\Article about MarkedText\https://github.com/nin-jin/HabHub/issues/39\\
- \\TypeScript API\https://github.com/hyoo-ru/marked.hyoo.ru/\\
- ""Map of our projects\https://raw.githubusercontent.com/hyoo-ru/hyoo.ru/master/hyoo.svg""
```
