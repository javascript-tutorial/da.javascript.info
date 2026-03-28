
# Asynkron iteration og generatorer

Asynkron iteration tillader os at iterere over data, der kommer asynkront, på baggrund af en forespørgsel. Det kan f.eks. være hvis vi downloader noget bid for bid over et netværk. Her er asynkrone generatorer praktiske.

Lad os starte med et simpelt eksempel, for at forstå syntaksen. Dererefter gennemgår vi et mere realistisk brugsscenarie.

## Hvad var itererbare objekter?

Lad os først minde os om itererbare objekter. 

Idéen er, at vi har et objekt, såsom `range` her:
```js
let range = {
  from: 1,
  to: 5
};
```

... og vil gerne bruge `for..of` loop på det, såsom `for(value of range)`, for at få værdier fra `1` til `5`.

Med andre ord, vi vil gerne tilføje en *itereringsmulighed* til objektet.

Det kan implementeres ved hjælp af en speciel metode med navnet `Symbol.iterator`:

- Denne metode er kaldt af `for..of` konstruktøren når loopen startes, og den skal returnere et objekt med `next` metoden.
- For hver iteration kaldes `next()` metoden for at få den næste værdi.
- Metoden `next()` skal returnere en værdi med formen `{done: true/false, value:<loop value>}`, hvor `done:true` betyder slutningen på loopet.

Her er en implementation til en itererbar `range`:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.iterator]() { // kaldes én gang når for..of starter
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      next() { // kaldes ved hver iteration, for at få den næste værdi
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1 så 2, så 3, så 4, så 5
}
```

Hvis noget af dette er uklart, så besøg kapitlet [](info:iterable), for at læse mere om iterable.

## Asynkrone itererbare objekter

Asynkron iteration er nødvendig når værdier kommer asynkront: efter `setTimeout` eller andre typer af forsinkelse. 

Det mest almindelige tilfælde er, når objektet skal lave en netværksforespørgsel for at levere den næste værdi. Det vil vi se et eksempel lidt senere.

For at gøre et objekt itererbart og asynkront, skal vi gøre følgende:

1. Brug `Symbol.asyncIterator` i stedet for `Symbol.iterator`.
2. Metoden `next()` vil returnere et promise (om at blive opfyldt med den næstkommende værdi).
    - Nøgleordet `async` håndterer den interne logik. Vi kan simpelthen kalde `async next()`.
3. For at iterere over sådan et objekt, skal vi bruge en `for await (let item of iterable)` loop.
    - Bemærk `await` i loopet.

Til en start, så lad os lave et itererbart`range` objekt, ligesom det før, men nu vil det returnere værdier asynkront, en per sekund.

Alt vi behøver at gøre er at skrive et par ændringer i koden ovenfor:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      async next() { // (2)
*/!*

*!*
        // bemærk: vi kan nu bruge "await" fordi det sker i async next:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
*/!*

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

Som vi kan se, er strukturen den samme som for regulære iterators:

1. For at gøre et objekt asynkront itererbart, skal det have metoden `Symbol.asyncIterator` `(1)`.
2. Denne metode skal returnere objektet med en `next()` metode, der returnerer et promise `(2)`.
3. Metoden `next()` behøver ikke at være `async`, den kan være en regulær metode, der returnerer et promise. Men `async` gør det muligt at bruge `await`, hvilket er praktisk. Her forsinkes det med en sekund `(3)`.
4. For at iterere, bruger vi `for await(let value of range)` `(4)` - husk at skrive "await" efter "for". Det kalder `range[Symbol.asyncIterator]()` én gang, og derefter dens `next()` for at få værdier.

Her er en tabel med forskellene:

|       | Iteratorer | Async iteratorer |
|-------|-----------|-----------------|
| Objekt metode der skal gives til iteratoren | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` returnerer værdi som              | alle typer         | `Promise`  |
| til loop, brug                          | `for..of`         | `for await..of` |

````warn header="Spread syntaksen `...` virker ikke asynkront"
Features der kræver regulære, synkrone iteratorer, virker ikke med asynkrone iteratorer.

For eksempel vil spread syntaksen ikke virke:
```js
alert( [...range] ); // Fejl, ingen Symbol.iterator
```

Det er naturligt, da det forventer at finde `Symbol.iterator`, ikke `Symbol.asyncIterator`.

Det er også tilfældet for `for..of`: syntaksen uden `await` behøver `Symbol.iterator`.
````

## Kan du huske generatorer?

Las os nu genkalde os generatorer, da de tillader os at iterere med mindre kode. For det meste, når vi kan tænke os at arbejde med itererbare objekter, vil vi bruge generatorer.

Simpelt sagt, og med udeladelse af nogle vigtige detaljer, er de "funktioner, der genererer (yield) værdier". De er forklaret i detaljer i kapitlet [](info:generators).

Generatorer noteres med `function*` (bemærk stjernen) og bruger `yield` til at generere en værdi, og derefter kan vi bruge `for..of` til at loope over dem.

Dette eksempel genererer en sekvens af værdier fra `start` til `end`:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, så 2, så 3, så 4, så 5
}
```

Som vi allerede ved, skal vi tilføje `Symbol.iterator` til et objekt for at gøre det itererbart.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <object med next for at gøre range itererbar>;
  }
*/!*
}
```

Det er normal praksis for `Symbol.iterator` at returnere en generator, det gør koden kortere, som du kan se:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // kort skriveform for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, så 2, så 3, så 4, så 5
}
```

Husk at se kapitlet [](info:generators) for flere detaljer.

I regulære generatorer kan vi ikke bruge `await`. Alle værdier skal komme synkront - som krævet af `for..of` konstruktionen.

Hvad hvis vi vil generere værdier asynkront? Fra netværksforespørgsler, for eksempel.

Lad os skifte til asynchronous generators for at gøre det muligt.

## Async generatorer (endelig!)

I praksis er det ofte sådan, at når vi have et objekt, der skal generere værdier asynkront, kan vi bruge en asynkron generator.

Syntaksen er simpel: Sæt `async` foran `function*`. Det gør generatoren asynkron.

Brug derefter `for await (...)` til at iterere over det, i stil med dette:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // Wow, vi kan bruge await!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, så 2, så 3, så 4, så 5 (med forsinkelse mellem)
  }

})();
```

Nu, hvor generatoren er asynkron, kan vi bruge `await` inde i den, stole på promises, udføre netværksforespørgsler og så videre.

````smart header="forskellen under motorhjelmen"
Teknisk set, hvis du er en avanceret læser, der husker detaljerne om generatorer, er der en intern forskel.

For async generatorer, er `generator.next()`-metoden asynkron, og den returnerer promises.

 en normal generator bruger vi `result = generator.next()` til at få værdier. I en async generator bør vi tilføje `await`, som dette:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
Det er derfor at generatorer virker med `for await...of`.
````

### Asynkron itererbare range

Regulære generatorer kan bruges som `Symbol.iterator` for at gøre koden for iteration kortere.

På samme måde kan async generatorer bruges som `Symbol.asyncIterator` for at implementere asynkron iteration.

For eksempel kan vi få `range` objektet til at generere værdier asynkront, en gang pr. sekund, ved at erstatte den synkrone `Symbol.iterator` med den asynkrone `Symbol.asyncIterator`:

```js run
let range = {
  from: 1,
  to: 5,

  // den linje er den samme som [Symbol.asyncIterator]: async function*() {
*!*
  async *[Symbol.asyncIterator]() {
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // lav en pause mellem værdier, vent på noget asynkront
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, så 2, så 3, så 4, så 5
  }

})();
```

Nu vil værdier komme med en forsinkelse på 1 sekund mellem dem.

```smart
Teknisk set, vi kan tilføje både `Symbol.iterator` og `Symbol.asyncIterator` til objektet, så det er både synkront (`for..of`) og asynkront (`for await..of`) itererbart.

I praksis er det dog noget mærkeligt noget at gøre. 🤔
```

## Realistisk eksempel: paginerede data

Indtil nu har vi set på grundlæggende eksempler, for at få forståelse. Nu lad os gennemgå et realistisk brugsscenarie.

Der er mange online services der leverer paginerede data. For eksempel, når vi har brug for en liste over brugere, returnerer en forespørgsel et foruddefineret antal (f.eks. 100 brugere) - "en side", og leverer en URL til den næste side.

Dette mønster er meget almindeligt. Det handler ikke kun om brugere, men om alt muligt.

For eksempel tillader GitHub os at hente commits på samme, paginerede måde:

- Vi skal bruge `fetch` til at oprette en forespørgsel med formen `https://api.github.com/repos/<repo>/commits`.
- Der svares med en JSON af 30 commits, og leverer også et link til den næste side i `Link`-hovedet.
- Derefter kan vi bruge det link til den næste forespørgsel, for at få flere commits, og så videre.

For vores kode, vil vi gerne have en enkel måde at hente commits.

Lad os oprette en funktion `fetchCommits(repo)` som henter commits for os, og laver forespørgsler når det er nødvendigt. Funktionen skal også sørge for al pagineringslogik. For os vil det være en simpel asynkron iteration `for await..of`.

Så brug af metoden vil se sådan ud:

```js
for await (let commit of fetchCommits("username/repository")) {
  // behandling af commit
}
```

Her er sådan en funktion, implementeret som async generator:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github behøver en user-agent header
    });

    const body = await response.json(); // (2) response er JSON (array af commits)

    // (3) URL til næste side er i headers - udtræk den
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) yield commits en ad gangen, indtil siden er færdig
      yield commit;
    }
  }
}
```

Forklaret lidt mere i detaljer kan man sige:

1. Vi bruger browserens metode [fetch](info:fetch) til at downloade commits.

    - Den indledende URL er `https://api.github.com/repos/<repo>/commits`, og de næste sider vil være i `Link`-headeren af svaret.
    - Metoden `fetch` tillader os at medsende authorization og andre headers hvis det er nødvendigt -- her kræver GitHub `User-Agent`.
2. De resturnerede commits er returneret i JSON format.
3. Vi skal trække URL'en til den næste side ud af `Link`-headeren af svaret. Den har et speciel format, så vi bruger en regular expressions for at finde den. Vi vil lære denne funktion i [Regular expressions](info:regular-expressions).
    - URL til den næste sider ser ud i stil med dette: `https://api.github.com/repositories/93253246/commits?page=2`. Den er genereret af GitHub selv.
4. Derefter bruger vi yield til at modtage commits en ad gangen, indtil siden er færdig. Når de er færdige, så trigger vi den næste `while(url)` iteration, hvilket vil resultere i endnu en forespørgsel.

Et eksempel på brug (viser commit forfattere i console):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // lad os stoppe ved 100 commits
      break;
    }
  }

})();

// Bemærk: Hvis du kører dette i dit eget miljø, vil du også skulle indsætte funktionen fetchCommits beskrevet ovenfor 
```

Det er lige hvad vi havde brug for. 

De interne mekanismer af paginerede anmodninger er usynlige for brugeren af funktionen. For os er det bare en async generator, der returnerer commits.

## Opsummering

Regulære iteratorer og generatorer arbejder fint med data, der ikke tager tid at generere.

Når vi forventer data at komme asynkront, med forsinkelser, kan deres async modstørrelser bruges, og `for await..of` i stedet for `for..of`.

Syntaxforskelle mellem async og regulære iteratorer:

|       | Iteratorer | Async iteratorer |
|-------|-----------|-----------------|
| Objekt metode der skal gives til iteratoren | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` returnerer værdi som    | `{value:…, done: true/false}`         | `Promise` that resolves to `{value:…, done: true/false}`  |
| til loop, brug                          | `for..of`         | `for await..of` |

Syntaksforskelle mellem async og regulære generatorer:

|       | Generatorer | Async generatorer |
|-------|-----------|-----------------|
| Deklarering | `function*` | `async function*` |
| `next()` returnerer værdi som          | `{value:…, done: true/false}`         | `Promise` der løser til `{value:…, done: true/false}`  |

I web-udvikling møder vi ofte strømme af data, der sendes bid for bid. For eksempel, når man downloader eller uploader en stor fil.

Vi kan bruge asynkrone generatorer til at behandle sådanne data. Det er måske også værd at vide, at i nogle miljøer, som f.eks. i browsere, findes der også en anden API kaldet Streams, som tilbyder specielle grænseflader til at arbejde med sådanne strømme, til at transformere dataene og til at sende dem fra en strøm til en anden (f.eks. download fra et sted og umiddelbart sendelse et andet sted).
