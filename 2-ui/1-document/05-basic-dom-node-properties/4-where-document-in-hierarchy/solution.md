
Vi kan se, hvilken kalsse den tilhører ved at udskrive den, f. eks. sådan her:

```js run
alert(document); // [object HTMLDocument]
```

eller:

```js run
alert(document.constructor.name); // HTMLDocument
```

Så, `document` er en udgave af klassen `HTMLDocument`.

Hvad er dens position i hierarkiet?

Ja, vi kunne selvfølgelig gennemgå specifikationen, men det er måske hurtigere at finde ud af det manuelt.

Lad os gennemløbe prototypekæden via `__proto__`.

Vi ved følgende: Metoderne for en klasse findes i egenskaben `prototype` hos konstruktøren. For eksempel har `HTMLDocument.prototype` metoder for dokumenter.

Derudover er der en reference til `constructor` funktionen inde i `prototype`:

```js run
alert(HTMLDocument.prototype.constructor === HTMLDocument); // true
```

For at få et navn på klassen som en streng, kan vi bruge `constructor.name`. Lad os gøre det for hele `document` prototypekæden, indtil klassen `Node`:

```js run
alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
```

Det er hierarkiet.

Vi kunne også undersøge objektet ved hjælp af `console.dir(document)` og se disse navne ved at åbne `__proto__`. Konsollen henter dem internt fra `constructor` egenskaben.
