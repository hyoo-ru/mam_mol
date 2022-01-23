# Modules

## Flow

- **[$mol_fiber](fiber)** - suspendable tasks
- **[$mol_atom2](atom2)** - reactive container
- **[$mol_log2](log2)** - logging
- **[$mol_import](import)** - dynamic sources import
- **[$mol_after](after)** - scheduled callbacks with unified api
- **[$mol_fail](fail)** - throws all exceptions in one place to increase debug experience

## Object model

- **[$mol_mem](mem)** - reactive property decorator
- **[$mol_object](object)** - components base class

## Lifecycle

- **[$mol_ambient] - makes derived context
- **[$mol_owning] - owning relation between objects

## Functions

- **[$mol_const](const)** - const value returning function
- **[$mol_func_name](func/name)** - name of function
- **[$mol_func_sandbox](func/sandbox)** - sandbox for safe code evaluation

## Collections

- **[$mol_range2](range2)** - lazy array
- **[$mol_maybe](maybe)** - [maybe monad](https://en.wikipedia.org/wiki/Monad_(functional_programming)#The_Maybe_monad)
- **[$mol_conform](conform)** - object tree reconciler
- **[$mol_dict](dict)** - useful native `Map` extension
- **[$mol_array_chunks](array/chunks)** - splits array by different chunks
- **[$mol_array_trim](array/trim)** - shortens array without memory reallocation

## [State modules](state)

- **[$mol_state_arg](state/arg)** - arguments state (location/argv)
- **[$mol_state_local](state/local)** - persistent local state (localStorage)
- **[$mol_state_session](state/session)** - session temporary state (sessionStorage)
- **[$mol_state_history](state/history)** - browser history bound state
- **[$mol_state_stack](state/stack)** - state of current stack of execution
- **[$mol_state_time](state/time)** - reactive current time stamp 

## Simple components

- **[$mol_view](view)** - reactive view model base class with lazy error-proof renderer
- **[$mol_ghost](ghost)** - node-less wrapper for another view
- **[$mol_filler](filler)** - lorem ipsum
- **[$mol_svg](svg)** - svg base components
- **[$mol_status](status)** - prints error status of some property
- **[$mol_speck](speck)** - attention speck

## Simple controls

- **[$mol_link](link)** - navigation link
- **[$mol_button](button)** - button
- **[$mol_check](check)** - check box
- **[$mol_switch](switch)** - radio buttons
- **[$mol_select](select)** - select with search and lazy rendering support
- **[$mol_string](string)** - one string input control
- **[$mol_textarea](textarea)** - multiple line input control
- **[$mol_search](search)** - search string with suggests support
- **[$mol_number](number)** - one number input control
- **[$mol_code](code)** - bar code scanner
- **[$mol_portion](portion)** - portion visualizer

## Layout components

- **[$mol_scroll](scroll)** - scroll pane with position saving
- **[$mol_tiler](tiler)** - items in row with balanced wrapping
- **[$mol_row](row)** - items in row with wrapping and padding between
- **[$mol_bar](bar)** - group of controls as own control
- **[$mol_list](list)** - vertical list of rows
- **[$mol_labeler](labeler)** - labeled content
- **[$mol_section](section)** - section with header
- **[$mol_book](book)** - horizontal stack of pages
- **[$mol_page](page)** - page with header, body and footer
- **[$mol_deck](deck)** - deck of panels with tab bar
- **[$mol_card](card)** - card with content

## Plugin components

- **[$mol_nav](nav)** - keyboard navigation
- **[$mol_touch](touch)** - touch/pointer gestures
- **[$mol_speech](speech)** - speech recognition and syntesis
- **[$mol_hotkey](hotkey)** - keyboard shortcuts

## Complex components

- **[$mol_form](form)** - forms with validators
- **[$mol_example](demo)** - demonstrates widget in various screens
- **[$mol_attach](attach)** - preview list and attach button
- **[$mol_cost](cost)** - prints currency values
- **[$mol_message](message)** - user message

## Charts

- **[$mol_chart](chart)** - Plot pane with legend
- **[$mol_chart_legend](chart/legend)** - Simple legend for charts
- **[$mol_plot_pane](plot/pane)** - Pane for multiple graphs
- **[$mol_plot_graph](plot/graph)** - Plot graph base class
- **[$mol_plot_bar](plot/bar)** - Bar graph
- **[$mol_plot_line](plot/line)** - Linear graph
- **[$mol_plot_dot](plot/dot)** - Dots graph
- **[$mol_plot_fill](plot/fill)** - Filling graph
- **[$mol_plot_group](plot/group)** - Group of graph as single graph
- **[$mol_plot_ruler_vert](plot/ruler/vert)** - Verical ruler
- **[$mol_plot_ruler_hor](plot/ruler/hor)** - Horizontal ruler
- **[$mol_plot_mark_hor](plot/mark/hor)** - Horizontal markers

## Data formats

- **[$mol_tree2](tree2)** - [tree format](https://github.com/nin-jin/tree.d) (`view.tree` language described at [$mol_view](view))
- **[$mol_base64](base64)** - Base64 encode/decode
- **[$mol_leb128](leb128)** - LEB128 encode/decode

## Math

- **[$mol_graph](graph)** - graph algorithms
- **[$mol_unit](unit)** - typed number value
- **[$mol_merge_dict](merge/dict)** - merge two dictionaries to new one

## Resources

- **[$mol_icon](https://github.com/nin-jin/mol_icon)** - css styled material design icons
- **[$mol_skin](theme)** - theming
- **[$mol_gap](theme)** - paddings, margins etc
- **[$mol_style](style)** - css-in-ts

## Testing

- **[$mol_test](test)** - unit testing
- **[$mol_stub](stub)** - stub data generators
- **[$mol_assert](assert)** - assertion functions

## API

- **[$mol_window](window)** - reactive view port configuration
- **[$mol_fetch](fetch)** - Reactive [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- **[$mol_webdav](webdav)** - Reactive [WebDAV](https://wikipedia.org/wiki/WebDAV) client
- **[$mol_file](file)** - isomorphic reactive file system wrapper
- **[$mol_exec](exec)** - synchronous execute of system command
- **[$mol_cordova](cordova)** - [Apache Cordova](https://cordova.apache.org) API

## Time

- **[$mol_time_moment](time/moment)** - [time moment](https://en.wikipedia.org/wiki/ISO_8601#Dates) representation with iso8601 support
- **[$mol_time_duration](time/duration)** - [time duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) representation with iso8601 support
- **[$mol_time_interval](time/interval)** - [time interval](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals) representation with iso8601 support
- **[$mol_state_time](state/time)** - reactive current time stamp 
- **[$mol_date](date)** - date picker
- **[$mol_calendar](calendar)** - days of month as table

## Maps

- **[$mol_map_yandex](map/yandex)** - [Yandex Maps](https://tech.yandex.ru/maps/doc/jsapi/2.1/)

## WebAssemply

- **[$mol_wasm](wasm)** - wasm runner
- **[$mol_leb128](leb128)** - LEB128 encode/decode
- **[$mol_tree2_wasm](tree2/wasm)** - wasm.tree representation

## Web Services

- **[$mol_github](github)** - [GitHub API](https://developer.github.com/v3/)
- **[$mol_chat](chat)** - GitHub based comments everywere

## Building

- **[$mol_build](build)** - MAM builder
- **[$mol_build_server](build/server)** - MAM developer server
