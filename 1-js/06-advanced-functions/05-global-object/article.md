
# Objektet Global

Objektet global indeholder variable og funktioner der er tilgængelige overalt. Som standard er de, der er indbygget i sproget eller miljøet.

I en browser kaldes det `window`, for Node.js er det `global`, og for andre miljøer kan det have et andet navn.

I den senere tid er `globalThis` tilføjet til sproget som et standardiseret navn for det globale objekt, som bør være understøttet i alle miljøer. Det er understøttet i alle store browsere.

Vi vil dog bruge `window` her, da det antages at vores miljø er en browser. Hvis dit script skal køre i andre miljøer, er det bedre at bruge `globalThis` istedet.

Elle egenskaber af det globale objekt kan tilgås direkte, uden at nævne det globale objekt direkte:

```js run
alert("Hej");
// er det samme som
window.alert("Hej");
```

I en browser vil globale funktioner og variable deklareret med `var` (ikke `let/const`!) blive en del af det globale objekt:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (er blevet en egenskab af det globale objekt)
```

Deklaration af funktionerer har samme effekt som `var` (sætninger med `function`-nøgleord i hovedkoden, ikke funktionsudtryk).

Du bør ikke gøre din kode afhængig af det! Denne adfærd eksisterer for kompatibilitetsformål. Moderne scripts bruger [JavaScript modules](info:modules) hvor det ikke sker.

Hvis vi bruger `let` i stedet for `var`, så bliver det ikke en egenskab af det globale objekt:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (bliver ikke en egenskab af det globale objekt)
```

Hvis en værdi er så vigtig, at du vil gøre den tilgængelig globalt, så skriv den direkte som en egenskab af det globale objekt:

```js run
*!*
// gør information om den nuværende bruger global, så alle scripts kan tilgå den
window.currentUser = {
  name: "John"
};
*/!*

// et andet sted i koden
alert(currentUser.name);  // John

// eller, hvis vi har en lokal variabel med navnet "currentUser"
// hent den direkte fra window (sikker tilgang!)
alert(window.currentUser.name); // John
```

Med det sagt så er frarådes brugen af globale variabler generelt. Der bør være så få globale variabler som muligt. Design af kode hvor en funktion får "input" variabler og producerer et bestemt "output" er tydeligere, mindre udsat for fejl og lettere at teste end hvis den bruger ydre eller globale variabler.

## Brugbart til polyfills

Vi kan bruge det globale objekt til at teste for understøttelse af moderne sprogfunktioner.

For eksempel, test om et indbygget `Promise`-objekt eksisterer (det eksisterer ikke i virkelig gamle browsere):
```js run
if (!window.Promise) {
  alert("Din browser er virkelig gammel!");
}
```

Hvis der ikke eksisterer en `Promise`-funktion (f.eks. i en gammel browser), kan vi oprette "polyfills": tilføj funktioner som ikke er understøttet af miljøet, men eksisterer i det moderne standard.

```js run
if (!window.Promise) {
  window.Promise = ... // egen implementation af en moderne funktion
}
```

## Opsummering

- Det globale objekt indeholder variable som skal være tilgængelige overalt.

    Det inkluderer JavaScript indbyggede funktioner, såsom `Array` og miljøspecifikke værdier, såsom `window.innerHeight` -- vindueshøjden i browseren.
- Det globale objekt har et universelt navn `globalThis`.

    ...Men ofte refereres det til med "gamle skole" miljøspecifikke navne, såsom `window` (browser) og `global` (Node.js).
- Vi bør kun gemme værdier i det globale objekt, hvis de er virkelig globale for vores projekt. Og holde antallet af globale variabler lavt.
- I browseren, medmindre vi bruger [modules](info:modules), bliver globale funktioner og variable deklareret med `var` til egenskaber af det globale objekt.
- For at gøre vores kode fremtidssikker og lettere at forstå, bør vi tilgå egenskaber af det globale objekt direkte, som `window.x`.
