importance: 5

---

# OPret et træ fra objektet

Skriv en funktion `createTree`, som opretter en indlejret `ul/li`-liste fra det indlejrede objekt.

For eksempel:

```js
let data = {
  "Fisk": {
    "ørred": {},
    "laks": {}
  },

  "Træ": {
    "Store": {
      "Mammuttræ": {},
      "Eg": {}
    },
    "Blomstrende": {
      "æbletræ": {},
      "magnolia": {}
    }
  }
};
```

Syntaksen for at kalde funktionen er:

```js
let container = document.getElementById('container');
*!*
createTree(container, data); // opretter træet i container
*/!*
```

Resultatet (træet) bør se sådan ud:

[iframe border=1 src="build-tree-dom"]

Vælg en af følgende to måder at løse denne opgave:

1. Opret HTML'en for træet og tildel den til `container.innerHTML`.
2. Opret de enkelte træ-noder og tilføj dem med DOM-metoder.

Det ville være dejligt, hvis du kunne gøre begge dele.

P.S. Træet bør ikke have "ekstra" elementer som tomme `<ul></ul>` for bladene.
