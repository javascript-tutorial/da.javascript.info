Den simple løsning kunne være:

```js run
*!*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
*/!*

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);
```

Det virker nogenlunde, fordi `Math.random() - 0.5` er et tilfældigt tal, der kan være positivt eller negativt, så sorteringsfunktionen omarrangerer elementerne tilfældigt.

Men fordi sorteringsfunktionen ikke er beregnet til at blive brugt på denne måde, har ikke alle permutationer samme sandsynlighed.

For eksempel, se på koden nedenfor. Den kører `shuffle` 1000000 gange og tæller forekomster af alle mulige resultater:

```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// tæller forekomster af alle mulige permutationer
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// vis tællinger af alle mulige permutationer
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

Et eksempel resultat (afhænger af JS-motoren):

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

Vi kan tydeligt se skævheden: `123` og `213` forekommer meget oftere end andre.

Resultatet af koden kan variere mellem JavaScript-motorer, men vi kan allerede se, at tilgangen er upålidelig.

Hvorfor virker det ikke? Generelt set er `sort` en "sort boks": vi smider et array og en sammenligningsfunktion ind i den og forventer, at arrayet bliver sorteret. Men på grund af den totale tilfældighed i sammenligningen går den sorte boks amok, og hvordan den præcist går amok afhænger af den konkrete implementering, der varierer mellem motorer.

Der findes andre gode måder at løse opgaven på. For eksempel er der en fremragende algoritme kaldet [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). Ideen er at gå arrayet igennem i omvendt rækkefølge og bytte hvert element med et tilfældigt et før det. Det ser sådan ud:

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // bytter elementerne array[i] og array[j]
    // vi bruger "destructuring assignment" syntaks til at opnå det
    // du vil finde flere detaljer om den syntaks i senere kapitler
    // det samme kan skrives som:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
```

Lad os teste det på samme måde:

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// antal forekomster af alle mulige permutationer
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// vis tællinger af alle mulige permutationer
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

The example output:

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```

Det ser bedre ud: alle permutationer forekommer med samme sandsynlighed.

Desuden er Fisher-Yates-algoritmen meget bedre med hensyn til ydeevne, da der ikke er nogen "sorterings" overhead.
