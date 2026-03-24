
# Kald async fra ikke-async

Vi har en "normal" function kaldet `f`. Hvordan kan du kalde den `async` function `wait()` og bruge dens resultat inde i `f`?

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ... hvad skal vi skrive her?
  // vi har brug for at kalde den asynkrone wait() og vente på at få 10
  // husk, vi kan ikke bruge "await"
}
```

P.S. Opgaven er teknisk set meget simpel, men spørgsmålet er ganske almindeligt for udviklere, der er nye i async/await.
