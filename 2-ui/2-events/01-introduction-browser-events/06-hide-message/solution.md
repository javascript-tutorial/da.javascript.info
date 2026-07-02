
For at tilføje knappen kan vi enten bruge `position:absolute` (og gøre panelet `position:relative`) eller `float:right`. Fordelen ved `float:right` er at knappen aldrig overlapper teksten, men `position:absolute` giver mere frihed. Så valget er dit.

Koden for hvert panel kan se således ud:
```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```

Så bliver `<button>` elementet `pane.firstChild`. Det gør det nemt at tildele en handler til det med denne kode:

```js
pane.firstChild.onclick = () => pane.remove();
```
