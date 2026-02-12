importance: 4

---

# Opret objekt med nøgler fra array

Lad os antage, at vi har modtaget et array af brugere i formen `{id:..., name:..., age:... }`.

Opret en funktion `groupById(arr)`, der opretter et objekt ud fra det, med `id` som nøgle, og array-elementerne som værdier.

For eksempel:

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
efter kaldet skal vi have:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

Sådan en funktion er virkelig praktisk, når man arbejder med serverdata.

I denne opgave antager vi at `id` er unik. Der må ikke være to array-elementer med samme `id`.

Brug array-metoden `.reduce` i løsningen.
