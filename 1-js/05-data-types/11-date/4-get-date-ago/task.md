importance: 4

---

# Hvad var dagen for mange dage siden?

Skriv en funktion `getDateAgo(date, days)` der returnerer dagen for `days` dage siden fra `date`.

For eksempel, hvis idag er den 20de, så skal `getDateAgo(new Date(), 1)` være den 19de og `getDateAgo(new Date(), 2)` være den 18de.

Skal virke på en pålitelig måde for `days=365` eller mere:

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```

P.S. Funktionen skal ikke ændre den givne `date`.
