# Løkkebaseret løsning

Den løkkebaserede variant af løsningen:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```

Bemærk venligst, at vi bruger en midlertidig variabel `tmp` til at gennemgå listen. Teknisk set kunne vi have brugt en funktionsparameter `list` i stedet:

```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

...Men det vil ikke være klog. I fremtiden kan vi have brug for at udvide en funktion, gøre noget andet med listen. Hvis vi ændrer `list`, så mister vi den evne.

Når vi nu taler om gode variabelnavne, er `list` her listen selv. Det første element i den. Og det bør forblive som det er. Det er klart og pålideligt.

Modsat er rollen for `tmp` udelukkende en midlertidig variabel til listetraversering, ligesom `i` i `for`-løkken.

# Rekursiv løsning

Den rekursive variant af `printList(list)` følger en simpel logik: for at udskrive en liste skal vi udskrive det nuværende element `list`, og derefter gøre det samme for `list.next`:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {

  alert(list.value); // udskriver den aktuelle værdi

  if (list.next) {
    printList(list.next); // gør det samme for resten af listen
  }

}

printList(list);
```

Hvad er bedst?

Teknisk set er løkken mere effektiv. Disse to varianter gør det samme, men løkken bruger ikke ressourcer på indlejrede funktionskald.

Modsat er den rekursive variant kortere og nogle gange lettere at forstå.
