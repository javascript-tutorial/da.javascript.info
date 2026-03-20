importance: 5

---

# Nedarv fra SyntaxError

Opret en klasse `FormatError` som nedarver fra den indbyggede `SyntaxError`-klasse.

Den bør understøtte `message`, `name` og `stack` egenskaber.

Brugseksempel:

```js
let err = new FormatError("formatteringsfejl");

alert( err.message ); // formatteringsfejl
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (fordi den nedarver fra SyntaxError)
```
