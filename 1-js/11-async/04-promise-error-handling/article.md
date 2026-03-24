
# Håndtering af fejl med promises

Kæder af promise er gode til fejlbehandling. Når et promise afvises, springer kontrollen til den nærmeste afvisningshåndtering. Det er meget praktisk i praksis.

For eksempel, i koden nedenfor er URL'en til `fetch` forkert (ingen sådan side) og `.catch` håndterer fejlen:

```js run
*!*
fetch('https://no-such-server.blabla') // afviser
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (teksten kan variere)
```

Som du kan se behøver `.catch` ikke at komme umiddelbart efter. Den kan sagtens placeres efter en eller flere `.then`.

Eller, måske er alt i orden med siden, men svaret er ikke gyldigt JSON. Den nemmeste måde at fange alle fejl er at tilføje `.catch` til slutningen af kæden:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
*!*
  .catch(error => alert(error.message));
*/!*
```

Normalt vil sådan en `.catch` slet ikke blive aktiveret. Men, hvis en af dine promises afvises (et netværksproblem, ugyldig json osv.), så vil den fange det.

## Implicit try..catch

Koden fra en promise udførerer og promise handlere har en "usynlig `try..catch`" omkring den. Hvis der sker en exception, vil den blive opfanget og behandlet som en afvisning.

Se for eksempel denne kode:

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Ups!");
*/!*
}).catch(alert); // Error: Ups!
```

...Virker præcis på samme måde som denne:

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Ups!"));
*/!*
}).catch(alert); // Error: Ups!
```

Den "usynlige `try..catch`" omkring udførerenopfanger automatisk fejl og omdanner dem til afviste løfter.

Det sker ikke kun i udførerfunktionen, men også i dens handlere. Hvis vi bruger `throw` indeni en `.then`-handler, betyder det en afvisning af løftet, og kontrollen overgives til den nærmeste fejlhåndterer.

Her er et eksempel:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  throw new Error("Ups!"); // afviser løftet
*/!*
}).catch(alert); // Error: Ups!
```

Dette sker for alle fejl, ikke kun de der er forårsaget af `throw`-sætningen. For eksempel, en programmeringsfejl:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  blabla(); // funktionen findes ikke
*/!*
}).catch(alert); // ReferenceError: blabla er ikke defineret
```

Den endelige `.catch` fanger ikke kun eksplicitte afvigelser, men også tilfældige fejl i de håndteringer, der kommer før den.

## Rethrowing

Som vi allerede har bemærket ligner en `.catch` i slutningen af kæden `try..catch`. Vi kan have så mange `.then` håndteringer som vi vil, og så bruge en enkelt `.catch` i slutningen for at håndtere fejl i alle af dem.

I en normal `try..catch` kan vi analysere fejlen og måske kaste den igen, hvis den ikke kan håndteres. Det samme er muligt for promises.

Hvis vi bruger `throw` indeni `.catch`, så går kontrollen til den næste tætteste fejl-handler. Og hvis vi håndterer fejlen og afslutter normalt, så fortsætter det til den næste tætteste succesfulde `.then` handler.

I eksemplet nedenfor håndterer `.catch` fejlen succesfuldt:

```js run
// the execution: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Ups!");

}).catch(function(error) {

  alert("Fejlen er håndteret, fortsæt normalt");

}).then(() => alert("Næste succesfulde handler kører"));
```

Her afsluttes `.catch` blokken normalt. Så den næste succesfulde `.then` handler kaldes.

I eksemplet nedenfor ser vi den anden situation med `.catch`. Handleren `(*)` fanger fejlen og kan ikke håndtere den (f.eks. den kun ved hvordan man håndterer `URIError`), så den kaster den igen:

```js run
// the execution: catch -> catch
new Promise((resolve, reject) => {

  throw new Error("Ups!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // håndter fejlen
  } else {
    alert("Kan ikke håndtere sådan en fejl");

*!*
    throw error; // kaster fejlen videre
*/!*
  }

}).then(function() {
  /* denne handler kører ikke her */
}).catch(error => { // (**)

  alert(`En ukendt fejl er opstået: ${error}`);
  // returnerer ikke noget => udførelse foregår normalt

});
```

Udførelse foregår fra den første `.catch` `(*)` til den næste `(**)` ned ad kæden.

## Afvisninger der ikke håndteres

Hvad sker der når en fejl ikke håndteres? For eksempel, vi har glemt at tilføje `.catch` til slutningen af kæden, som her:

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // Fejl her (funktionen findes ikke)
})
  .then(() => {
    // håndtering af succesfuld promise, en eller flere
  }); // men uden .catch i slutningen!
```

I tilfælde af en fejl, bliver løftet afvist, og udførelsen vil prøve at hoppe til den nærmeste håndtering af afvisninger - men der er ingen. Så fejlen bliver "fastlåst". Der er ingen kode til at håndtere den.

I praksis, ligesom med regulære uhåndterede fejl i kode, betyder det, at noget er gået frygteligt galt.

Hvad sker der når en regulær fejl opstår og ikke bliver fanget af `try..catch`? Scriptet dør med en besked i konsollen. Et lignende noget sker med uhåndterede promise-afvisninger.

JavaScript-motoren sporer sådanne afvisninger og genererer en global fejl i det tilfælde. Du kan se det i konsollen, hvis du kører eksemplet ovenfor.

I browseren kan vi fange sådanne fejl ved hjælp af begivenheden `unhandledrejection`:

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // et event objekt har to specielle egenskaber:
  alert(event.promise); // [object Promise] - det promise der genererede fejlen
  alert(event.reason); // Error: Ups! - det error objekt der ikke er behandlet
});
*/!*

new Promise(function() {
  throw new Error("Ups!");
}); // ingen cathc til at opfange fejlen
```

Event'et er en del af [HTML standarden](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

Hvis der sker en fejl og der ikke er en `.catch`, vil handleren `unhandledrejection` blive udløst og modtage et `event` objekt med information om fejlen, så vi kan handle på det.

Normalt er det ikke muligt at komme sig over sådanne fejl, så vores bedste måde at håndtere dem på er at informere brugeren om problemet og sandsynligvis rapportere hændelsen til serveren.

I ikke-browser miljøer som Node.js findes der andre måder at spore uhåndterede fejl på.

## Opsummering

- `.catch` håndterer fejl i alle slags promises: det kan være en `reject()` der kaldes eller en fejl der kastes med `throw`.
- `.then` kan også opfange fejl på samme måde, hvis den får et andet argument (som er fejlhåndteringen).
- Vi bør placere `.catch` præcis på de steder vi vil håndtere fejlene og ved hvordan de skal behandles. Den handler der skal skal analysere fejlen (brugerdefinerede fejl kan hjælpe) og kaste fejl den ikke kender videre (rethrow) da det kan være programmeringsfejl.
- Det er ok slet ikke at bruge `.catch` hvis der ikke er nogen måde at afhjælpe fejl.
- I alle tilfælde bør vi have en `unhandledrejection` event handler (for browsere og tilsvarende for andre miljøer) til at opsnappe fejl der ikke håndteres og informere brugeren (og muligvis serveren) om dem, så vores app ikke bare "dør uden grund".
