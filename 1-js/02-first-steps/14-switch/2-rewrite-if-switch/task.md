importance: 4

---

# Omskriv "if" til "switch"

Skriv koden nedenfor ved hjælp af en enkelt `switch` erklæring:

```js run
let a = +prompt('a?', '');

if (a == 0) {
  alert( 0 );
}
if (a == 1) {
  alert( 1 );
}

if (a == 2 || a == 3) {
  alert( '2,3' );
}
```

