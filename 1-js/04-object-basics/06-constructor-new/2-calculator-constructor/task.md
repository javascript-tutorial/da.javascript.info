importance: 5

---

# Opret en ny lommeregner

Opret en konstruktørfunktion `Calculator`, der skaber objekter med 3 metoder:

- `read()` spørger efter to værdier og gemmer dem som egenskaber med navnene `a` og `b`.
- `sum()` returnerer summen af disse egenskaber.
- `mul()` returnerer produktet af disse egenskaber.

For eksempel:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
