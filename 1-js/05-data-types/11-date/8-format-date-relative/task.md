importance: 4

---

# Formater den relative dato

Skriv en funktion `formatDate(date)` der formaterer `date` som følger:

- Hvis `date` er givet for under en sekund siden, så skal den returnere `"lige nu"`.
- Hvis `date` er givet for under en minut siden, så skal den returnere `"n sekunder siden"`.
- Hvis `date` er givet for under en time siden, så skal den returnere `"m minutter siden"`.
- Hvis `date` er givet for under en dag siden, så skal den returnere `"DD.MM.YY HH:mm"`.

For eksempel:

```js
alert( formatDate(new Date(new Date - 1)) ); // "lige nu"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sekunder siden"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 minutter siden"

// En dag siden
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```
