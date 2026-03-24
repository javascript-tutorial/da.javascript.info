# Promise API

Der er 6 statiske metoder i `Promise` klassen. Vi gennemløber dem alle kort her.

## Promise.all

Lad os sige, vi vil have mange promises til at køre parallelt og vente til alle er klar.

Det kunnme for eksempel være at downloade flere URL'er og behandle indholdet når de alle er færdigindlæst.

Det er det `Promise.all` er til.

Syntaksen er:

```js
let promise = Promise.all(iterable);
```

`Promise.all` tager et itererbart objekt (ofte et array af promises) og returnerer et nyt promise.

Det nye promise løser sig når alle de listede promises er løst, og arrayet af deres resultater bliver dets result.

For eksempel vil `Promise.all` nedenfor blive færdig efter 3 sekunder, og dens result er et array med indholdet `[1, 2, 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 når løfterne er klare: hver promise bidrager med et array-element
```

Bemærk at rækkefølgen for de resulterende array-elementer er den samme som i de oprindelige promises. Selvom den første promise tager længst tid at løse, er den stadig først i arrayet af resultater.

Et meget udbredt tricket er at mappe et array af job-data til et array af promises, og så omslutte det i `Promise.all`.

For eksempel, hvis vi har et array af URLs, kan vi hente dem alle sådan:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// map hver url til et promise fra fetch
let requests = urls.map(url => fetch(url));

// Promise.all venter til alle job er løst
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

Et større eksempel med hentning af brugerinformation for et array af GitHub-brugere efter deres navne (vi kunne hente et array af varer efter deres id, logikken er identisk):

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // alle respons er løst
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // viser 200 for hver url
    }

    return responses;
  })
  // map array af response til et array af response.json() til at læse deres indhold
  .then(responses => Promise.all(responses.map(r => r.json())))
  // alle svar er oversat fra JSON: "users" objektet indeholder deres navn i "name" egenskaben
  .then(users => users.forEach(user => alert(user.name)));
```

**Hvis et af løfterne bliver afvist, bliver det promise der returneres af `Promise.all` umiddelbart afvist med den fejl.**

For eksempel:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ups!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Ups!
```

Her bliver det andet promise afvist efter to sekunder. Det fører til en øjeblikkelig afvisning af `Promise.all`, så `.catch` eksekveres: fejlen bliver til resultatet af hele `Promise.all`.

```warn header="I tilfælde af en fejl, ignoreres andre promises"
Hvis et af løfterne bliver afvist, bliver det promise der returneres af `Promise.all` umiddelbart afvist med den fejl. Deres resultater ignoreres.

For eksempel, hvis der er flere `fetch` kald, som i eksemplet ovenfor, og ét af dem mislykkes, vil de andre stadig fortsætte med at køre, men `Promise.all` vil ikke længere holde øje med dem. De vil sandsynligvis slutte, men deres resultater vil blive ignoreret.

`Promise.all` gør intet for at annullere dem, da der ikke er en koncept om "annullering" i promises. I [et andet kapitel](info:fetch-abort) vil vi dække `AbortController` som kan afhjælpe det, men det er ikke en del af Promise API'et.
```

````smart header="`Promise.all(itererbar)` tillader ikke-promise \"regulære\" værdier i `itererbar`"
Normalt accepterer, `Promise.all(...)` et itererbart objekt (ofte et array) med promises. Men, hvis nogle af disse objekter ikke er promises, bliver de overført til det resulterende array "som det er".

Her er resultatet for eksempel `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

Så vi er i stand til at overføre eksisterende værdier til `Promise.all` hvor det er praktisk.
````

## Promise.allSettled

[recent browser="new"]

`Promise.all` fejler helt hvis bare ét af dets løfter afvises. Det er godt for "alt eller ingen" situationer, hvor vi har brug for at *alle* resultater er succesfulde for at fortsætte:

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render metoden behøver resultaterne fra alle fetch kald
```

`Promise.allSettled` venter på at alle løfter bliver løst, uanset resultatet. Det resulterende array har:

- `{status:"fulfilled", value:result}` for succesfuldde løfter, og
- `{status:"rejected", reason:error}` for fejl.

Det kunne for eksempel være, at vi gerne vil hente information om flere brugere. Selvom en forespørgsel mislykkes, er vi stadig interesseret i de andre.

Lad os bruge `Promise.allSettled`:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

`results` i linjen med `(*)` ovenfor vil være:
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

Så for hvert løfte får vi dens status og `value/error`.

### Polyfill

Hvis browseren ikke understøtter `Promise.allSettled`, er det nemt at lave en polyfill:

```js
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}
```

I denne kode tager `promises.map` input værdierne og omdanner dem til promises (for en sikkerheds skyld, hvis der blev leveret et ikke-promise) med `p => Promise.resolve(p)`. Derefter tilføjes en `.then` til hver af dem.

Denne handler omdanner et succesfuldt resultats `value` til objektet `{status:'fulfilled', value}`, og en error `reason` om til `{status:'rejected', reason}`. Det er præcis det format, som `Promise.allSettled` forventes at levere.

Nu kan vi bruge `Promise.allSettled` til at give resultatet fra at hente resultaterne af *alle* givne promises, selvom nogle af dem afvises.

## Promise.race

Minder om `Promise.all`, men venter kun på den første løste promise og får dens resultat (eller fejl).

Syntaksen er:

```js
let promise = Promise.race(itererbar);
```

For eksempel vil resultatet her være `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

Det første promise her har hurtigst, så den bliver resultatet. Efter det første løste promise "vinder kapløbet" bliver alle de andre resultater og fejl ignoreret.


## Promise.any

Minder om `Promise.race`, men venter kun på den første *opfyldte* promise og får dens resultat. Hvis alle de givne promises er afvist, så er det returnerede promise afvist med [`AggregateError`](mdn:js/AggregateError) - et specielt error-objekt, der gemmer alle promise-fejl i sin `errors`-egenskab.

Syntaksen er:

```js
let promise = Promise.any(itererbar);
```

For eksempel vil resultatet her være `1`:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ups!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

Det første promise her har hurtigst, men det blev afvist, så det andet promise blev resultatet. Efter det første opfyldte promise "vinder kapløbet", bliver alle de andre resultater ignoreret.

Her er et eksempel når alle promises fejler:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Fejl!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Fejl!
});
```

som du kan se, error objekter for fejlede løfter er tilgængelige i `errors`-egenskaben af `AggregateError`-objektet.

## Promise.resolve/reject

Metoderne `Promise.resolve` og `Promise.reject` er sjældent nødvendige i moderne kode, fordi `async/await` syntaksen (vi møder dem [lige om lidt](info:async-await)) gør dem lidt overflødige.

Vi dækker dem her for fuldkommenhedens skyld og for de som ikke kan/vil bruge `async/await` af en eller anden grund.

### Promise.resolve

`Promise.resolve(value)` opretter et opfyldt promise med resultatet `value`.

Det samme som:

```js
let promise = new Promise(resolve => resolve(value));
```

Metoden bruges til kompatibilitet, når en funktion forventes at returnere et promise.

For eksempel, funktionen `loadCached` nedenfor henter en URL og husker (cacher) dens indhold. For fremtidige opkald med samme URL får den øjeblikkeligt det tidligere indhold fra cachen, men bruger `Promise.resolve` til at lave et promise af det, så det returnerede værdi altid er et promise:

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

Vi kan skrive `loadCached(url).then(…)`, fordi funktionen er garanteret til at returnere et promise. Vi kan altid bruge `.then` efter `loadCached`. Det er formålet med `Promise.resolve` i linjen `(*)`.

### Promise.reject

`Promise.reject(error)` opretter et afvist promise med `error`.

Det samme som:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

I praksis bliver denne metode næsten aldrig brugt.

## Opsummering

Der er 6 statiske metoder i `Promise`-klassen:

1. `Promise.all(promises)` -- venter på at alle promises bliver opfyldt og returnerer en array med deres resultater. Hvis en af de givne promises bliver afvist, bliver det til fejlen i `Promise.all`, og alle andre resultater ignoreres.
2. `Promise.allSettled(promises)` (nylig tilføjet metode) -- venter på at alle promises bliver løst og returnerer deres resultater som en array af objekter med:
    - `status`: `"fulfilled"` eller `"rejected"`
    - `value` (hvis opfyldt) eller `reason` (hvis afvist).
3. `Promise.race(promises)` -- venter på at det første promise bliver løst (opfyldt eller afvist), og dets resultat/fejl bliver resultatet.
4. `Promise.any(promises)`  -- venter på at det første promise bliver opfyldt, og dets resultaat bliver resultatet. Hvis alle de givne promises bliver afvist, bliver [`AggregateError`](mdn:js/AggregateError) til fejlen i `Promise.any`.
5. `Promise.resolve(value)` -- opretter et opfyldt promise med det givne værdi.
6. `Promise.reject(error)` -- opretter et afvist promise med det givne fejl.

Af alle disse er `Promise.all` nok den mest brugte i praksis.
