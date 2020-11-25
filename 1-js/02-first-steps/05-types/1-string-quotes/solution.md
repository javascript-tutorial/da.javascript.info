
Backticks indlejrer udtryk skrevet i `${...}` ind i selve tekststrengen.

```js run
let name = "Ilya";

// udtrykket er et tal
alert( `hello ${1}` ); // hello 1

// udtrykket er selve teksten "name"
alert( `hello ${"name"}` ); // hello name

// udtrykket er indholdet af variablen name
alert( `hello ${name}` ); // hello Ilya
```
