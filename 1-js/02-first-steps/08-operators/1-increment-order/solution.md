
Svaret er:

- `a = 2`
- `b = 2`
- `c = 2`
- `d = 1`

```js run no-beautify
let a = 1, b = 1;

alert( ++a ); // 2, præfiks form returnerer den nye værdi
alert( b++ ); // 1, postfiks form returnerer den gamle værdi

alert( a ); // 2, inkrementeret én gang
alert( b ); // 2, inkrementeret én gang
```
