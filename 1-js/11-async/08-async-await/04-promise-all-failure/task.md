
# Farlig Promise.all

`Promise.all` er en fantastisk måde at køre flere operationer parallelt. Det er især nyttigt når vi har brug for at lave flere forespørgsler til forskellige services samtidigt.

Men, der er en skjult fare. Vi vil se et eksempel i denne opgave og udforske, hvordan man undgår den.

Lad os sige, vi har en forbindelse til en ekstern service, såsom en database.

Der er to funktioner: `connect()` og `disconnect()`.

Når den er forbundet, kan vi sende forespørgsler ved hjælp af `database.query(...)` - en async function, som normalt returnerer resultatet, men også kan kaste en fejl.

Her er en simpel implementering af det:

```js
let database;

function connect() {
  database = {
    async query(isOk) {
      if (!isOk) throw new Error('Query failed');
    }
  };
}

function disconnect() {
  database = null;
}

// beregnet brug:
// connect()
// ...
// database.query(true) for at emulere et succesfuldt kald
// database.query(false) for at emulere et mislykket kald
// ...
// disconnect()
```

Se her er problemet.

Vi skrev koden til at forbinde og sende 3 forespørgsler parallelt (alle tager forskellig tid, f.eks. 100, 200 og 300 ms), for derefter at frakoble igen:

```js
// Hjælperfunktion til at kalde async funktion `fn` efter `ms` millisekunder
function delay(fn, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => fn().then(resolve, reject), ms);
  });
}

async function run() {
  connect();

  try {
    await Promise.all([
      // disse 3 paralelle jobs tager forskellig tid: 100, 200 og 300 ms
      // vi bruger `delay` hjælperen for at opnå denne effekt
*!*
      delay(() => database.query(true), 100),
      delay(() => database.query(false), 200),
      delay(() => database.query(false), 300)
*/!*
    ]);
  } catch(error) {
    console.log('Fejl håndteret (eller er den?)');
  }

  disconnect();
}

run();
```

To af disse forespørgsler viser sig at fejle, men vi var smarte nok til at wrappe `Promise.all` kaldet i en `try..catch` block.

Men lige meget hvad, så hjælper det ikke! Dette script fører faktisk til en ikke-fanget fejl i konsollen!

Hvorfor? Hvordan undgår man det?