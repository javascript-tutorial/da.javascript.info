
# Object.keys, values, entries

Lad os træde et skridt tilbage fra de individuelle datastrukturer og tale om iterationer over dem.

I det forrige kapitel så vi metoderne `map.keys()`, `map.values()`, `map.entries()`.

Disse metoder er generiske, der er en fælles aftale om at bruge dem til datastrukturer. Hvis vi nogensinde opretter en datastruktur selv, bør vi også implementere dem.

De understøttes af følgende indbyggede datastrukturer:

- `Map`
- `Set`
- `Array`

Rene objekter understøtter også lignende metoder, men syntaksen er en smule anderledes.

## Object.keys, values, entries

For rene objekter er følgende metoder tilgængelige:

- [Object.keys(obj)](mdn:js/Object/keys) -- returnerer et array af nøgler.
- [Object.values(obj)](mdn:js/Object/values) -- returnerer et array af værdier.
- [Object.entries(obj)](mdn:js/Object/entries) -- returnerer et array af `[nøgle, værdi]` par.

Bemærk forskellene (sammenlignet med map for eksempel):

|             | Map              | Object       |
|-------------|------------------|--------------|
| Kald syntaks | `map.keys()`  | `Object.keys(obj)`, men ikke `obj.keys()` |
| Returner     | itererbart objekt    | "rigtigt" Array                     |

Den første forskel er, at vi skal kalde `Object.keys(obj)`, og ikke `obj.keys()`.

Hvorfor det? Hovedårsagen er fleksibilitet. Husk, at objekter er grundlaget for alle komplekse strukturer i JavaScript. Så vi kan have et objekt som `data`, der implementerer sin egen `data.values()` metode. Og vi kan stadig kalde `Object.values(data)` på det.

Den anden forskel er, at `Object.*` metoder returnerer "rigtige" array-objekter, ikke bare et itererbart objekt. Det er hovedsageligt af historiske årsager.

For eksempel, for et objekt som dette:

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

Her er et eksempel på at bruge `Object.values` til at løbe over egenskabsværdier:

```js run
let user = {
  name: "John",
  age: 30
};

// gennemløb værdier
for (let value of Object.values(user)) {
  alert(value); // John, så 30
}
```

```warn header="Object.keys/values/entries ignorerer symbolske egenskaber"
Ligesom en `for..in` løkke ignorerer disse metoder egenskaber, der bruger `Symbol(...)` som nøgler.

Normalt er det praktisk. Men hvis vi også vil have symbolske nøgler, så findes der en separat metode [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols), der returnerer et array med kun symbolske nøgler. Der findes også en metode [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys), der returnerer *alle* nøgler.
```


## Transforming af objekter

Objekter mangler mange metoder, som findes for arrays, f.eks. `map`, `filter` og andre.

Hvis vi gerne vil anvende dem, kan vi bruge `Object.entries` efterfulgt af `Object.fromEntries`:

1. Brug `Object.entries(obj)` for at få et array af nøgle-/værdipar fra `obj`.
2. Brug arraymetoder på det array, f.eks. `map`, for at transformere disse nøgle-/værdipar.
3. Brug `Object.fromEntries(array)` på det resulterende array for at omdanne det tilbage til et objekt.

For eksempel, vi har et objekt med priser, og vil gerne fordoble dem:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // konverter priser til array, map hver nøgle/værdi par til et andet par
  // og så giver fromEntries objektet tilbage
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);
*/!*

alert(doublePrices.meat); // 8
```

Det kan se svært ud ved første øjekast, men bliver nemt at forstå, efter du har brugt det en eller to gange. Vi kan lave kraftfulde kæder af transformationer på denne måde.
