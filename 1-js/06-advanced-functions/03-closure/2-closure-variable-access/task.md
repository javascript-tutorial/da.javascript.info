importance: 5

---

# Hvilke variable er tilgængelige?

Funktionen `makeWorker` nedenfor opretter en anden funktion og returnerer den. Den nye funktion kan kaldes fra et andet sted.

Vil den have adgang til de ydre variable fra sit oprettelsessted, eller fra sit kaldested, eller begge?

```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

// Opret en funktion
let work = makeWorker();

// Kald den
work(); // Hvad vil den vise?
```

Hvilken værdi vil den vise: "Pete" eller "John"?
