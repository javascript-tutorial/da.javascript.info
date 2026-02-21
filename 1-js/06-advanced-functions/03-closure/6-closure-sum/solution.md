For at den anden sætning med parenteser skal fungere, skal den første returnere en funktion.

Sådan her:

```js run
function sum(a) {

  return function(b) {
    return a + b; // tager "a" fra det ydre leksikale miljø
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

