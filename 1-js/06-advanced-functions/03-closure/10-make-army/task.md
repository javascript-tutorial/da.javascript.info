importance: 5

---

# En hær af funktioner

Den følgende kode opretter en array af `shooters`.

Hver funktion er ment at vise sit nummer. Men noget er forkert...

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // opret en shooter funktion,
      alert( i ); // der skal vise sit nummer
    };
    shooters.push(shooter); // og tilføj den til arrayet
    i++;
  }

  // ...og returner arrayet af shooters
  return shooters;
}

let army = makeArmy();

*!*
// alle shooters viser 10 i stedet for deres tal 0, 1, 2, 3...
army[0](); // 10 fra shooter nummer 0
army[1](); // 10 fra shooter nummer 1
army[2](); // 10 ...og så videre.
*/!*
```

Hvorfor får alle shooters samme værdi? 

Fiks koden så koden virker som forventet.

