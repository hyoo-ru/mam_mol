# $mol_harp_query

Description of HARP query.

## Requirements

- One line for usage in URI and file names.
- Reduce escaping for better DX.
- Filtering & ordering.
- Precisse partial fetch.
- Fetch linked resources.
- Normalized response.
- Bulk requests.
- Metadata discovery.

## Research

URI special symbols (encoded by `encodeURIComponent` but not `encodeURI`):

	= @ # $ & + ; : , / ? .

Common query string format: pairs separated by `&`, key and value separated by `=`.

Common path format: chunks sparated by `/`.

❌ `:` can't be used in first chunk of path and in file names.

❌ Second+ `?` and `#` may be escaped by some libs.

So mostly safe symbols:

	/ @ $ & + = ; , .

Symbols which can be used in the path in any place, which is escaped by `encodURIComponent`, but which doesn't escaped by ChromeDev Tools:

	/ @ $ & + = ; , . [ ]

## Decision

- Query is list of fetches separated by `;`.
- Fetch starts with name of field or function: `title;_num`.
- Order predicate (`+` - asc, `-` - desc) may be added before name: `+title;-salary`.
- Filter prdicate (`=` - positive, `@` - negative) with value may be added after name: `sex=female;status@married`.
- Values are separated by `,`: `gender=male,female,helicopter`.
- Open ranges are defined using `&`: `age=18,18&;weight=&50;height=150&170`
  - `1&5` = `2,3,4`
  - `1&` - greater then 1
  - `&5` - lower then 5
- Sub query is wrapped by `[]`: `user=me[name;age]`.

## Examples

- `GET /` - metadata of all types.
- `GET /user=jin,john[name;age]` - name and age of users by its primary keys.
- `GET /user[sex=male,female;age=18,18&;role@admin]` - `sex`, `age` and `role` of `18+` `males` and `females` without `admin` rights.
- `GET /user[+birthday=2000-01-01&;-created;_num=&10]` - `10` users with `birthday` from `2000-01-01` ordered by `birthday` asc then `created` desc.
- `GET /user=me[friend[+age=18&;name;_num=&10]]` - my first 10 younger adult friends with fetching they names and ages.
- `GET /user=jin[friend[name]];article[author[name]]` - all `jin` friend names and all article author names, without users data duplication.

## Common Functions

### `_num`

Index of entity in the fetched list.

- `issues[_num=30&40]` - 10 issues after first 30.

### `_sum`

Sums of values from sub requests.

- `_sum[income[month=2022-07];outcome[month=2022-07]` - calculate this month full income and outcome.

```json
{
	"_sum": {
		"income[month=2022-07]": 9000,
		"month=2022-07": 9000,
	}
}
```

### `_min`

Min value from sub requests.

### `_max`

Min value from sub requests.

### `_len`

Count of valuee from sub requests.
