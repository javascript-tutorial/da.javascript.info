importance: 5

---

# Tilføj toString til ordbogen

Der er et objekt `dictionary`, oprettet som `Object.create(null)`, til at gemme enhver `key/value` par.

Tilføj metoden `dictionary.toString()` til det, som skal returnere en komma-separeret liste af nøgler. Din `toString` bør ikke vises i `for..in` over objektet.

Den bør virke sådan her:

```js
let dictionary = Object.create(null);

*!*
// din kode til at tilføje dictionary.toString metoden
*/!*

// tilføj nogle data
dictionary.apple = "æble";
dictionary.__proto__ = "test"; // __proto__ is a regular property key here

// Kun apple og __proto__ er i loopet
for(let key in dictionary) {
  alert(key); // "apple" og "__proto__"
}  

// din toString i aktion
alert(dictionary); // "apple,__proto__"
```
