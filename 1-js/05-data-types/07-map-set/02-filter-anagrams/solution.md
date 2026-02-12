For at finde alle anagrammer kan vi opdele hvert ord i bogstaver og sortere dem. Når bogstaverne er sorteret, er alle anagrammer ens.

For eksempel:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

Vi bruger de bogstav-sorterede varianter som map-nøgler for kun at gemme én værdi per nøgle:

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // opsplit ordet i bogstaver, sorter dem og sæt dem sammen igen
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

Bogstav-sortering udføres af kæden af kald i linjen `(*)`.

For nemheds skyld deler vi det op i flere linjer:

```js
let sorted = word // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

To forskellige ord `'PAN'` og `'nap'` får den samme bogstav-sorterede form `'anp'`.

Næste linje sætter ordet ind i map'et med den bogstav-sorterede form som nøgle:

```js
map.set(sorted, word);
```

Hvis vi nogensinde møder et ord med den samme bogstav-sorterede form igen, vil det overskrive den tidligere værdi med den samme nøgle i map'et. Så vi vil altid have højst ét ord per bogstav-form.

Til sidst tager `Array.from(map.values())` en iterable over map-værdier (vi behøver ikke nøgler i resultatet) og returnerer et array af dem.

Her kunne vi også bruge et almindeligt objekt i stedet for `Map`, fordi nøglerne er strenge.

En løsning kan se sådan ud:

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
