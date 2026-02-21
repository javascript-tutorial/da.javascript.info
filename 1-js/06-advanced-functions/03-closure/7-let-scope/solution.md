Resultater er: **fejl**.

Prøv at køre den:

```js run
let x = 1;

function func() {
*!*
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
*/!*
  let x = 2;
}

func();
```

I eksemplet kan vi observere den lille forskel mellem en "ikke eksisterende" og en "ikke-initialiseret" variabel.

Som du måske har læst i artiklen [](info:closure), starter en variabel i "ikke-initialiseret" tilstand fra det øjeblik, hvor udførelsen indtager et kodeblok (eller en funktion). Og den forbliver ikke-initialiseret indtil den tilsvarende `let`-erklæring.

Med andre ord, en variabel eksisterer teknisk set, men kan ikke bruges før `let`.

Koden ovenfor demonstrerer dette.

```js
function func() {
*!*
  // den lokale variable x er kendt af motoren fra det øjeblik funktionen starter,
  // men "ikke-initialiseret" (ubrugelig) indtil let ("dead zone")
  // derfor fejlen
*/!*

  console.log(x); // ReferenceError: Cannot access 'x' before initialization

  let x = 2;
}
```

Denne zone af midlertidig ubrugelighed af en variabel (fra begyndelsen af kodeblokken til `let`) kaldes ofte "dødszonen" (dead zone).
