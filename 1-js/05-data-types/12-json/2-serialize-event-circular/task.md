importance: 5

---

# Ekskluder cirkulære referencer

I simple tilfælde med cirkulære referencer kan vi ekskludere en egenskab fra serialisering ved dens navn.

Men nogle gange kan vi ikke bare bruge navnet, da det kan bruges både i cirkulære referencer og normale egenskaber. Så vi kan tjekke egenskaben ved dens værdi.

Skriv en `replacer` funktion der `stringify'er` alt, men fjerner egenskaber med reference til `meetup`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Konference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// circulær reference
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* din kode */
}));

/* resultatet bør være:
{
  "title":"Konference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
