Svaret er: `3`.

```js run
alert( null || 2 && 3 || 4 );
```

Præcedensen af AND `&&` er højere end `||`, så det udføres først.

Resultatet af `2 && 3 = 3`, så udtrykket bliver:

```
null || 3 || 4
```

Nu er resultatet den første sandfærdige værdi: `3`.

