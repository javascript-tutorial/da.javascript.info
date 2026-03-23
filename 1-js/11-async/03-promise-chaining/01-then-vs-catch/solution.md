Det korte svar er: **nej, de er ikke ens**:

Forskellen er, at hvis en fejl opstår i `f1`, så håndteres den af `.catch` her:

```js run
promise
  .then(f1)
  .catch(f2);
```

... men ikke her:

```js run
promise
  .then(f1, f2);
```

Det er fordi at fejl bliver sendt ned gennem kæden, og i det andet kodeeksempel er der ingen kæde under `f1`.

Med andre ord, `.then` sender resultater/fejl videre til den næste `.then/catch`. Så i det første eksempel er der en `catch` nedenfor, og i det andet er der ikke, så fejlen håndteres ikke.
