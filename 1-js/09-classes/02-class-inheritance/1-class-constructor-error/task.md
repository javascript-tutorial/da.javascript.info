importance: 5

---

# Fejl ved oprettelse af instans

Her er koden hvor `Rabbit` udvider `Animal`.

Uheldigvis kan `Rabbit`-objekter ikke oprettes. Hvad er galt? Ret det.
```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    this.name = name;
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("Hvid kanin"); // Fejl: this is not defined
*/!*
alert(rabbit.name);
```
