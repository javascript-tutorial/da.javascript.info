Svaret er: **nej, det vil ikke**:

```js run
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Ups!");
  }, 1000);
}).catch(alert);
```

Som sagt tidligere i kapitlet er der en "implicit `try..catch`" omkring funktionens kode. Det betyder at alle synkrone fejl håndteres.

Men her genereres fejlen ikke mens udføreren kører, men senere. Så promise kan ikke håndtere den.
