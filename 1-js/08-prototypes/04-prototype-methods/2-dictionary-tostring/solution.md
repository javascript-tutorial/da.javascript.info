
Metoden kan tage alle enumerable (tælbare) nøgler ved hjælp af `Object.keys` og outputte deres liste.

For at gøre `toString` non-enumerable, lad os definere den ved hjælp af en egenskabsbeskrivelse. Syntaksen for `Object.create` giver os mulighed for at give et objekt med egenskabsbeskrivelser som anden argument.

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // definer egenskaben toString
    value() { // value er en funktion
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Æble";
dictionary.__proto__ = "test";

// Kun apple og __proto__ er i loopet
for(let key in dictionary) {
  alert(key); // "apple" og "__proto__"
}  

// kommasepareret liste af egenskaber fra toString
alert(dictionary); // "apple,__proto__"
```

Når vi opretter en egenskab ved hjælp af en egenskabsbeskrivelser, er dens flag som standard sat til `false`. Så i koden ovenfor er `dictionary.toString` non-enumerable.

Se kapitlet [](info:property-descriptors) for en gennemgang.
