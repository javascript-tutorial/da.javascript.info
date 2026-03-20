# Brugerdefinerede fejl, udvidelse af Error

Når vi udvikler noget, har vi ofte brug for egne fejlklasser til at reflektere specifikke ting, der kan gå galt i vores opgaver. For fejl i netværksoperationer kan vi have brug for `HttpError`, for databaseoperationer `DbError`, for søgeoperationer `NotFoundError` og så videre.

Vores fejl bør understøtte grundlæggende fejl egenskaber som `message`, `name` og meget gerne `stack`. Men de kan også have andre egenskaber af deres egen type, f.eks. `HttpError` objekter kan have en `statusCode` egenskab med en værdi som `404` eller `403` eller `500`.

JavaScript tillader at bruge `throw` med ethvert argument, så teknisk set behøver vores custom error klasser ikke at arve fra `Error`. Men hvis vi arver, så bliver det muligt at bruge `obj instanceof Error` til at identificere fejl objekter. Så det er bedre at arve fra den.

Efterhånden som applikationen vokser, vil vores egne fejl naturligvis danne en hierarki. For eksempel kan `HttpTimeoutError` arve fra `HttpError`, og så videre.

## Udvidelse af Error

Som et eksempel, lad os overveje en funktion `readUser(json)` som skal læse JSON med brugerdata.

Her er et eksempel på, hvordan et gyldigt `json` kan se ud:
```js
let json = `{ "name": "John", "age": 30 }`;
```

Internt bruger vi `JSON.parse`. Hvis den modtager fejlformateret `json`, så kaster den `SyntaxError`. Men selv hvis `json` er syntaktisk korrekt, betyder det jo ikke nødvendigvis, at det er en gyldig bruger? Det kan mangle de nødvendige data. For eksempel kan det ikke have `name` og `age` egenskaber, som er afgørende for vores brugere.

Vores funktion `readUser(json)` vil ikke kun læse JSON, men også tjekke ("validere") dataene. Hvis der mangler at blive udfyldt påkrævede felter, eller det er formatet er forkert, så er det en fejl. Og det er ikke en `SyntaxError`, fordi dataene er syntaktisk korrekte, men en anden type af fejl. Vi vil kalde det `ValidationError` og oprette en klasse til det. En fejl af denne type bør også bære informationen om det fejlbehagende felt.

Vores `ValidationError` klasse bør arve fra `Error` klassen.

Klassen `Error` er indbygget, men her er dens omtrentlige kode, så vi kan forstå, hvad vi udvider:

```js
// "pseudocode" for den indbyggede Error klasse defineret af JavaScript selv
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (forskellige navne for forskellige indbyggede fejltyper)
    this.stack = <call stack>; // ikke-standard, men de fleste miljøer understøtter det
  }
}
```

Lad nu `ValidationError` udvide denne `Error` og prøve at bruge den:

```js run
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Ups!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Ups!
  alert(err.name); // ValidationError
  alert(err.stack); // en liste af indlejrede kald med linjenumre for hvor fejlen opstod
}
```

Bemærk: i linjen `(1)` kalder vi 'parent constructor'. JavaScript kræver at vi kalder `super` i 'child constructor', så det er obligatorisk. Forældrekonstruktøren sætter `message` egenskaben.

Forældrekonstruktøren sætter også `name` egenskaben til `"Error"`, så i linjen `(2)` nulstiller vi den til den rigtige værdi.

Lad os prøve at bruge den i `readUser(json)`:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("Mangler feltet: age");
  }
  if (!user.name) {
    throw new ValidationError("Mangler feltet: name");
  }

  return user;
}

// Eksempel med try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Ugyldige data: " + err.message); // Ugyldige data: Mangler feltet: name
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("JSON Syntaksfejl: " + err.message);
  } else {
    throw err; // ukendt fejl, kast den videre (**)
  }
}
```

Blokken `try..catch` i koden ovenfor åndterer både vores `ValidationError` og den indbyggede `SyntaxError` fra `JSON.parse`.

Se hvordan vi gør brug af `instanceof` til at tjekke for den specifikke fejltype i linjen `(*)`.

Vi kan også kigge på `err.name`, sådan her:

```js
// ...
// i stedet for (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```

`instanceof` versionen er meget bedre, fordi vi i fremtiden måske vil udvide `ValidationError`, lave undertyper af den i stil med `PropertyRequiredError`. Et tjek med `instanceof` vil stadig virke for nedarvede klasser. På den måde er det fremtidssikret.

Det er også vigtigt, at hvis `catch` møder en ukendt fejl, så kaster den den videre i linjen `(**)`. Denne `catch` blok ved kun hvordan vi håndterer validerings- og syntaksfejl. Alt andet (sket ved en fejl i koden eller andre ukendte årsager) skal falde igennem.

## Videre nedarvning

Klassen `ValidationError` er meget generisk - mange ting kan gå galt. Egenskaben kan mangle eller den kan være i et forkert format (som en strengværdi for `age` i stedet for et tal). Lad os lave en mere konkret klasse `PropertyRequiredError`, præcist til at håndtere manglende egenskaber. Den vil bære yderligere information om den egenskab, der mangler.

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("Mangler egenskab: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// Eksempel med try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Ugyldige data: " + err.message); // Ugyldige data: Mangler egenskab: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntaksfejl: " + err.message);
  } else {
    throw err; // ukendt fejl, kast den videre
  }
}
```

Den nye klasse `PropertyRequiredError` er nem at bruge: vi behøver bare at videregive egenskabens navn: `new PropertyRequiredError(property)`. Den læsevenlige `message` bliver skabt i konstruktøren.

Bemærk at `this.name` in `PropertyRequiredError` constructor er igen tildelt manuelt. Det kan blive en smule besværligt -- at tildele `this.name = <class name>` i hver custom error klasse. Vi kan undgå det ved at lave vores egen "basic error" klasse, der tildele `this.name = this.constructor.name`. Og så nedarve alle vores custom errors fra den.

Lad os kalde det `MyError`.

Her er koden med `MyError` og andre custom error klasser, forenklet:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("Ingen egenskab: " + property);
    this.property = property;
  }
}

// name er korrekt indstillet af MyError
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

Nu er brugerdefinerede fejl meget kortere, især `ValidationError`, da vi har fjernet linjen `"this.name = ..."` i constructor.

## Indpakning af undtagelser (expeptions)

Meningen med funktionen `readUser` i koden ovenfor er "at læse brugerdata". Der kan opstå forskellige slags fejl i den proces. Som det er nu har vi `SyntaxError` og `ValidationError`, men i en fremtidig `readUser` funktion kan det vokse og måske generere andre typer fejl.

Koden der kalder `readUser` bør håndtere disse fejl. Lige nu bruger den flere `if` inde i `catch` blokken, der tjekker klassen og håndterer kendte fejl og kaster de ukendte videre.

Skemaet er sådan her:

```js
try {
  ...
  readUser()  // den potentielle fejlkilde
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // håndter valideringsfejl
  } else if (err instanceof SyntaxError) {
    // håndter syntaksfejl
  } else {
    throw err; // ukendt fejl, kast den videre
  }
}
```

I koden ovenfor kan vi se to typer af fejl, men der kan være flere.

Hvis `readUser`-funktionen genererer flere typer af fejl, så bør vi spørge os selv: vil vi virkelig have lyst til at skulle tjekke for alle fejltyper - en efter en - hver gang?

Ofte er svaret "Nej": vi vil gerne være "et niveau over alt det". Vi vil bare have at vide om der var en "data læsningsfejl" -- hvorfor det præcist skete er ofte irrelevant (fejlmeddelelsen beskriver det). Eller, endnu bedre, vi vil gerne have en måde at få detaljerne om fejlen på ... men kun hvis vi har brug for dem.

Den teknik vi beskriver her kaldes "wrapping exceptions".

1. Vi laver en ny klasse `ReadError` til at repræsentere en generisk "data læsning" fejl.
2. Funktionen `readUser` vil fange data læsningsfejl, der opstår inden for den, såsom `ValidationError` og `SyntaxError`, og generere en `ReadError` i stedet.
3. `ReadError`-objektet vil gemme referencen til den originale fejl i sin `cause`-egenskab.

Således vil koden, der kalder `readUser`, kun behøve at tjekke for `ReadError`, ikke for hver enkelt type data læsningsfejl. Og hvis den har brug for flere detaljer om en fejl, kan den tjekke dens `cause`-egenskab.

Her er koden, der definerer `ReadError` og demonstrerer dens brug i `readUser` og `try..catch`:

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntaksfejl", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Valideringsfejl", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

I koden ovenfor fungerer `readUser` præcis som beskrevet -- fanger syntaks- og valideringsfejl og kaster `ReadError`-fejl i stedet (ukendte fejl kastes videre som normalt).

Så den ydre kode tjekker `instanceof ReadError` og det er det. Ingen grund til at gennemgå alle mulige fejltyper.

Den kaldes "wrapping exceptions", fordi den tager "low level" undtagelser og "pakker" dem ind i `ReadError` der er mere abstrakt. Denne teknik er meget brugt i objektorienteret programmering.

## Opsummering

- Vi kan nedarve fra `Error` og andre indbyggede fejltyper på normal vis. Vi skal bare tage huske på `name`-egenskaben og ikke glemme at kalde `super`.
- Vi kan bruge `instanceof` til at tjekke for bestemte fejl. Det virker også med nedarvning. Men nogle gange har vi et fejlobjekt, der kommer fra en 3.parts bibliotek, hvor der måske ikke er en enkel måde at få dens klasse. Her kan `name`-egenskaben bruges til sådanne tjek.
- Wrapping exceptions er en almindelig teknik: en funktion håndterer lav-niveau undtagelser og opretter højere-niveau fejl i stedet for forskellige lav-niveau fejl. Lav-niveau undtagelser bliver nogle gange til egenskaber på det objekt, som `err.cause` i eksemplerne ovenfor, men det er ikke strengt nødvendigt.
