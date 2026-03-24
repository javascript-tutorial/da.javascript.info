# Async/await

Der er en speciel syntaks der bruges til at arbejde med promises på en mere komfortabel måde, kaldet "async/await". Den er overraskende let at forstå og bruge.

## Async functions

Lad os starte med nøgleordet `async`. Det kan placeres før en function, sådan her:

```js
async function f() {
  return 1;
}
```

Ordet "async" før en function betyder en simpel ting: en function returnerer altid en promise. Andre værdier er automatisk pakket ind i en løst (resolved) promise.

For eksempel, denne funktion returnerer et løst promise med resultatet `1`; lad os teste den:

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

... vi kunne også eksplicit returnere et promise, hvilket ville være det samme:

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

Så `async` sikrer at funktionen returnerer et promise, og pakker ikke-promise værdier ind i et løst promise. Enkelt nok, ikke? Men ikke kun det. Der er endnu et nøgleord, `await`, som kun virker inde i `async` funktioner, og det er ret sejt.

## Await

Syntaksen er:

```js
// virker kun inde i async funktioner
let value = await promise;
```

Nøgleordet `await` gør at JavaScript venter indtil det promise er løst og returnerer dets resultat.

Her er et eksempel med et promise, der løses om 1 sekund:
```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
  let result = await promise; // vent indtil promise løses (*)
*/!*

  alert(result); // "færdig!"
}

f();
```

Udførelsen af funktionen "sættes på pause" ved linjen `(*)` og fortsætter når promise løses, med `result` som dens resultat. Koden ovenfor vil vise "færdig!" efter 1 sekund.

Lad os understrege: `await` udsætter eksekvering af funktionen indtil promise løses og fortsætter med det modtagne resultat. Det koster ikke nogen CPU ressourcer, fordi JavaScript motoren kan udføre andre job i mellemtiden: udføre andre scripts, håndtere events etc.

Det er bare en mere elegant syntaks for at få resultatet af et promise end `promise.then`. Og det er lettere at læse og skrive.

````warn header="Du kan ikke bruge `await` i regulære funktioner"
HVis vi prøver at bruge `await` i en ikke-async funktion, vil der være en syntaxfejl:

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

Vi får den fejl hvis vi glemmer at tilføje `async` før en funktion. Som nævnt tidligere, virker `await` kun inde i en `async` funktion.
````

Lad os tage `showAvatar()` eksemplet fra kapitlet <info:promise-chaining> og omskrive det ved hjælp af `async/await`:

1. Vi vil skulle erstatte `.then` kald med `await`.
2. Desuden bør vi gøre funktionen `async` for at de kan fungere.

```js run
async function showAvatar() {

  // læs JSON filen
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // læs github bruger
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // vis avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // vent 3 sekunder
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

Ret rent og nemt at læse, ikke? Meget bedre end før.

````smart header="Moderne browsere tillader top-level `await` i moduler"
I moderne browsere vil `await` på top level fungere helt fint, når vi er inde i et modul. Vi vil dække moduler i artiklen <info:modules-intro>.

For eksempel:

```js run module
// vi tager udgangspunkt i, at denne kode kører på top level, inde i et modul
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
```

Hvis vi ikke bruger moduler, eller [ældre browsere](https://caniuse.com/mdn-javascript_operators_await_top_level) skal understøttes, er der en universel opskrift: pak det hele ind i en anonym async funktion.

Sådan her:

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

````

````smart header="`await` accepterer \"thenables\""
Ligesom `promise.then` vil `await` tillade os at bruge *thenable* objekter (dem med en meode `then` der kan kaldes). Idéen med dette er at 3de-parts objekter ikke nødvendigvis er et promise, men promise-kompatible: hvis det understøtter `.then`, er det godt nok til at bruge sammen med `await`.

Her er en demo `Thenable` klasse; `await` nedenfor accepterer udgaver af den:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // resolve med this.num*2 efter 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // venter i 1 sekund, hvorefter resultatet bliver 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

Hvis `await` får et ikke-promise object med `.then`, det kalder den metode og giver de indbyggede funktioner `resolve` og `reject` som argumenter (ligesom det gør for en almindelig `Promise` executor). Derefter venter `await` indtil en af dem bliver kaldt (i eksemplet ovenfor sker det i linjen `(*)`) og fortsætter derefter med resultatet.
````

````smart header="Async klasse metoder"
For at deklarere en async klasse metode, tilføj `async` før metoden:

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1 (det er det samme som (result => alert(result)))
```
Meningen er den samme: det sikrer at den returnerede værdi er et promise og aktiverer `await`.

````
## Håndtering af fejl

Hvis et promise løses normalt, så returnerer `await promise` resultatet. Men i tilfældet af en afvisning, kaster det en fejl, som om der var en `throw`-sætning på linjen.

Denne kode:

```js
async function f() {
*!*
  await Promise.reject(new Error("Ups!"));
*/!*
}
```

... er det samme som:

```js
async function f() {
*!*
  throw new Error("Ups!");
*/!*
}
```

I virkelige situationer vil et promise tage noget tid før det afvises. I det tilfælde vil der være en forsinkelse før `await` kaster en fejl.

Vi kan opsnappe den fejl ved hjælp af `try..catch`, på samme måde som en almindelig `throw`:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

I tilfælde af en fejl, springer kontrollen over til `catch`-blokken. Vi kan også wrappe flere linjer i `try..catch` for at fange fejl i flere `await`:

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // fanger fejler i både fetch og response.json
    alert(err);
  }
}

f();
```

Hvis vi ikke har `try..catch`, så vil promise genreret ved kaldet af den asynkrone funktion `f()` blive afvist. Vi kan tilføje `.catch` for at håndtere det:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() bliver et afvist promise
*!*
f().catch(alert); // TypeError: fejlede ved fetch // (*)
*/!*
```

Hvis vi glemmer at tilføje `.catch`, så får vi en ikke-håndteret promise-fejl (synlig i konsollen). Vi kan fange sådanne fejl ved hjælp af en global `unhandledrejection`-begivenhedshåndtering som beskrevet i kapitlet <info:promise-error-handling>.


```smart header="`async/await` og `promise.then/catch`"
Når vi bruger `async/await`, bruger vi sjældent `.then`, fordi `await` håndterer ventningen for os. Og vi kan bruge en almindelig `try..catch` i stedet for `.catch`. Det er ofte (men ikke altid) mere praktisk.

Men på den øverste niveau af koden, når vi er uden for enhver `async` funktion, er vi syntaktisk ude af stand til at bruge `await`, så det er en normal praksis at tilføje `.then/catch` for at håndtere det endelige resultat eller fejlen, som i linjen `(*)` i eksemplet ovenfor.
```

````smart header="`async/await` virker godt med `Promise.all`"
Når vi har brug for at vente på flere promises, kan vi pakke dem ind i `Promise.all` og derefter `await`:

```js
// vent på arrayet af resultater
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

I tilfælde af en fejl, propagerer den som sædvanligt, fra det mislykkede promise til `Promise.all`, og så bliver det til en exception, som vi kan fange ved hjælp af `try..catch` omkring kaldet.

````

## Opsummering

Nøgleordet `async` før en funktion har to effekter:

1. Gør det til en funktion, der altid returnerer et promise.
2. Tillader `await` at blive brugt i den.

Nøgleordet `await` før et promise gør JavaScript til at vente indtil det promise løses, og derefter:

1. Hvis det er en fejl, genereres en exception — samme som hvis `throw error` blev kaldt på det sted.
2. Ellers returnerer det resultatet.

Sammen udgør de en fremragende framework til at skrive asynkron kode, som er let at læse og skrive.

Med `async/await` behøver vi sjældent at skrive `promise.then/catch`, men vi bør stadig ikke glemme, at de er baseret på promises, fordi nogle gange (f.eks. i den yderste scope) er vi nødt til at bruge dem. Derudover er `Promise.all` ret smart når vi venter på mange opgaver samtidigt.
