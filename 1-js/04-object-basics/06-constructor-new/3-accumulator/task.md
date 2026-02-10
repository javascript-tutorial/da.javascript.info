importance: 5

---

# Opret en akkumulator

Opret en konstruktørfunktion `Accumulator(startingValue)`.

Objektet det opretter skal:

- Gemme den "nuværende værdi" i egenskaben `value`. Startværdien sættes til argumentet for konstruktøren `startingValue`.
- `read()`-metoden skal bruge `prompt` til at læse et nyt tal og lægge det til `value`.

Med andre ord er `value`-egenskaben summen af alle brugerindtastede værdier med startværdien `startingValue`.

Her er et eksempel på koden, der bruger `Accumulator`:

```js
let accumulator = new Accumulator(1); // Initialiser med værdien 1

accumulator.read(); // tilføjer den brugerindtastede værdi
accumulator.read(); // tilføjer den brugerindtastede værdi

alert(accumulator.value); // viser summen af disse værdier
```

[demo]
