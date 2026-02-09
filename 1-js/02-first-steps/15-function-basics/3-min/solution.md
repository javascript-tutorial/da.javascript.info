En løsning ved brug af `if`:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

En løsning ved brug af spørgsmålstegnsoperatoren `'?'`:

```js
function min(a, b) {
  return a < b ? a : b;
}
```

P.S. I tilfælde af lighed `a == b` er det ligegyldigt, hvad der returneres.